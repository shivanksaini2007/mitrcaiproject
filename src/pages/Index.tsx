import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featured = products.filter(p => p.featured);
  const trending = products.filter(p => p.trending);

  return (
    <div>
      <HeroSection />

      {/* Featured */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Curated</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">Featured Products</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trending */}
      <section className="container pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Popular</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">Trending Now</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Index;
