import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Eye,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Flame,
  Activity,
  Layers,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Mic,
  Video,
  Image as ImageIcon,
  Cpu,
  Fingerprint,
  Share2,
  ExternalLink,
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
    authenticScore: 3.2,
    riskLevel: "CRITICAL",
    detectedModel: "Wav2Lip / Diff-Talk Latent Diffusion",
    fps: 30,
    resolution: "1920x1080",
    prnuSensorMatch: "Failed (Synthetic sensor noise)",
    rppgHeartbeat: "Flatline (0 BPM - Biological Inconsistency)",
    blinkRate: "0 blinks/42s (Human norm: 12-16/min)",
    audioSyncDiscrepancy: "84ms desynchronization",
    description: "Deep learning examination using ResNet-FaceForensics++ and Spatio-Temporal MesoNet. Significant boundary blending artifacts detected around perioral (mouth) region. Facial landmark micro-jitter indicates synthetic frame-to-frame warping.",
    indicators: [
      { name: "Perioral Blending Artifacts", score: 98, status: "Critical" },
      { name: "rPPG Vascular Pulse Perfusion", score: 99, status: "Critical" },
      { name: "Optical Flow Frame Discontinuity", score: 92, status: "High" },
      { name: "Eyelid Blink Kinematics", score: 95, status: "Critical" },
      { name: "PRNU Camera Sensor Noise", score: 88, status: "High" }
    ],
    audioWaveform: [45, 62, 80, 20, 15, 88, 92, 110, 30, 20, 75, 85, 95, 20, 10, 65, 80, 90, 25, 15, 70, 85],
    timelineAnomalies: [
      { frame: 142, time: "00:04.7", note: "Mouth boundary pixel tearing" },
      { frame: 486, time: "00:16.2", note: "Teeth geometry inversion artifact" },
      { frame: 890, time: "00:29.6", note: "Unnatural eye pupil warp during head turn" }
    ]
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
    authenticScore: 1.6,
    riskLevel: "CRITICAL",
    detectedModel: "VITS / ElevenLabs Fast-Diffusion Neural TTS",
    fps: 48000,
    resolution: "24-bit PCM / Mono",
    prnuSensorMatch: "N/A (Acoustic Stream)",
    rppgHeartbeat: "N/A",
    blinkRate: "N/A",
    audioSyncDiscrepancy: "Robotic harmonic alignment",
    description: "Multi-band Mel-spectrogram examination reveals artificial high-frequency brick-wall attenuation above 8.0 kHz. Zero respiratory pauses (inhalations/exhalations) across speech burst, confirming synthetic neural text-to-speech generation.",
    indicators: [
      { name: "High-Freq Brickwall Cutoff (>8kHz)", score: 99, status: "Critical" },
      { name: "Acoustic Respiration Inhalation Absence", score: 98, status: "Critical" },
      { name: "Robotic Pitch Harmonic Regularity", score: 96, status: "Critical" },
      { name: "Temporal Phase Jitter Inconsistency", score: 94, status: "High" },
      { name: "Glottal Pulse Synthetic Uniformity", score: 97, status: "Critical" }
    ],
    audioWaveform: [90, 95, 88, 92, 94, 91, 93, 89, 95, 92, 90, 94, 92, 96, 91, 95, 93, 90, 94, 92, 95, 91],
    timelineAnomalies: [
      { frame: 80, time: "00:02.6", note: "Absence of glottal closure transient" },
      { frame: 320, time: "00:10.6", note: "Synthetic pitch stability flatline" },
      { frame: 640, time: "00:21.3", note: "Artificial harmonic frequency duplication" }
    ]
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
    authenticScore: 7.9,
    riskLevel: "HIGH",
    detectedModel: "Composite Copy-Move & Generative Inpainting",
    fps: 1,
    resolution: "3840x2160",
    prnuSensorMatch: "Discrepancy in region [X:410, Y:820]",
    rppgHeartbeat: "N/A",
    blinkRate: "N/A",
    audioSyncDiscrepancy: "N/A",
    description: "JPEG compression quantization matrix analysis reveals high-frequency error gradient discrepancy on weapon holster and timestamp overlay. Weapon region was spliced from separate 72 DPI image and upscaled.",
    indicators: [
      { name: "JPEG Quantization Table Mismatch", score: 95, status: "Critical" },
      { name: "Error Level Analysis (ELA) Gradient", score: 93, status: "Critical" },
      { name: "Lighting Direction Angle Conflict", score: 89, status: "High" },
      { name: "CFA Demosaicing Inconsistency", score: 91, status: "High" },
      { name: "EXIF Hardware Metadata Stripped", score: 85, status: "Medium" }
    ],
    audioWaveform: [30, 20, 40, 15, 25, 35, 20, 10, 25, 30, 15, 20, 25, 30, 15, 20, 25, 10, 15, 20, 10, 5],
    timelineAnomalies: [
      { frame: 1, time: "00:00.0", note: "Primary weapon holster ROI splice detected" }
    ]
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
    authenticScore: 97.9,
    riskLevel: "LOW",
    detectedModel: "None (Hardware Sensor Provenance Confirmed)",
    fps: 30,
    resolution: "1920x1080",
    prnuSensorMatch: "Verified (Axon Body 3 Sensor Hash Matched)",
    rppgHeartbeat: "74 BPM (Normal Physiological Blood Perfusion)",
    blinkRate: "14 blinks/min (Consistent with Stress Response)",
    audioSyncDiscrepancy: "0.0ms (Perfect Sensor Coherence)",
    description: "Full spectrum biological and spatial analysis confirms unbroken chain of hardware provenance. Natural micro-saccades, subcutaneous capillary blood perfusion (rPPG), and unbroken PRNU camera sensor fingerprint verified.",
    indicators: [
      { name: "rPPG Vascular Pulse Perfusion", score: 4, status: "Normal" },
      { name: "Sensor PRNU Pattern Verification", score: 2, status: "Normal" },
      { name: "Natural Optical Flow & Motion Blur", score: 3, status: "Normal" },
      { name: "Acoustic Respiration Inhalation", score: 1, status: "Normal" },
      { name: "Hardware Secure Timestamp Seal", score: 1, status: "Normal" }
    ],
    audioWaveform: [20, 45, 60, 30, 15, 80, 50, 25, 40, 65, 30, 15, 70, 45, 20, 35, 60, 25, 10, 50, 30, 15],
    timelineAnomalies: [
      { frame: 1, time: "00:00.0", note: "Hardware cryptographic watermark intact" }
    ]
  }
];

export default function App() {
  const [activeCase, setActiveCase] = useState(MEDIA_INVESTIGATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(486);
  const [viewMode, setViewMode] = useState("heatmap"); // 'rgb' | 'heatmap' | 'optical' | 'rppg'
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");

  // Playback simulation
  useEffect(() => {
    let timer;
    if (isPlaying && activeCase.totalFrames > 1) {
      timer = setInterval(() => {
        setCurrentFrame(prev => (prev >= activeCase.totalFrames ? 1 : prev + 6));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeCase]);

  // Adjust frame if case switches
  const handleCaseSelect = (item) => {
    setActiveCase(item);
    setCurrentFrame(item.type === "Image" ? 1 : Math.floor(item.totalFrames / 3));
    setIsPlaying(false);
  };

  const filteredCases = MEDIA_INVESTIGATIONS.filter(item => {
    if (filterType === "all") return true;
    return item.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Top Banner: Academic & Standards Compliance Header */}
      <aside aria-label="Assessment notice" className="bg-[#0A0E18] border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between text-slate-400 gap-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Assessment-3: AI for Forensic Science (UG) - Advanced
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">Federal Rule of Evidence 901 & SWGDE Digital Forensics</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">Vercel Deployment: <strong className="text-cyan-400 font-mono">LIVE-PROD</strong></span>
          <span className="hidden lg:inline text-slate-500">Neural Engine: <span className="text-slate-200">FaceForensics++ v3</span></span>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#080C14]/90 border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#070A10] rounded-[10px] flex items-center justify-center">
                <Eye className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  SentinelVision<span className="text-cyan-400 text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">AI-SUITE</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">Deepfake Detection & Synthetic Media Forensics Studio</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsDossierModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Subpoena Dossier</span>
            </button>

            <button
              onClick={() => alert("Simulation: Suspect video file queued for multi-GPU Spatio-Temporal decomposition.")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Ingest Media</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* KPI Banner */}
        <section aria-label="Key detection metrics" className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Model Precision (F1)</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">99.1%</div>
            <div className="text-[11px] text-cyan-400 mt-1 font-mono">
              ResNet + Spatio-Temporal MesoNet
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Active Forensic Target</span>
              <Video className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight truncate">{activeCase.type}</div>
            <div className="text-[11px] text-amber-400 mt-1 truncate">
              {activeCase.detectedModel.split('/')[0]}
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Manipulation Risk</span>
              <ShieldAlert className="w-4 h-4 text-rose-500" />
            </div>
            <div className={`text-2xl font-bold font-mono tracking-tight ${activeCase.riskLevel === 'CRITICAL' ? 'text-rose-500' : activeCase.riskLevel === 'HIGH' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {activeCase.confidence}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Verdict: {activeCase.tamperVerdict}
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">FRE 901 Admissibility</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">Court Ready</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium">
              Tamper Proof Evidence Hash
            </div>
          </div>
        </section>

        {/* Primary Workspace: Inspector & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Media Stage & Overlays (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Case Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0B0F1A] p-1.5 rounded-xl border border-slate-800">
              {MEDIA_INVESTIGATIONS.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleCaseSelect(item)}
                  className={`flex-1 min-w-[140px] px-3 py-2 rounded-lg text-xs font-medium transition-all text-left flex items-center justify-between gap-2 ${
                    activeCase.id === item.id
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {item.type === "Video" && <Video className="w-3.5 h-3.5 text-cyan-400" />}
                    {item.type === "Audio" && <Mic className="w-3.5 h-3.5 text-amber-400" />}
                    {item.type === "Image" && <ImageIcon className="w-3.5 h-3.5 text-purple-400" />}
                    <span className="truncate">{item.title.split('—')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Media Viewport Stage */}
            <div className="bg-[#090D16] border border-slate-800 rounded-2xl overflow-hidden relative shadow-xl">
              
              {/* Viewport Top Bar */}
              <div className="bg-[#0E1320] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeCase.riskLevel === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`}></span>
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Forensic Media Stream
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {activeCase.sourceFile}
                  </span>
                </div>

                {/* Overlay Toggle Buttons */}
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setViewMode("rgb")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      viewMode === "rgb" ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                    }`}
                  >
                    RGB
                  </button>
                  <button
                    onClick={() => setViewMode("heatmap")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      viewMode === "heatmap" ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                    }`}
                  >
                    GAN Heatmap
                  </button>
                  <button
                    onClick={() => setViewMode("optical")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      viewMode === "optical" ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                    }`}
                  >
                    Optical Flow
                  </button>
                  <button
                    onClick={() => setViewMode("rppg")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      viewMode === "rppg" ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700'
                    }`}
                  >
                    rPPG Pulse
                  </button>
                </div>
              </div>

              {/* Viewport Canvas Simulation */}
              <div className="relative h-[330px] w-full bg-[#06080E] flex items-center justify-center overflow-hidden scanlines p-4">
                
                {/* Synthetic Media Graphic Simulation */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  
                  {/* Face Outline & Biometric Mask */}
                  <svg viewBox="0 0 200 240" className="w-full h-full text-slate-600">
                    {/* Head contour */}
                    <path d="M 60 40 Q 100 10 140 40 Q 170 80 160 150 Q 150 210 100 230 Q 50 210 40 150 Q 30 80 60 40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    
                    {/* Eyes */}
                    <ellipse cx="75" cy="95" rx="14" ry="8" fill="none" stroke={viewMode === "optical" ? "#06B6D4" : "#94A3B8"} strokeWidth="1.5" />
                    <circle cx="75" cy="95" r="4" fill="#06B6D4" />

                    <ellipse cx="125" cy="95" rx="14" ry="8" fill="none" stroke={viewMode === "optical" ? "#06B6D4" : "#94A3B8"} strokeWidth="1.5" />
                    <circle cx="125" cy="95" r="4" fill="#06B6D4" />

                    {/* Nose bridge */}
                    <path d="M 100 95 L 98 135 L 108 135" fill="none" stroke="#64748B" strokeWidth="1.5" />

                    {/* Mouth perimeter (Perioral GAN region) */}
                    <ellipse cx="100" cy="170" rx="28" ry="14" fill="none" stroke={viewMode === "heatmap" ? "#EF4444" : "#94A3B8"} strokeWidth="2" />
                    <path d="M 80 170 Q 100 180 120 170" fill="none" stroke={viewMode === "heatmap" ? "#EF4444" : "#64748B"} strokeWidth="2" />

                    {/* Facial Landmark Tracking Dots */}
                    {[
                      [60, 40], [100, 20], [140, 40],
                      [55, 75], [75, 70], [90, 75], [110, 75], [125, 70], [145, 75],
                      [75, 95], [125, 95], [100, 115], [100, 135],
                      [80, 170], [100, 165], [120, 170], [100, 185],
                      [100, 220]
                    ].map(([x, y], idx) => (
                      <circle key={idx} cx={x} cy={y} r="2" fill="#06B6D4" opacity="0.8" />
                    ))}
                  </svg>

                  {/* Overlays dependent on viewMode */}
                  {viewMode === "heatmap" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-24 h-16 rounded-full bg-rose-500/35 blur-xl mt-28 border border-rose-500 animate-pulse"></div>
                      <div className="absolute top-[68%] text-[10px] font-mono text-rose-300 bg-slate-900/90 px-2 py-0.5 rounded border border-rose-500/40">
                        Boundary Artifact 98.4%
                      </div>
                    </div>
                  )}

                  {viewMode === "optical" && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Simulated motion vectors */}
                      <svg viewBox="0 0 200 240" className="w-full h-full">
                        <line x1="75" y1="95" x2="85" y2="90" stroke="#06B6D4" strokeWidth="2" markerEnd="url(#arrow)" />
                        <line x1="125" y1="95" x2="135" y2="90" stroke="#06B6D4" strokeWidth="2" />
                        <line x1="100" y1="170" x2="110" y2="185" stroke="#EF4444" strokeWidth="2.5" />
                        <line x1="85" y1="170" x2="75" y2="180" stroke="#EF4444" strokeWidth="2.5" />
                      </svg>
                      <div className="absolute bottom-6 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/40">
                        Discontinuity Jitter: +12.4 px
                      </div>
                    </div>
                  )}

                  {viewMode === "rppg" && (
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                      <div className="w-full max-w-[200px] bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-[10px] uppercase font-mono text-slate-400">Biological Pulse (rPPG)</div>
                        <div className="text-sm font-bold font-mono text-rose-500 mt-1">{activeCase.rppgHeartbeat}</div>
                        <div className="text-[10px] text-slate-400 mt-1">No Micro-vascular Perfusion Detected</div>
                      </div>
                    </div>
                  )}

                  {/* Corner Target Reticles */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 border-t-2 border-l-2 border-cyan-400"></span>
                    <span>FRAME: {currentFrame}</span>
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <span>RES: {activeCase.resolution}</span>
                    <span className="w-2 h-2 border-t-2 border-r-2 border-cyan-400"></span>
                  </div>
                </div>

                {/* Live Anomaly Alert Tag */}
                <div className="absolute bottom-3 left-3 bg-[#0B0F1A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${activeCase.riskLevel === 'CRITICAL' ? 'bg-rose-500' : 'bg-emerald-400'}`}></span>
                  <span className="text-xs font-mono font-medium text-slate-300">
                    Synthesis Probability: <strong className={activeCase.riskLevel === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'}>{activeCase.confidence}%</strong>
                  </span>
                </div>
              </div>

              {/* Media Controls Bar & Frame Scrubber */}
              <div className="bg-[#0B0F1A] border-t border-slate-800 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setCurrentFrame(prev => Math.max(1, prev - 30))}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentFrame(prev => Math.min(activeCase.totalFrames, prev + 30))}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-slate-300 ml-2">Frame {currentFrame} / {activeCase.totalFrames}</span>
                  </div>
                  <span>Timestamp: {activeCase.duration}</span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="1"
                  max={activeCase.totalFrames}
                  value={currentFrame}
                  onChange={(e) => setCurrentFrame(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />

                {/* Audio Spectrogram Waveform Preview */}
                <div className="pt-1">
                  <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                    <span>Acoustic Frequency Spectrum (Mel-Spectrogram 0 - 16 kHz)</span>
                    <span className="text-cyan-400">Audio Desync: {activeCase.audioSyncDiscrepancy}</span>
                  </div>
                  <div className="h-10 bg-[#070A10] rounded-lg border border-slate-800/80 flex items-end justify-between px-2 py-1 gap-1">
                    {activeCase.audioWaveform.map((val, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${val}%` }}
                        className={`flex-1 rounded-t-sm transition-all duration-150 ${
                          val > 85 ? 'bg-rose-500' : val > 50 ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explainable AI Forensic Scorecard (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Verdict Card */}
            <div className="bg-[#0B0F1A] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">Evidentiary Verdict</span>
                  <h2 className="text-base font-bold text-white mt-0.5">{activeCase.tamperVerdict}</h2>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  activeCase.riskLevel === 'CRITICAL' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}>
                  {activeCase.riskLevel} RISK
                </span>
              </div>

              {/* Technical Anomaly Indicators Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  XAI Anomaly Decomposition
                </span>
                {activeCase.indicators.map((ind, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">{ind.name}</span>
                      <span className={`font-mono font-semibold ${ind.score > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {ind.score}% [{ind.status}]
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${ind.score}%` }}
                        className={`h-full rounded-full ${ind.score > 80 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Explanation */}
              <div className="p-3 bg-[#080B12] rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Forensic Analysis Finding:</div>
                <p>{activeCase.description}</p>
              </div>

              {/* Hardware & Biological Provenance */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">PRNU Sensor Pattern:</span>
                  <span className="text-slate-200 font-mono text-right">{activeCase.prnuSensorMatch}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Eyelid Kinematics:</span>
                  <span className="text-slate-200 font-mono text-right">{activeCase.blinkRate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Lip-Sync Desynchronization:</span>
                  <span className="text-cyan-400 font-mono text-right">{activeCase.audioSyncDiscrepancy}</span>
                </div>
              </div>

              {/* Identified Generative Architecture */}
              <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase">Identified Generative Engine:</div>
                  <div className="text-xs font-bold text-white mt-0.5">{activeCase.detectedModel}</div>
                </div>
                <Fingerprint className="w-5 h-5 text-cyan-400" />
              </div>

              {/* Action */}
              <button
                onClick={() => setIsDossierModalOpen(true)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Official Forensic Dossier</span>
              </button>

            </div>
          </div>
        </div>

        {/* Bottom Historical Investigation Queue */}
        <section aria-label="Investigation queue" className="bg-[#0B0F1A] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Active Multimedia Forensic Queue & Case Studies</h2>
              <p className="text-xs text-slate-400">Historical repository of examined video, audio, and high-resolution surveillance stills</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#070A10] p-1 rounded-lg border border-slate-800 text-xs">
              {['all', 'video', 'audio', 'image'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded text-xs capitalize transition-colors ${
                    filterType === type ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080B12] text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Media Title</th>
                  <th className="py-2.5 px-3">Format</th>
                  <th className="py-2.5 px-3">Manipulation Probability</th>
                  <th className="py-2.5 px-3">Identified Generator</th>
                  <th className="py-2.5 px-3">Verdict</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCases.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-cyan-400">{item.id}</td>
                    <td className="py-3 px-3 font-medium text-white max-w-xs truncate">{item.title}</td>
                    <td className="py-3 px-3 text-slate-400">{item.type}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-rose-400">{item.confidence}%</td>
                    <td className="py-3 px-3 text-slate-300 truncate max-w-[180px]">{item.detectedModel.split('/')[0]}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        item.tamperVerdict.includes('Manipulated') ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      }`}>
                        {item.tamperVerdict}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          handleCaseSelect(item);
                          window.scrollTo({ top: 160, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#06090F] py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">SentinelVision AI™ Forensics</span>
            <span>—</span>
            <span>Assessment-3: Frontend Deployment on Vercel</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Course: AI for Forensic Science (UG)</span>
            <span>SWGDE Digital Video Standard</span>
            <span>Federal Rule of Evidence 901</span>
          </div>
        </div>
      </footer>

      {/* Subpoena Dossier Modal */}
      {isDossierModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0E18] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Subpoena Evidence Dossier</span>
                <h3 className="text-lg font-bold text-white">Digital Media Authenticity Technical Affidavit</h3>
              </div>
              <button
                onClick={() => setIsDossierModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 bg-[#070A10] p-4 rounded-xl border border-slate-800">
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] border-b border-slate-800 pb-3">
                <div>
                  <span className="text-slate-500">Evidence ID: </span>
                  <span className="text-cyan-400 font-bold">{activeCase.id}</span>
                </div>
                <div>
                  <span className="text-slate-500">Source Media: </span>
                  <span className="text-white">{activeCase.sourceFile}</span>
                </div>
                <div>
                  <span className="text-slate-500">Manipulation Score: </span>
                  <span className="text-rose-400 font-bold">{activeCase.confidence}%</span>
                </div>
                <div>
                  <span className="text-slate-500">Standard: </span>
                  <span className="text-white">Federal Rule of Evidence 901</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] mb-1">Evidentiary Finding</h4>
                <p className="text-slate-300">{activeCase.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] mb-1">Timeline Forensic Annotations</h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {activeCase.timelineAnomalies.map((ano, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="text-cyan-400 font-semibold">{ano.time} (Frame {ano.frame}):</span>
                      <span>{ano.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-serif italic text-cyan-400 text-[11px]">Dr. Marcus Holloway, D.Sc.</div>
                  <div className="text-[10px] text-slate-500">Senior Digital Multimedia Forensic Analyst</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-cyan-400 text-[11px]">SEAL #SWGDE-2026-SYNTH</div>
                  <div className="text-[10px] text-slate-500">Digitally Verified & Watermarked</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDossierModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Affidavit</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
