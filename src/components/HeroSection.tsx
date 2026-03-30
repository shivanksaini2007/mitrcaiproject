import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Hot Deals This Week
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-4 text-balance">
            Shop smarter, <em className="text-primary">live better</em>.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg">
            Discover incredible deals on thousands of products. Free shipping on orders over $100.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gap-2 font-body text-sm">
              <Link to="/products">Shop All Deals <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-body text-sm">
              <Link to="/products?cat=Electronics">Electronics Sale</Link>
            </Button>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-deal" /> Free Shipping $100+</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Secure Checkout</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid grid-cols-2 gap-3"
        >
          {[
            { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", label: "Up to 30% off", sub: "Electronics" },
            { img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", label: "New arrivals", sub: "Fashion" },
            { img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", label: "Best sellers", sub: "Accessories" },
            { img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", label: "Trending now", sub: "Home" },
          ].map((item, i) => (
            <Link
              key={i}
              to={`/products?cat=${item.sub}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-secondary"
            >
              <img src={item.img} alt={item.sub} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-background text-xs font-bold">{item.label}</p>
                <p className="text-background/70 text-[10px]">{item.sub}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
