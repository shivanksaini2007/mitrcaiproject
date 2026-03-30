import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-elevated" : ""}`}>
      {/* Top bar */}
      <div className="bg-foreground text-background">
        <div className="container flex items-center justify-between h-12 md:h-14 gap-3">
          <Link to="/" className="font-display text-xl md:text-2xl italic tracking-tight flex-shrink-0">
            Maison
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="flex w-full rounded-lg overflow-hidden">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, brands, and more..."
                className="flex-1 px-4 py-2 text-sm text-foreground bg-background border-0 outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="px-4 bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-1 md:gap-3">
            {/* User */}
            <div className="relative" ref={userRef}>
              {user ? (
                <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-1 p-2 rounded-lg hover:bg-background/10 transition-colors text-sm">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline text-xs truncate max-w-[100px]">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 hidden md:inline" />
                </button>
              ) : (
                <Link to="/auth" className="flex items-center gap-1 p-2 rounded-lg hover:bg-background/10 transition-colors text-sm">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Sign In</span>
                </Link>
              )}
              <AnimatePresence>
                {userMenu && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    className="absolute right-0 top-full mt-1 w-48 bg-card rounded-xl shadow-premium border border-border overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-card-foreground truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { signOut(); setUserMenu(false); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center gap-1 p-2 rounded-lg hover:bg-background/10 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="hidden md:inline text-xs">Cart</span>
            </Link>

            {/* Mobile menu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-background/10 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="bg-card border-b border-border hidden md:block">
        <div className="container">
          <nav className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
            {categories.filter(c => c !== "All").map(cat => (
              <Link
                key={cat}
                to={`/products?cat=${cat}`}
                className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  location.search.includes(cat) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile search + nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="container py-3 space-y-3">
              <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden border border-border">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-3 py-2.5 text-sm bg-background outline-none"
                />
                <button type="submit" className="px-3 bg-accent text-accent-foreground">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {categories.filter(c => c !== "All").map(cat => (
                  <Link
                    key={cat}
                    to={`/products?cat=${cat}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
