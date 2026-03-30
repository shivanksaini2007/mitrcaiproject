import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">No items in cart</h1>
        <Button asChild className="rounded-full px-8 font-body mt-4"><Link to="/products">Continue Shopping</Link></Button>
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
    }, 1200);
  };

  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h2 className="font-display text-lg font-semibold text-foreground">Shipping Information</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required placeholder="John Doe" className="rounded-lg bg-card" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="john@example.com" className="rounded-lg bg-card" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" required placeholder="123 Main St, New York, NY" className="rounded-lg bg-card" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <select id="payment" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground" required>
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="bg-card rounded-xl p-5 shadow-soft space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold text-foreground"><span>Total</span><span>${(totalPrice + shippingCost).toFixed(2)}</span></div>
            </div>
          </div>
          <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-full font-body mt-6">
            {submitting ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
