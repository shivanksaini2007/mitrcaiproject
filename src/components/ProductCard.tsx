import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import StarRating from "@/components/StarRating";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link to={`/product/${product.id}`} className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                product.badge === "Deal" || product.badge === "Limited Deal"
                  ? "bg-deal text-deal-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-bold bg-accent text-accent-foreground px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>
          {/* Quick add */}
          <button
            onClick={handleAdd}
            className="absolute bottom-2 right-2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 active:scale-95 shadow-elevated"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 md:p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
