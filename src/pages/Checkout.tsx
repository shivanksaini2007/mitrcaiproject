import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Shield, Truck } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl text-foreground mb-4">No items to checkout</h1>
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
      toast.success("Order placed! Thank you for shopping with Maison.");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container py-6 md:py-10 max-w-4xl">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to cart
      </Link>

      <h1 className="font-display text-2xl md:text-3xl text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-3 space-y-6">
          <div className="bg-card rounded-xl p-5 shadow-soft space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1 space-y-1.5">
                <Label className="text-xs text-muted-foreground">Full Name</Label>
                <Input required placeholder="John Doe" className="h-10 rounded-lg bg-background text-sm" />
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input type="email" required placeholder="john@example.com" className="h-10 rounded-lg bg-background text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Address</Label>
              <Input required placeholder="123 Main St, New York, NY" className="h-10 rounded-lg bg-background text-sm" />
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Payment Method</h2>
            <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground" required>
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2">
          <div className="bg-card rounded-xl p-5 shadow-soft sticky top-36">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Order Summary</h2>
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 mt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>{shippingCost === 0 ? <span className="text-deal font-medium">Free</span> : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-foreground text-lg pt-1"><span>Total</span><span>${(totalPrice + shippingCost).toFixed(2)}</span></div>
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="w-full font-body mt-5 gap-2 text-sm">
              <Lock className="w-3.5 h-3.5" /> {submitting ? "Processing..." : "Place Order"}
            </Button>
            <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>
              <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Fast Delivery</span>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default Checkout;
