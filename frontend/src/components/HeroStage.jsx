import React, { useState } from "react";
import { ShoppingBag, Zap, Volume2, Sparkles, Activity } from "lucide-react";
import { audio } from "../utils/audioEngine";

export default function HeroStage({ flavors, activeFlavor, onSelectFlavor, onAddToCart }) {
  const [isPlayingSnap, setIsPlayingSnap] = useState(false);

  const handlePlaySnap = () => {
    audio.playAcousticCrunch();
    setIsPlayingSnap(true);
    setTimeout(() => {
      setIsPlayingSnap(false);
    }, 1200);
  };

  return (
    <section id="hero" className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-20">
      {/* Ambient Radial Lighting Glow */}
      <div 
        className="absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-700"
        style={{ backgroundColor: activeFlavor.ambientGlow }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Clean, Authoritative Messaging */}
        <div className="lg:col-span-7 space-y-6">
          {/* Batch Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1e1f26] border border-[#282d3c] text-xs font-mono text-[#d5c4ab]">
            <span className="w-2 h-2 rounded-full bg-[#ffb800] animate-pulse" />
            <span className="text-[#ffb800] font-bold">BATCH CALIBRATION #764</span>
            <span className="text-[#514532]">·</span>
            <span>ANECHOIC CHAMBER CERTIFIED</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] font-sans">
              THE 76.4 dBA <br />
              <span className="relative inline-block text-[#ffb800]">
                CRUNCH
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#ffb800] rounded-full" />
              </span>
              .
            </h1>
            <p className="text-base sm:text-lg text-[#c4c6cc] max-w-xl leading-relaxed">
              Kettle-crisped in cold-pressed oil with hand-ground spices. Scientifically calibrated in an anechoic soundstage to shatter at exactly 76.4 decibels.
            </p>
          </div>

          {/* 4 Flavor Selector Tabs */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono tracking-widest text-[#9e8f78] uppercase block">
              SELECT ACOUSTIC PROFILE
            </span>
            <div className="flex flex-wrap gap-2">
              {flavors.map((f) => {
                const isActive = activeFlavor.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      audio.playTick();
                      onSelectFlavor(f);
                    }}
                    className={`px-4 py-2.5 rounded font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-[#ffb800] text-[#412d00] shadow-md shadow-[#ffb800]/15"
                        : "bg-[#1e1f26] text-[#e2e2eb] border border-[#282d3c] hover:bg-[#282a30]"
                    }`}
                  >
                    <span>{f.name}</span>
                    <span className={`text-[10px] ${isActive ? "text-[#412d00]/80" : "text-[#9e8f78]"}`}>
                      ({f.profile.split(" ")[0]})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button & Quick Dispatch */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                audio.playCartAdd();
                onAddToCart(activeFlavor);
              }}
              className="px-8 py-3.5 rounded bg-[#ffb800] hover:bg-[#ffc633] text-[#412d00] font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-lg shadow-[#ffb800]/20 flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>GRAB PACK • ₹{activeFlavor.price}</span>
            </button>

            <div className="flex items-center gap-2 px-4 py-3 rounded bg-[#191b22] border border-[#282d3c] text-xs font-mono text-[#c4c6cc]">
              <Zap className="w-4 h-4 text-[#ffb800]" />
              <span>10-Min Dispatch via Zepto & Blinkit</span>
            </div>
          </div>

          {/* Clean 3-Metric Spec Ribbon */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="p-3 rounded bg-[#191b22] border border-[#282d3c]">
              <span className="font-mono text-lg font-bold text-white block">1.8mm</span>
              <span className="text-[10px] font-mono text-[#9e8f78] uppercase">Precision Slice</span>
            </div>
            <div className="p-3 rounded bg-[#191b22] border border-[#282d3c]">
              <span className="font-mono text-lg font-bold text-[#ffb800] block">0.0%</span>
              <span className="text-[10px] font-mono text-[#9e8f78] uppercase">Zero Palm Oil</span>
            </div>
            <div className="p-3 rounded bg-[#191b22] border border-[#282d3c]">
              <span className="font-mono text-lg font-bold text-white block">65g</span>
              <span className="text-[10px] font-mono text-[#9e8f78] uppercase">Reserve Batch</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Pack Presentation + Audio Chamber */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          <div className="w-full rounded-xl bg-[#161922] border border-[#282d3c] p-6 relative overflow-hidden shadow-2xl flex flex-col items-center">
            {/* Header Telemetry */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#282d3c]/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffb800]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {activeFlavor.fullName}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#ffb800] px-2 py-0.5 rounded bg-[#1e1f26] border border-[#282d3c]">
                {activeFlavor.batchCode.split(" ")[0]}
              </span>
            </div>

            {/* Pack Imagery Container with smooth transition */}
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#0c0e14] flex items-center justify-center my-4 group">
              <img
                key={activeFlavor.id}
                src={activeFlavor.packImage}
                alt={activeFlavor.fullName}
                className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-[#111319]/90 text-[#ffb800] backdrop-blur border border-white/10">
                  {activeFlavor.batchCode}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#111319]/90 text-white backdrop-blur border border-white/10">
                  Fracture: {activeFlavor.fractureTest}
                </span>
              </div>
            </div>

            {/* Acoustic Equalizer & Real Sound Snap Trigger */}
            <div className="w-full p-4 rounded-lg bg-[#1e1f26] border border-[#282d3c] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-1.5 text-white">
                  <Activity className="w-3.5 h-3.5 text-[#ffb800]" />
                  <span>ACOUSTIC RESONANCE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#9e8f78]">PEAK:</span>
                  <span className="text-[#ffb800] font-bold">{activeFlavor.decibels} dBA</span>
                  <span className="text-[#9e8f78]">/ 2.4 kHz</span>
                </div>
              </div>

              {/* Dynamic Soundwave Bars */}
              <div className="h-8 flex items-end justify-between gap-1 px-2 py-1 bg-[#111319] rounded border border-[#282d3c]/50">
                <div className="w-1.5 bg-[#ffb800]/50 rounded-full h-3 animate-equalizer-1" />
                <div className="w-1.5 bg-[#ffb800]/70 rounded-full h-5 animate-equalizer-2" />
                <div className="w-1.5 bg-[#ffb800] rounded-full h-7 animate-equalizer-3" />
                <div className="w-1.5 bg-[#ffb800] rounded-full h-8 animate-equalizer-4" />
                <div className="w-1.5 bg-[#ffb800] rounded-full h-6 animate-equalizer-5" />
                <div className="w-1.5 bg-[#ffb800]/80 rounded-full h-4 animate-equalizer-1" />
                <div className="w-1.5 bg-[#ffb800] rounded-full h-7 animate-equalizer-2" />
                <div className="w-1.5 bg-[#ffb800]/60 rounded-full h-3 animate-equalizer-3" />
                <div className="w-1.5 bg-[#ffb800] rounded-full h-8 animate-equalizer-4" />
                <div className="w-1.5 bg-[#ffb800]/70 rounded-full h-5 animate-equalizer-5" />
                <div className="w-1.5 bg-[#ffb800] rounded-full h-6 animate-equalizer-1" />
                <div className="w-1.5 bg-[#ffb800]/50 rounded-full h-3 animate-equalizer-2" />
              </div>

              {/* Real Acoustic Snap Sound Trigger */}
              <button
                onClick={handlePlaySnap}
                className={`w-full py-2.5 px-4 rounded font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isPlayingSnap
                    ? "bg-[#ffb800] text-[#412d00] shadow-md shadow-[#ffb800]/20"
                    : "bg-[#282a30] hover:bg-[#33343b] text-white border border-[#282d3c]"
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingSnap ? "text-[#412d00]" : "text-[#ffb800]"}`} />
                <span>
                  {isPlayingSnap ? "SNAP! 76.4 dBA LOGGED" : "HEAR THE SNAP (76.4 dBA)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

