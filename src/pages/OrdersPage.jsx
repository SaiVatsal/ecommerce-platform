import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, Download, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function OrdersPage() {
  const { orders } = useStore();
  const [downloadingId, setDownloadingId] = useState(null);

  const getStatusStep = (status) => {
    switch (status) {
      case 'Placed': return 1;
      case 'Processing': return 2;
      case 'In Transit': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 1;
    }
  };

  const handleDownloadInvoice = (order) => {
    setDownloadingId(order.id);
    setTimeout(() => {
      // Simulate PDF invoice generation
      const invoiceData = `
========================================
           KRONOS STUDIO INVOICE
========================================
Invoice ID: INV-${order.id}
Date: ${order.date}
Tracking Number: ${order.trackingNumber}
Shipping Address: ${order.shippingAddress}

ITEMS:
${order.items.map(item => `- ${item.name} (${item.variant}) x${item.quantity}: $${item.price * item.quantity}`).join('\n')}

Subtotal: $${order.subtotal}
Tax (8%): $${order.tax}
TOTAL PAID: $${order.total}
Status: ${order.status}
========================================
Thank you for acquiring Kronos technical gear.
      `;

      const blob = new Blob([invoiceData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `INVOICE_${order.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase text-white font-mono tracking-tight flex items-center gap-3">
          <Truck className="w-8 h-8 text-lime-400" />
          REAL-TIME ORDER TRACKING & INVOICES
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          LIVE TELEMETRY STREAM & TAX INVOICE RECORDS
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 border border-zinc-900 bg-zinc-950">
          <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 font-mono text-xs uppercase">NO ACTIVE OR HISTORICAL ORDERS RECORDED</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const currentStep = getStatusStep(order.status);
            const steps = [
              'Order Placed',
              'Processing',
              'In Transit',
              'Out for Delivery',
              'Delivered'
            ];

            return (
              <div key={order.id} className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8">
                {/* Top Info Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-900 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black font-mono text-white">{order.id}</span>
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-lime-400/10 text-lime-400 border border-lime-400/30 uppercase">
                        {order.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 mt-1 block">
                      DATE: {order.date} // TRACKING: {order.trackingNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-zinc-500 block">TOTAL AMOUNT</span>
                      <span className="text-xl font-black text-lime-400">${order.total}</span>
                    </div>

                    <button
                      onClick={() => handleDownloadInvoice(order)}
                      disabled={downloadingId === order.id}
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-white transition"
                    >
                      <Download className="w-3.5 h-3.5 text-lime-400" />
                      <span>{downloadingId === order.id ? 'GENERATING...' : 'DOWNLOAD INVOICE'}</span>
                    </button>
                  </div>
                </div>

                {/* Real-time Order Stepper */}
                <div className="py-8">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {steps.map((label, index) => {
                      const stepNumber = index + 1;
                      const isComplete = stepNumber < currentStep;
                      const isCurrent = stepNumber === currentStep;

                      return (
                        <div key={label} className="flex flex-col items-center md:items-start text-center md:text-left">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold transition ${
                                isComplete
                                  ? 'bg-lime-400 text-black'
                                  : isCurrent
                                  ? 'bg-lime-400 text-black ring-4 ring-lime-400/20 animate-pulse'
                                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                              }`}
                            >
                              {isComplete ? '✓' : stepNumber}
                            </div>
                            <div className={`h-0.5 w-12 hidden md:block ${isComplete ? 'bg-lime-400' : 'bg-zinc-800'}`}></div>
                          </div>
                          <span className={`text-xs font-mono uppercase font-bold ${isCurrent ? 'text-lime-400' : isComplete ? 'text-white' : 'text-zinc-600'}`}>
                            {label}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                              {order.estimatedDelivery}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items Ordered List */}
                <div className="pt-6 border-t border-zinc-900 bg-zinc-900/30 p-4">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                    MANIFEST CONTENTS ({order.items.length} ITEMS)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-xs font-mono bg-zinc-950 p-2.5 border border-zinc-800/80">
                        <span className="text-white font-bold">{item.name} <span className="text-zinc-500 font-normal">[{item.variant}]</span></span>
                        <span className="text-lime-400 font-bold">x{item.quantity} - ${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
