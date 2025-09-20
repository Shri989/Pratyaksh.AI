# Vercel Deployment Checklist for PRATYAKSH AI

Use this checklist to ensure your deployment is properly configured to ask for environment variables.

## ✅ Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is public or accessible to Vercel
- [ ] All files are committed and pushed

### 2. Environment Configuration Files
- [ ] `vercel.json` exists with env variable definitions
- [ ] `vercel-env.json` exists (optional but recommended)
- [ ] `.env.example` documents all required variables
- [ ] `.gitignore` excludes sensitive environment files

### 3. API Key Requirements
- [ ] At least 1 Gemini API key obtained from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Multiple API keys for production reliability (recommended)
- [ ] API keys have sufficient quota/credits

### 4. Application Configuration
- [ ] `next.config.mjs` optimized for Vercel
- [ ] Package.json has correct build scripts
- [ ] Environment validation implemented
- [ ] Health check endpoint configured

## 🚀 Deployment Methods

### Method 1: One-Click Deploy Button (Recommended)

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL&env=GEMINI_API_KEY,GEMINI_API_KEY_1,GEMINI_API_KEY_2,GEMINI_API_KEY_3&envDescription=Gemini%20AI%20API%20keys%20for%20deepfake%20detection&envLink=https://makersuite.google.com/app/apikey)
```

**What this does:**
- ✅ Automatically prompts for environment variables
- ✅ Pre-fills variable names and descriptions
- ✅ Provides link to get API keys
- ✅ Sets up project configuration

### Method 2: Manual Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Vercel will detect `vercel.json` and prompt for variables
5. Fill in the required API keys
6. Deploy

### Method 3: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy with environment prompts
vercel --env-file=.env.example
```

## 🔧 Environment Variables Required

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Primary Gemini AI API key |
| `GEMINI_API_KEY_1` | ⚠️ Recommended | First backup key for reliability |
| `GEMINI_API_KEY_2` | 🔄 Optional | Second backup key |
| `GEMINI_API_KEY_3` | 🔄 Optional | Third backup key |

## 🧪 Testing Your Deployment Configuration

### Test Environment Validation
```bash
# Check deployment readiness
npm run check-deployment

# Generate deploy URL
npm run generate-deploy-url
```

### Test Health Endpoint
After deployment, visit: `https://your-app.vercel.app/api/health`

Expected response for properly configured environment:
```json
{
  "status": "healthy",
  "environment": {
    "envValidation": {
      "isValid": true,
      "keyCount": 1
    }
  },
  "services": {
    "apiKeys": "operational",
    "analysis": "operational"
  }
}
```

## 🚨 Troubleshooting

### Problem: Environment variables not prompted during deployment

**Solutions:**
1. Check `vercel.json` has `env` array defined
2. Ensure repository is properly connected
3. Try manual environment variable setup in dashboard
4. Use the one-click deploy button URL

### Problem: "Missing API keys" error after deployment

**Solutions:**
1. Check Vercel dashboard → Project → Settings → Environment Variables
2. Ensure variables are added for Production environment
3. Redeploy after adding variables
4. Check health endpoint for validation status

### Problem: Build fails with TypeScript errors

**Solutions:**
1. Run `npm run type-check` locally first
2. Fix any TypeScript errors
3. Ensure all dependencies are in package.json
4. Check Next.js configuration

## 📊 Post-Deployment Verification

### 1. Basic Functionality
- [ ] App loads at deployment URL
- [ ] File upload works
- [ ] Analysis completes successfully
- [ ] Results display properly

### 2. Environment Check
- [ ] Health endpoint returns "healthy" status
- [ ] API keys are properly loaded
- [ ] No environment validation errors in logs

### 3. Performance
- [ ] Page load times are acceptable
- [ ] File uploads complete within timeout limits
- [ ] Analysis doesn't exceed function timeout

## 🎯 Success Criteria

Your deployment is successful when:

✅ **Environment Variables**: All required API keys are prompted for and configured  
✅ **Health Check**: `/api/health` returns healthy status  
✅ **Functionality**: Core features (upload, analysis, results) work properly  
✅ **Error Handling**: Graceful handling of missing or invalid API keys  
✅ **Performance**: Functions execute within Vercel timeout limits  

## 🔗 Useful Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/environment-variables)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Google AI Studio (Get API Keys)](https://makersuite.google.com/app/apikey)
- [Vercel Function Limits](https://vercel.com/docs/functions/serverless-functions/runtimes#limits)

---

**Need Help?** Check the [main deployment guide](./VERCEL_DEPLOYMENT.md) or create an issue in the repository.
