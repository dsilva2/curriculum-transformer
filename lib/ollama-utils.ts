// Ollama API client for text generation and embeddings

// Default Ollama host - can be configured via environment variable
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434"

// Default models - can be configured via environment variables
const OLLAMA_EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL || "nomic-embed-text"
const OLLAMA_COMPLETION_MODEL = process.env.OLLAMA_COMPLETION_MODEL || "llama3"

// Interface for Ollama embedding response
interface OllamaEmbeddingResponse {
  embedding: number[]
}

// Interface for Ollama generation response
interface OllamaGenerationResponse {
  model: string
  response: string
  done: boolean
}

/**
 * Generate embeddings using Ollama
 * @param text Text to generate embeddings for
 * @param model Ollama model to use (defaults to environment variable or nomic-embed-text)
 * @returns Array of embeddings
 */
export async function generateEmbedding(text: string, model = OLLAMA_EMBEDDING_MODEL): Promise<number[]> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt: text,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama embedding request failed: ${response.statusText}`)
    }

    const data = (await response.json()) as OllamaEmbeddingResponse
    return data.embedding
  } catch (error) {
    console.error("Error generating embeddings with Ollama:", error)
    throw error
  }
}

/**
 * Generate embeddings for multiple texts using Ollama
 * @param texts Array of texts to generate embeddings for
 * @param model Ollama model to use (defaults to environment variable or nomic-embed-text)
 * @returns Array of embeddings
 */
export async function generateEmbeddings(texts: string[], model = OLLAMA_EMBEDDING_MODEL): Promise<number[][]> {
  try {
    // Process embeddings in batches to avoid overwhelming the server
    const batchSize = 10
    const embeddings: number[][] = []

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize)
      const batchPromises = batch.map((text) => generateEmbedding(text, model))
      const batchResults = await Promise.all(batchPromises)
      embeddings.push(...batchResults)
    }

    return embeddings
  } catch (error) {
    console.error("Error generating batch embeddings with Ollama:", error)
    throw error
  }
}

/**
 * Generate text using Ollama
 * @param prompt Prompt to generate text from
 * @param model Ollama model to use (defaults to environment variable or llama3)
 * @returns Generated text
 */
export async function generateText(prompt: string, model = OLLAMA_COMPLETION_MODEL): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama generation request failed: ${response.statusText}`)
    }

    const data = (await response.json()) as OllamaGenerationResponse
    return data.response
  } catch (error) {
    console.error("Error generating text with Ollama:", error)
    throw error
  }
}

/**
 * Check if Ollama is available
 * @returns Boolean indicating if Ollama is available
 */
export async function isOllamaAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.ok
  } catch (error) {
    console.error("Error checking Ollama availability:", error)
    return false
  }
}

/**
 * Get available Ollama models
 * @returns Array of available model names
 */
export async function getAvailableModels(): Promise<string[]> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get Ollama models: ${response.statusText}`)
    }

    const data = await response.json()
    return data.models?.map((model: any) => model.name) || []
  } catch (error) {
    console.error("Error getting Ollama models:", error)
    return []
  }
}
