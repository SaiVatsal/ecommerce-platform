import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ProductCard({ product, onSelect }) {
  const { cart, addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-zinc-950 border border-zinc-800 hover:border-lime-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 bg-black/80 backdrop-blur-md border border-zinc-700 text-lime-400 uppercase">
            {product.category}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 bg-black/80 backdrop-blur-md border border-zinc-700 hover:border-lime-400 text-white hover:text-lime-400 transition"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-lime-400 text-lime-400' : ''}`} />
          </button>
        </div>

        {/* Stock warning */}
        {product.stock < 10 && (
          <div className="absolute bottom-3 left-3">
            <span className="text-[9px] font-mono uppercase bg-red-950/90 text-red-400 border border-red-800 px-2 py-0.5 font-semibold">
              LOW STOCK: {product.stock} LEFT
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between border-t border-zinc-900">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">SKU-{product.id.toUpperCase()}</span>
            <div className="flex items-center gap-1 text-xs font-mono text-lime-400">
              <Star className="w-3.5 h-3.5 fill-lime-400 text-lime-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-base font-black tracking-tight text-white uppercase group-hover:text-lime-400 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Variants Selector */}
        <div className="mt-4 pt-3 border-t border-zinc-900">
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Select Variant:</div>
          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.variants.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={`px-2 py-1 text-[10px] font-mono border uppercase transition ${
                  selectedVariant === v
                    ? 'border-lime-400 bg-lime-400 text-black font-bold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-500 font-mono block leading-none">PRICE</span>
              <span className="text-xl font-black font-mono text-white tracking-tight">${product.price}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition ${
                isAdded
                  ? 'bg-white text-black'
                  : 'bg-lime-400 hover:bg-lime-300 text-black'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
