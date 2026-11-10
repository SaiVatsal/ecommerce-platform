import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  User,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Terminal,
  Lock,
  ArrowRight,
  LogOut,
  Sparkles,
  Fingerprint
} from 'lucide-react';
import { useStore, PRESET_USERS } from '../store/useStore';

export default function LoginPage({ onNavigate }) {
  const { currentUser, login, logout, jwtToken, jwtTokenName } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [authSuccessNotice, setAuthSuccessNotice] = useState('');

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    setTimeout(() => {
      const result = login(email, password);
      setIsAuthenticating(false);

      if (!result.success) {
        setError(result.error || 'Authentication rejected. Verify identity credentials.');
      } else {
        setAuthSuccessNotice(`Identity verified: Logged in as ${result.user.name} (${result.user.role.toUpperCase()})`);
        setTimeout(() => setAuthSuccessNotice(''), 4000);
      }
    }, 600);
  };

  const handleQuickLogin = (presetUser) => {
    setEmail(presetUser.email);
    setPassword(presetUser.password);
    setError('');
    setIsAuthenticating(true);

    setTimeout(() => {
      const result = login(presetUser.email, presetUser.password);
      setIsAuthenticating(false);
      if (result.success) {
        setAuthSuccessNotice(`Authorized via Quick-Pass: ${result.user.name} (${result.user.role.toUpperCase()})`);
        setTimeout(() => setAuthSuccessNotice(''), 4000);
      }
    }, 450);
  };

  const handleCopyToken = () => {
    if (!jwtToken) return;
    navigator.clipboard.writeText(jwtToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const decodeJwtPayload = (token) => {
    try {
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length < 2) return null;
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  };

  const decoded = decodeJwtPayload(jwtToken);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-mono">
      {/* Top Header */}
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-lime-400 text-black rounded font-black">
                <Terminal className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                KRONOS ACCESS TERMINAL <span className="text-lime-400">//</span> IDENT-AUTH
              </h1>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              MULTI-ROLE SECURE AUTHENTICATION SYSTEM & CRYPTOGRAPHIC JWT TELEMETRY
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse"></span>
            <span className="text-xs text-lime-400 font-bold uppercase tracking-wider">
              GATEWAY ONLINE
            </span>
          </div>
        </div>
      </div>

      {authSuccessNotice && (
        <div className="mb-6 p-4 bg-lime-400/10 border border-lime-400 text-lime-400 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{authSuccessNotice}</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate(currentUser?.role === 'admin' ? 'admin' : 'catalog')}
              className="px-3 py-1 bg-lime-400 text-black font-bold uppercase text-[10px] hover:bg-lime-300 transition"
            >
              Enter Dashboard &rarr;
            </button>
          )}
        </div>
      )}

      {/* Main Grid: Login Form & Active Session + JWT Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Current Session (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Session Status (if logged in) */}
          {currentUser && (
            <div className="bg-zinc-950 border border-zinc-800 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded border-2 border-lime-400 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white uppercase">{currentUser.name}</span>
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-lime-400 text-black rounded uppercase">
                        {currentUser.role}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400">{currentUser.email}</span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 bg-zinc-900 hover:border-red-500/50 hover:text-red-400 text-zinc-400 text-xs transition"
                  title="Revoke session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>SIGN OUT</span>
                </button>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-800/80 text-xs space-y-1 text-zinc-400">
                <div className="flex justify-between">
                  <span>DEPARTMENT:</span>
                  <span className="text-white font-bold">{currentUser.department}</span>
                </div>
                <div className="flex justify-between">
                  <span>CLEARANCE:</span>
                  <span className="text-lime-400 font-bold uppercase">{currentUser.role} PRIVILEGED</span>
                </div>
              </div>

              {onNavigate && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin' : 'catalog')}
                    className="flex-1 py-2.5 bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs uppercase flex items-center justify-center gap-2 transition"
                  >
                    <span>LAUNCH {currentUser.role === 'admin' ? 'ADMIN ANALYTICS' : 'CATALOG STORE'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Login Input Box */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-lime-400" />
                <h2 className="text-sm font-black uppercase text-white tracking-wider">
                  TERMINAL CREDENTIAL AUTH
                </h2>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                AES-256 ENCRYPTED
              </span>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-950/40 border border-red-500/50 text-red-400 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase text-zinc-400 mb-1.5 font-bold">
                  OPERATIVE EMAIL IDENTIFIER
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@kronos.corp"
                    className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-zinc-400 mb-1.5 font-bold">
                  SECURITY PASSPHRASE
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full mt-2 py-3 bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    VERIFYING IDENT-SIGNATURE...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>AUTHENTICATE TERMINAL SESSION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick-Access 3 Credentials Box */}
          <div className="bg-zinc-950 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <h3 className="text-xs font-black uppercase text-white tracking-wider">
                  1-CLICK DEMO CREDENTIALS (ADMIN & CUSTOMERS)
                </h3>
              </div>
              <span className="text-[10px] text-zinc-500">CLICK TO AUTO-FILL & LOGIN</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESET_USERS.map((user) => {
                const isCurrent = currentUser?.email === user.email;
                return (
                  <div
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className={`p-3.5 border cursor-pointer transition text-left relative group ${
                      isCurrent
                        ? 'border-lime-400 bg-lime-400/5'
                        : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-lime-400"></span>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      {user.role === 'admin' ? (
                        <Shield className="w-4 h-4 text-lime-400" />
                      ) : user.role === 'shipping' ? (
                        <Truck className="w-4 h-4 text-lime-400" />
                      ) : (
                        <User className="w-4 h-4 text-lime-400" />
                      )}
                      <span className="text-xs font-black uppercase text-white">
                        {user.role}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-300 font-bold mb-1 truncate">
                      {user.email}
                    </div>

                    <div className="text-[10px] text-zinc-500 flex justify-between items-center">
                      <span>Pass: <code className="text-lime-400">{user.password}</code></span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 bg-black border border-zinc-800 group-hover:border-lime-400 text-zinc-400 group-hover:text-lime-400 transition">
                        USE &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: JWT Token Telemetry & Security Claims (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-lime-400" />
                  <h3 className="text-xs font-black uppercase text-white tracking-wider">
                    CRYPTOGRAPHIC JWT TELEMETRY
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-lime-400">
                  HS256
                </span>
              </div>

              {/* JWT Token Name Banner */}
              <div className="mb-4 p-3 bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                  JWT TOKEN STORAGE KEY NAME
                </span>
                <div className="flex items-center justify-between">
                  <code className="text-xs font-bold text-lime-400 tracking-wider">
                    {jwtTokenName}
                  </code>
                  <span className="text-[9px] text-zinc-500 uppercase px-1.5 py-0.5 bg-black border border-zinc-800">
                    localStorage / state
                  </span>
                </div>
              </div>

              {/* JWT Encrypted Token Display */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    ACTIVE JWT TOKEN VALUE
                  </span>
                  <button
                    onClick={handleCopyToken}
                    disabled={!jwtToken}
                    className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-lime-400 transition"
                  >
                    {copiedToken ? (
                      <>
                        <Check className="w-3 h-3 text-lime-400" />
                        <span className="text-lime-400 font-bold">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY TOKEN</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-black border border-zinc-800/90 rounded text-[11px] leading-relaxed text-zinc-300 break-all select-all font-mono max-h-40 overflow-y-auto">
                  {jwtToken ? (
                    <>
                      <span className="text-lime-400">{jwtToken.split('.')[0]}</span>
                      <span className="text-zinc-600">.</span>
                      <span className="text-white">{jwtToken.split('.')[1]}</span>
                      <span className="text-zinc-600">.</span>
                      <span className="text-lime-400/70">{jwtToken.split('.')[2]}</span>
                    </>
                  ) : (
                    <span className="text-zinc-600 italic">No session token generated. Log in above.</span>
                  )}
                </div>
              </div>

              {/* Decoded Claims Inspector */}
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1.5">
                  DECODED TOKEN CLAIMS (PAYLOAD)
                </span>
                <div className="p-3 bg-zinc-900/50 border border-zinc-800 text-[11px] space-y-2">
                  {decoded ? (
                    <>
                      <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                        <span className="text-zinc-500">subject (sub):</span>
                        <span className="text-white font-mono">{decoded.sub}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                        <span className="text-zinc-500">identity (email):</span>
                        <span className="text-lime-400 font-mono">{decoded.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                        <span className="text-zinc-500">role_claim:</span>
                        <span className="text-white font-mono uppercase font-bold">{decoded.role}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                        <span className="text-zinc-500">issued_at (iat):</span>
                        <span className="text-zinc-300 font-mono">{decoded.iat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">expires_at (exp):</span>
                        <span className="text-zinc-300 font-mono">{decoded.exp} (+24h)</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-zinc-600 text-[10px] italic">Claims will decode upon session authentication.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] text-zinc-500 flex items-center justify-between">
              <span>SECURITY PROTOCOL: SHA-256 HMAC</span>
              <span className="text-lime-400 font-bold">KRONOS VAULT SECURED</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
