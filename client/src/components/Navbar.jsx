// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  links = [],
  brand = "FitMart",
  variant = "landing", // 'landing' | 'home'
  navOpaque = true,
  onSearchToggle,
  searchOpen = false,
  cartCount = 0,
  onCartOpen,
  user,
  menuOpen = false,
  setMenuOpen,
  onSignOut,
  onNavClick, // New prop for handling navigation clicks
}) {
  const navigate = useNavigate();

  const basePos = variant === "landing" ? "fixed top-0 left-0 right-0 z-50" : "sticky top-0 z-40";
  const bgClass = variant === "landing" ? (navOpaque ? "bg-white/95 backdrop-blur-sm border-b border-stone-200" : "bg-transparent") : "bg-white border-b border-stone-200";

  // Handle link click
  const handleLinkClick = (link) => {
    if (onNavClick) {
      onNavClick(link);
    } else {
      // Fallback for home variant or when onNavClick isn't provided
      if (typeof link === 'object' && link.section) {
        // If it's an object with section, try to scroll to that section
        const element = document.getElementById(link.section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    if (setMenuOpen) setMenuOpen(false);
  };

  return (
    <nav className={`w-full ${basePos} transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        <span
          className="font-['DM_Serif_Display'] text-xl text-stone-900 tracking-tight cursor-pointer"
          onClick={() => (variant === "landing" ? window.scrollTo({ top: 0, behavior: "smooth" }) : navigate("/home"))}
        >
          {brand}
        </span>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => handleLinkClick(link)}
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              {typeof link === 'object' ? link.name : link}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {variant === "landing" && !user && (
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => navigate("/auth")} className="text-sm text-stone-600 hover:text-stone-900 transition-colors px-4 py-2">
                Sign In
              </button>
              <button onClick={() => navigate("/auth")} className="text-sm bg-stone-900 text-white px-5 py-2 rounded-full hover:bg-stone-700 transition-colors">
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle for landing */}
          {variant === "landing" && setMenuOpen && (
            <button className="md:hidden text-stone-700" onClick={() => setMenuOpen((p) => !p)} aria-label="Menu">
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-px bg-stone-900 transition-all ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
                <span className={`block h-px bg-stone-900 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px bg-stone-900 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          )}

          {onSearchToggle && (
            <button onClick={onSearchToggle} className="p-2 text-stone-500 hover:text-stone-900 transition-colors" aria-label="Search">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>
            </button>
          )}

          {onCartOpen && (
            <button onClick={onCartOpen} className="relative p-2 text-stone-500 hover:text-stone-900 transition-colors" aria-label="Cart">
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
          )}

          {/* User / Auth (show only when authenticated) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen && setMenuOpen((p) => !p)}
                className="hidden md:flex items-center gap-2 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-stone-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "avatar"}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-stone-600">{user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-stone-700 max-w-20 truncate">{user?.displayName || user?.email?.split("@")[0]}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-medium text-stone-900 truncate">{user?.displayName || "Account"}</p>
                    <p className="text-[10px] text-stone-400 truncate">{user?.email}</p>
                  </div>
                  {[
                    "My Orders",
                    "Subscriptions",
                    "Settings",
                  ].map((item) => (
                    <button key={item} className="w-full text-left text-xs text-stone-600 hover:bg-stone-50 px-4 py-2 transition-colors">
                      {item}
                    </button>
                  ))}
                  <div className="border-t border-stone-100 mt-1">
                    <button onClick={onSignOut} className="w-full text-left text-xs text-stone-500 hover:bg-stone-50 px-4 py-2 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {variant === "landing" && menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => handleLinkClick(link)}
              className="text-sm text-stone-700 text-left py-1"
            >
              {typeof link === 'object' ? link.name : link}
            </button>
          ))}
          <hr className="border-stone-100" />
          <button onClick={() => navigate("/auth")} className="text-sm bg-stone-900 text-white px-5 py-2.5 rounded-full w-full">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}