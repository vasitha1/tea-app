# Deployment Guide for Earthlixir Tea App

## 📋 Overview

Your project has both **frontend** (Next.js) and **backend** (NestJS) in the same repository. You have two deployment options:

---

## 🎯 **Option 1: Separate Deployments (RECOMMENDED)**

This is the cleanest and most straightforward approach.

### **Step 1: Deploy Backend**

#### **Recommended Platforms:**
- **Railway** (Easy, good for Node.js + PostgreSQL)
- **Render** (Free tier available)
- **Heroku** (Paid)
- **DigitalOcean App Platform**

#### **Railway Deployment (Recommended):**

1. **Sign up at [Railway.app](https://railway.app)**

2. **Create New Project** → **Deploy from GitHub**

3. **Configure Backend:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Port: `3000`

4. **Add PostgreSQL Database:**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway will auto-configure `DATABASE_URL`

5. **Set Environment Variables:**
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRATION=3600
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@earthlixir.com
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

6. **Deploy!** Railway will automatically deploy your backend

7. **Get Backend URL:** Copy the deployed URL (e.g., `https://your-app.railway.app`)

---

### **Step 2: Deploy Frontend on Vercel**

1. **Go to [Vercel.com](https://vercel.com) and sign in**

2. **Import your GitHub repository**

3. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend` ⚠️ **IMPORTANT**
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Environment Variables (CRITICAL):**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.railway.app
   ```
   ⚠️ Replace with your actual Railway backend URL

5. **Deploy!**

6. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `earthlixir.com`)

---

## 🔧 **Option 2: Monorepo on Vercel (Advanced)**

If you want both in one Vercel project:

### **Configure vercel.json:**

I've created a `vercel.json` file in your root directory with this configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

### **Deploy Frontend:**
1. Push to GitHub
2. Import to Vercel
3. Vercel will automatically detect the monorepo structure
4. Set `NEXT_PUBLIC_BACKEND_URL` environment variable

### **Deploy Backend Separately:**
- Backend **cannot** run on Vercel (NestJS needs a persistent server)
- Deploy backend to Railway/Render/Heroku as described above

---

## 🎯 **My Recommendation: Option 1**

**Deploy them separately because:**
- ✅ Easier to manage
- ✅ Better performance (optimized for each platform)
- ✅ Backend needs persistent connection for database
- ✅ Easier debugging and scaling
- ✅ Vercel is optimized for Next.js (frontend)
- ✅ Railway/Render is optimized for Node.js backends

---

## 📝 **Complete Deployment Checklist**

### **Before Deployment:**

#### **Backend:**
- [ ] Set all environment variables
- [ ] Test database connection
- [ ] Ensure all API endpoints work
- [ ] Update CORS settings for production
- [ ] Build succeeds locally: `npm run build`

#### **Frontend:**
- [ ] Update `NEXT_PUBLIC_BACKEND_URL` in environment
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Check all images are loading
- [ ] Verify all API calls use environment variable

---

## 🚀 **Step-by-Step Deployment Process**

### **1. Deploy Backend First (Railway)**

```bash
# In your terminal
cd backend
npm run build  # Test build locally
```

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Select your repository
4. Set root directory to `backend`
5. Add PostgreSQL database
6. Set environment variables
7. Deploy
8. **Copy the deployment URL** (e.g., `https://earthlixir-backend.railway.app`)

### **2. Deploy Frontend (Vercel)**

```bash
# In your terminal
cd frontend
npm run build  # Test build locally
```

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. **IMPORTANT:** Set Root Directory to `frontend`
4. Add environment variable:
   - Name: `NEXT_PUBLIC_BACKEND_URL`
   - Value: `https://earthlixir-backend.railway.app` (your Railway URL)
5. Deploy

---

## 🔐 **Environment Variables Reference**

### **Backend (.env on Railway):**
```env
NODE_ENV=production
DATABASE_URL=postgresql://... (auto-configured by Railway)
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRATION=3600
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@earthlixir.com
FRONTEND_URL=https://earthlixir.vercel.app
```

### **Frontend (.env.local on Vercel):**
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
```

---

## 🧪 **Testing After Deployment**

1. **Test Backend:**
   ```bash
   curl https://your-backend.railway.app/api
   ```
   Should return: `{ "message": "Welcome to Earthlixir API" }`

2. **Test Frontend:**
   - Visit your Vercel URL
   - Check products load
   - Check images display
   - Test admin login
   - Test creating a review

3. **Test Integration:**
   - Open browser console
   - Check for CORS errors
   - Verify API calls go to correct backend URL

---

## 🐛 **Common Issues & Solutions**

### **Issue: Images Not Loading**
- **Solution:** Update `next.config.js`:
  ```javascript
  images: {
    domains: ['localhost', 'your-backend.railway.app'],
  }
  ```

### **Issue: CORS Errors**
- **Solution:** Update backend `main.ts`:
  ```typescript
  app.enableCors({
    origin: ['https://your-frontend.vercel.app', 'http://localhost:3001'],
    credentials: true,
  });
  ```

### **Issue: Environment Variables Not Working**
- **Solution:** 
  - Redeploy after adding env vars
  - Ensure `NEXT_PUBLIC_` prefix for frontend vars
  - Check spelling of variable names

### **Issue: Database Connection Failed**
- **Solution:**
  - Check Railway PostgreSQL is running
  - Verify `DATABASE_URL` is set correctly
  - Ensure backend can connect to database

---

## 📊 **Deployment URLs Structure**

After deployment, you'll have:

```
Frontend:  https://earthlixir.vercel.app
Backend:   https://earthlixir-backend.railway.app
Admin:     https://earthlixir.vercel.app/admin/login
API:       https://earthlixir-backend.railway.app/api
API Docs:  https://earthlixir-backend.railway.app/api-docs
```

---

## 💰 **Cost Estimate**

### **Free Tier:**
- **Vercel:** Free for personal projects
- **Railway:** $5 credit/month (then ~$5-10/month)
- **Total:** ~$5-10/month

### **Paid Option:**
- **Vercel Pro:** $20/month (if needed)
- **Railway:** $5-20/month (depending on usage)
- **Total:** ~$25-40/month

---

## 🎉 **Next Steps After Deployment**

1. [ ] Test all features on production
2. [ ] Set up custom domain
3. [ ] Configure SSL (auto on Vercel/Railway)
4. [ ] Set up monitoring (Vercel Analytics)
5. [ ] Configure error tracking (Sentry)
6. [ ] Set up database backups
7. [ ] Create admin user in production database
8. [ ] Test payment integration (if applicable)

---

## 📞 **Support**

If you encounter any issues:
1. Check deployment logs on Vercel/Railway
2. Verify environment variables
3. Test backend API directly
4. Check browser console for errors

---

## 🔗 **Useful Links**

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NestJS Deployment](https://docs.nestjs.com/faq/serverless)

---

**Good luck with your deployment! 🚀**

