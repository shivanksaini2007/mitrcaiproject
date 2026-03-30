import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-20 h-20 mx-auto rounded-full glass flex items-center justify-center mb-6">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground font-light mb-8">Looks like you haven't added anything yet.</p>
          <Button asChild size="lg" className="font-body gap-2 text-sm">
            <Link to="/products">Start Shopping <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const shippingCost = totalPrice >= 100 ? 0 : 9.99;

  return (
    <div className="container py-12 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl md:text-4xl text-foreground mb-10"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="flex gap-5 p-5 glass rounded-2xl"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-display text-base text-foreground hover:text-primary transition-colors duration-300 line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm font-semibold text-foreground mt-1 tracking-wide">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center glass rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary/50 rounded-l-full transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary/50 rounded-r-full transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground whitespace-nowrap self-center">${(item.price * item.quantity).toFixed(2)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-7 h-fit sticky top-24"
        >
          <h2 className="font-display text-xl text-foreground mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm border-b border-border/50 pb-5 mb-5">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
          </div>
          <div className="flex justify-between font-semibold text-foreground text-lg mb-7">
            <span>Total</span>
            <span>${(totalPrice + shippingCost).toFixed(2)}</span>
          </div>
          <Button asChild size="lg" className="w-full font-body gap-2 text-sm">
            <Link to="/checkout">Proceed to Checkout <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          {totalPrice < 100 && (
            <p className="text-[11px] text-muted-foreground text-center mt-4">
              Add ${(100 - totalPrice).toFixed(2)} more for free shipping
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
