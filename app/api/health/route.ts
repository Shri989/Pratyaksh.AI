import { NextResponse } from "next/server"
import { validateEnvironment } from "@/lib/env-validation"
import { loadKeysFromStorage } from "@/lib/key-storage"

export async function GET() {
  try {
    const envValidation = validateEnvironment()
    const keys = loadKeysFromStorage()
    const keyCount = Object.keys(keys).length
    
    const health = {
      status: envValidation.isValid ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: {
        nodeEnv: process.env.NODE_ENV || "development",
        isVercel: !!process.env.VERCEL,
        envValidation: envValidation,
        configuredKeys: keyCount,
      },
      services: {
        apiKeys: envValidation.isValid ? "operational" : "misconfigured",
        fileStorage: "operational",
        analysis: envValidation.isValid ? "operational" : "degraded",
      },
      version: "1.0.0",
    }

    // Return appropriate status code
    const statusCode = envValidation.isValid ? 200 : 503

    return NextResponse.json(health, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        services: {
          apiKeys: "error",
          fileStorage: "unknown",
          analysis: "unavailable",
        },
      },
      { status: 500 }
    )
  }
}
