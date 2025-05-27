import { cosineSimilarity } from "ai"
import { generateEmbeddings, generateEmbedding, generateText as groqGenerateText, isGroqAvailable } from "./groq-utils"

// This is a simplified in-memory vector database
type DocumentChunk = {
  id: string
  content: string
  embedding: number[]
  metadata: {
    source: string
    type: "material" | "guideline"
    title?: string
  }
}

// Generate mock embeddings when APIs are not available
function generateMockEmbedding(text: string): number[] {
  // Create a deterministic but unique embedding based on the text content
  const hash = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Generate a 384-dimensional vector (same as all-MiniLM-L6-v2)
  return Array(384)
    .fill(0)
    .map((_, i) => {
      const seed = hash + i + text.length
      return Math.sin(seed * 0.01) * 0.5
    })
}

class VectorStore {
  private documents: DocumentChunk[] = []
  private initialized = false
  private groqAvailable = false
  private embeddingStats = {
    total: 0,
    successful: 0,
    fallback: 0,
  }

  constructor() {
    // Check if APIs are available when the vector store is created
    this.checkApiAvailability()
  }

  private async checkApiAvailability() {
    try {
      this.groqAvailable = await isGroqAvailable()
      console.log(`Groq API available in VectorStore: ${this.groqAvailable}`)
    } catch (error) {
      console.error("Error checking API availability:", error)
      this.groqAvailable = false
    }
  }

  async addDocument({
    content,
    metadata,
    chunkSize = 300,
  }: {
    content: string
    metadata: DocumentChunk["metadata"]
    chunkSize?: number
  }) {
    console.log(`Adding document: ${metadata.source} (${metadata.type})`)

    // Re-check API availability before processing
    await this.checkApiAvailability()

    // Split content into chunks
    const chunks = this.splitIntoChunks(content, chunkSize)
    console.log(`Split content into ${chunks.length} chunks`)

    try {
      // Always try to generate embeddings, with robust fallback
      const embeddings = await generateEmbeddings(chunks)

      // Store chunks with their embeddings
      chunks.forEach((chunk, i) => {
        this.documents.push({
          id: `${metadata.source}-${i}-${Date.now()}`,
          content: chunk,
          embedding: embeddings[i],
          metadata: { ...metadata },
        })
      })

      this.initialized = true
      this.embeddingStats.total += chunks.length

      console.log(`Successfully added ${chunks.length} document chunks to vector store`)
      console.log(`Total documents in store: ${this.documents.length}`)

      return chunks.length
    } catch (error) {
      console.error("Critical error in addDocument:", error)

      // Even if embeddings completely fail, we can still store documents with mock embeddings
      console.log("Using emergency fallback - generating mock embeddings for all chunks")

      chunks.forEach((chunk, i) => {
        this.documents.push({
          id: `${metadata.source}-${i}-${Date.now()}`,
          content: chunk,
          embedding: generateMockEmbedding(chunk),
          metadata: { ...metadata },
        })
      })

      this.initialized = true
      this.embeddingStats.total += chunks.length
      this.embeddingStats.fallback += chunks.length

      console.log(`Added ${chunks.length} document chunks with mock embeddings`)
      return chunks.length
    }
  }

  async similaritySearch(query: string, filter?: Partial<DocumentChunk["metadata"]>, topK = 5) {
    if (!this.initialized || this.documents.length === 0) {
      console.log("Vector store not initialized or empty, returning empty results")
      return []
    }

    console.log(`Performing similarity search for: "${query.substring(0, 50)}..."`)

    try {
      // Try to generate query embedding
      let queryEmbedding: number[]

      try {
        queryEmbedding = await generateEmbedding(query)
        console.log("Generated query embedding successfully")
      } catch (error) {
        console.warn("Failed to generate query embedding, using mock:", error)
        queryEmbedding = generateMockEmbedding(query)
      }

      // Filter documents if filter is provided
      let docs = this.documents
      if (filter) {
        docs = docs.filter((doc) => {
          for (const [key, value] of Object.entries(filter)) {
            if (doc.metadata[key as keyof typeof doc.metadata] !== value) {
              return false
            }
          }
          return true
        })
        console.log(`Filtered to ${docs.length} documents matching criteria`)
      }

      if (docs.length === 0) {
        console.log("No documents match the filter criteria")
        return []
      }

      // Calculate similarity and sort
      const results = docs
        .map((doc) => ({
          document: doc,
          score: cosineSimilarity(queryEmbedding, doc.embedding),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)

      console.log(
        `Found ${results.length} similar documents with scores:`,
        results.map((r) => r.score.toFixed(3)),
      )
      return results.map((r) => r.document)
    } catch (error) {
      console.error("Error in similarity search, falling back to keyword matching:", error)

      // Fallback to basic keyword matching
      const keywords = query.toLowerCase().split(/\s+/)
      console.log(`Using keyword search with terms: ${keywords.join(", ")}`)

      let docs = this.documents
      if (filter) {
        docs = docs.filter((doc) => {
          for (const [key, value] of Object.entries(filter)) {
            if (doc.metadata[key as keyof typeof doc.metadata] !== value) {
              return false
            }
          }
          return true
        })
      }

      const results = docs
        .map((doc) => {
          const content = doc.content.toLowerCase()
          const score =
            keywords.reduce((acc, keyword) => acc + (content.includes(keyword) ? 1 : 0), 0) / keywords.length
          return { document: doc, score }
        })
        .filter((result) => result.score > 0) // Only return documents with at least one keyword match
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)

      console.log(`Keyword search found ${results.length} documents`)
      return results.map((r) => r.document)
    }
  }

  private splitIntoChunks(text: string, chunkSize: number): string[] {
    // Simple chunking by sentences then combining until we reach chunk size
    const sentences = text.split(/(?<=[.!?])\s+/)
    const chunks: string[] = []
    let currentChunk = ""

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim())
        currentChunk = sentence
      } else {
        currentChunk += (currentChunk.length > 0 ? " " : "") + sentence
      }
    }

    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim())
    }

    // If no sentences were found, split by words
    if (chunks.length === 0 && text.length > 0) {
      const words = text.split(/\s+/)
      let currentChunk = ""

      for (const word of words) {
        if (currentChunk.length + word.length > chunkSize && currentChunk.length > 0) {
          chunks.push(currentChunk.trim())
          currentChunk = word
        } else {
          currentChunk += (currentChunk.length > 0 ? " " : "") + word
        }
      }

      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim())
      }
    }

    return chunks.filter((chunk) => chunk.length > 0)
  }

  // For debugging and testing
  getDocumentCount() {
    return this.documents.length
  }

  getEmbeddingStats() {
    return this.embeddingStats
  }

  clear() {
    this.documents = []
    this.initialized = false
    this.embeddingStats = { total: 0, successful: 0, fallback: 0 }
    console.log("Vector store cleared")
  }

  async isApiAvailable() {
    await this.checkApiAvailability()
    return this.groqAvailable
  }
}

// Create a singleton instance
export const vectorStore = new VectorStore()

// Function to process teaching materials
export async function processMaterial(content: string, title: string) {
  console.log(`Processing material: ${title}`)

  if (!content || content.trim().length === 0) {
    console.warn("Empty content provided for material processing")
    return 0
  }

  return await vectorStore.addDocument({
    content: content.trim(),
    metadata: {
      source: "material",
      type: "material",
      title,
    },
  })
}

// Function to process guidelines
export async function processGuidelines(content: string) {
  console.log("Processing guidelines")

  if (!content || content.trim().length === 0) {
    console.warn("Empty content provided for guidelines processing")
    return 0
  }

  return await vectorStore.addDocument({
    content: content.trim(),
    metadata: {
      source: "guidelines",
      type: "guideline",
    },
  })
}

// Function to generate curriculum transformation using RAG
export async function generateCurriculumTransformation(materialTitle: string, query: string) {
  console.log("=== Starting curriculum transformation ===")
  console.log(`Material: ${materialTitle}`)
  console.log(`Query: ${query}`)

  // Check if Groq is available
  const groqAvailable = await isGroqAvailable()
  console.log(`Groq available for transformation: ${groqAvailable}`)

  // Get vector store stats
  const stats = vectorStore.getEmbeddingStats()
  console.log(`Vector store stats:`, stats)

  // Retrieve relevant context from materials and guidelines
  console.log("Retrieving relevant context...")
  const materialContext = await vectorStore.similaritySearch(query, { type: "material" }, 3)
  const guidelinesContext = await vectorStore.similaritySearch(query, { type: "guideline" }, 2)

  // Combine contexts
  const materialText = materialContext.map((doc) => doc.content).join("\n\n")
  const guidelinesText = guidelinesContext.map((doc) => doc.content).join("\n\n")

  console.log(`Retrieved context:`)
  console.log(`- Material chunks: ${materialContext.length}`)
  console.log(`- Guidelines chunks: ${guidelinesContext.length}`)
  console.log(`- Material text length: ${materialText.length}`)
  console.log(`- Guidelines text length: ${guidelinesText.length}`)

  // Generate transformation using retrieved context
  const prompt = `
You are an educational innovation expert specializing in the Innova Schools Mexico methodology.
Transform the following traditional teaching material into innovative project-based learning
activities that align with Innova Schools Mexico's educational approach.

Traditional Material Title: ${materialTitle}

Relevant Material Content:
${materialText || "No specific material content provided"}

Innova Schools Mexico Guidelines:
${guidelinesText || "Use general innovative education principles focusing on project-based learning, critical thinking, collaboration, and real-world applications"}

Based on the above context, generate 3 innovative project ideas that align with Innova Schools Mexico's
learning objectives while making the content more engaging and student-centered. For each project, include:
1. Project title
2. Description
3. Learning objectives (3-4 specific objectives)
4. Materials needed
5. Timeline
6. Assessment approach that aligns with Innova Schools Mexico's evaluation methodology

Format the response as a JSON object with the following structure:
{
  "projects": [
    {
      "title": "Project Title",
      "description": "Project description",
      "learningObjectives": ["objective 1", "objective 2", "objective 3"],
      "materials": "Materials needed",
      "timeline": "Timeline",
      "assessment": "Assessment approach"
    }
  ]
}

IMPORTANT: Return ONLY the JSON object, no additional text or formatting.
`

  try {
    let result

    if (groqAvailable) {
      console.log("Using Groq for text generation...")
      // Use Groq if API key is available
      result = await groqGenerateText(prompt)
      console.log("Groq response received (first 200 chars):", result.substring(0, 200) + "...")
    } else {
      console.log("Groq not available, using mock response...")
      // Use mock response if API is not available
      result = generateMockResponse(materialTitle, materialText, guidelinesText)
    }

    // Parse the JSON response
    try {
      // Clean the response - remove any markdown formatting or extra text
      let cleanedResult = result.trim()

      // Remove markdown code blocks if present
      cleanedResult = cleanedResult.replace(/```json\s*/g, "").replace(/```\s*/g, "")

      // Find JSON object in the response
      const jsonMatch = cleanedResult.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        cleanedResult = jsonMatch[0]
      }

      const parsedResult = JSON.parse(cleanedResult)
      console.log("Successfully parsed JSON response")
      console.log(`Generated ${parsedResult.projects?.length || 0} projects`)

      return {
        ...parsedResult,
        metadata: {
          usingGroq: groqAvailable,
          materialChunks: materialContext.length,
          guidelinesChunks: guidelinesContext.length,
          embeddingStats: stats,
        },
      }
    } catch (e) {
      console.error("Error parsing JSON response:", e)
      console.log("Raw response:", result)

      // If JSON parsing fails completely, return mock data with error info
      console.log("Falling back to mock projects due to parsing error")
      return {
        projects: generateMockProjects(materialTitle),
        error: "Failed to parse AI response, showing mock data",
        rawResponse: result.substring(0, 500) + "...",
        metadata: {
          usingGroq: groqAvailable,
          materialChunks: materialContext.length,
          guidelinesChunks: guidelinesContext.length,
          embeddingStats: stats,
          parseError: true,
        },
      }
    }
  } catch (error) {
    console.error("Error generating transformation:", error)
    return {
      projects: generateMockProjects(materialTitle),
      error: `Generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      metadata: {
        usingGroq: groqAvailable,
        materialChunks: materialContext.length,
        guidelinesChunks: guidelinesContext.length,
        embeddingStats: stats,
        generationError: true,
      },
    }
  }
}

// Generate a mock response when API is not available
function generateMockResponse(materialTitle: string, materialText: string, guidelinesText: string): string {
  const projects = generateMockProjects(materialTitle)
  return JSON.stringify({ projects })
}

// Generate mock projects based on material title
function generateMockProjects(materialTitle: string) {
  const title = materialTitle || "Untitled Material"
  const isScience = title.toLowerCase().includes("science") || title.toLowerCase().includes("biology")
  const isMath = title.toLowerCase().includes("math") || title.toLowerCase().includes("algebra")
  const isHistory = title.toLowerCase().includes("history") || title.toLowerCase().includes("social")

  if (isScience) {
    return [
      {
        title: "Ecosystem Investigation Project",
        description:
          "Students work in teams to research, model, and present on a specific ecosystem, focusing on interdependence and environmental impacts.",
        learningObjectives: [
          "Analyze the interdependence of organisms within ecosystems",
          "Evaluate human impact on natural environments",
          "Develop research and presentation skills",
          "Apply scientific principles to real-world environmental challenges",
        ],
        materials: "Research materials, art supplies, digital presentation tools, field trip resources (if applicable)",
        timeline: "2 weeks, including research, model building, and presentations",
        assessment: "Rubric evaluating scientific accuracy, creativity, collaboration, and presentation skills",
      },
      {
        title: "Scientific Method Challenge",
        description:
          "Students design and conduct experiments to test hypotheses related to course content, documenting their process and findings.",
        learningObjectives: [
          "Apply the scientific method to answer testable questions",
          "Design controlled experiments with appropriate variables",
          "Analyze and interpret data using appropriate tools",
          "Communicate scientific findings effectively",
        ],
        materials: "Lab equipment, data collection tools, lab notebooks, presentation materials",
        timeline: "3 weeks, including design, experimentation, analysis, and presentation",
        assessment: "Lab report, peer review, experimental design evaluation, presentation quality",
      },
      {
        title: "Science Communication Campaign",
        description:
          "Students create public awareness campaigns about important scientific concepts and their real-world applications.",
        learningObjectives: [
          "Translate complex scientific concepts for general audiences",
          "Evaluate the societal impact of scientific discoveries",
          "Create compelling multimedia content",
          "Develop persuasive communication skills",
        ],
        materials: "Digital media creation tools, research resources, presentation materials",
        timeline: "2 weeks for research, design, and campaign development",
        assessment: "Campaign effectiveness, scientific accuracy, creativity, audience engagement",
      },
    ]
  } else if (isMath) {
    return [
      {
        title: "Real-World Math Modeling Challenge",
        description:
          "Students identify real-world problems and develop mathematical models to analyze and propose solutions.",
        learningObjectives: [
          "Apply mathematical concepts to authentic situations",
          "Develop and refine mathematical models",
          "Analyze and interpret mathematical results",
          "Communicate mathematical thinking clearly",
        ],
        materials: "Data collection tools, graphing software, presentation materials",
        timeline: "2 weeks for problem identification, modeling, and presentation",
        assessment: "Mathematical accuracy, model sophistication, problem-solving approach, presentation quality",
      },
      {
        title: "Mathematical Art Installation",
        description: "Students create artistic works that demonstrate mathematical principles and patterns.",
        learningObjectives: [
          "Recognize mathematical patterns in art and nature",
          "Apply geometric and algebraic concepts creatively",
          "Develop spatial reasoning skills",
          "Communicate connections between mathematics and aesthetics",
        ],
        materials: "Art supplies, geometric tools, digital design software (optional)",
        timeline: "1-2 weeks for concept development, creation, and exhibition",
        assessment: "Mathematical accuracy, creativity, craftsmanship, written explanation of mathematical principles",
      },
      {
        title: "Data Analysis for Community Impact",
        description:
          "Students collect, analyze, and present data about a community issue, using statistics to inform potential solutions.",
        learningObjectives: [
          "Design effective data collection methods",
          "Apply appropriate statistical analyses",
          "Interpret data results accurately",
          "Use data to support evidence-based recommendations",
        ],
        materials: "Survey tools, statistical software, data visualization tools",
        timeline: "3 weeks for survey design, data collection, analysis, and presentation",
        assessment:
          "Statistical accuracy, data visualization quality, interpretation depth, presentation effectiveness",
      },
    ]
  } else if (isHistory) {
    return [
      {
        title: "Historical Perspectives Documentary",
        description: "Students create short documentaries examining historical events from multiple perspectives.",
        learningObjectives: [
          "Analyze historical events from diverse viewpoints",
          "Evaluate primary and secondary sources critically",
          "Synthesize historical information into a coherent narrative",
          "Develop digital storytelling skills",
        ],
        materials: "Research materials, digital recording equipment, editing software",
        timeline: "3 weeks for research, script development, filming, and editing",
        assessment: "Historical accuracy, source quality, perspective balance, production quality",
      },
      {
        title: "Living History Exhibition",
        description:
          "Students research, design, and present interactive exhibits that bring historical periods to life.",
        learningObjectives: [
          "Research historical periods in depth",
          "Identify key cultural, social, and political elements of an era",
          "Create engaging, interactive learning experiences",
          "Communicate historical knowledge effectively",
        ],
        materials: "Research materials, exhibit design supplies, props and costumes",
        timeline: "2-3 weeks for research, design, and exhibition preparation",
        assessment: "Historical accuracy, exhibit design, interactive elements, presentation skills",
      },
      {
        title: "Historical Decision Analysis",
        description:
          "Students analyze critical historical decisions, evaluate alternatives, and present counterfactual scenarios.",
        learningObjectives: [
          "Analyze the context and constraints of historical decisions",
          "Evaluate the short and long-term impacts of historical choices",
          "Develop critical thinking about causality and contingency in history",
          "Construct evidence-based alternative historical scenarios",
        ],
        materials: "Research materials, decision mapping tools, presentation materials",
        timeline: "2 weeks for research, analysis, and presentation",
        assessment: "Historical reasoning, evidence quality, analytical depth, presentation effectiveness",
      },
    ]
  } else {
    return [
      {
        title: "Interdisciplinary Learning Project",
        description:
          "Students explore connections between different subject areas through a collaborative project that integrates multiple disciplines.",
        learningObjectives: [
          "Identify connections between different fields of knowledge",
          "Apply concepts from multiple disciplines to solve problems",
          "Develop collaborative research and presentation skills",
          "Create original work that demonstrates integrated understanding",
        ],
        materials: "Research materials, creative supplies, presentation tools",
        timeline: "2-3 weeks for research, development, and presentation",
        assessment: "Conceptual integration, creativity, collaboration, presentation quality",
      },
      {
        title: "Community-Based Learning Initiative",
        description:
          "Students identify a community need related to course content and develop a project to address it.",
        learningObjectives: [
          "Apply academic knowledge to real-world situations",
          "Develop project planning and implementation skills",
          "Engage with community stakeholders effectively",
          "Reflect on the relationship between learning and civic responsibility",
        ],
        materials: "Research materials, project planning tools, community outreach resources",
        timeline: "3-4 weeks for community research, project development, and implementation",
        assessment: "Project impact, application of course concepts, stakeholder feedback, reflection quality",
      },
      {
        title: "Digital Portfolio Development",
        description:
          "Students create comprehensive digital portfolios showcasing their learning journey and achievements.",
        learningObjectives: [
          "Curate evidence of learning and growth over time",
          "Reflect critically on personal development",
          "Develop digital presentation and organization skills",
          "Articulate learning goals and achievements effectively",
        ],
        materials: "Digital portfolio platform, content creation tools, reflection prompts",
        timeline: "Ongoing throughout the term with dedicated work periods",
        assessment: "Portfolio organization, reflection depth, evidence quality, presentation effectiveness",
      },
    ]
  }
}
