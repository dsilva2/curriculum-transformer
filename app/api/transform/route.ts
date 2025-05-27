import { type NextRequest, NextResponse } from "next/server"
import { generateCurriculumTransformation } from "@/lib/rag-utils"
import { isGroqAvailable } from "@/lib/groq-utils"

export async function POST(req: NextRequest) {
  try {
    const { materialTitle, query } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    console.log("Transform API called with:", { materialTitle, query })

    // Check if Groq is available before processing
    const groqAvailable = await isGroqAvailable()
    console.log(`Groq API available in transform route: ${groqAvailable}`)

    // Generate transformation using RAG
    const transformationResults = await generateCurriculumTransformation(materialTitle || "Untitled Material", query)

    console.log("Transformation completed, results:", transformationResults)

    return NextResponse.json({
      success: true,
      results: transformationResults,
      usingGroq: groqAvailable,
      debug: {
        materialTitle,
        query,
        groqAvailable,
        hasProjects: !!transformationResults?.projects,
        projectCount: transformationResults?.projects?.length || 0,
      },
    })
  } catch (error) {
    console.error("Error processing transformation request:", error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    return NextResponse.json(
      {
        error: "Failed to process request",
        details: errorMessage,
        success: false,
      },
      { status: 500 },
    )
  }
}
