import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild className="rounded-full px-8 font-body">
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 bg-card rounded-xl shadow-soft"
              >
                <Link to={`/product/${item.id}`} className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm font-semibold text-foreground mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-secondary rounded-l-full transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-secondary rounded-r-full transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-soft h-fit sticky top-24">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{totalPrice >= 100 ? "Free" : "$9.99"}</span></div>
          </div>
          <div className="flex justify-between font-semibold text-foreground mb-6">
            <span>Total</span>
            <span>${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}</span>
          </div>
          <Button asChild size="lg" className="w-full rounded-full font-body">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
