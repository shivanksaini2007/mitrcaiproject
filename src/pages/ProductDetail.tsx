import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <p className="text-muted-foreground font-light">Product not found.</p>
        <Link to="/products" className="text-primary underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}× ${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container py-10 md:py-16">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-10 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="aspect-[3/4] rounded-3xl overflow-hidden bg-secondary"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium mb-3">{product.category}</p>
          {product.trending && (
            <span className="inline-flex self-start items-center gap-1.5 glass text-foreground text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Trending
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">{product.name}</h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-8 tracking-wide">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed mb-10 font-light max-w-md">{product.description}</p>

          <div className="flex items-center gap-5 mb-8">
            <div className="flex items-center glass rounded-full">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 hover:bg-secondary/50 rounded-l-full transition-colors duration-300"><Minus className="w-4 h-4" /></button>
              <span className="w-12 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-3 hover:bg-secondary/50 rounded-r-full transition-colors duration-300"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <Button onClick={handleAdd} size="lg" className="gap-2.5 font-body w-full md:w-auto text-sm tracking-wide">
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Added!
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <div className="mt-10 pt-8 border-t border-border/60 text-sm text-muted-foreground space-y-2 font-light">
            <p>Free shipping on orders over $100</p>
            <p>30-day return policy</p>
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-10">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
