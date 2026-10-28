import React, { useState } from "react";
import { Package, Flame, Leaf, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { audio } from "../utils/audioEngine";

export default function QuadCrateBuilder({ onAddCrate }) {
  const [activePreset, setActivePreset] = useState("balanced");
  const [lockedSuccess, setLockedSuccess] = useState(false);

  const presets = {
    balanced: {
      name: "The Balanced Quad",
      sub: "1 of each flavor",
      slots: [
        { name: "01. Tikka Tang", sub: "Fiery Smoke", icon: "flame" },
        { name: "02. Nimbu Pudina", sub: "Zesty Mint", icon: "leaf" },
        { name: "03. Rock Salt", sub: "Himalayan Pink", icon: "sparkles" },
        { name: "04. Cheesy Makhani", sub: "Velvet Butter", icon: "sparkles" }
      ]
    },
    fiery: {
      name: "Fiery Lovers",
      sub: "2 Tikka + 2 Pudina",
      slots: [
        { name: "01. Tikka Tang", sub: "Fiery Smoke", icon: "flame" },
        { name: "01. Tikka Tang", sub: "Fiery Smoke", icon: "flame" },
        { name: "02. Nimbu Pudina", sub: "Zesty Mint", icon: "leaf" },
        { name: "02. Nimbu Pudina", sub: "Zesty Mint", icon: "leaf" }
      ]
    },
    gentle: {
      name: "Gentle Reserve",
      sub: "2 Salt + 2 Makhani",
      slots: [
        { name: "03. Rock Salt", sub: "Himalayan Pink", icon: "sparkles" },
        { name: "03. Rock Salt", sub: "Himalayan Pink", icon: "sparkles" },
        { name: "04. Cheesy Makhani", sub: "Velvet Butter", icon: "sparkles" },
        { name: "04. Cheesy Makhani", sub: "Velvet Butter", icon: "sparkles" }
      ]
    }
  };

  const handleSelectPreset = (key) => {
    audio.playTick();
    setActivePreset(key);
  };

  const handleLockCrate = () => {
    audio.playAcousticCrunch();
    setLockedSuccess(true);
    onAddCrate(presets[activePreset]);
    setTimeout(() => {
      setLockedSuccess(false);
    }, 1800);
  };

  const currentSlots = presets[activePreset].slots;

  return (
    <section id="crate" className="w-full py-20 border-t border-[#282d3c] bg-[#0c0e14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-8 lg:p-12 rounded-2xl bg-[#161922] border border-[#282d3c] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Preset controls & Pricing */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#ffb800] text-[#412d00] font-mono text-[11px] font-bold uppercase tracking-wider">
                  EXCLUSIVE BUNDLE
                </span>
                <span className="text-xs font-mono text-[#9e8f78]">SAVE ₹20</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                  Build Your Quad-Pack Crate
                </h2>
                <p className="text-sm text-[#c4c6cc] leading-relaxed">
                  Four full 65g packs securely cradled in acoustic-dampened recyclable craft mailers. Precision fresh dispatch.
                </p>
                <div className="flex items-baseline gap-3 pt-2 font-mono">
                  <span className="text-3xl font-extrabold text-[#ffb800]">₹180</span>
                  <span className="text-base text-[#9e8f78] line-through">₹200</span>
                  <span className="text-xs text-[#9e8f78]">(₹45 per pack)</span>
                </div>
              </div>

              {/* 1-Tap Presets */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono tracking-wider text-[#9e8f78] uppercase block">
                  INSTANT 1-TAP CURATIONS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Object.entries(presets).map(([key, data]) => {
                    const isSelected = activePreset === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelectPreset(key)}
                        className={`p-3.5 rounded-lg text-left transition-all font-mono border ${
                          isSelected
                            ? "bg-[#1e1f26] border-[#ffb800] shadow-sm shadow-[#ffb800]/10"
                            : "bg-[#111319] border-[#282d3c] hover:bg-[#1e1f26]"
                        }`}
                      >
                        <div className="text-xs font-bold text-white mb-0.5">{data.name}</div>
                        <div className="text-[10px] text-[#9e8f78]">{data.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lock Button */}
              <button
                onClick={handleLockCrate}
                className={`w-full sm:w-auto px-8 py-4 rounded font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                  lockedSuccess
                    ? "bg-emerald-500 text-black shadow-emerald-500/20"
                    : "bg-[#ffb800] hover:bg-[#ffc633] text-[#412d00] shadow-[#ffb800]/20"
                }`}
              >
                {lockedSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>QUAD CRATE LOCKED IN BAG!</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    <span>+ LOCK QUAD PACK (₹180)</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Visual Crate Slot Representation */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md p-6 rounded-xl bg-[#1e1f26] border border-[#282d3c] space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#282d3c]">
                  <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase">
                    <Package className="w-4 h-4 text-[#ffb800]" />
                    <span>CURATED CRATE SLOTS (4/4)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9e8f78]">Zero Plastic Shell</span>
                </div>

                {/* 4 Slots */}
                <div className="grid grid-cols-2 gap-3">
                  {currentSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#161922] border border-[#282d3c] flex flex-col items-center text-center space-y-2 hover:border-[#ffb800]/40 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-full bg-[#ffb800]/10 flex items-center justify-center text-[#ffb800] font-mono text-xs font-bold">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="font-mono text-xs font-bold text-white block">
                          {slot.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#9e8f78]">
                          65g Reserve · {slot.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded bg-[#111319] border border-[#282d3c] text-center font-mono text-[11px] text-[#9e8f78]">
                  Includes complimentary acoustic batch test certificate.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

