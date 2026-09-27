import React, { useState } from 'react';
import { PackagePlus, Sparkles, Image as ImageIcon, Layers, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SellerPage() {
  const { products, addProduct, updateProductStock, generateAiProductImage } = useStore();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [price, setPrice] = useState(150);
  const [stock, setStock] = useState(20);
  const [variants, setVariants] = useState('S, M, L, XL');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGeneratingAiImage, setIsGeneratingAiImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAiGenerateImage = async () => {
    setIsGeneratingAiImage(true);
    const generatedUrl = await generateAiProductImage(`${name} ${category}`);
    setImageUrl(generatedUrl);
    setIsGeneratingAiImage(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

    addProduct({
      name: name.toUpperCase(),
      tagline,
      category,
      price: Number(price),
      stock: Number(stock),
      variants: variants.split(',').map((v) => v.trim()).filter(Boolean),
      image: finalImage,
      description: description || 'High-specification piece engineered with precision.'
    });

    setName('');
    setTagline('');
    setDescription('');
    setImageUrl('');
    setSuccessMessage('PRODUCT REGISTERED TO SELLER INVENTORY!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase text-white font-mono tracking-tight flex items-center gap-3">
          <Layers className="w-8 h-8 text-lime-400" />
          SELLER INVENTORY STUDIO & AI MEDIA SUITE
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          MANAGEMENT OF CATALOG, LIVE STOCK TELEMETRY & AUTO-GENERATED ASSET PIPELINE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Register New Item */}
        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PackagePlus className="w-5 h-5 text-lime-400" />
            <h2 className="text-sm font-black uppercase tracking-wider font-mono text-white">
              ADD NEW ARTIFACT
            </h2>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-lime-400/10 border border-lime-400/40 text-lime-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">Product Title</label>
              <input
                type="text"
                required
                placeholder="e.g. STEALTH RUNNER V4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">Tagline</label>
              <input
                type="text"
                placeholder="Short technical description"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-lime-400"
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Gear">Gear</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Price ($)</label>
                <input
                  type="number"
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Initial Stock</label>
                <input
                  type="number"
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Variants (CSV)</label>
                <input
                  type="text"
                  value={variants}
                  onChange={(e) => setVariants(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            {/* AI Image Generation Section */}
            <div className="p-3 bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                  AI PRODUCT PHOTOGRAPHY
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">
                Generate high-res photo via AI if you don't have product media.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Image URL or generate via AI"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 bg-black border border-zinc-800 p-2 text-[10px] text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAiGenerateImage}
                  disabled={isGeneratingAiImage}
                  className="px-3 py-2 bg-lime-400 hover:bg-lime-300 text-black font-bold text-[10px] uppercase flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3 h-3" />
                  {isGeneratingAiImage ? 'GENERATING...' : 'AI GEN'}
                </button>
              </div>

              {imageUrl && (
                <div className="mt-2 aspect-video w-full overflow-hidden border border-zinc-700">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">Specs & Details</label>
              <textarea
                rows={3}
                placeholder="Technical fabric details, dimensions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs tracking-wider transition"
            >
              PUBLISH ARTIFACT TO STORE
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Live Inventory Control Grid */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black uppercase tracking-wider font-mono text-white">
              LIVE SELLER INVENTORY TABLE ({products.length} ITEMS)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                  <th className="py-3 px-2">Item</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Unit Price</th>
                  <th className="py-3 px-2">Sales</th>
                  <th className="py-3 px-2">Stock Level</th>
                  <th className="py-3 px-2 text-right">Quick Stock Mod</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-2 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover border border-zinc-800" />
                      <div>
                        <div className="font-bold text-white uppercase">{p.name}</div>
                        <div className="text-[10px] text-zinc-500">ID: {p.id}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-zinc-400">{p.category}</td>
                    <td className="py-3 px-2 text-lime-400 font-bold">${p.price}</td>
                    <td className="py-3 px-2 text-zinc-300">{p.salesCount || 0} units</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold ${
                          p.stock < 10
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => updateProductStock(p.id, Math.max(0, p.stock - 1))}
                          className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => updateProductStock(p.id, p.stock + 5)}
                          className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-lime-400 hover:bg-zinc-800 font-bold"
                        >
                          +5
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
