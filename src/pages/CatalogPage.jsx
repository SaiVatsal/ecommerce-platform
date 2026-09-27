import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ onSelectProduct }) {
  const {
    products,
    selectedCategory,
    setCategory,
    searchQuery,
    priceRange,
    setPriceRange
  } = useStore();

  const categories = ['All', 'Apparel', 'Accessories', 'Gear', 'Electronics', 'Footwear', 'Furniture'];

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Banner with Distinctive Black/White/Lime Aesthetic */}
      <div className="relative mb-12 border border-zinc-800 bg-zinc-950 p-8 sm:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            FW26 ARCHIVAL DROP LIVE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tighter leading-none">
            ENGINEERED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-white to-zinc-500">
              MINIMALISM.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans max-w-xl font-normal leading-relaxed">
            High-specification garments and utilitarian artifacts forged from aerospace-grade composites and technical textiles. Built for high performance in harsh environments.
          </p>
        </div>
      </div>

      {/* Filter and Controls Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-lime-400 text-black font-bold'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Slider */}
        <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 px-4 py-2">
          <SlidersHorizontal className="w-4 h-4 text-lime-400" />
          <span className="text-xs font-mono text-zinc-400 uppercase">MAX PRICE:</span>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-32 accent-lime-400 cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-lime-400 w-12">${priceRange}</span>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          SHOWING {filteredProducts.length} ARTIFACTS
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 border border-zinc-900 bg-zinc-950">
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider mb-2">NO MATCHING PRODUCTS FOUND</p>
          <button
            onClick={() => {
              setCategory('All');
              setPriceRange(1000);
            }}
            className="mt-3 px-4 py-2 bg-zinc-900 border border-zinc-700 text-lime-400 text-xs font-mono uppercase"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
