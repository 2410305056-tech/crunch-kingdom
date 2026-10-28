import React from "react";
import { Plus, Coffee, Sparkles } from "lucide-react";
import { audio } from "../utils/audioEngine";

export default function ReserveRoster({ flavors, onAddToCart }) {
  return (
    <section id="roster" className="w-full py-20 border-t border-[#282d3c] bg-[#111319]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#282d3c]">
          <div>
            <div className="flex items-center gap-2 text-[#ffb800] text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              INDIVIDUAL SINGLE ORIGINS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              The Signature Reserve Line
            </h2>
          </div>
          <span className="font-mono text-xs text-[#9e8f78] mt-4 md:mt-0">
            ALL SINGLE PACKS ₹50 · 65 GRAMS
          </span>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flavors.map((flavor) => (
            <div
              key={flavor.id}
              className="p-5 rounded-xl bg-[#161922] border border-[#282d3c] flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:border-[#ffb800]/40 transition-all duration-300 group"
            >
              <div className="space-y-3">
                {/* Image */}
                <div className="w-full aspect-square rounded-lg bg-[#0c0e14] overflow-hidden relative">
                  <img
                    src={flavor.chipShot}
                    alt={flavor.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#111319]/90 text-[#ffb800] font-mono text-[10px] font-bold border border-white/10 backdrop-blur">
                    {flavor.heatScale}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[#ffb800] font-bold uppercase tracking-wider block">
                    {flavor.profile}
                  </span>
                  <h3 className="font-bold text-base text-white tracking-tight leading-snug">
                    {flavor.fullName}
                  </h3>
                  <p className="text-xs text-[#c4c6cc] leading-relaxed pt-0.5 line-clamp-2">
                    {flavor.subtitle}
                  </p>
                </div>
              </div>

              {/* Chai Pairing & Add Button */}
              <div className="pt-3 border-t border-[#282d3c]/60 space-y-3">
                <div className="flex items-center gap-1.5 text-[#9e8f78] font-mono text-[11px]">
                  <Coffee className="w-3.5 h-3.5 text-[#ffb800]" />
                  <span>Pairs with: {flavor.chaiPairing}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-lg font-bold text-white">₹{flavor.price}</span>
                  <button
                    onClick={() => {
                      audio.playCartAdd();
                      onAddToCart(flavor);
                    }}
                    className="px-3.5 py-1.5 rounded bg-[#1e1f26] hover:bg-[#ffb800] text-white hover:text-[#412d00] font-mono text-xs font-bold transition-all border border-[#282d3c] hover:border-[#ffb800] flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

