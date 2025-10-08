# Admin Panel - Complete Setup Guide

## ✅ What Has Been Created

I've successfully created a comprehensive admin panel with full CRUD operations for all entities. Here's what's been implemented:

### 📋 Admin Pages

#### 1. **Products Management** (`/admin/products`)
- **List View**: Display all products with image, name, flavor, price, and stock
- **Create**: Add new products with all fields (name, flavor, descriptions, health benefits, brewing instructions, price, stock, image upload)
- **Edit**: Update existing products
- **Delete**: Remove products from the database
- **Features**:
  - Image upload support
  - Multi-line inputs for health benefits and brewing instructions
  - Optional price and stock fields
  - Full validation

#### 2. **Reviews Management** (`/admin/reviews`)
- **List View**: Display all reviews with product name, reviewer info, rating, comment, country, and date
- **Delete**: Remove inappropriate or spam reviews
- **Features**:
  - Shows both authenticated user and guest reviewer information
  - Star rating visualization
  - Direct links to products
  - Country information

#### 3. **Users Management** (`/admin/users`)
- **List View**: Display all registered users
- **Toggle Admin**: Promote users to admin or demote admins to regular users
- **Delete**: Remove user accounts
- **Features**:
  - Visual badges for admin vs. customer roles
  - Email and name display
  - Join date information

#### 4. **Orders Management** (`/admin/orders`)
- **List View**: Display all orders with customer info, total, status, and date
- **Update Status**: Change order status (pending, processing, shipped, delivered, cancelled)
- **Expandable Details**: View order items and shipping address
- **Delete**: Remove orders
- **Features**:
  - Color-coded status badges
  - Dropdown for quick status updates
  - Order items breakdown
  - Customer contact information

#### 5. **FAQs Management** (`/admin/faqs`)
- **List View**: Display all FAQs with order numbers
- **Create**: Add new FAQs with question, answer, and display order
- **Edit**: Update existing FAQs
- **Delete**: Remove FAQs
- **Features**:
  - Modal-based create/edit interface
  - Display order management for controlling FAQ sequence
  - No authentication required for viewing FAQs on the public page

#### 6. **Categories Management** (`/admin/categories`)
- **List View**: Display categories in a grid layout
- **Create**: Add new product categories
- **Edit**: Update existing categories
- **Delete**: Remove categories
- **Features**:
  - Modal-based create/edit interface
  - Name and description fields
  - Grid card layout for better visual organization

⚠️ **NOTE**: The Categories page is ready on the frontend, but the backend Categories module needs to be created. The Category entity was previously removed from the backend.

---

## 🎨 Design Features

All admin pages include:
- ✅ Consistent layout with sidebar navigation and header
- ✅ Loading states with spinners
- ✅ Error handling with retry buttons
- ✅ Responsive design (mobile-friendly)
- ✅ Modern Tailwind CSS styling
- ✅ JWT token-based authentication
- ✅ Admin role verification
- ✅ Confirmation dialogs for destructive actions
- ✅ Success/error alerts

---

## 🔐 Authentication & Security

All admin pages implement:
- JWT token verification from `localStorage`
- Token decoding to check `isAdmin` status
- Automatic redirect to `/admin/login` if not authenticated or not admin
- Token expiration checking
- Protected API calls with Bearer token authorization

---

## 🚀 How to Access the Admin Panel

1. **Login as Admin**:
   - Navigate to `/admin/login`
   - Enter admin credentials:
     - Email: `admin@earthlixir.com`
     - Password: `Admin@123`

2. **Navigation**:
   - Use the sidebar to navigate between different management pages
   - Dashboard: Overview (you can enhance this with analytics)
   - Products: Manage tea products
   - Categories: Manage product categories
   - Orders: View and manage customer orders
   - Reviews: Moderate customer reviews
   - Users: Manage user accounts and admin privileges
   - FAQs: Manage frequently asked questions

---

## 📝 Backend Requirements

### ✅ Already Working:
- Products API (`/api/products`)
- Reviews API (`/api/reviews`)
- Orders API (`/api/orders`)
- Users API (`/api/users`)
- FAQs API (`/api/faqs`)
- Authentication API (`/api/auth/login`, `/api/auth/register`)

### ⚠️ Needs to be Created:
- **Categories API** (`/api/categories`)
  - GET `/api/categories` - List all categories
  - POST `/api/categories` - Create category (admin only)
  - PATCH `/api/categories/:id` - Update category (admin only)
  - DELETE `/api/categories/:id` - Delete category (admin only)
  
  The Category entity and module were previously removed from the backend. You'll need to recreate:
  - `backend/src/entities/category.entity.ts`
  - `backend/src/modules/categories/categories.module.ts`
  - `backend/src/modules/categories/categories.controller.ts`
  - `backend/src/modules/categories/categories.service.ts`
  - DTOs for category operations

### 📸 Image Upload Endpoint:
The product form includes image upload functionality. Ensure this endpoint exists:
- `POST /api/products/upload-image` - Upload product image (admin only)
- Should accept `multipart/form-data`
- Should return `{ url: string }` with the image path

---

## 🛠️ API Endpoints Expected

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PATCH /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/upload-image` - Upload image (admin only)

### Reviews
- `GET /api/reviews` - Get all reviews
- `DELETE /api/reviews/:id` - Delete review (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `PATCH /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `PATCH /api/orders/:id` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

### FAQs
- `GET /api/faqs` - Get all FAQs (public)
- `POST /api/faqs` - Create FAQ (admin only)
- `PATCH /api/faqs/:id` - Update FAQ (admin only)
- `DELETE /api/faqs/:id` - Delete FAQ (admin only)

### Categories (Needs to be created)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PATCH /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

---

## 💡 Next Steps

1. **Test the Admin Panel**:
   - Login at `/admin/login`
   - Test each CRUD operation
   - Verify authentication and authorization

2. **Create Categories Backend** (if needed):
   - Create Category entity
   - Create Categories module with controller and service
   - Add to `app.module.ts`
   - Implement all CRUD endpoints

3. **Enhance Dashboard** (optional):
   - Add analytics (total products, orders, users, revenue)
   - Add charts for sales trends
   - Add recent orders/reviews widgets

4. **Add More Features** (optional):
   - Bulk operations (delete multiple products)
   - Export data to CSV
   - Advanced filtering and search
   - Product inventory alerts
   - Email notifications for new orders

---

## 🎯 File Structure

```
frontend/src/app/admin/
├── page.tsx                    # Admin dashboard (main)
├── login/
│   └── page.tsx               # Admin login
├── products/
│   ├── page.tsx               # Products list
│   ├── new/
│   │   └── page.tsx           # Create product
│   └── edit/
│       └── [id]/
│           └── page.tsx       # Edit product
├── reviews/
│   └── page.tsx               # Reviews management
├── users/
│   └── page.tsx               # Users management
├── orders/
│   └── page.tsx               # Orders management
├── faqs/
│   └── page.tsx               # FAQs management
└── categories/
    └── page.tsx               # Categories management

frontend/src/components/Admin/
├── AdminHeader.tsx            # Admin header component
├── Sidebar.tsx                # Admin sidebar navigation
├── DashboardContent.tsx       # Dashboard content
└── admin/
    └── AdminProductForm.tsx   # Product create/edit form
```

---

## 🐛 Troubleshooting

### "Failed to fetch X"
- Check if the backend is running on `http://localhost:3000`
- Verify the API endpoint exists
- Check if `NEXT_PUBLIC_BACKEND_URL` is set in `.env.local`

### "You do not have admin privileges"
- Ensure the user's `isAdmin` field is set to `true` in the database
- Check the JWT token includes `isAdmin: true`

### "Unauthorized" or "403 Forbidden"
- Verify the JWT token is valid and not expired
- Check if admin guards are properly configured in the backend

### Categories page shows error
- The backend Categories module needs to be created
- This is expected until you implement the Categories API

---

## 📚 Additional Resources

- **Authentication**: JWT-based with `localStorage`
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: Next.js App Router
- **State Management**: React useState/useEffect

---

**All admin pages are now ready to use!** 🎉

Test them thoroughly and let me know if you need any adjustments or additional features.

