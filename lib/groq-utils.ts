// Groq API client for text generation
// Groq offers free API access with generous limits

const GROQ_API_URL = "https://api.groq.com/openai/v1"
const GROQ_API_KEY = process.env.GROQ_API_KEY

// Default models available on Groq
const GROQ_MODEL = process.env.GROQ_MODEL || "compound-beta-mini"

/**
 * Generate text using Groq API
 * @param prompt Prompt to generate text from
 * @param model Groq model to use
 * @returns Generated text
 */
export async function generateText(prompt: string, model = GROQ_MODEL): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key is missing")
  }

  try {
    const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Groq API request failed: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ""
  } catch (error) {
    console.error("Error generating text with Groq:", error)
    throw error
  }
}

/**
 * Generate mock embeddings as a fallback
 * Creates deterministic embeddings based on text content
 */
function generateMockEmbedding(text: string): number[] {
  // Create a deterministic but unique embedding based on the text content
  const hash = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Generate a 384-dimensional vector (same as all-MiniLM-L6-v2)
  return Array(384)
    .fill(0)
    .map((_, i) => {
      // Use a combination of hash, index, and text length for variation
      const seed = hash + i + text.length
      return Math.sin(seed * 0.01) * 0.5
    })
}

/**
 * Generate embeddings using HuggingFace API with robust fallback
 * @param text Text to generate embeddings for
 * @returns Array of embeddings
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // First, try HuggingFace API
  try {
    console.log("Attempting to generate embedding with HuggingFace...")

    const response = await fetch("https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        options: {
          wait_for_model: true,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.warn(`HuggingFace API failed (${response.status}): ${errorText}`)
      throw new Error(`HuggingFace API request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()

    // Handle different response formats from HuggingFace
    if (Array.isArray(result) && result.length > 0) {
      console.log("Successfully generated embedding with HuggingFace")
      return result
    } else if (result.error) {
      console.warn("HuggingFace API returned error:", result.error)
      throw new Error(`HuggingFace API error: ${result.error}`)
    } else {
      console.warn("Unexpected HuggingFace response format:", result)
      throw new Error("Unexpected response format from HuggingFace")
    }
  } catch (error) {
    console.warn("HuggingFace embedding failed, using mock embedding:", error instanceof Error ? error.message : error)

    // Fallback to mock embedding
    const mockEmbedding = generateMockEmbedding(text)
    console.log("Generated mock embedding as fallback")
    return mockEmbedding
  }
}

/**
 * Generate embeddings for multiple texts with retry logic
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  console.log(`Generating embeddings for ${texts.length} texts...`)

  const embeddings: number[][] = []
  let successCount = 0
  let fallbackCount = 0

  for (let i = 0; i < texts.length; i++) {
    const text = texts[i]

    try {
      const embedding = await generateEmbedding(text)
      embeddings.push(embedding)

      // Check if this looks like a real embedding (not all the same values)
      const isRealEmbedding = embedding.some((val, idx) => Math.abs(val - embedding[0]) > 0.01)
      if (isRealEmbedding) {
        successCount++
      } else {
        fallbackCount++
      }

      // Small delay between requests to be respectful to APIs
      if (i < texts.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    } catch (error) {
      console.error(`Failed to generate embedding for text ${i + 1}:`, error)

      // Use mock embedding as final fallback
      const mockEmbedding = generateMockEmbedding(text)
      embeddings.push(mockEmbedding)
      fallbackCount++
    }
  }

  console.log(`Embedding generation complete: ${successCount} real, ${fallbackCount} mock embeddings`)
  return embeddings
}

/**
 * Check if Groq API is available
 */
export async function isGroqAvailable(): Promise<boolean> {
  if (!GROQ_API_KEY) {
    console.error("Groq API key is missing from environment variables")
    return false
  }

  if (!GROQ_API_KEY.startsWith("gsk_")) {
    console.error("Groq API key format is invalid - should start with 'gsk_'")
    return false
  }

  try {
    console.log("Testing Groq API connection...")
    const response = await fetch(`${GROQ_API_URL}/models`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`Groq API request failed: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.error("Error details:", errorText)
      return false
    }

    console.log("Groq API connection successful!")
    return true
  } catch (error) {
    console.error("Error checking Groq availability:", error)
    return false
  }
}

/**
 * Get available Groq models
 */
export async function getAvailableModels(): Promise<string[]> {
  if (!GROQ_API_KEY) {
    return []
  }

  try {
    const response = await fetch(`${GROQ_API_URL}/models`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get Groq models: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data?.map((model: any) => model.id) || []
  } catch (error) {
    console.error("Error getting Groq models:", error)
    return []
  }
}
