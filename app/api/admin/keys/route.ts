import { type NextRequest, NextResponse } from "next/server"
import { loadKeysFromStorage, saveKeysToStorage, getWorkingKeysCount } from "@/lib/key-storage"

type StoredKeys = ReturnType<typeof loadKeysFromStorage>

// Lazy load keys only when needed (not during build time)
let storedGeminiKeys: StoredKeys | null = null

export function getStoredGeminiKeys(): StoredKeys {
  if (!storedGeminiKeys) {
    storedGeminiKeys = loadKeysFromStorage()
  }
  return storedGeminiKeys
}

export async function GET() {
  try {
    const keys = getStoredGeminiKeys()

    const maskKey = (key: string) => (key ? `${key.slice(0, 8)}${"*".repeat(Math.max(0, key.length - 8))}` : "")

    const maskedKeys: Record<string, string> = {}
    Object.entries(keys).forEach(([keyId, keyValue]) => {
      maskedKeys[keyId] = maskKey(keyValue)
    })

    const workingKeysCount = getWorkingKeysCount(keys)
    console.log(`[v0] Admin panel loaded ${Object.keys(keys).length} keys, ${workingKeysCount} have values`)

    return NextResponse.json({
      keys: maskedKeys,
      totalKeys: Object.keys(keys).length,
      workingKeys: workingKeysCount,
    })
  } catch (error) {
    console.error("[v0] Error loading keys for admin panel:", error)
    return NextResponse.json({ error: "Failed to load keys" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { keys } = await request.json()
    const currentKeys = getStoredGeminiKeys()

    // Create a copy to avoid mutations
    const updatedKeys = { ...currentKeys }

    Object.entries(keys).forEach(([keyId, keyValue]) => {
      if (typeof keyValue === "string") {
        updatedKeys[keyId] = keyValue
        console.log(`[v0] Updated Gemini API key ${keyId}`)

        // Update environment variable for the first key for backward compatibility
        if (keyId === "key1") {
          process.env.GEMINI_API_KEY = keyValue
        }
      }
    })

    saveKeysToStorage(updatedKeys)
    // Update the cached keys
    storedGeminiKeys = updatedKeys

    const workingKeysCount = getWorkingKeysCount(updatedKeys)
    console.log(`[v0] Saved ${Object.keys(updatedKeys).length} keys to storage, ${workingKeysCount} have values`)

    return NextResponse.json({
      success: true,
      totalKeys: Object.keys(updatedKeys).length,
      workingKeys: workingKeysCount,
    })
  } catch (error) {
    console.error("[v0] Error saving keys:", error)
    return NextResponse.json({ error: "Failed to save keys" }, { status: 500 })
  }
}
