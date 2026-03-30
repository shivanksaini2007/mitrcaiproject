import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.trending && (
            <span className="absolute top-4 left-4 glass text-foreground text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              Trending
            </span>
          )}

          {/* Add to cart floating button */}
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-4 right-4 w-11 h-11 rounded-full glass-strong flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-[16px] h-[16px]" />
          </motion.button>
        </div>

        <div className="px-0.5">
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">{product.category}</p>
          <h3 className="font-display text-lg text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-foreground mt-1.5 tracking-wide">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
