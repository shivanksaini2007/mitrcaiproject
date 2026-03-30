import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-elevated" : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-[72px]">
        <Link to="/" className="font-display text-2xl italic tracking-tight text-foreground hover:text-primary transition-colors duration-300">
          Maison
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`relative text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:text-primary ${
                location.pathname === l.path ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {l.label}
              {location.pathname === l.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/products"
            className="p-2.5 rounded-full hover:bg-secondary/80 transition-all duration-300"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] text-foreground" />
          </Link>
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-secondary/80 transition-all duration-300"
            aria-label="Cart"
          >
            <ShoppingBag className="w-[18px] h-[18px] text-foreground" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            className="md:hidden p-2.5 rounded-full hover:bg-secondary/80 transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-border/50 glass"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium tracking-wide py-1 transition-colors ${
                    location.pathname === l.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
