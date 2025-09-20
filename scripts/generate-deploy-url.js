#!/usr/bin/env node

/**
 * Generate Vercel deployment URL with environment variable prompts
 * This creates the perfect one-click deploy experience
 */

const packageJson = require('../package.json')

const baseUrl = 'https://vercel.com/new/clone'
const repoUrl = 'https://github.com/yourusername/pratyaksh-ai' // Update with actual repo

// Required environment variables (only the essential one for initial deployment)
const requiredEnvVars = [
  'GEMINI_API_KEY'
]

// Optional environment variables (can be added later in Vercel dashboard)
const optionalEnvVars = [
  'GEMINI_API_KEY_1', 
  'GEMINI_API_KEY_2',
  'GEMINI_API_KEY_3'
]

// Build the deployment URL with only required env vars
const params = new URLSearchParams({
  'repository-url': repoUrl,
  'env': requiredEnvVars.join(','),
  'envDescription': 'Primary Gemini AI API key for deepfake detection analysis. Additional backup keys can be added later in Vercel dashboard.',
  'envLink': 'https://makersuite.google.com/app/apikey',
  'project-name': 'pratyaksh-ai',
  'framework': 'nextjs'
})

const deployUrl = `${baseUrl}?${params.toString()}`

console.log('🚀 PRATYAKSH AI - One-Click Vercel Deploy URL Generator\n')
console.log('📋 This URL will prompt for the following environment variable:')
requiredEnvVars.forEach((envVar, index) => {
  console.log(`   ${index + 1}. ${envVar} (Required)`)
})

console.log('\n💡 Optional variables (add these in Vercel dashboard after deployment):')
optionalEnvVars.forEach((envVar, index) => {
  console.log(`   ${index + 1}. ${envVar} (For better reliability)`)
})

console.log('\n🔗 One-Click Deploy URL:')
console.log(deployUrl)

console.log('\n📖 What this URL does:')
console.log('   • Clones your repository to Vercel')
console.log('   • Automatically detects Next.js framework')
console.log('   • Prompts for all required environment variables')
console.log('   • Sets up deployment configuration')
console.log('   • Deploys your app immediately after setup')

console.log('\n💡 Usage:')
console.log('   1. Update the repository URL in this script')
console.log('   2. Share this URL for one-click deployments')
console.log('   3. Users will be prompted for API keys during setup')

// Generate markdown badge
const badgeMarkdown = `[![Deploy with Vercel](https://vercel.com/button)](${deployUrl})`

console.log('\n📄 Markdown for README:')
console.log(badgeMarkdown)

// Generate HTML button  
const htmlButton = `<a href="${deployUrl}"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>`

console.log('\n🌐 HTML version:')
console.log(htmlButton)

console.log('\n✅ Ready for deployment! Users will be guided through the entire setup process.')
