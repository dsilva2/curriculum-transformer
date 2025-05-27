import { NextResponse } from "next/server"

export async function GET() {
  // Check if OpenAI API key is available
  const hasApiKey = !!process.env.OPENAI_API_KEY

  return NextResponse.json({
    hasApiKey,
  })
}
