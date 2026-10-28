import React, { useState } from "react";
import { ShoppingBag, Zap, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import { audio } from "../utils/audioEngine";

export default function Navbar({ cartCount, cartTotal, onOpenCart }) {
  const [muted, setMuted] = useState(audio.muted);

  const handleToggleSound = () => {
    const isMute = audio.toggleMute();
    setMuted(isMute);
    if (!isMute) audio.playTick();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#111319]/85 backdrop-blur-xl border-b border-[#282d3c]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded bg-[#ffb800] text-[#111319] flex items-center justify-center font-bold text-sm tracking-wider font-mono shadow-sm group-hover:scale-105 transition-transform">
            CK
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white uppercase font-sans">
              Crunch Kingdom
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#ffb800] uppercase -mt-0.5 font-semibold">
              Reserve Acoustic Snacks
            </span>
          </div>
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#9e8f78] uppercase">
          <a href="#hero" className="hover:text-white transition-colors">Acoustic Reserve</a>
          <a href="#science" className="hover:text-white transition-colors">The 76.4 dBA Lab</a>
          <a href="#crate" className="hover:text-white transition-colors">Quad-Pack Crate</a>
          <a href="#roster" className="hover:text-white transition-colors">Individual Packs</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Commerce 10-Min Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#191b22] border border-[#282d3c] text-xs font-mono text-[#d5c4ab]">
            <Zap className="w-3.5 h-3.5 text-[#ffb800]" />
            <span>10-Min Dispatch</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={muted ? "Unmute Acoustic Effects" : "Mute Sound"}
            className="p-2 rounded bg-[#191b22] border border-[#282d3c] text-[#9e8f78] hover:text-[#ffb800] transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ffb800]" />}
          </button>

          {/* Bag Button */}
          <button
            onClick={() => {
              audio.playTick();
              onOpenCart();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#ffb800] hover:bg-[#ffc633] text-[#412d00] font-bold text-xs font-mono tracking-wide transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag • {cartCount} ({cartTotal > 0 ? `₹${cartTotal}` : "₹0"})</span>
          </button>
        </div>
      </div>
    </header>
  );
}

