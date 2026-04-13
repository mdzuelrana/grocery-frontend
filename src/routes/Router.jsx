import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import ActivateAccount from "../pages/ActivateAccount";
import ProtectedRoute from "../components/ProtectedRoute";
import EditProduct from "../components/EditProduct";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import CustomerDashboard from "../pages/dashboard/CustomerDashboard";
import Footer from "../components/Footer";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCustomers from "../pages/admin/AdminCustomers";
import AdminReviews from "../pages/admin/AdminReviews";

import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerProducts from "../pages/seller/SellerProducts";
import AddProduct from "../pages/seller/AddProduct";
import SellerOrders from "../pages/seller/SellerOrders";
import SellerEditProduct from "../pages/seller/SellerEditProduct";

import CustomerHome from "../pages/customer/Home";
import CustomerProducts from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Orders from "../pages/customer/Orders";
import OrderDetails from "../pages/customer/OrderDetails";
import CustomerProfile from "../pages/customer/Profile";
import Wishlist from "../pages/customer/Wishlist";
import CustomerCart from "../pages/customer/Cart";
import CustomerCheckout from "../pages/customer/Checkout";
import PaymentHistory from "../pages/customer/PaymentHistory";
import PaymentSuccess from "../pages/customer/PaymentSuccess";

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── PUBLIC ROUTES ── */}
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<Footer />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart"     element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />

        {/* ✅ PaymentSuccess moved outside ProtectedRoute —
            SSLCommerz does a full browser redirect which clears
            React state, so ProtectedRoute would block it */}
        <Route
          path="/customer-dashboard/payment-success"
          element={<PaymentSuccess />}
        />

        {/* ── PROTECTED PROFILE ── */}
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        {/* ── ADMIN PANEL ── */}
        <Route
          path="/admin"
          element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}
        >
          <Route index         element={<AdminDashboard />} />
          <Route path="profile"   element={<CustomerProfile />} />
          <Route path="products"  element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="reviews"   element={<AdminReviews />} />
        </Route>

        {/* ── SELLER DASHBOARD ── */}
        <Route
          path="/seller/dashboard"
          element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>}
        />
        <Route path="/seller/profile"           element={<CustomerProfile />} />
        <Route path="/seller/products"          element={<SellerProducts />} />
        <Route path="/seller/products/add"      element={<AddProduct />} />
        <Route path="/seller/products/edit/:id" element={<SellerEditProduct />} />
        <Route path="/seller/orders"            element={<SellerOrders />} />

        {/* ── CUSTOMER DASHBOARD ── */}
        <Route
          path="/customer-dashboard"
          element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>}
        >
          <Route index            element={<CustomerHome />} />
          <Route path="products"  element={<CustomerProducts />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart"      element={<CustomerCart />} />
          <Route path="checkout"  element={<CustomerCheckout />} />
          <Route path="orders"    element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="wishlist"  element={<Wishlist />} />
          <Route path="payments"  element={<PaymentHistory />} />
          <Route path="profile"   element={<CustomerProfile />} />
          {/* ✅ payment-success removed from here */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Router;