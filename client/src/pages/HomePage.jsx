// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

/* ─── Mock Data ─────────────────────────────────────────── */
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Adjustable Dumbbell Set",
    brand: "PowerFlex",
    category: "Equipment",
    price: 12499,
    originalPrice: 15999,
    rating: 4.8,
    reviews: 214,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Whey Protein Isolate",
    brand: "NutriCore",
    category: "Nutrition",
    price: 3299,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 531,
    badge: "Verified",
  },
  {
    id: 3,
    name: "Resistance Band Kit",
    brand: "FlexBand",
    category: "Equipment",
    price: 1499,
    originalPrice: null,
    rating: 4.7,
    reviews: 88,
    badge: null,
  },
  {
    id: 4,
    name: "Creatine Monohydrate",
    brand: "NutriCore",
    category: "Nutrition",
    price: 1899,
    originalPrice: 2299,
    rating: 4.8,
    reviews: 312,
    badge: "Verified",
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    brand: "VitalSync",
    category: "Wearables",
    price: 7999,
    originalPrice: 9499,
    rating: 4.6,
    reviews: 167,
    badge: "New",
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    brand: "ZenFlow",
    category: "Equipment",
    price: 2199,
    originalPrice: null,
    rating: 4.7,
    reviews: 95,
    badge: null,
  },
  {
    id: 7,
    name: "Pre-Workout Formula",
    brand: "NutriCore",
    category: "Nutrition",
    price: 2599,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 78,
    badge: null,
  },
  {
    id: 8,
    name: "Pull-Up Bar",
    brand: "IronGrip",
    category: "Equipment",
    price: 3499,
    originalPrice: null,
    rating: 4.8,
    reviews: 203,
    badge: "Best Seller",
  },
];

const CATEGORIES = [
  { name: "All", value: "all" },
  { name: "Equipment", value: "Equipment" },
  { name: "Nutrition", value: "Nutrition" },
  { name: "Wearables", value: "Wearables" },
];

const PLANS = [
  {
    name: "Weight Loss",
    duration: "12 Weeks",
    desc: "Caloric-deficit nutrition + cardio-focused programming",
    tag: "MOST POPULAR",
  },
  {
    name: "Muscle Building",
    duration: "16 Weeks",
    desc: "Progressive overload training + protein-optimized meal plans",
    tag: null,
  },
  {
    name: "Mobility & Recovery",
    duration: "8 Weeks",
    desc: "Flexibility-first programming, ideal for desk workers",
    tag: null,
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const Stars = ({ rating }) => (
  <span className="text-stone-500 text-xs">{"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}</span>
);

/* ─── ProductCard ────────────────────────────────────────── */
function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-200 hover:shadow-lg transition-all duration-300">
      {/* Image placeholder */}
      <div className="relative bg-stone-100 aspect-square flex items-center justify-center overflow-hidden">
        <div className="text-5xl opacity-20 select-none group-hover:scale-110 transition-transform duration-500">
          {product.category === "Nutrition" ? "🧴" : product.category === "Wearables" ? "⌚" : "🏋️"}
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-stone-900 text-white px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 text-[10px] font-medium text-stone-600 bg-white px-2 py-1 rounded-full border border-stone-200">
            −{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-stone-900 leading-snug mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-[10px] text-stone-400">({product.reviews})</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-base font-semibold text-stone-900">{fmt(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through ml-2">{fmt(product.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-200 ${added
              ? "bg-stone-900 text-white"
              : "border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900"
              }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main HomePage ──────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) navigate("/auth");
    });
    return () => unsub();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = FEATURED_PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const firstName = user?.displayName?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-stone-50 font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        .fade-in { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .fade-in.show { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }
        .cart-slide { transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .cart-slide.open { transform: translateX(0); }
        .overlay { opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .overlay.show { opacity: 1; pointer-events: auto; }
        .search-expand { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .search-expand.open { max-height: 80px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-15 flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <span className="font-['DM_Serif_Display'] text-xl text-stone-900 shrink-0">FitMart</span>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {["Shop", "Plans", "Community"].map((l) => (
              <button key={l} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                {l}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <button
              onClick={() => { setSearchOpen((p) => !p); setSearchQuery(""); }}
              className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4 4" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-stone-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="hidden md:flex items-center gap-2 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-stone-50 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-stone-600">
                    {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-xs text-stone-700 max-w-20 truncate">
                  {user?.displayName || user?.email?.split("@")[0]}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-medium text-stone-900 truncate">{user?.displayName || "Account"}</p>
                    <p className="text-[10px] text-stone-400 truncate">{user?.email}</p>
                  </div>
                  {["My Orders", "Subscriptions", "Settings"].map((item) => (
                    <button key={item} className="w-full text-left text-xs text-stone-600 hover:bg-stone-50 px-4 py-2 transition-colors">
                      {item}
                    </button>
                  ))}
                  <div className="border-t border-stone-100 mt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-xs text-stone-500 hover:bg-stone-50 px-4 py-2 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Expand */}
        <div className={`search-expand ${searchOpen ? "open" : ""} border-t border-stone-100`}>
          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-3">
            <input
              autoFocus={searchOpen}
              type="text"
              placeholder="Search products, brands…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm text-stone-800 placeholder-stone-300 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 md:py-18">
          <div className={`fade-in d1 ${visible ? "show" : ""}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
              Welcome back, {firstName}
            </p>
            <h1 className="font-['DM_Serif_Display'] text-3xl md:text-5xl text-white leading-tight max-w-xl mb-5">
              Build something{" "}
              <em className="not-italic text-stone-400">stronger</em> today.
            </h1>
            <div className="flex flex-wrap gap-3">
              <button className="text-sm bg-white text-stone-900 px-6 py-2.5 rounded-full hover:bg-stone-100 transition-colors">
                Shop Now
              </button>
              <button
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm border border-stone-700 text-stone-300 px-6 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 space-y-16">

        {/* ── CATEGORY PILLS + PRODUCT GRID ── */}
        <section>
          <div className={`fade-in d1 ${visible ? "show" : ""} flex items-center justify-between mb-6`}>
            <h2 className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-stone-900">
              Featured Products
            </h2>
            <span className="text-xs text-stone-400">{filtered.length} items</span>
          </div>

          {/* Category Tabs */}
          <div className={`fade-in d2 ${visible ? "show" : ""} flex gap-2 flex-wrap mb-8`}>
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setActiveCategory(c.value)}
                className={`text-xs px-4 py-2 rounded-full transition-all ${activeCategory === c.value
                  ? "bg-stone-900 text-white"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className={`fade-in d3 ${visible ? "show" : ""} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5`}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400">
              <p className="text-3xl mb-2">∅</p>
              <p className="text-sm">No products match your search.</p>
            </div>
          )}
        </section>

        {/* ── DIGITAL PLANS ── */}
        <section id="plans">
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">Digital Coaching</p>
            <h2 className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-stone-900">
              Fitness plans
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 flex flex-col gap-4 ${i === 0 ? "bg-stone-900 text-white" : "bg-white border border-stone-200"
                  }`}
              >
                {plan.tag && (
                  <span className={`text-[9px] tracking-[0.2em] uppercase ${i === 0 ? "text-stone-400" : "text-stone-400"}`}>
                    {plan.tag}
                  </span>
                )}
                <div>
                  <h3 className={`font-['DM_Serif_Display'] text-xl ${i === 0 ? "text-white" : "text-stone-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-0.5 ${i === 0 ? "text-stone-400" : "text-stone-400"}`}>
                    {plan.duration}
                  </p>
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${i === 0 ? "text-stone-300" : "text-stone-500"}`}>
                  {plan.desc}
                </p>
                <button
                  className={`text-xs py-2.5 rounded-full transition-colors mt-1 ${i === 0
                    ? "bg-white text-stone-900 hover:bg-stone-100"
                    : "border border-stone-300 text-stone-700 hover:bg-stone-50"
                    }`}
                >
                  View Plan →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── FITREWARDS BANNER ── */}
        <section>
          <div className="bg-stone-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">Loyalty Program</p>
              <h3 className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-stone-900 mb-2">
                Earn FitRewards
              </h3>
              <p className="text-sm text-stone-500 max-w-md leading-relaxed">
                Points for every purchase, and every fitness milestone. Redeem against equipment, supplements, or coaching.
              </p>
            </div>
            <button className="shrink-0 bg-stone-900 text-white text-sm px-7 py-3 rounded-full hover:bg-stone-700 transition-colors self-start md:self-auto">
              Learn More
            </button>
          </div>
        </section>

        {/* ── SUBSCRIPTION UPSELL ── */}
        <section className="pb-8">
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">Membership</p>
            <h2 className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-stone-900">
              Upgrade your experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                tier: "Pro",
                price: "₹499/mo",
                desc: "Personalized nutrition plans + 5% flat discount on everything in the store.",
                cta: "Upgrade to Pro",
              },
              {
                tier: "Elite",
                price: "₹1,499/mo",
                desc: "1-on-1 coaching, early access to limited equipment drops, and biometric sync.",
                cta: "Upgrade to Elite",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-2xl p-7 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div>
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="font-['DM_Serif_Display'] text-2xl text-stone-900">{p.tier}</span>
                    <span className="text-sm text-stone-400">{p.price}</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{p.desc}</p>
                </div>
                <button className="shrink-0 text-xs border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all self-start">
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-['DM_Serif_Display'] text-lg text-stone-900">FitMart</span>
          <p className="text-xs text-stone-400">© 2026 FitMart. Built at VESIT, Mumbai.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Support"].map((l) => (
              <button key={l} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      <div className={`overlay fixed inset-0 bg-black/30 z-50 ${cartOpen ? "show" : ""}`} onClick={() => setCartOpen(false)} />

      <aside className={`cart-slide fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col ${cartOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="font-['DM_Serif_Display'] text-lg text-stone-900">
            Cart {cartCount > 0 && <span className="text-stone-400 text-base">({cartCount})</span>}
          </h2>
          <button onClick={() => setCartOpen(false)} className="text-stone-400 hover:text-stone-700 transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 gap-3">
              <span className="text-4xl">🛒</span>
              <p className="text-sm">Your cart is empty.</p>
              <button
                onClick={() => setCartOpen(false)}
                className="text-xs text-stone-500 underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start py-4 border-b border-stone-100 last:border-0">
                  <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {item.category === "Nutrition" ? "🧴" : item.category === "Wearables" ? "⌚" : "🏋️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-400">{item.brand}</p>
                    <p className="text-sm font-medium text-stone-900 leading-snug">{item.name}</p>
                    <p className="text-sm text-stone-700 mt-1">{fmt(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-stone-500 text-xs transition-colors">
                      Remove
                    </button>
                    <div className="flex items-center gap-2 border border-stone-200 rounded-full px-2 py-0.5">
                      <button onClick={() => updateQty(item.id, -1)} className="text-stone-500 hover:text-stone-900 w-4 text-sm">−</button>
                      <span className="text-xs text-stone-800 min-w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-stone-500 hover:text-stone-900 w-4 text-sm">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">{fmt(cartTotal)}</span>
            </div>
            <p className="text-[10px] text-stone-400">Shipping calculated at checkout</p>
            <button className="w-full bg-stone-900 text-white text-sm py-3.5 rounded-full hover:bg-stone-700 transition-colors">
              Checkout →
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}