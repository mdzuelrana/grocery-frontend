# Frontend README.md

```md
# 🛒 Grocery E-Commerce Frontend


Professional full-stack grocery e-commerce frontend built with React, Vite, TailwindCSS, DaisyUI, JWT authentication, role-based dashboards, and SSLCommerz payment integration.

---

# 🚀 Features


## Authentication
- JWT Login System
- Protected Routes
- Role-Based Dashboard Access
- Persistent Authentication

---


# 👥 Dashboards

## Admin Dashboard
- Product Management
- Customer Management
- Review Management
- Order Monitoring

## Seller Dashboard
- Seller Products
- Add/Edit/Delete Products
- Seller Orders
- Order Status Update

## Customer Dashboard
- Browse Products
- Product Details
- Cart System
- Wishlist
- Checkout
- SSLCommerz Payment
- Order History
- Payment History
- User Profile

---


# 🛠️ Tech Stack

- React
- Vite
- TailwindCSS
- DaisyUI
- Axios
- React Router DOM

---


# 📁 Folder Structure

```bash
src/
│
├── api/
├── components/
├── layouts/
├── pages/
│   ├── admin/
│   ├── seller/
│   ├── customer/
│   └── auth/
│
├── router/
├── App.jsx
└── main.jsx


⚙️ Environment Variables

Create .env file:

VITE_API_URL=https:***

🧪 Installation

Clone Repository
git clone <repo_url>
cd frontend
Install Dependencies
npm install

▶️ Run Development Server

npm run dev
🏗️ Build Production
npm run build

🔐 Authentication Flow

Login
   ↓
JWT Token
   ↓
Stored in localStorage
   ↓
Protected Routes

💳 Payment Flow

Checkout
   ↓
Create Order
   ↓
SSLCommerz Gateway
   ↓
Payment Validation
   ↓
Payment Success Page

📦 Main Features

Customer
Add to Cart
Wishlist
Place Order
Payment History
Responsive Dashboard
Seller
Product CRUD
Order Management
Admin
Manage Entire Platform

🌐 Deployment

Frontend Deployment
Vercel

🎨 UI

Fully Responsive
Modern E-Commerce Design
Mobile Friendly
Dashboard Layout

👨‍💻 Author

Developed by Md Zuel Rana

📄 License

This project is licensed under the MIT License.
