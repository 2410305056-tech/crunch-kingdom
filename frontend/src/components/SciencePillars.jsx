import React from "react";
import { Activity, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

export default function SciencePillars() {
  return (
    <section id="science" className="w-full py-20 border-t border-[#282d3c] bg-[#111319]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#282d3c]">
          <div>
            <div className="flex items-center gap-2 text-[#ffb800] text-xs font-mono tracking-widest uppercase mb-2">
              <Activity className="w-3.5 h-3.5" />
              ENGINEERING STANDARD · LAB SPEC CRN-IND-09
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              The Science of The Crunch
            </h2>
          </div>
          <p className="text-xs font-mono text-[#9e8f78] max-w-sm mt-4 md:mt-0">
            Calibrated inside an anechoic soundstage at 40cm distance. Mass wafers fold prematurely; our kettle cure shatters cleanly.
          </p>
        </div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Acoustic Metrology Comparison */}
          <div className="p-6 rounded-xl bg-[#161922] border border-[#282d3c] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#ffb800]/10 flex items-center justify-center text-[#ffb800]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Acoustic Metrology
              </h3>
              <p className="text-xs text-[#c4c6cc] leading-relaxed">
                Standard mass-market chips fold at 51.4 dBA. Crunch Kingdom Reserve sustains a crisp 76.4 dBA acoustic snap.
              </p>
            </div>

            {/* Comparison Visualizer */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between font-mono text-xs pb-1">
                  <span className="text-[#ffb800] font-bold">Crunch Kingdom Reserve</span>
                  <span className="text-[#ffb800] font-bold">76.4 dBA</span>
                </div>
                <div className="w-full bg-[#1e1f26] h-2.5 rounded-full overflow-hidden border border-[#282d3c]">
                  <div className="bg-[#ffb800] h-full rounded-full w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs pb-1 text-[#9e8f78]">
                  <span>Standard Mass Wafers</span>
                  <span>51.4 dBA</span>
                </div>
                <div className="w-full bg-[#1e1f26] h-2.5 rounded-full overflow-hidden border border-[#282d3c]">
                  <div className="bg-[#514532] h-full rounded-full w-[58%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 100% Clean Label Purity */}
          <div className="p-6 rounded-xl bg-[#161922] border border-[#282d3c] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#ffb800]/10 flex items-center justify-center text-[#ffb800]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                100% Clean Label Purity
              </h3>
              <p className="text-xs text-[#c4c6cc] leading-relaxed">
                Cold-pressed sunflower oil, genuine Himalayan pink mineral salt, and centrifugal vortex spinning.
              </p>
            </div>

            {/* 4 Clean Spec Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded bg-[#1e1f26] border border-[#282d3c]">
                <span className="font-mono text-xs text-[#ffb800] font-bold block">0% PALM OIL</span>
                <span className="text-[10px] font-mono text-[#9e8f78]">Cold-Pressed</span>
              </div>
              <div className="p-3 rounded bg-[#1e1f26] border border-[#282d3c]">
                <span className="font-mono text-xs text-white font-bold block">-35% OIL DROP</span>
                <span className="text-[10px] font-mono text-[#9e8f78]">Centrifugal Spin</span>
              </div>
              <div className="p-3 rounded bg-[#1e1f26] border border-[#282d3c]">
                <span className="font-mono text-xs text-white font-bold block">SENDHA SALT</span>
                <span className="text-[10px] font-mono text-[#9e8f78]">Himalayan Pink</span>
              </div>
              <div className="p-3 rounded bg-[#1e1f26] border border-[#282d3c]">
                <span className="font-mono text-xs text-[#ffb800] font-bold block">ZERO MSG</span>
                <span className="text-[10px] font-mono text-[#9e8f78]">Sun-Dried Spices</span>
              </div>
            </div>
          </div>

          {/* Card 3: 10-Min Dark Pods */}
          <div className="p-6 rounded-xl bg-[#161922] border border-[#282d3c] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#ffb800]/10 flex items-center justify-center text-[#ffb800]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                10-Min Dark Pods
              </h3>
              <p className="text-xs text-[#c4c6cc] leading-relaxed">
                Hyper-local dark hubs across Mumbai, Bengaluru, and Delhi NCR stock fresh batches at zero humidity.
              </p>
            </div>

            {/* Speed Chips */}
            <div className="space-y-2 pt-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f26] border border-[#282d3c]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white">Zepto Dark Hub</span>
                </div>
                <span className="text-[#ffb800] font-bold">9 mins avg</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f26] border border-[#282d3c]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white">Blinkit Express</span>
                </div>
                <span className="text-white font-bold">11 mins avg</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f26] border border-[#282d3c]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white">Instamart Pod</span>
                </div>
                <span className="text-[#9e8f78] font-bold">12 mins avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

