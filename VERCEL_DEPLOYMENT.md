# Vercel Deployment Guide for PRATYAKSH AI

This guide will help you deploy the PRATYAKSH AI deepfake detection application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Gemini AI API Keys**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pratyaksh-ai&env=GEMINI_API_KEY,GEMINI_API_KEY_1,GEMINI_API_KEY_2,GEMINI_API_KEY_3&envDescription=Gemini%20AI%20API%20keys%20for%20deepfake%20detection%20analysis&envLink=https://makersuite.google.com/app/apikey)

**This button will:**
- Clone your repository to Vercel
- Automatically prompt for required environment variables
- Set up the deployment configuration
- Deploy your app in one click

## Manual Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Choose "Next.js" as the framework preset

### 2. Configure Environment Variables

In your Vercel project settings, add these environment variables:

```bash
# Required: At least one Gemini API key
GEMINI_API_KEY=your_primary_api_key_here

# Optional: Additional keys for better rate limiting
GEMINI_API_KEY_1=your_first_api_key_here
GEMINI_API_KEY_2=your_second_api_key_here
GEMINI_API_KEY_3=your_third_api_key_here

# Environment
NODE_ENV=production
```

### 3. Deploy

1. Click "Deploy" - Vercel will automatically build and deploy your app
2. Your app will be available at `https://your-project-name.vercel.app`

## Configuration Details

### Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `next build` (automatic)
- **Output Directory**: `.next` (automatic)
- **Install Command**: `pnpm install` (automatic)

### Function Configuration

- Upload API: 30s timeout
- Analysis API: 60s timeout  
- Progress API: 10s timeout

### File Size Limits

- Images: 10MB max
- Videos: 50MB max  
- Audio: 25MB max

## Post-Deployment

### 1. Test the Application

Visit your deployed URL and test:
- File upload functionality
- AI analysis features
- Admin panel access (password: `pratyaksh2024`)

### 2. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 3. Monitor Performance

- Check Vercel Analytics for usage
- Monitor function execution times
- Review error logs in Vercel dashboard

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Primary Gemini AI API key |
| `GEMINI_API_KEY_1` | No | Additional API key for rate limiting |
| `GEMINI_API_KEY_2` | No | Additional API key for rate limiting |
| `GEMINI_API_KEY_3` | No | Additional API key for rate limiting |
| `NODE_ENV` | Auto | Set to `production` automatically |

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **API Errors**: Verify Gemini API keys are valid and have quota
3. **File Upload Issues**: Ensure file sizes are within limits
4. **Analysis Timeouts**: Large files may need processing time

### Logs and Debugging

- View real-time logs in Vercel dashboard
- Check function execution details
- Monitor error rates and performance

## Features Available in Production

✅ **File Upload**: Images, videos, audio files  
✅ **AI Analysis**: Deepfake detection using Gemini AI  
✅ **Real-time Progress**: WebSocket-based progress tracking  
✅ **Admin Panel**: Key management and system monitoring  
✅ **PDF Reports**: Downloadable analysis reports  
✅ **Responsive UI**: Works on desktop and mobile  

## Security Notes

- API keys are securely stored as environment variables
- File uploads are automatically cleaned up after processing
- Admin access is password-protected
- CORS headers are configured for security

## Support

For deployment issues:
1. Check Vercel documentation
2. Review function logs in dashboard
3. Ensure all environment variables are set correctly

## Next Steps

After successful deployment:
- Set up monitoring and alerts
- Configure analytics tracking
- Consider setting up a custom domain
- Review and optimize API key usage
