import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import SellerPage from './pages/SellerPage';
import AdminPage from './pages/AdminPage';
import WishlistPage from './pages/WishlistPage';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import { useStore } from './store/useStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { userRole } = useStore();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsCartOpen={setIsCartOpen}
        />

        {/* Dynamic Route View */}
        <main>
          {activeTab === 'catalog' && (
            <CatalogPage onSelectProduct={(prod) => setSelectedProduct(prod)} />
          )}
          {activeTab === 'orders' && <OrdersPage />}
          {activeTab === 'wishlist' && (
            <WishlistPage onSelectProduct={(prod) => setSelectedProduct(prod)} />
          )}
          {activeTab === 'seller' && userRole === 'seller' && <SellerPage />}
          {activeTab === 'admin' && userRole === 'admin' && <AdminPage />}
        </main>
      </div>

      {/* Cart Slide-Over */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Product Details & Reviews & Recommendation Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectOtherProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Futuristic Monochrome Footer with Lime Details */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter text-white uppercase font-mono">
              KRONOS<span className="text-lime-400">.</span>ENGINEERED
            </span>
            <span className="text-zinc-600 text-xs font-mono">| GLOBAL LOGISTICS NETWORK</span>
          </div>

          <p className="text-zinc-500 font-mono text-xs">
            © 2026 KRONOS CORP. ALL RIGHTS RESERVED. SECURE STRIPE TEST GATEWAY.
          </p>
        </div>
      </footer>
    </div>
  );
}
