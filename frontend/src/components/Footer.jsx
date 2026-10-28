import React from "react";
import { ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0e14] border-t border-[#282d3c] py-16 text-[#9e8f78] font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#ffb800] text-[#111319] flex items-center justify-center font-bold text-xs tracking-wider font-mono">
                CK
              </div>
              <span className="font-extrabold text-base uppercase text-white font-sans tracking-tight">
                Crunch Kingdom Reserve
              </span>
            </div>
            <p className="text-xs text-[#c4c6cc] leading-relaxed max-w-md">
              Precision acoustic reserve batches calibrated at 76.4 dBA. Artisanal whole pulses, cold-pressed golden mustard seed essence, and zero palm oil protocol.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-[#161922] border border-[#282d3c] text-[#ffb800]">
                FSSAI LIC: 10023022001482
              </span>
              <span className="px-2.5 py-1 rounded bg-[#161922] border border-[#282d3c] text-[#c4c6cc]">
                Zero Palm Oil Mandate
              </span>
              <span className="px-2.5 py-1 rounded bg-[#161922] border border-[#282d3c] text-[#c4c6cc]">
                100% Cold-Pressed
              </span>
            </div>
          </div>

          <div className="space-y-3 font-mono">
            <span className="text-xs uppercase text-[#ffb800] tracking-wider font-bold block">
              The Reserve Line
            </span>
            <ul className="space-y-2 text-xs text-[#c4c6cc]">
              <li><a href="#hero" className="hover:text-white transition-colors">01. Tikka Tang (Fiery)</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">02. Nimbu Pudina (Tangy)</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">03. Pure Rock Salt (Pure)</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">04. Cheesy Makhani (Velvet)</a></li>
              <li><a href="#crate" className="hover:text-[#ffb800] transition-colors">Curated Quad-Pack Crate</a></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono">
            <span className="text-xs uppercase text-[#ffb800] tracking-wider font-bold block">
              Acoustic Science
            </span>
            <ul className="space-y-2 text-xs text-[#c4c6cc]">
              <li><a href="#science" className="hover:text-white transition-colors">Anechoic Chamber 76.4 dBA</a></li>
              <li><a href="#science" className="hover:text-white transition-colors">Centrifugal Vortex Spin</a></li>
              <li><a href="#science" className="hover:text-white transition-colors">Himalayan Sendha Sourcing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quick-Commerce Dark Hubs</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#282d3c]/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#9e8f78]">
          <span>© 2026 Crunch Kingdom Reserve Pvt. Ltd. Engineered in Mumbai.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Dispatch</a>
            <a href="#" className="hover:text-white transition-colors">FSSAI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

