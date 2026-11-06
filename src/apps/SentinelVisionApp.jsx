import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Eye,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Cpu,
  Video,
  Mic,
  Image as ImageIcon,
  FileSpreadsheet,
  UploadCloud,
  Download,
  Fingerprint,
  Printer
} from 'lucide-react';

const MEDIA_INVESTIGATIONS = [
  {
    id: "SYNTH-2026-VID-01",
    type: "Video",
    title: "Executive Video Broadcast — Lip-Sync GAN Manipulation",
    sourceFile: "briefing_leak_h264_1080p.mp4",
    duration: "00:42.15",
    totalFrames: 1264,
    tamperVerdict: "Manipulated (Deepfake)",
    confidence: 96.8,
    riskLevel: "CRITICAL",
    detectedModel: "Wav2Lip / Diff-Talk Latent Diffusion",
    resolution: "1920x1080",
    prnuSensorMatch: "Failed (Synthetic sensor noise)",
    rppgHeartbeat: "Flatline (0 BPM - Biological Inconsistency)",
    blinkRate: "0 blinks/42s (Human norm: 12-16/min)",
    audioSyncDiscrepancy: "84ms desynchronization",
    description: "Deep learning examination using ResNet-FaceForensics++ and Spatio-Temporal MesoNet. Significant boundary blending artifacts detected around perioral region.",
    indicators: [
      { name: "Perioral Blending Artifacts", score: 98, status: "Critical" },
      { name: "rPPG Vascular Pulse Perfusion", score: 99, status: "Critical" },
      { name: "Optical Flow Frame Discontinuity", score: 92, status: "High" },
      { name: "Eyelid Blink Kinematics", score: 95, status: "Critical" }
    ],
    audioWaveform: [45, 62, 80, 20, 15, 88, 92, 110, 30, 20, 75, 85, 95, 20, 10, 65, 80, 90, 25, 15, 70, 85]
  },
  {
    id: "SYNTH-2026-AUD-04",
    type: "Audio",
    title: "Wiretap Telephonic Ransom Call — Neural Voice Clone",
    sourceFile: "intercept_trunk_call_ch02.wav",
    duration: "00:28.40",
    totalFrames: 852,
    tamperVerdict: "Manipulated (AI Voice Clone)",
    confidence: 98.4,
    riskLevel: "CRITICAL",
    detectedModel: "VITS / ElevenLabs Fast-Diffusion Neural TTS",
    resolution: "24-bit PCM / Mono",
    prnuSensorMatch: "N/A",
    rppgHeartbeat: "N/A",
    blinkRate: "N/A",
    audioSyncDiscrepancy: "Robotic harmonic alignment",
    description: "Multi-band Mel-spectrogram examination reveals artificial high-frequency brick-wall attenuation above 8.0 kHz. Zero respiratory pauses across speech burst.",
    indicators: [
      { name: "High-Freq Brickwall Cutoff (>8kHz)", score: 99, status: "Critical" },
      { name: "Acoustic Respiration Absence", score: 98, status: "Critical" },
      { name: "Robotic Pitch Harmonic Regularity", score: 96, status: "Critical" },
      { name: "Temporal Phase Jitter Inconsistency", score: 94, status: "High" }
    ],
    audioWaveform: [90, 95, 88, 92, 94, 91, 93, 89, 95, 92, 90, 94, 92, 96, 91, 95, 93, 90, 94, 92, 95, 91]
  },
  {
    id: "SYNTH-2026-IMG-09",
    type: "Image",
    title: "Surveillance Scene Still — Error Level Analysis (ELA) Splice",
    sourceFile: "cctv_frame_4402_extract.jpg",
    duration: "Static Frame",
    totalFrames: 1,
    tamperVerdict: "Manipulated (Digital Splice)",
    confidence: 92.1,
    riskLevel: "HIGH",
    detectedModel: "Composite Copy-Move & Generative Inpainting",
    resolution: "3840x2160",
    prnuSensorMatch: "Discrepancy in region [X:410, Y:820]",
    rppgHeartbeat: "N/A",
    blinkRate: "N/A",
    audioSyncDiscrepancy: "N/A",
    description: "JPEG compression quantization matrix analysis reveals high-frequency error gradient discrepancy on weapon holster and timestamp overlay.",
    indicators: [
      { name: "JPEG Quantization Table Mismatch", score: 95, status: "Critical" },
      { name: "Error Level Analysis Gradient", score: 93, status: "Critical" },
      { name: "Lighting Direction Angle Conflict", score: 89, status: "High" }
    ],
    audioWaveform: [30, 20, 40, 15, 25, 35, 20, 10, 25, 30, 15, 20, 25, 30, 15, 20, 25, 10, 15, 20, 10, 5]
  },
  {
    id: "SYNTH-2026-VID-14",
    type: "Video",
    title: "Officer Bodycam Capture — Baseline Authenticity Exemplar",
    sourceFile: "axon_body_cam_clip_9011.mp4",
    duration: "00:35.00",
    totalFrames: 1050,
    tamperVerdict: "Verified Authentic",
    confidence: 2.1,
    riskLevel: "LOW",
    detectedModel: "None (Hardware Sensor Provenance Confirmed)",
    resolution: "1920x1080",
    prnuSensorMatch: "Verified (Axon Sensor Hash Matched)",
    rppgHeartbeat: "74 BPM (Normal Physiological Blood Perfusion)",
    blinkRate: "14 blinks/min (Consistent with Stress Response)",
    audioSyncDiscrepancy: "0.0ms (Perfect Sensor Coherence)",
    description: "Full spectrum biological and spatial analysis confirms unbroken chain of hardware provenance. Natural micro-saccades and subcutaneous capillary blood perfusion.",
    indicators: [
      { name: "rPPG Vascular Pulse Perfusion", score: 4, status: "Normal" },
      { name: "Sensor PRNU Pattern Verification", score: 2, status: "Normal" },
      { name: "Natural Optical Flow & Motion Blur", score: 3, status: "Normal" }
    ],
    audioWaveform: [20, 45, 60, 30, 15, 80, 50, 25, 40, 65, 30, 15, 70, 45, 20, 35, 60, 25, 10, 50, 30, 15]
  }
];

export default function SentinelVisionApp() {
  const [activeCase, setActiveCase] = useState(MEDIA_INVESTIGATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(486);
  const [viewMode, setViewMode] = useState("heatmap");
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && activeCase.totalFrames > 1) {
      timer = setInterval(() => {
        setCurrentFrame(prev => (prev >= activeCase.totalFrames ? 1 : prev + 6));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeCase]);

  const handleCaseSelect = (item) => {
    setActiveCase(item);
    setCurrentFrame(item.type === "Image" ? 1 : Math.floor(item.totalFrames / 3));
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080C14] border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#070A10] rounded-[10px] flex items-center justify-center">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">SentinelVision AI™</h2>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                FRE 901 Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400">Deepfake Detection, Voice Clone Spectrogram & rPPG Pulse Biometrics</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDossierModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Subpoena Dossier</span>
          </button>
          <button
            onClick={() => alert("Simulation: Suspect file ingested into deep learning verification queue.")}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Ingest Media</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Model Precision</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">99.1% F1</div>
          <div className="text-[11px] text-cyan-400 mt-1 font-mono">FaceForensics++ v3</div>
        </div>

        <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Target</span>
            <Video className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white truncate">{activeCase.type}</div>
          <div className="text-[11px] text-amber-400 mt-1 truncate">{activeCase.sourceFile}</div>
        </div>

        <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Synthesis Probability</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className={`text-2xl font-bold font-mono ${activeCase.riskLevel === 'CRITICAL' ? 'text-rose-500' : 'text-emerald-400'}`}>
            {activeCase.confidence}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{activeCase.tamperVerdict}</div>
        </div>

        <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">FRE 901 Standard</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">Court Ready</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-medium">Tamper Proof</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Media Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-[#0B0F1A] p-1.5 rounded-xl border border-slate-800">
            {MEDIA_INVESTIGATIONS.map(item => (
              <button
                key={item.id}
                onClick={() => handleCaseSelect(item)}
                className={`flex-1 min-w-[140px] px-3 py-2 rounded-lg text-xs font-medium transition-all text-left flex items-center gap-2 ${
                  activeCase.id === item.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                {item.type === "Video" && <Video className="w-3.5 h-3.5 text-cyan-400" />}
                {item.type === "Audio" && <Mic className="w-3.5 h-3.5 text-amber-400" />}
                {item.type === "Image" && <ImageIcon className="w-3.5 h-3.5 text-purple-400" />}
                <span className="truncate">{item.title.split('—')[0]}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#090D16] border border-slate-800 rounded-2xl overflow-hidden relative shadow-xl">
            <div className="bg-[#0E1320] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${activeCase.riskLevel === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`}></span>
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                  Media Viewport
                </span>
                <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                  {activeCase.sourceFile}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setViewMode("rgb")}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                    viewMode === "rgb" ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                  }`}
                >
                  RGB
                </button>
                <button
                  onClick={() => setViewMode("heatmap")}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                    viewMode === "heatmap" ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                  }`}
                >
                  GAN Heatmap
                </button>
                <button
                  onClick={() => setViewMode("optical")}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                    viewMode === "optical" ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                  }`}
                >
                  Optical Flow
                </button>
                <button
                  onClick={() => setViewMode("rppg")}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                    viewMode === "rppg" ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                  }`}
                >
                  rPPG
                </button>
              </div>
            </div>

            {/* Viewport Display */}
            <div className="relative h-[310px] w-full bg-[#06080E] flex items-center justify-center p-4">
              <div className="relative w-60 h-60 flex items-center justify-center">
                <svg viewBox="0 0 200 240" className="w-full h-full text-slate-600">
                  <path d="M 60 40 Q 100 10 140 40 Q 170 80 160 150 Q 150 210 100 230 Q 50 210 40 150 Q 30 80 60 40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  <ellipse cx="75" cy="95" rx="14" ry="8" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
                  <circle cx="75" cy="95" r="4" fill="#06B6D4" />
                  <ellipse cx="125" cy="95" rx="14" ry="8" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
                  <circle cx="125" cy="95" r="4" fill="#06B6D4" />
                  <ellipse cx="100" cy="170" rx="28" ry="14" fill="none" stroke={viewMode === "heatmap" ? "#EF4444" : "#94A3B8"} strokeWidth="2" />
                </svg>

                {viewMode === "heatmap" && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-24 h-16 rounded-full bg-rose-500/35 blur-xl mt-28 border border-rose-500 animate-pulse"></div>
                  </div>
                )}

                {viewMode === "rppg" && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-center">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Biological Pulse</div>
                      <div className="text-sm font-bold font-mono text-rose-500 mt-1">{activeCase.rppgHeartbeat}</div>
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">
                  FRAME: {currentFrame}
                </div>
              </div>

              <div className="absolute bottom-3 left-3 bg-[#0B0F1A]/90 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-xs font-mono text-slate-300">
                  Synthesis Risk: <strong className={activeCase.riskLevel === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'}>{activeCase.confidence}%</strong>
                </span>
              </div>
            </div>

            {/* Playback bar */}
            <div className="bg-[#0B0F1A] border-t border-slate-800 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded bg-cyan-500/20 text-cyan-300">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setCurrentFrame(prev => Math.max(1, prev - 30))} className="p-1 rounded text-slate-300">
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setCurrentFrame(prev => Math.min(activeCase.totalFrames, prev + 30))} className="p-1 rounded text-slate-300">
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300 ml-2">Frame {currentFrame} / {activeCase.totalFrames}</span>
                </div>
                <span>{activeCase.duration}</span>
              </div>

              <input
                type="range"
                min="1"
                max={activeCase.totalFrames}
                value={currentFrame}
                onChange={(e) => setCurrentFrame(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Scorecard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0B0F1A] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Evidentiary Verdict</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeCase.tamperVerdict}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                activeCase.riskLevel === 'CRITICAL' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              }`}>
                {activeCase.riskLevel} RISK
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">XAI Anomaly Breakdown</span>
              {activeCase.indicators.map((ind, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{ind.name}</span>
                    <span className={`font-mono ${ind.score > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>{ind.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div style={{ width: `${ind.score}%` }} className={`h-full ${ind.score > 80 ? 'bg-rose-500' : 'bg-emerald-400'}`}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#080B12] rounded-xl border border-slate-800 text-xs text-slate-300">
              <p>{activeCase.description}</p>
            </div>

            <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase">Architecture:</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeCase.detectedModel}</div>
              </div>
              <Fingerprint className="w-5 h-5 text-cyan-400" />
            </div>

            <button
              onClick={() => setIsDossierModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Subpoena Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subpoena Modal */}
      {isDossierModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0E18] border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white">Subpoena Evidence Dossier</h4>
              <button onClick={() => setIsDossierModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 bg-[#070A10] p-4 rounded-xl border border-slate-800 font-mono">
              <p>Target Media: <strong>{activeCase.sourceFile}</strong></p>
              <p>Manipulation Score: <strong className="text-rose-400">{activeCase.confidence}%</strong></p>
              <p>Admissibility: Federal Rule of Evidence 901 Compliant</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsDossierModalOpen(false)} className="px-3 py-1.5 text-xs text-slate-400">Close</button>
              <button onClick={() => window.print()} className="px-3.5 py-1.5 text-xs font-bold bg-cyan-500 text-slate-950 rounded-lg flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" /> Print Affidavit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
