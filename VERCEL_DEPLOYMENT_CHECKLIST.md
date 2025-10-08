# Vercel Deployment Checklist ✅

## ✅ Completed Fixes

### 1. **Image Loading Issue - FIXED**
- ✅ Copied all product images from `backend/public/images/` to `frontend/public/`
- ✅ Updated all components to handle both local and external image URLs
- ✅ Removed dependency on backend for serving images
- ✅ Images now work in serverless environment

### 2. **Project Structure - READY**
- ✅ Created `frontend/vercel.json` for frontend deployment
- ✅ Created `backend/vercel.json` for backend deployment
- ✅ Removed root `vercel.json` that was causing 404 errors
- ✅ Cleaned up documentation files (kept README.md only)

### 3. **Code Fixes - COMPLETE**
- ✅ Fixed TypeScript errors (error variable usage)
- ✅ Removed unused backendUrl variables
- ✅ All linting warnings addressed
- ✅ Build tested and successful

---

## 🚀 Deployment Steps

### Frontend Deployment

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"

2. **Configure Frontend Project**
   ```
   Project Name: earthlixir-frontend (or your choice)
   Root Directory: frontend
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**
   Add this in Vercel dashboard:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.vercel.app
   ```
   (Leave this empty for now, update after backend is deployed)

4. **Deploy** 🚀

### Backend Deployment

1. **Create New Vercel Project**
   - Go to Vercel dashboard again
   - Import the SAME repository

2. **Configure Backend Project**
   ```
   Project Name: earthlixir-backend (or your choice)
   Root Directory: backend
   Framework Preset: Other
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   DATABASE_HOST=your-postgres-host
   DATABASE_PORT=5432
   DATABASE_USER=your-db-user
   DATABASE_PASSWORD=your-db-password
   DATABASE_NAME=your-db-name
   JWT_SECRET=your-super-secret-key
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   ```

4. **Deploy** 🚀

5. **Copy Backend URL**
   - After deployment, copy the backend URL (e.g., `https://earthlixir-backend.vercel.app`)

6. **Update Frontend Environment Variable**
   - Go to frontend project settings
   - Update `NEXT_PUBLIC_BACKEND_URL` with the backend URL
   - Redeploy frontend

---

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Easiest)
1. Go to your backend project in Vercel
2. Click "Storage" tab
3. Create new Postgres database
4. Environment variables are auto-populated

### Option 2: External Database (Railway, Supabase, etc.)
1. Create a PostgreSQL database on your preferred platform
2. Get connection details
3. Add to Vercel environment variables

### Update Image Paths in Database

After database is set up, run this SQL:

```sql
UPDATE product 
SET "imageUrl" = REPLACE("imageUrl", '/images/', '/')
WHERE "imageUrl" LIKE '/images/%';
```

Or use the provided script: `update-image-paths.sql`

---

## ✅ Post-Deployment Verification

### Frontend Checks
- [ ] Homepage loads correctly
- [ ] Product images display
- [ ] Product detail pages work
- [ ] Reviews load properly
- [ ] Admin login page accessible
- [ ] Contact form visible

### Backend Checks
- [ ] API responds at `/api` routes
- [ ] Products API works: `/api/products`
- [ ] Reviews API works: `/api/reviews`
- [ ] Auth works: `/api/auth/login`
- [ ] Swagger docs accessible: `/api-docs`

### Integration Checks
- [ ] Frontend can fetch products from backend
- [ ] Product images load on all pages
- [ ] Reviews can be submitted
- [ ] Admin can login
- [ ] Admin panel functions work

---

## 🔧 Troubleshooting

### Issue: Frontend can't connect to backend
**Solution:** Check that `NEXT_PUBLIC_BACKEND_URL` is set correctly and backend is deployed

### Issue: Images still don't load
**Solution:** 
1. Check database image paths (should be `/product.jpg`, not `/images/product.jpg`)
2. Verify images exist in `frontend/public/`
3. Check browser console for 404 errors

### Issue: Database connection fails
**Solution:**
1. Verify all DATABASE_* environment variables are correct
2. Check database is accessible from Vercel
3. Ensure SSL is enabled if required by your database provider

### Issue: CORS errors
**Solution:** Backend already has CORS enabled in `main.ts`. If issues persist, add specific origin:
```typescript
app.enableCors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true,
});
```

---

## 📝 Important Files

- `frontend/vercel.json` - Frontend Vercel configuration
- `backend/vercel.json` - Backend Vercel configuration
- `update-image-paths.sql` - Database migration for image paths
- `IMAGE_FIX_GUIDE.md` - Detailed image fix documentation
- `README.md` - Complete project documentation

---

## 🎉 Success Indicators

When everything is working correctly:

1. ✅ Frontend URL opens and shows homepage
2. ✅ Products display with images
3. ✅ Clicking products opens detail pages
4. ✅ Reviews can be viewed and submitted
5. ✅ Admin can login at `/admin/login`
6. ✅ Admin panel shows all management features
7. ✅ No console errors in browser
8. ✅ API responds to all requests

---

## 💡 Next Steps (Optional)

1. **Custom Domain**
   - Add your custom domain in Vercel project settings
   - Update environment variables with new domain

2. **Image CDN (Cloudinary)**
   - Sign up for Cloudinary
   - Upload product images
   - Update database with Cloudinary URLs
   - Better performance and features

3. **Email Service**
   - Configure SendGrid or Mailgun
   - Add environment variables for email service
   - Test contact form submissions

4. **Analytics**
   - Add Google Analytics
   - Configure in frontend

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for frontend errors
3. Check Vercel function logs for backend errors
4. Review this checklist for missed steps

Good luck with your deployment! 🚀

