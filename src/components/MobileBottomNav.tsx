import { Home, Search, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const items = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Shop", path: "/products" },
    { icon: ShoppingBag, label: "Cart", path: "/cart", badge: totalItems },
    { icon: User, label: user ? "Account" : "Sign In", path: user ? "/" : "/auth" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {items.map(({ icon: Icon, label, path, badge }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path + label}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {badge ? (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-accent text-accent-foreground text-[9px] font-bold">
                    {badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
