import { useState } from "react";
import { Product, PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal } from "@/components/Icons";

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
}

const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating", "Discount"];

export default function ProductGrid({ onProductSelect }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");
  const [maxPrice, setMaxPrice] = useState(400000);

  let filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || [p.name, p.brand, p.category, p.description, ...p.highlights].some(f => f.toLowerCase().includes(q));
    const matchesPrice = p.basePrice <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.basePrice - b.basePrice);
  else if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.basePrice - a.basePrice);
  else if (sortBy === "Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "Discount") filtered = [...filtered].sort((a, b) => b.discount - a.discount);

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-white border border-[var(--border)] rounded-2xl px-3 py-2.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10 transition-all">
          <Search size={16} className="text-[var(--muted-foreground)] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-[var(--muted-foreground)] text-xs font-medium">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-150 ${
                activeCategory === cat ? "bg-[var(--primary)] text-white shadow-sm" : "bg-white border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-2 flex items-center justify-between">
        <p className="text-xs text-[var(--muted-foreground)]">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        </p>
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1.5 text-xs text-[var(--primary)] font-semibold"
        >
          <SlidersHorizontal size={13} />
          Filter & Sort
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 bg-[var(--muted)] rounded-2xl flex items-center justify-center">
              <Search size={24} className="text-[var(--muted-foreground)]" />
            </div>
            <p className="text-sm font-semibold text-[var(--foreground)]">No products found</p>
            <p className="text-xs text-[var(--muted-foreground)] text-center">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onClick={onProductSelect} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Sheet */}
      {showFilter && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl px-4 pt-4 pb-8">
            <div className="w-12 h-1 bg-[var(--border)] rounded-full mx-auto mb-4" />
            <p className="text-base font-bold text-[var(--foreground)] mb-4">Filter & Sort</p>

            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)] mb-2">Sort By</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${sortBy === opt ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white border-[var(--border)] text-[var(--foreground)]"}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)] mb-2">
              Max Price: ₹{maxPrice.toLocaleString()}
            </p>
            <input
              type="range"
              min={10000}
              max={400000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--primary)] mb-5"
            />

            <div className="flex gap-3">
              <button
                onClick={() => { setSortBy("Relevance"); setMaxPrice(200000); setShowFilter(false); }}
                className="flex-1 border border-[var(--border)] text-[var(--foreground)] font-semibold py-3.5 rounded-2xl text-sm"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="flex-1 bg-[var(--primary)] text-white font-bold py-3.5 rounded-2xl text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
