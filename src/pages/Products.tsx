import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type SortOption = "relevant" | "price-asc" | "price-desc" | "rating" | "reviews";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "All";
  const initialQ = searchParams.get("q") || "";
  const [category, setCategory] = useState(initialCat);
  const [search, setSearch] = useState(initialQ);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "All") list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "reviews": list = [...list].sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [category, search, sort]);

  const handleCat = (cat: string) => {
    setCategory(cat);
    if (cat === "All") searchParams.delete("cat");
    else searchParams.set("cat", cat);
    setSearchParams(searchParams);
  };

  return (
    <div className="container py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            {category === "All" ? "All Products" : category}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} results</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-border bg-card text-foreground"
          >
            <option value="relevant">Most Relevant</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters - desktop */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-36">
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-card border-border rounded-lg"
              />
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCat(cat)}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    category === cat ? "bg-primary text-primary-foreground font-medium" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                  <span className="float-right text-xs opacity-60">
                    {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden w-full absolute left-0 bg-card border-b border-border z-10 px-4 pb-4"
            >
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 h-10 text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { handleCat(cat); setShowFilters(false); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                      category === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-20 font-light">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
