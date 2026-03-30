import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-5">
            <ShoppingBag className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground text-sm mb-6">Discover great deals and fill it up!</p>
          <Button asChild size="lg" className="font-body gap-2 text-sm">
            <Link to="/products">Start Shopping <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const shippingCost = totalPrice >= 100 ? 0 : 9.99;

  return (
    <div className="container py-6 md:py-10">
      <h1 className="font-display text-2xl md:text-3xl text-foreground mb-6">Shopping Cart ({items.length})</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
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
                <Link to={`/product/${item.id}`} className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-sm font-bold text-foreground">${item.price.toFixed(2)}</p>
                    {item.originalPrice && <p className="text-xs text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-foreground whitespace-nowrap self-start">${(item.price * item.quantity).toFixed(2)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-card rounded-xl p-5 md:p-6 shadow-soft h-fit sticky top-36">
          <h2 className="font-display text-lg text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shippingCost === 0 ? <span className="text-deal font-medium">Free</span> : `$${shippingCost.toFixed(2)}`}</span></div>
          </div>
          <div className="flex justify-between font-bold text-foreground text-lg mb-5">
            <span>Total</span><span>${(totalPrice + shippingCost).toFixed(2)}</span>
          </div>
          <Button asChild size="lg" className="w-full font-body gap-2 text-sm">
            <Link to="/checkout">Proceed to Checkout <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          {totalPrice < 100 && (
            <p className="text-[11px] text-deal text-center mt-3 font-medium">
              Add ${(100 - totalPrice).toFixed(2)} more for FREE shipping
            </p>
          )}
          <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-muted-foreground">
            <Shield className="w-3 h-3" /> Secure checkout guaranteed
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
