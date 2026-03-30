import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Minus, Plus, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}× ${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container py-6 md:py-10">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
      </Link>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-square rounded-2xl overflow-hidden bg-secondary relative"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded ${
              product.badge.includes("Deal") ? "bg-deal text-deal-foreground" : "bg-primary text-primary-foreground"
            }`}>
              {product.badge}
            </span>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col">
          <p className="text-[11px] uppercase tracking-widest text-primary font-medium mb-2">{product.category}</p>
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-3">{product.name}</h1>
          <StarRating rating={product.rating} reviews={product.reviews} />

          <div className="flex items-baseline gap-3 mt-4 mb-6">
            <span className="text-2xl md:text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-sm font-bold text-deal bg-deal/10 px-2 py-0.5 rounded">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2.5 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-2.5 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAdd} size="lg" className="flex-1 gap-2 font-body text-sm">
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2"><Check className="w-4 h-4" /> Added!</motion.span>
                ) : (
                  <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> Add to Cart</motion.span>
                )}
              </AnimatePresence>
            </Button>
            <Button onClick={handleAdd} variant="outline" size="lg" className="font-body text-sm">
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Over $100" },
              { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle free" },
              { icon: Shield, label: "Secure Payment", sub: "SSL Encrypted" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center">
                <Icon className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-[11px] font-medium text-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="h-px bg-border mb-10" />
          <h2 className="font-display text-2xl text-foreground mb-6">Customers also viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
