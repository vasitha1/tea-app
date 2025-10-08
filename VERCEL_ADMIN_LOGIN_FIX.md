# Fix: Admin Login 404 on Vercel Production

## Problem
- Admin login page works locally ✅
- Returns 404 in Vercel production ❌
- Other pages work fine

## Root Cause
Vercel is not properly configured for the monorepo structure. When deploying from a repo with both `frontend/` and `backend/` folders, Vercel needs explicit configuration.

## Solution: Update Vercel Project Settings

### Option 1: Via Vercel Dashboard (Recommended) ⭐

1. **Go to your Vercel project settings:**
   - Visit: https://vercel.com/dashboard
   - Select your project
   - Go to **Settings** → **General**

2. **Configure Root Directory:**
   - Find **Root Directory** section
   - Click **Edit**
   - Enter: `frontend`
   - Click **Save**

3. **Configure Build Settings:**
   - Find **Build & Development Settings**
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** `.next` (or leave default)
   - **Install Command:** `npm install` (or leave default)

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click the three dots (...) on the latest deployment
   - Click **Redeploy**

### Option 2: Update vercel.json ✅

Update `/home/vasitha/tea-app/frontend/vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "devCommand": "cd frontend && npm run dev",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs",
  "outputDirectory": "frontend/.next",
  "cleanUrls": true,
  "trailingSlash": false
}
```

Or even simpler (if deploying from frontend folder):

```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "cleanUrls": true
}
```

### Option 3: Deploy from Frontend Folder Directly

If you want to keep frontend and backend separate:

1. **Connect Frontend as Separate Project:**
   - Create new Vercel project
   - Import from Git
   - Select your repository
   - Set **Root Directory** to `frontend`
   - Deploy

2. **Connect Backend Separately:**
   - Deploy backend to Railway/Render/Heroku
   - Or create another Vercel project with root as `backend`

## Important: Environment Variables

Make sure these are set in Vercel:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** Your production backend URL (e.g., `https://your-backend.railway.app`)
   - **Environment:** Production, Preview, Development

## Verify the Fix

After redeploying, check these URLs:

✅ `https://your-domain.vercel.app/` (homepage)
✅ `https://your-domain.vercel.app/admin/login` (should work!)
✅ `https://your-domain.vercel.app/admin` (admin dashboard)

## Why This Happens

**Vercel's behavior with monorepos:**
- If root directory is not set, Vercel tries to build from repo root
- It can't find `package.json` or the Next.js app structure
- Routes may not be generated correctly
- Static assets may not be copied

**With correct root directory:**
- Vercel enters the `frontend/` folder first
- Finds `package.json` and `next.config.js`
- Builds Next.js app correctly ✅
- All routes are generated ✅
- Static assets are copied ✅

## Quick Test

After making changes, test these commands locally to ensure they work:

```bash
# Test from repo root
cd /home/vasitha/tea-app
cd frontend && npm run build
# Should succeed ✅

# Test the build output
ls frontend/.next/server/app/admin/login.html
# File should exist ✅
```

## Common Issues & Solutions

### Issue: Still getting 404
**Solution:** Clear Vercel cache and redeploy
- In Vercel dashboard: Settings → Functions → Clear Cache
- Redeploy the project

### Issue: Environment variables not working
**Solution:** 
- Check they're set for the correct environment (Production)
- Redeploy after adding/changing variables

### Issue: Images not loading
**Solution:** 
- Ensure images are in `frontend/public/`
- Use paths relative to public (e.g., `/logogreen.png` not `/frontend/public/logogreen.png`)

## Summary

1. ✅ **Set Root Directory to `frontend` in Vercel settings**
2. ✅ **Add environment variables** (`NEXT_PUBLIC_BACKEND_URL`)
3. ✅ **Redeploy the project**
4. ✅ **Test `/admin/login` URL**

The admin login page will work after these changes! 🚀

