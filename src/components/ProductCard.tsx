import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.trending && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Trending
            </span>
          )}
          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-soft"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
        <h3 className="font-body text-sm font-medium text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-foreground">${product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
