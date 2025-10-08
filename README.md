# Earthlixir Tea E-commerce Website

## Project Description
Comprehensive e-commerce website for Earthlixir tea sales targeting both local (Cameroon) and international customers, with an integrated customer feedback management system and admin panel.

## Primary Objectives
- Create a professional online presence for a tea business
- Enable secure online sales with credit card processing and Mobile Money
- Implement a customer feedback and review system (with guest reviews support)
- Support international shipping and multi-currency transactions
- Provide comprehensive admin tools for business management

## Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State Management:** React Hooks
- **HTTP Client:** Axios
- **Hosting:** Vercel

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Language:** TypeScript/Node.js
- **API Documentation:** Swagger
- **Hosting:** Railway/Render/Vercel

### Third-Party Integrations
- **Payment Processing:** Stripe (ready for integration)
- **Email Service:** Mailgun or SendGrid
- **Analytics:** Google Analytics

## Project Structure

```
tea-app/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/      # App router pages
│   │   └── components/ # React components
│   ├── public/       # Static assets
│   └── vercel.json   # Frontend Vercel configuration
│
├── backend/          # NestJS backend API
│   ├── src/
│   │   ├── modules/  # Feature modules
│   │   ├── entities/ # TypeORM entities
│   │   └── main.ts   # Application entry point
│   ├── public/       # Backend static files
│   └── vercel.json   # Backend Vercel configuration
│
└── README.md         # This file
```

## Features

### User Features
- Browse tea products with detailed descriptions
- View health benefits and brewing instructions
- Guest and authenticated user reviews
- Responsive mobile-first design
- Contact form
- FAQ section
- About us page

### Admin Panel Features
- **Products Management:** Full CRUD operations for products
- **Reviews Management:** View, approve, and delete reviews
- **Orders Management:** View orders and update status
- **Users Management:** View users and toggle admin privileges
- **FAQs Management:** Add, edit, and delete FAQs
- **Categories Management:** Manage product categories
- Secure admin authentication with JWT

## Deployment

### Frontend Deployment (Vercel)

1. **Connect your GitHub repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

2. **Configure the project:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

3. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   ```

4. Deploy!

### Backend Deployment (Vercel)

1. **Create a separate Vercel project for the backend:**
   - Import the same repository
   
2. **Configure the project:**
   - **Root Directory:** `backend`
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Set Environment Variables:**
   ```
   DATABASE_HOST=your-postgres-host
   DATABASE_PORT=5432
   DATABASE_USER=your-db-user
   DATABASE_PASSWORD=your-db-password
   DATABASE_NAME=your-db-name
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   ```

4. Deploy!

### Alternative Backend Deployment (Railway/Render)

**Railway:**
1. Go to [railway.app](https://railway.app)
2. Create a new project from GitHub repo
3. Select the `backend` directory
4. Add environment variables
5. Deploy

**Render:**
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your repo and select `backend` as root directory
4. Add environment variables
5. Deploy

## Local Development

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USER=your_user
# DATABASE_PASSWORD=your_password
# DATABASE_NAME=tea_app
# JWT_SECRET=your_secret_key
# JWT_EXPIRES_IN=7d

npm run start:dev
# API will run on http://localhost:3000
# Swagger docs at http://localhost:3000/api-docs
```

### Create Admin User

```bash
cd backend
npm run create:admin
# Follow the prompts to create an admin user
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file with:
# NEXT_PUBLIC_BACKEND_URL=http://localhost:3000

npm run dev
# App will run on http://localhost:3001
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000  # Backend API URL
```

### Backend (.env)
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=tea_app
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## API Documentation

Once the backend is running, visit:
- Local: `http://localhost:3000/api-docs`
- Production: `https://your-backend-url.com/api-docs`

## Admin Access

1. Navigate to `/admin/login`
2. Use the credentials created with `npm run create:admin`
3. Access the admin dashboard at `/admin`

## License

Private - All rights reserved

## Contact

For questions or support, visit the contact page or email: info@earthlixir.com
