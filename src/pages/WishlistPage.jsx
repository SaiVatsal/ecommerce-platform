import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function WishlistPage({ onSelectProduct }) {
  const { wishlist, products, toggleWishlist, addToCart } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-mono">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight flex items-center gap-3">
          <Heart className="w-8 h-8 text-lime-400 fill-lime-400" />
          SAVED ARTIFACTS WISHLIST ({wishlistedProducts.length})
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          CURATED VAULT OF MONITORED PIECES
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-24 border border-zinc-900 bg-zinc-950">
          <Heart className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-xs uppercase">YOUR WISHLIST IS EMPTY</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map((p) => (
            <div key={p.id} className="bg-zinc-950 border border-zinc-800 p-4 flex flex-col justify-between">
              <div>
                <img
                  src={p.image}
                  alt={p.name}
                  onClick={() => onSelectProduct(p)}
                  className="w-full aspect-square object-cover mb-4 cursor-pointer hover:opacity-90 transition"
                />
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] text-lime-400 uppercase">{p.category}</span>
                  <span className="text-sm font-bold text-white">${p.price}</span>
                </div>
                <h3
                  onClick={() => onSelectProduct(p)}
                  className="text-sm font-black text-white uppercase hover:text-lime-400 cursor-pointer transition line-clamp-1"
                >
                  {p.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex gap-2">
                <button
                  onClick={() => addToCart(p, p.variants[0])}
                  className="flex-1 py-2 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold uppercase transition flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>MOVE TO BAG</span>
                </button>
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="p-2 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-900 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
