import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const deals = products.filter(p => p.originalPrice);
  const featured = products.filter(p => p.featured);
  const trending = products.filter(p => p.trending);

  return (
    <div>
      <HeroSection />

      {/* Deals strip */}
      <section className="bg-accent/5 border-y border-border">
        <div className="container py-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <span className="flex items-center gap-1.5 text-xs font-bold text-accent whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" /> Today's Deals
          </span>
          <div className="h-4 w-px bg-border" />
          {deals.slice(0, 4).map(d => (
            <Link key={d.id} to={`/product/${d.id}`} className="flex items-center gap-2 bg-card rounded-lg px-3 py-1.5 shadow-soft hover:shadow-elevated transition-all whitespace-nowrap flex-shrink-0">
              <img src={d.image} alt={d.name} className="w-8 h-8 rounded object-cover" />
              <div>
                <p className="text-xs font-medium text-foreground line-clamp-1 max-w-[120px]">{d.name}</p>
                <p className="text-[10px] text-deal font-bold">Save ${((d.originalPrice || 0) - d.price).toFixed(0)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-10 md:py-14">
        <SectionHeader label="Staff Picks" title="Featured Products" link="/products" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Trending */}
      <section className="bg-card/50">
        <div className="container py-10 md:py-14">
          <SectionHeader label="Popular" title="Trending Now" link="/products" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground rounded-2xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="font-display text-2xl md:text-4xl text-background mb-2">Free shipping on orders over $100</h2>
            <p className="text-background/60 text-sm">Plus 30-day free returns on every order.</p>
          </div>
          <Link to="/products" className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.98]">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

const SectionHeader = ({ label, title, link }: { label: string; title: string; link: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-end justify-between mb-6"
  >
    <div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">{label}</span>
      <h2 className="font-display text-2xl md:text-3xl text-foreground mt-0.5">{title}</h2>
    </div>
    <Link to={link} className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline group">
      See All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </motion.div>
);

export default Index;
