import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ProductDetailModal({ product, onClose, onSelectOtherProduct }) {
  const { products, cart, addToCart, wishlist, toggleWishlist, reviews, addReview } = useStore();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [toast, setToast] = useState('');

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const productReviews = reviews[product.id] || [];

  // Recommendation engine: "Customers Also Bought"
  const recommendations = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    addReview(product.id, {
      user: reviewName || 'Verified Buyer',
      rating,
      comment: reviewText
    });
    setReviewText('');
    setReviewName('');
    setToast('Review published successfully!');
    setTimeout(() => setToast(''), 2500);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    setToast(`Added ${product.name} [${selectedVariant}] to cart!`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-zinc-950 border border-zinc-800 shadow-2xl my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/80 border border-zinc-700 text-white hover:text-lime-400 hover:border-lime-400 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Column */}
          <div className="relative bg-zinc-900 aspect-square md:aspect-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-zinc-800 p-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-lime-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFIED ENCRYPTED STRIPE TEST-MODE COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-lime-400 uppercase font-bold">{product.category}</span>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-3.5 h-3.5 fill-lime-400 text-lime-400" />
                  <span>{product.rating} / 5.0</span>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-sm text-zinc-300 font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Variants */}
              <div className="mt-6">
                <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-2 font-semibold">
                  SELECT CONFIGURATION:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 text-xs font-mono border uppercase transition ${
                        selectedVariant === v
                          ? 'border-lime-400 bg-lime-400 text-black font-bold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Row */}
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-3xl font-black font-mono text-lime-400">${product.price}</span>
                <span className="text-xs font-mono text-zinc-500 uppercase">INCL. APPLICABLE TAXES & DUTIES</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3.5 border border-zinc-800 bg-zinc-900 hover:border-lime-400 text-white hover:text-lime-400 transition"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-lime-400 text-lime-400' : ''}`} />
                </button>
              </div>

              {toast && (
                <div className="mt-3 p-2 bg-lime-400/10 border border-lime-400/40 text-lime-400 text-xs font-mono text-center">
                  {toast}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Tabs: Recommendations & Customer Reviews */}
        <div className="border-t border-zinc-800 p-8 bg-black">
          {/* Customers also bought recommendation engine */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <h3 className="text-xs font-mono uppercase font-black tracking-widest text-white">
                CUSTOMERS ALSO BOUGHT // RECOMMENDATION ENGINE
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onSelectOtherProduct(rec)}
                  className="p-3 bg-zinc-950 border border-zinc-800 hover:border-lime-400 cursor-pointer flex gap-3 items-center group transition"
                >
                  <img src={rec.image} alt={rec.name} className="w-14 h-14 object-cover" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-white group-hover:text-lime-400 transition line-clamp-1 font-mono">
                      {rec.name}
                    </h4>
                    <span className="text-xs font-mono text-lime-400 font-bold">${rec.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews & Ratings Section */}
          <div className="border-t border-zinc-900 pt-6">
            <h3 className="text-xs font-mono uppercase font-black tracking-widest text-white mb-4">
              COMMUNITY REVIEWS ({productReviews.length})
            </h3>

            <div className="space-y-3 mb-6">
              {productReviews.length === 0 ? (
                <p className="text-xs text-zinc-500 font-mono">NO REVIEWS YET. BE THE FIRST TO LEAVE ONE.</p>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-zinc-900/60 border border-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-white">{rev.user}</span>
                        <div className="flex text-lime-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-lime-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave Review Form */}
            <form onSubmit={handleAddReview} className="bg-zinc-950 border border-zinc-800 p-4 space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold block">WRITE A REVIEW</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 p-2 text-xs font-mono text-white focus:outline-none focus:border-lime-400"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">Score:</span>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="bg-zinc-900 border border-zinc-800 p-2 text-xs font-mono text-lime-400 focus:outline-none"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Unsatisfactory)</option>
                  </select>
                </div>
              </div>
              <textarea
                placeholder="Share your experience with this item..."
                rows={2}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs font-mono text-white focus:outline-none focus:border-lime-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-800 hover:bg-lime-400 hover:text-black text-white font-mono text-xs font-bold uppercase transition flex items-center gap-2"
              >
                <Send className="w-3 h-3" />
                <span>SUBMIT REVIEW</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
