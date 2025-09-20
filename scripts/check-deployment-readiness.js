#!/usr/bin/env node

/**
 * Pre-deployment verification script for PRATYAKSH AI
 * Checks if the project is ready for Vercel deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const CHECK_MARK = '✅'
const X_MARK = '❌'
const WARNING = '⚠️'

console.log('🚀 PRATYAKSH AI - Vercel Deployment Readiness Check\n')

const checks = []

// Check 1: package.json exists and has required scripts
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  
  if (packageJson.scripts && packageJson.scripts.build && packageJson.scripts.start) {
    checks.push({ name: 'package.json scripts', status: 'pass', message: 'Build and start scripts found' })
  } else {
    checks.push({ name: 'package.json scripts', status: 'fail', message: 'Missing build or start scripts' })
  }
  
  if (packageJson.engines && packageJson.engines.node) {
    checks.push({ name: 'Node.js version specified', status: 'pass', message: `Node ${packageJson.engines.node}` })
  } else {
    checks.push({ name: 'Node.js version specified', status: 'warn', message: 'Consider specifying Node.js version in engines' })
  }
  
} catch (error) {
  checks.push({ name: 'package.json', status: 'fail', message: 'package.json not found or invalid' })
}

// Check 2: Next.js config
if (fs.existsSync('next.config.mjs')) {
  checks.push({ name: 'Next.js config', status: 'pass', message: 'next.config.mjs found' })
} else if (fs.existsSync('next.config.js')) {
  checks.push({ name: 'Next.js config', status: 'pass', message: 'next.config.js found' })
} else {
  checks.push({ name: 'Next.js config', status: 'warn', message: 'No Next.js config file found' })
}

// Check 3: Vercel config
if (fs.existsSync('vercel.json')) {
  checks.push({ name: 'Vercel config', status: 'pass', message: 'vercel.json configured' })
} else {
  checks.push({ name: 'Vercel config', status: 'warn', message: 'No vercel.json (will use defaults)' })
}

// Check 4: Environment variables documentation
if (fs.existsSync('.env.example')) {
  checks.push({ name: 'Environment docs', status: 'pass', message: '.env.example provided' })
} else {
  checks.push({ name: 'Environment docs', status: 'warn', message: 'No .env.example found' })
}

// Check 5: .gitignore
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8')
  if (gitignore.includes('.env') && gitignore.includes('node_modules')) {
    checks.push({ name: 'Gitignore', status: 'pass', message: 'Environment and dependencies ignored' })
  } else {
    checks.push({ name: 'Gitignore', status: 'warn', message: 'May be missing important ignores' })
  }
} else {
  checks.push({ name: 'Gitignore', status: 'fail', message: '.gitignore not found' })
}

// Check 6: App directory structure
const requiredPaths = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/api',
]

let structureOk = true
for (const requiredPath of requiredPaths) {
  if (!fs.existsSync(requiredPath)) {
    structureOk = false
    break
  }
}

if (structureOk) {
  checks.push({ name: 'App structure', status: 'pass', message: 'Next.js App Router structure found' })
} else {
  checks.push({ name: 'App structure', status: 'fail', message: 'Missing required Next.js App Router files' })
}

// Check 7: API routes
const apiRoutes = [
  'app/api/upload/route.ts',
  'app/api/analyze/route.ts',
  'app/api/health/route.ts',
]

let apiCount = 0
for (const route of apiRoutes) {
  if (fs.existsSync(route)) {
    apiCount++
  }
}

if (apiCount === apiRoutes.length) {
  checks.push({ name: 'API routes', status: 'pass', message: 'All core API routes found' })
} else if (apiCount > 0) {
  checks.push({ name: 'API routes', status: 'warn', message: `${apiCount}/${apiRoutes.length} API routes found` })
} else {
  checks.push({ name: 'API routes', status: 'fail', message: 'No API routes found' })
}

// Check 8: Try building the project
try {
  console.log('🔨 Testing build process...')
  execSync('npm run build', { stdio: 'pipe' })
  checks.push({ name: 'Build test', status: 'pass', message: 'Project builds successfully' })
} catch (error) {
  checks.push({ name: 'Build test', status: 'fail', message: 'Build failed - check for errors' })
}

// Display results
console.log('\n📊 Deployment Readiness Report:\n')

let passCount = 0
let warnCount = 0
let failCount = 0

for (const check of checks) {
  let icon = CHECK_MARK
  if (check.status === 'warn') {
    icon = WARNING
    warnCount++
  } else if (check.status === 'fail') {
    icon = X_MARK
    failCount++
  } else {
    passCount++
  }
  
  console.log(`${icon} ${check.name}: ${check.message}`)
}

console.log(`\n📈 Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed\n`)

// Deployment recommendations
if (failCount === 0) {
  console.log('🎉 Your project is ready for Vercel deployment!')
  console.log('\n📋 Next steps:')
  console.log('1. Push your code to GitHub/GitLab/Bitbucket')
  console.log('2. Connect repository to Vercel')
  console.log('3. Add environment variables (see .env.example)')
  console.log('4. Deploy!')
  console.log('\n📖 See VERCEL_DEPLOYMENT.md for detailed instructions.')
} else {
  console.log('🔧 Please fix the failed checks before deploying.')
  
  if (failCount > 0) {
    console.log('\n⚡ Critical issues to resolve:')
    for (const check of checks) {
      if (check.status === 'fail') {
        console.log(`   • ${check.name}: ${check.message}`)
      }
    }
  }
}

if (warnCount > 0) {
  console.log('\n💡 Recommendations to improve deployment:')
  for (const check of checks) {
    if (check.status === 'warn') {
      console.log(`   • ${check.name}: ${check.message}`)
    }
  }
}

console.log('\n🔗 Useful links:')
console.log('   • Vercel deployment: https://vercel.com/docs/deployments')
console.log('   • Next.js deployment: https://nextjs.org/docs/deployment')
console.log('   • Environment variables: https://vercel.com/docs/environment-variables')

process.exit(failCount > 0 ? 1 : 0)
