import React from 'react';
import { ShoppingBag, Heart, Shield, Package, User, LogIn, Search, KeyRound } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar({ activeTab, setActiveTab, setIsCartOpen }) {
  const { currentUser, userRole, cart, wishlist, searchQuery, setSearchQuery } = useStore();
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/90 backdrop-blur-md font-mono">
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

              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                    activeTab === 'admin'
                      ? 'text-black bg-lime-400 font-bold'
                      : 'text-lime-400/90 border border-lime-400/30 hover:bg-lime-400/10'
                  }`}
                >
                  Admin Analytics
                </button>
              )}

              {/* Login / Access Terminal Tab */}
              <button
                onClick={() => setActiveTab('login')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'text-black bg-lime-400 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-lime-400" />
                Login Terminal
              </button>
            </nav>
          </div>

          {/* Search bar & User Profile / Login Widget */}
          <div className="flex items-center gap-4">

            {/* Search Input */}
            <div className="relative hidden lg:block w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="SEARCH GEAR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 font-mono tracking-wider focus:outline-none focus:border-lime-400 rounded"
              />
            </div>

            {/* Auth Profile Button / Switcher */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('login')}
                className="flex items-center gap-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/50 p-1.5 rounded transition text-left"
                title="Account Settings & JWT Key"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded object-cover border border-lime-400"
                />
                <div className="hidden sm:block text-left pr-1">
                  <div className="text-[11px] font-bold text-white uppercase leading-none">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <span className="text-[9px] text-lime-400 uppercase font-bold tracking-wider">
                    [{currentUser.role}]
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-lime-400 text-lime-400 text-xs font-bold uppercase rounded hover:bg-lime-400 hover:text-black transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>SIGN IN</span>
              </button>
            )}

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
