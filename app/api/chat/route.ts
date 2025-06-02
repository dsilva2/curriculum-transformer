import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/groq-utils";

export async function POST(req: NextRequest) {
  try {
    const { message, files, guidelines } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Construct the prompt with context from files and guidelines
    let prompt =
      "You are an AI assistant helping teachers with their lesson plans for Innova Schools Mexico.\n\n";

    if (guidelines) {
      prompt +=
        "Here are the school guidelines to consider:\n" + guidelines + "\n\n";
    }

    if (files && files.length > 0) {
      prompt += "Here are the lesson plans to analyze:\n";
      files.forEach((file: any) => {
        prompt += `\n--- ${file.name} ---\n${file.content}\n`;
      });
      prompt += "\n";
    }

    prompt += `User question: ${message}\n\nPlease provide a helpful response that considers both the lesson plans and guidelines.`;

    // Generate response using Groq
    const response = await generateText(prompt);

    return NextResponse.json({
      response,
      debug: {
        promptLength: prompt.length,
        filesCount: files?.length || 0,
        hasGuidelines: !!guidelines,
      },
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
