import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-display text-2xl text-foreground mb-4">No items in cart</h1>
        <Button asChild className="font-body"><Link to="/products">Continue Shopping</Link></Button>
      </div>
    );
  }

  const shippingCost = totalPrice >= 100 ? 0 : 9.99;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-10 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" /> Back to cart
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl md:text-4xl text-foreground mb-10"
      >
        Checkout
      </motion.h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-3 space-y-7"
        >
          <h2 className="font-display text-xl text-foreground">Shipping Information</h2>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
            <Input id="name" required placeholder="John Doe" className="h-12 rounded-xl glass border-border/40 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
            <Input id="email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl glass border-border/40 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-xs uppercase tracking-widest text-muted-foreground">Address</Label>
            <Input id="address" required placeholder="123 Main St, New York, NY" className="h-12 rounded-xl glass border-border/40 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment" className="text-xs uppercase tracking-widest text-muted-foreground">Payment Method</Label>
            <select id="payment" className="w-full h-12 rounded-xl glass border border-border/40 px-4 text-sm text-foreground bg-transparent" required>
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <h2 className="font-display text-xl text-foreground mb-5">Order Summary</h2>
          <div className="glass rounded-2xl p-6 space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground truncate mr-3">{item.name} × {item.quantity}</span>
                <span className="text-foreground font-medium whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border/40 pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold text-foreground text-lg pt-2"><span>Total</span><span>${(totalPrice + shippingCost).toFixed(2)}</span></div>
            </div>
          </div>
          <Button type="submit" size="lg" disabled={submitting} className="w-full font-body mt-6 gap-2 text-sm">
            <Lock className="w-3.5 h-3.5" />
            {submitting ? "Processing..." : "Place Order"}
          </Button>
          <p className="text-[10px] text-muted-foreground text-center mt-3">Secure checkout · SSL encrypted</p>
        </motion.div>
      </form>
    </div>
  );
};

export default Checkout;
