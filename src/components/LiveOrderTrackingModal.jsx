import React, { useState, useEffect } from 'react';
import {
  X,
  Truck,
  Package,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Compass,
  Radio,
  FastForward,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function LiveOrderTrackingModal({ order, onClose }) {
  const { updateOrderStatus } = useStore();

  // Stages: 1 = Placed, 2 = Processing (Dispatched), 3 = In Transit (Out for Delivery), 4 = Delivered
  const [currentStage, setCurrentStage] = useState(1);
  const [etaSeconds, setEtaSeconds] = useState(240); // 4 minutes countdown
  const [progressPercent, setProgressPercent] = useState(10);
  const [callAlert, setCallAlert] = useState('');
  const [messagePrompt, setMessagePrompt] = useState(false);
  const [quickMessageSent, setQuickMessageSent] = useState('');

  // Sync initial stage with order status if opening from OrdersPage
  useEffect(() => {
    if (!order) return;
    if (order.status === 'Placed') {
      setCurrentStage(1);
      setProgressPercent(15);
      setEtaSeconds(300);
    } else if (order.status === 'Processing') {
      setCurrentStage(2);
      setProgressPercent(40);
      setEtaSeconds(180);
    } else if (order.status === 'In Transit' || order.status === 'Out for Delivery') {
      setCurrentStage(3);
      setProgressPercent(75);
      setEtaSeconds(60);
    } else if (order.status === 'Delivered') {
      setCurrentStage(4);
      setProgressPercent(100);
      setEtaSeconds(0);
    }
  }, [order]);

  // Automated simulated progression
  useEffect(() => {
    if (currentStage >= 4) return;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        const next = prev + 1.2;
        if (next >= 35 && currentStage === 1) {
          setCurrentStage(2);
          if (order) updateOrderStatus(order.id, 'Processing');
        } else if (next >= 70 && currentStage === 2) {
          setCurrentStage(3);
          if (order) updateOrderStatus(order.id, 'Out for Delivery');
        } else if (next >= 100) {
          setCurrentStage(4);
          if (order) updateOrderStatus(order.id, 'Delivered');
          return 100;
        }
        return next;
      });

      setEtaSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStage, order, updateOrderStatus]);

  if (!order) return null;

  const rider = order.rider || {
    name: 'Agent Marcus Vance',
    rating: 4.98,
    vehicle: 'Hyper-Electric Cargo Bike #KN-404',
    phone: '+1 (555) 902-4411',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
  };

  const formatEta = (seconds) => {
    if (seconds <= 0 || currentStage === 4) return 'DELIVERED!';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleAdvanceStage = () => {
    if (currentStage === 1) {
      setCurrentStage(2);
      setProgressPercent(40);
      setEtaSeconds(180);
      updateOrderStatus(order.id, 'Processing');
    } else if (currentStage === 2) {
      setCurrentStage(3);
      setProgressPercent(75);
      setEtaSeconds(45);
      updateOrderStatus(order.id, 'Out for Delivery');
    } else if (currentStage === 3) {
      setCurrentStage(4);
      setProgressPercent(100);
      setEtaSeconds(0);
      updateOrderStatus(order.id, 'Delivered');
    }
  };

  const handleResetSimulation = () => {
    setCurrentStage(1);
    setProgressPercent(10);
    setEtaSeconds(300);
    updateOrderStatus(order.id, 'Placed');
  };

  const handleCallRider = () => {
    setCallAlert(`Connecting encrypted voice link to ${rider.name}... "${rider.phone}"`);
    setTimeout(() => setCallAlert(''), 4000);
  };

  const handleSendQuickNote = (note) => {
    setQuickMessageSent(`Transmitted instruction to courier: "${note}"`);
    setMessagePrompt(false);
    setTimeout(() => setQuickMessageSent(''), 3500);
  };

  // SVG Coordinates along the path for the animated rider
  // Route goes from (60, 220) -> (180, 160) -> (320, 190) -> (450, 100) -> (560, 120)
  const calculateRiderPosition = (pct) => {
    const t = Math.min(100, Math.max(0, pct)) / 100;
    const startX = 70;
    const endX = 550;
    const currentX = startX + (endX - startX) * t;
    // Curved wave path
    const currentY = 190 - Math.sin(t * Math.PI * 2.2) * 45;
    return { x: currentX, y: currentY };
  };

  const riderPos = calculateRiderPosition(progressPercent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-none shadow-2xl overflow-hidden font-mono text-white my-auto">
        
        {/* Top Zomato Status Bar */}
        <div className="bg-black p-4 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-1.5 bg-lime-400 text-black font-black text-xs">LIVE</span>
              <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-lime-400 animate-pulse" />
                ZOMATO-STYLE REAL-TIME TELEMETRY TRACKER
              </h2>
            </div>
            <div className="text-xs text-zinc-400 mt-1 flex items-center gap-3 flex-wrap">
              <span>ORDER: <strong className="text-white">{order.id}</strong></span>
              <span>//</span>
              <span>TRACKING ID: <strong className="text-lime-400">{order.trackingNumber}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Quick Simulation controls */}
            <button
              onClick={handleAdvanceStage}
              disabled={currentStage >= 4}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-lime-400 text-[11px] text-lime-400 transition disabled:opacity-30"
              title="Fast Forward to next delivery milestone"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>FAST FORWARD</span>
            </button>
            <button
              onClick={handleResetSimulation}
              className="p-1.5 bg-zinc-900 border border-zinc-800 hover:text-lime-400 text-zinc-400 transition"
              title="Re-run delivery simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-zinc-900 border border-zinc-800 hover:text-white text-zinc-400 hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Alerts & Notifications */}
        {callAlert && (
          <div className="bg-lime-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-2 animate-pulse">
            <Phone className="w-4 h-4" />
            <span>{callAlert}</span>
          </div>
        )}
        {quickMessageSent && (
          <div className="bg-lime-400/20 border-b border-lime-400/40 text-lime-400 px-4 py-2 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{quickMessageSent}</span>
          </div>
        )}

        {/* ETA & Current Status Header Banner */}
        <div className="p-4 sm:p-6 bg-zinc-900/60 border-b border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <span className="text-[10px] text-lime-400 font-bold uppercase tracking-wider block mb-1">
              {currentStage === 1 && 'STEP 1 OF 4 // HUB ORDER PREPARATION'}
              {currentStage === 2 && 'STEP 2 OF 4 // DISPATCH AGENT ASSIGNED'}
              {currentStage === 3 && 'STEP 3 OF 4 // AGENT ON THE ROAD (LIVE)'}
              {currentStage === 4 && 'COMPLETED // GEAR SAFELY DELIVERED'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              {currentStage === 1 && 'Kronos Central Hub Preparing Package'}
              {currentStage === 2 && 'Courier Dispatched & Heading to Destination'}
              {currentStage === 3 && `Agent Marcus is ${Math.max(150, Math.round((100 - progressPercent) * 15))}m Away`}
              {currentStage === 4 && 'Package Delivered to Your Doorstep!'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Destination: <span className="text-white">{order.shippingAddress}</span>
            </p>
          </div>

          <div className="bg-black border border-lime-400/40 p-4 text-center">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5">
              ESTIMATED ARRIVAL TIME
            </span>
            <div className="text-2xl sm:text-3xl font-black text-lime-400 tracking-tight flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-lime-400" />
              <span>{formatEta(etaSeconds)}</span>
            </div>
            <span className="text-[9px] text-zinc-400 uppercase mt-1 block">
              {currentStage === 4 ? 'ORDER COMPLETE' : 'LIVE GPS SYNCED'}
            </span>
          </div>
        </div>

        {/* Tactical Simulated Map Canvas */}
        <div className="p-4 sm:p-6 bg-zinc-950 relative overflow-hidden">
          <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-lime-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="uppercase font-bold text-white">NEO-VERIDIA SECTOR 9 GRID ROUTE</span>
            </div>
            <div className="text-lime-400 font-bold">
              SPEED: {currentStage === 3 ? '42 KM/H' : currentStage === 4 ? '0 KM/H' : '15 KM/H'} // TEL-ROUTE ACTIVE
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="w-full bg-black border border-zinc-800 rounded relative h-64 sm:h-72 overflow-hidden select-none">
            {/* Grid Pattern */}
            <svg className="w-full h-full" viewBox="0 0 620 280">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1f241a" strokeWidth="0.8" />
                </pattern>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a3e635" stopOpacity="1" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="#09090b" />
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* City Blocks (Faint outlines) */}
              <rect x="90" y="30" width="80" height="60" fill="#18181b" stroke="#27272a" />
              <rect x="220" y="40" width="110" height="50" fill="#18181b" stroke="#27272a" />
              <rect x="380" y="25" width="90" height="70" fill="#18181b" stroke="#27272a" />
              <rect x="120" y="190" width="100" height="65" fill="#18181b" stroke="#27272a" />
              <rect x="260" y="190" width="120" height="65" fill="#18181b" stroke="#27272a" />
              <rect x="420" y="180" width="110" height="75" fill="#18181b" stroke="#27272a" />

              {/* Street Names */}
              <text x="100" y="55" fill="#52525b" fontSize="9" fontFamily="monospace">KRONOS DEPOT 01</text>
              <text x="235" y="65" fill="#52525b" fontSize="9" fontFamily="monospace">HYPER-EXPRESSWAY 9</text>
              <text x="395" y="50" fill="#52525b" fontSize="9" fontFamily="monospace">NEO-AVENUE</text>
              <text x="435" y="205" fill="#52525b" fontSize="9" fontFamily="monospace">SECTOR 9 RESIDENTIAL</text>

              {/* Planned Delivery Route Path */}
              <path
                d="M 70 190 Q 200 130 310 190 T 550 120"
                fill="none"
                stroke="#27272a"
                strokeWidth="4"
                strokeDasharray="6 6"
              />

              {/* Completed Route Highlight */}
              <path
                d="M 70 190 Q 200 130 310 190 T 550 120"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeDasharray="500"
                strokeDashoffset={500 - (500 * progressPercent) / 100}
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />

              {/* Origin Hub Pin */}
              <g transform="translate(70, 190)">
                <circle r="12" fill="#18181b" stroke="#84cc16" strokeWidth="2" />
                <circle r="4" fill="#a3e635" />
                <text x="-35" y="24" fill="#a3e635" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  KRONOS DEPOT
                </text>
              </g>

              {/* Destination Customer Pin */}
              <g transform="translate(550, 120)">
                <circle r="14" fill="#18181b" stroke="#a3e635" strokeWidth="2" />
                <circle r="5" fill="#ef4444" className={currentStage === 4 ? 'animate-ping' : ''} />
                <text x="-40" y="-18" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  DESTINATION PIN
                </text>
              </g>

              {/* Animated Courier Marker on Route */}
              <g
                transform={`translate(${riderPos.x}, ${riderPos.y})`}
                style={{ transition: 'transform 0.8s ease-out' }}
              >
                {/* Radar ripple ping */}
                <circle r="18" fill="none" stroke="#a3e635" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="r" from="8" to="26" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* Rider Icon Badge */}
                <circle r="13" fill="#a3e635" stroke="#000000" strokeWidth="2" />
                <g transform="translate(-7, -7)">
                  <path
                    d="M3 10h2l1-4h4l1 4h2M5 14a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                <text x="16" y="4" fill="#a3e635" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  COURIER MARCUS
                </text>
              </g>
            </svg>

            {/* In-Map Telemetry Overlay Badge */}
            <div className="absolute bottom-3 left-3 bg-black/80 border border-zinc-800 p-2 text-[10px] space-y-0.5">
              <div>PROGRESS: <span className="text-lime-400 font-bold">{Math.round(progressPercent)}%</span></div>
              <div>COORDINATES: <span className="text-white">37.7749° N, 122.4194° W</span></div>
            </div>
          </div>
        </div>

        {/* 4-Stage Stepper Progress Tracker */}
        <div className="px-4 sm:px-6 py-4 bg-zinc-950 border-t border-b border-zinc-900">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              { num: 1, title: 'Confirmed', desc: 'Order placed & sealed' },
              { num: 2, title: 'Dispatched', desc: 'Rider picked up gear' },
              { num: 3, title: 'In Transit', desc: 'Out for delivery' },
              { num: 4, title: 'Delivered', desc: 'Doorstep arrival' }
            ].map((step) => {
              const isPast = step.num < currentStage;
              const isCurrent = step.num === currentStage;
              return (
                <div
                  key={step.num}
                  className={`p-3 border transition ${
                    isCurrent
                      ? 'border-lime-400 bg-lime-400/10'
                      : isPast
                      ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300'
                      : 'border-zinc-900 bg-zinc-950 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPast
                          ? 'bg-lime-400 text-black'
                          : isCurrent
                          ? 'bg-lime-400 text-black animate-pulse'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {isPast ? '✓' : step.num}
                    </span>
                    <span className={`font-black uppercase text-[11px] ${isCurrent ? 'text-lime-400' : 'text-white'}`}>
                      {step.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block">{step.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner Card (Zomato Style) & Order Contents */}
        <div className="p-4 sm:p-6 bg-zinc-950 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Rider Info Card (7 Cols) */}
          <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <span className="text-[10px] text-lime-400 font-bold uppercase tracking-wider">
                  ASSIGNED COURIER PARTNER
                </span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                  KRONOS BIOMETRIC VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={rider.avatar}
                  alt={rider.name}
                  className="w-14 h-14 rounded border-2 border-lime-400 object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black uppercase text-white">{rider.name}</h4>
                    <span className="px-2 py-0.5 bg-lime-400 text-black text-[10px] font-black rounded">
                      ★ {rider.rating}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">{rider.vehicle}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">1,420 Completed Expeditions // 99.8% On-time score</p>
                </div>
              </div>
            </div>

            {/* Quick Actions for Rider */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2">
              <button
                onClick={handleCallRider}
                className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-3.5 h-3.5 text-lime-400" />
                <span>Call Courier</span>
              </button>
              <button
                onClick={() => setMessagePrompt(!messagePrompt)}
                className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-lime-400" />
                <span>Drop Note</span>
              </button>
            </div>

            {messagePrompt && (
              <div className="mt-3 p-3 bg-black border border-zinc-800 text-xs space-y-2">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Quick Dropoff Instructions:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Leave at front entrance',
                    'Ring security intercom',
                    'Call on arrival',
                    'Deliver in carbon container'
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleSendQuickNote(preset)}
                      className="px-2 py-1 bg-zinc-900 border border-zinc-700 hover:border-lime-400 text-[10px] text-zinc-300 hover:text-white"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Package Manifest Summary (5 Cols) */}
          <div className="md:col-span-5 bg-zinc-900/40 border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-3">
                ORDER PACKAGING SUMMARY ({order.items?.length || 0} ITEMS)
              </span>

              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-800/60">
                    <span className="text-zinc-300 truncate max-w-[170px]">{item.name}</span>
                    <span className="text-lime-400 font-bold">x{item.quantity} (${item.price * item.quantity})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-xs font-bold mt-4">
              <span className="text-zinc-400">TOTAL CHARGE</span>
              <span className="text-base text-lime-400 font-black">${order.total}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[10px] text-zinc-500">
            SIMULATED KRONOS LIVE SATELLITE TELEMETRY // ZOMATO PROTOCOL
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-wider transition"
          >
            RETURN TO STORE
          </button>
        </div>

      </div>
    </div>
  );
}
