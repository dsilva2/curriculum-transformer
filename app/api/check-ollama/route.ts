import { NextResponse } from "next/server"
import { isOllamaAvailable, getAvailableModels } from "@/lib/ollama-utils"

export async function GET() {
  try {
    const available = await isOllamaAvailable()

    let models: string[] = []
    if (available) {
      models = await getAvailableModels()
    }

    return NextResponse.json({
      available,
      models,
      embeddingModel: process.env.OLLAMA_EMBEDDING_MODEL || "nomic-embed-text",
      completionModel: process.env.OLLAMA_COMPLETION_MODEL || "llama3",
    })
  } catch (error) {
    console.error("Error checking Ollama:", error)
    return NextResponse.json(
      {
        available: false,
        error: "Failed to check Ollama availability",
      },
      { status: 500 },
    )
  }
}
