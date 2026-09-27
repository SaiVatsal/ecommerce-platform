import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateCartQuantity, checkout } = useStore();
  const [address, setAddress] = useState('742 Evergreen Terrace, Sector 9, Neo-Veridia');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const order = checkout({ address });
      setIsCheckingOut(false);
      setOrderConfirmed(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Slide-over Panel */}
      <div className="relative z-10 w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-lime-400"></span>
            <h2 className="text-base font-black uppercase tracking-wider font-mono text-white">YOUR CART BAG</h2>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderConfirmed ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-lime-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black uppercase text-white font-mono">ORDER SECURED!</h3>
              <p className="text-xs text-zinc-400 font-mono">ORDER ID: {orderConfirmed.id}</p>
              <div className="bg-zinc-900 border border-zinc-800 p-4 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>STATUS:</span> <span className="text-lime-400 font-bold">{orderConfirmed.status}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>EST. DELIVERY:</span> <span className="text-white">{orderConfirmed.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>TOTAL CHARGE:</span> <span className="text-lime-400 font-bold">${orderConfirmed.total}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setOrderConfirmed(null);
                  onClose();
                }}
                className="w-full py-3 bg-lime-400 text-black font-mono font-bold text-xs uppercase hover:bg-lime-300 transition"
              >
                RETURN TO CATALOG
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-600 font-mono text-sm uppercase tracking-widest mb-4">YOUR BAG IS EMPTY</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-zinc-900 border border-zinc-700 text-lime-400 font-mono text-xs uppercase hover:border-lime-400 transition"
              >
                EXPLORE CATALOG
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.variant}-${idx}`} className="flex gap-4 p-3 bg-zinc-900/60 border border-zinc-800/80">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover border border-zinc-800" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase text-white line-clamp-1">{item.name}</h4>
                    <span className="text-[10px] font-mono text-lime-400 uppercase">VARIANT: {item.variant}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-700 bg-black">
                      <button
                        onClick={() => updateCartQuantity(idx, -1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(idx, 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">${item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!orderConfirmed && cart.length > 0 && (
          <div className="p-6 border-t border-zinc-800 bg-black space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>ESTIMATED TAX (8%)</span>
                <span className="text-white">${tax}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>SHIPPING (EXPRESS)</span>
                <span className="text-lime-400 font-bold">FREE (PROMO)</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                <span className="text-lime-400">TOTAL DUE</span>
                <span className="text-xl font-black text-lime-400">${total}</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">SHIPPING DESTINATION</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs font-mono text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>PROCESSING VIA STRIPE TEST MODE...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>PAY ${total} // INSTANT CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
