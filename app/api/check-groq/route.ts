import { NextResponse } from "next/server";
import { isGroqAvailable, getAvailableModels } from "@/lib/groq-utils";

export async function GET() {
  try {
    // Check if API key exists
    const hasApiKey = !!process.env.GROQ_API_KEY;

    if (!hasApiKey) {
      return NextResponse.json({
        available: false,
        error: "GROQ_API_KEY environment variable is missing",
        debug: {
          hasApiKey: false,
          keyFormat: "N/A",
        },
      });
    }

    // Check API key format
    const keyFormat = process.env.GROQ_API_KEY?.startsWith("gsk_")
      ? "valid"
      : "invalid";

    if (keyFormat === "invalid") {
      return NextResponse.json({
        available: false,
        error: "GROQ_API_KEY format is invalid (should start with 'gsk_')",
        debug: {
          hasApiKey: true,
          keyFormat: "invalid",
        },
      });
    }

    const available = await isGroqAvailable();

    let models: string[] = [];
    if (available) {
      models = await getAvailableModels();
    }

    return NextResponse.json({
      available,
      models,
      currentModel: process.env.GROQ_MODEL || "llama3-8b-8192",
      provider: "Groq",
      debug: {
        hasApiKey: true,
        keyFormat: "valid",
        keyLength: process.env.GROQ_API_KEY?.length || 0,
      },
    });
  } catch (error) {
    console.error("Error checking Groq:", error);
    return NextResponse.json(
      {
        available: false,
        error: `Failed to check Groq availability: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        debug: {
          hasApiKey: !!process.env.GROQ_API_KEY,
          errorType:
            error instanceof Error ? error.constructor.name : "Unknown",
        },
      },
      { status: 500 }
    );
  }
}
