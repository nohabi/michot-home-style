import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products, categories, materials, usageTypes } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [material, setMaterial] = useState("");
  const [usage, setUsage] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (category) result = result.filter((p) => p.category === category);
    if (material) result = result.filter((p) => p.material === material);
    if (usage) result = result.filter((p) => p.usage.includes(usage));

    switch (sort) {
      case "price-asc": return [...result].sort((a, b) => a.price - b.price);
      case "price-desc": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      case "name": return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default: return result;
    }
  }, [search, category, material, usage, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMaterial("");
    setUsage("");
    setSort("default");
    setSearchParams({});
  };

  const hasFilters = search || category || material || usage || sort !== "default";

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold">Shop All Furniture</h1>
          <p className="text-muted-foreground mt-2">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search and sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search furniture..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-56 shrink-0 space-y-6 ${showFilters ? 'mb-6 lg:mb-0' : ''}`}>
            <div>
              <h3 className="font-medium text-sm mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(category === c ? "" : c)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                      category === c ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-3">Material</h3>
              <div className="space-y-2">
                {materials.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMaterial(material === m ? "" : m)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                      material === m ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-3">Usage</h3>
              <div className="space-y-2">
                {usageTypes.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUsage(usage === u ? "" : u)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                      usage === u ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <Button variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
                <X className="w-3 h-3 mr-2" /> Clear Filters
              </Button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
