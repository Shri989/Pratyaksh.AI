/**
 * Environment Variable Validation for PRATYAKSH AI
 * Ensures required API ke// Auto-validate on import in production (but not during build)
if (typeof window === 'undefined' && 
    (process.env.NODE_ENV === 'production' || process.env.VERCEL) && 
    process.env.NEXT_PHASE !== 'phase-production-build') {
  // Server-side validation in production runtime only
  setTimeout(() => logEnvironmentStatus(), 0)
}e available at runtime
 */

export interface EnvValidationResult {
  isValid: boolean
  missingVars: string[]
  warnings: string[]
  keyCount: number
}

export function validateEnvironment(): EnvValidationResult {
  const missingVars: string[] = []
  const warnings: string[] = []
  
  // Check for primary API key
  if (!process.env.GEMINI_API_KEY) {
    missingVars.push('GEMINI_API_KEY')
  }
  
  // Count available backup keys
  const backupKeys = [
    'GEMINI_API_KEY_1',
    'GEMINI_API_KEY_2', 
    'GEMINI_API_KEY_3'
  ].filter(key => process.env[key])
  
  const totalKeys = (process.env.GEMINI_API_KEY ? 1 : 0) + backupKeys.length
  
  // Warnings for better reliability
  if (totalKeys === 1) {
    warnings.push('Consider adding backup API keys (GEMINI_API_KEY_1, etc.) for better rate limiting and reliability')
  }
  
  if (totalKeys === 0) {
    missingVars.push('At least one GEMINI_API_KEY is required')
  }
  
  // Check for production environment
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
  
  if (isProduction && totalKeys < 2) {
    warnings.push('Production deployments should have multiple API keys for reliability')
  }
  
  return {
    isValid: missingVars.length === 0,
    missingVars,
    warnings,
    keyCount: totalKeys
  }
}

export function logEnvironmentStatus(): void {
  const validation = validateEnvironment()
  
  if (validation.isValid) {
    console.log(`✅ Environment validation passed (${validation.keyCount} API keys configured)`)
    
    if (validation.warnings.length > 0) {
      console.log('⚠️  Recommendations:')
      validation.warnings.forEach(warning => {
        console.log(`   • ${warning}`)
      })
    }
  } else {
    console.error('❌ Environment validation failed!')
    console.error('Missing required environment variables:')
    validation.missingVars.forEach(varName => {
      console.error(`   • ${varName}`)
    })
    
    console.error('\n📋 To fix this:')
    console.error('1. Get API keys from: https://makersuite.google.com/app/apikey')
    console.error('2. Add them to your Vercel environment variables')
    console.error('3. Redeploy your application')
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required environment variables for production deployment')
    }
  }
}

// Auto-validate on import in production
if (typeof window === 'undefined' && (process.env.NODE_ENV === 'production' || process.env.VERCEL)) {
  // Server-side validation in production
  setTimeout(() => logEnvironmentStatus(), 0)
}
