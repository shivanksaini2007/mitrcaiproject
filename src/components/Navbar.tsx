import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
          Maison
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/products" className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Search">
            <Search className="w-5 h-5 text-foreground" />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 ${
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
