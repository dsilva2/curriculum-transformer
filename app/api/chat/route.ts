import { type NextRequest, NextResponse } from "next/server"
import { vectorStore } from "@/lib/rag-utils"
import { generateText as ollamaGenerateText, isOllamaAvailable } from "@/lib/ollama-utils"

export async function POST(req: NextRequest) {
  try {
    const { message, files, guidelines } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Process uploaded files if they haven't been processed yet
    if (files && files.length > 0) {
      // In a real implementation, you would:
      // 1. Process each file into chunks
      // 2. Generate embeddings for each chunk
      // 3. Store them in the vector store with appropriate metadata

      for (const file of files) {
        await vectorStore.addDocument({
          content: file.content,
          metadata: {
            source: file.name,
            type: "lesson_plan",
            title: file.name,
          },
        })
      }
    }

    // Process guidelines if provided
    if (guidelines) {
      await vectorStore.addDocument({
        content: guidelines,
        metadata: {
          source: "guidelines",
          type: "guideline",
        },
      })
    }

    // Retrieve relevant context based on the message
    const relevantLessonPlans = await vectorStore.similaritySearch(message, { type: "lesson_plan" }, 3)
    const relevantGuidelines = await vectorStore.similaritySearch(message, { type: "guideline" }, 2)

    // Combine contexts
    const lessonPlanContext = relevantLessonPlans.map((doc) => doc.content).join("\n\n")
    const guidelinesContext = relevantGuidelines.map((doc) => doc.content).join("\n\n")

    // Generate response using RAG
    const prompt = `
You are an educational assistant for Innova Schools Mexico. Your task is to analyze lesson plans and provide feedback on their compliance with Innova Schools Mexico guidelines.

Lesson Plan Content:
${lessonPlanContext || "No lesson plan provided"}

Innova Schools Mexico Guidelines:
${guidelinesContext || "No specific guidelines provided"}

User Question:
${message}

Provide detailed, constructive feedback on how well the lesson plan aligns with Innova Schools Mexico's educational approach. 
If there are areas for improvement, suggest specific changes that would better align with the guidelines.
Be specific, practical, and supportive in your feedback.
`

    let text = ""
    const ollamaAvailable = await isOllamaAvailable()

    if (ollamaAvailable) {
      // Use Ollama if available
      text = await ollamaGenerateText(prompt)
    } else {
      // Fallback to mock response
      text = generateMockResponse(message, files)
    }

    return NextResponse.json({
      response: text,
      usingOllama: ollamaAvailable,
    })
  } catch (error) {
    console.error("Error processing chat request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

// Generate mock response based on the query and files
function generateMockResponse(message: string, files: any[]): string {
  if (files.length === 0) {
    return "Please upload at least one lesson plan for me to analyze. I need to see your lesson plan to provide feedback on its compliance with Innova Schools Mexico guidelines."
  }

  // Simulate different responses based on the query
  if (message.toLowerCase().includes("comply") || message.toLowerCase().includes("compliance")) {
    return `Based on my analysis of your lesson plan "${files[0].name}", it generally complies with Innova Schools Mexico guidelines, but I have a few suggestions:

1. **Project-Based Learning**: Your lesson could benefit from more hands-on activities. Consider adding a mini-project that students can complete in groups.

2. **Critical Thinking**: The lesson includes some critical thinking questions, but you could enhance this by adding more open-ended questions that encourage students to analyze and evaluate concepts.

3. **Assessment Alignment**: Your assessment methods are well-structured, but make sure they align with Innova Schools' competency-based evaluation approach.

Would you like more specific feedback on any of these areas?`
  } else if (message.toLowerCase().includes("improve") || message.toLowerCase().includes("suggestion")) {
    return `Here are some suggestions to improve your lesson plan and better align it with Innova Schools Mexico guidelines:

1. **Student Engagement**: Add more interactive elements like think-pair-share activities or digital tools that promote active participation.

2. **Real-World Connections**: Strengthen the connection between the lesson content and real-world applications. Consider including a case study or current event that relates to the topic.

3. **Differentiation**: Include more options for differentiated instruction to accommodate diverse learning needs and styles.

4. **Technology Integration**: Incorporate appropriate technology tools that enhance learning rather than just substituting traditional methods.

Would you like me to elaborate on any of these suggestions?`
  } else {
    return `I've analyzed your lesson plan "${files[0].name}" in the context of Innova Schools Mexico guidelines. Here's my feedback:

The lesson structure is well-organized and includes clear learning objectives. I particularly like the inclusion of ${files[0].name.includes("Science") ? "scientific inquiry methods" : "collaborative activities"}.

To better align with Innova Schools' innovative approach, consider:
- Incorporating more student-led discovery opportunities
- Adding formative assessment checkpoints throughout the lesson
- Enhancing the reflection component at the end of the lesson

Is there a specific aspect of the lesson plan you'd like me to focus on?`
  }
}
