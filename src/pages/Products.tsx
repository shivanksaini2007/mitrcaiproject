import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "All";
  const [category, setCategory] = useState(initialCat);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "All") list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }, [category, search]);

  const handleCat = (cat: string) => {
    setCategory(cat);
    if (cat === "All") searchParams.delete("cat");
    else searchParams.set("cat", cat);
    setSearchParams(searchParams);
  };

  return (
    <div className="container py-12 md:py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">Shop</h1>
        <p className="text-muted-foreground font-light mb-10">Browse our curated collection of essentials.</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative max-w-sm mb-8"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-11 h-11 bg-card/50 border-border/60 rounded-full glass text-sm focus:shadow-elevated transition-shadow duration-300"
        />
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCat(cat)}
            className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
              category === cat
                ? "bg-primary text-primary-foreground shadow-elevated"
                : "glass text-muted-foreground hover:text-foreground hover:shadow-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-24 font-light">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
};

export default Products;
