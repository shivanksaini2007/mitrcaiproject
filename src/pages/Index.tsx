import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const featured = products.filter(p => p.featured);
  const trending = products.filter(p => p.trending);

  return (
    <div>
      <HeroSection />

      {/* Featured */}
      <section className="container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Curated</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-2">Featured Products</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Trending */}
      <section className="container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Popular</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-2">Trending Now</h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 p-12 md:p-20 text-center"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
          <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4 relative z-10">
            Free shipping on orders over $100
          </h2>
          <p className="text-primary-foreground/60 mb-8 relative z-10 max-w-md mx-auto">
            Join thousands of happy customers who trust Maison for their everyday essentials.
          </p>
          <Link
            to="/products"
            className="relative z-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
