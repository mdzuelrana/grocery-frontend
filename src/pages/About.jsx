import { Link } from "react-router-dom";

const team = [
  {
    name: "Md Zuel Rana",
    role: "Founder & CEO",
    bio: "Passionate about making fresh groceries accessible to everyone in Bangladesh.",
    avatar: "ZR",
    color: "bg-primary",
  },
  {
    name: "Sarah Ahmed",
    role: "Head of Operations",
    bio: "Ensures every order is delivered fresh and on time across all regions.",
    avatar: "SA",
    color: "bg-secondary",
  },
  {
    name: "Karim Hassan",
    role: "Lead Developer",
    bio: "Built the platform from the ground up with a focus on speed and reliability.",
    avatar: "KH",
    color: "bg-accent",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+",    label: "Products Available" },
  { value: "50+",     label: "Local Sellers" },
  { value: "24/7",    label: "Customer Support" },
];

const values = [
  {
    icon: "🌿",
    title: "Fresh & Quality",
    desc: "We source directly from local farms and trusted suppliers to ensure the freshest products reach your door.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Same-day and next-day delivery available across Dhaka, Sylhet, and major cities in Bangladesh.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    desc: "We work directly with farmers and sellers to cut out middlemen and offer you the best prices.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Powered by SSLCommerz — Bangladesh's most trusted payment gateway for safe transactions.",
  },
  {
    icon: "♻️",
    title: "Eco Friendly",
    desc: "We use biodegradable packaging and support sustainable farming practices across our supply chain.",
  },
  {
    icon: "🤝",
    title: "Supporting Local",
    desc: "Every purchase supports local farmers and small businesses across Bangladesh.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-base-100">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-primary to-green-700 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest opacity-75 mb-3">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Fresh Groceries Delivered <br className="hidden sm:block" />
            to Your Doorstep
          </h1>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            Bismillah Grocery is Bangladesh's trusted online grocery store —
            connecting local farmers and sellers with families who deserve
            fresh, affordable food every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn btn-white text-primary font-bold px-8">
              Shop Now
            </Link>
            <Link to="/register" className="btn btn-outline btn-white px-8">
              Join Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-base-200 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label} className="bg-base-100 rounded-2xl py-8 shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-gray-500 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-3">
              Our Story
            </p>
            <h2 className="text-3xl font-bold mb-5 leading-snug">
              Started with a Simple Mission
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Bismillah Grocery was founded in 2024 with one goal — make fresh,
              quality groceries accessible to every household in Bangladesh,
              regardless of where they live.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              We noticed that people in cities were struggling to find fresh
              produce at fair prices. So we built a platform that connects
              local farmers directly with customers, eliminating the middlemen
              and ensuring fair prices for both sides.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Today we serve thousands of families across Bangladesh and
              continue to grow — one fresh delivery at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <p className="text-4xl mb-3">🌾</p>
              <p className="font-semibold text-sm">Farm Fresh</p>
              <p className="text-xs text-gray-400 mt-1">Directly sourced</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 text-center mt-6">
              <p className="text-4xl mb-3">🏙️</p>
              <p className="font-semibold text-sm">City Delivery</p>
              <p className="text-xs text-gray-400 mt-1">Same day available</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-6 text-center">
              <p className="text-4xl mb-3">💳</p>
              <p className="font-semibold text-sm">Easy Payment</p>
              <p className="text-xs text-gray-400 mt-1">SSLCommerz secured</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center mt-6">
              <p className="text-4xl mb-3">📦</p>
              <p className="font-semibold text-sm">Safe Packaging</p>
              <p className="text-xs text-gray-400 mt-1">Eco friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="bg-base-200 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div
                key={v.title}
                className="bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="text-4xl mb-4">{v.icon}</p>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">
              The People Behind It
            </p>
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map(member => (
              <div
                key={member.name}
                className="text-center bg-base-100 rounded-2xl shadow-sm p-8 hover:shadow-md transition"
              >
                <div className={`w-20 h-20 rounded-full ${member.color} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-primary to-green-700 text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Order Fresh Groceries?
          </h2>
          <p className="opacity-90 mb-8">
            Join thousands of happy customers across Bangladesh.
            Fresh products, great prices, fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn btn-white text-primary font-bold px-8">
              Browse Products
            </Link>
            <Link to="/register" className="btn btn-outline btn-white px-8">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-base-200 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-500">
          <div>
            <p className="font-bold text-base-content text-lg mb-3">🛒 Bismillah Grocery</p>
            <p>Fresh groceries delivered to your door across Bangladesh.</p>
          </div>
          <div>
            <p className="font-bold text-base-content mb-3">Quick Links</p>
            <ul className="space-y-2">
              <li><Link to="/"         className="hover:text-primary">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary">Products</Link></li>
              <li><Link to="/login"    className="hover:text-primary">Login</Link></li>
              <li><Link to="/register" className="hover:text-primary">Register</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-base-content mb-3">Contact</p>
            <ul className="space-y-2">
              <li>📧 mdzuel.2021@gmail.com</li>
              <li>📍 Sylhet, Bangladesh</li>
              <li>📞 01566034837</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-8">
          © 2024 Bismillah Grocery. All rights reserved.
        </div>
      </footer>

    </div>
  );
}