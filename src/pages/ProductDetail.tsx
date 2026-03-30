import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}x ${product.name} added to cart`);
  };

  return (
    <div className="container py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </Link>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-square rounded-xl overflow-hidden bg-secondary"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          {product.trending && (
            <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Trending
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-foreground mb-6">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 hover:bg-secondary rounded-l-full transition-colors"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-2 hover:bg-secondary rounded-r-full transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <Button onClick={handleAdd} size="lg" className="rounded-full px-10 gap-2 font-body w-full md:w-auto">
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </Button>

          <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground space-y-1">
            <p>Category: <span className="text-foreground">{product.category}</span></p>
            <p>Free shipping on orders over $100</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
