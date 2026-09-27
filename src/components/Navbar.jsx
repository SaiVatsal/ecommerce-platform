import React from 'react';
import { ShoppingBag, Heart, Shield, Package, UserCheck, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar({ activeTab, setActiveTab, setIsCartOpen }) {
  const { userRole, setUserRole, cart, wishlist, searchQuery, setSearchQuery } = useStore();
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('catalog')}
              className="flex items-center gap-2 group text-left"
            >
              <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-lime-400 transition-colors">
                KRONOS<span className="text-lime-400">.</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 border border-zinc-700 rounded text-zinc-400 font-mono tracking-widest uppercase">
                STUDIO v2.4
              </span>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                  activeTab === 'catalog'
                    ? 'text-black bg-lime-400 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Catalog
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                  activeTab === 'orders'
                    ? 'text-black bg-lime-400 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Track Orders
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'wishlist'
                    ? 'text-black bg-lime-400 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Wishlist
                {wishlist.length > 0 && (
                  <span className="w-4 h-4 bg-zinc-800 text-[10px] text-lime-400 rounded-full flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </button>
              {userRole === 'seller' && (
                <button
                  onClick={() => setActiveTab('seller')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                    activeTab === 'seller'
                      ? 'text-black bg-lime-400 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  Seller Studio
                </button>
              )}
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                    activeTab === 'admin'
                      ? 'text-black bg-lime-400 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  Admin Analytics
                </button>
              )}
            </nav>
          </div>

          {/* Search bar & Role Switcher */}
          <div className="flex items-center gap-4">

            {/* Search Input */}
            <div className="relative hidden lg:block w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="SEARCH GEAR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 font-mono tracking-wider focus:outline-none focus:border-lime-400 rounded"
              />
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-zinc-900 p-1 border border-zinc-800 rounded">
              <span className="text-[10px] text-zinc-500 font-mono px-2 uppercase flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-lime-400" />
                Role:
              </span>
              <select
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  if (e.target.value === 'seller') setActiveTab('seller');
                  if (e.target.value === 'admin') setActiveTab('admin');
                }}
                className="bg-black text-xs text-lime-400 font-mono font-bold px-2 py-1 rounded border border-zinc-800 focus:outline-none cursor-pointer"
              >
                <option value="customer">CUSTOMER</option>
                <option value="seller">SELLER</option>
                <option value="admin">ADMIN</option>
              </select>
            </div>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setActiveTab('wishlist')}
              className="p-2.5 text-zinc-400 hover:text-lime-400 border border-zinc-800 bg-zinc-950 rounded hover:border-zinc-700 transition relative"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 text-black text-[9px] font-black rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-lime-400 hover:bg-lime-300 text-black font-mono font-black text-xs uppercase tracking-wider rounded transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CART [{totalCartCount}]</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
