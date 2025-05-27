import { type NextRequest, NextResponse } from "next/server"
import { processMaterial, processGuidelines, vectorStore } from "@/lib/rag-utils"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const guidelinesText = formData.get("guidelines") as string | null
    const materialTitle = (formData.get("title") as string) || "Untitled Material"

    if (!file && !guidelinesText) {
      return NextResponse.json({ error: "Either file or guidelines text is required" }, { status: 400 })
    }

    // Clear previous data for this demo
    // In a real app, you would maintain the vector store across sessions
    vectorStore.clear()

    // Process the file content
    let fileContent = ""
    let chunksProcessed = 0

    if (file) {
      fileContent = await file.text()
      chunksProcessed = await processMaterial(fileContent, materialTitle)
    }

    // Process guidelines
    let guidelinesChunksProcessed = 0
    if (guidelinesText) {
      guidelinesChunksProcessed = await processGuidelines(guidelinesText)
    }

    return NextResponse.json({
      success: true,
      stats: {
        materialChunks: chunksProcessed,
        guidelinesChunks: guidelinesChunksProcessed,
        totalDocuments: vectorStore.getDocumentCount(),
      },
      message: "Documents processed and indexed successfully",
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
