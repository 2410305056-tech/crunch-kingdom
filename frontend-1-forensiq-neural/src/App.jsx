import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  Fingerprint,
  Activity,
  Search,
  AlertTriangle,
  FileText,
  Cpu,
  Lock,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Filter,
  Dna,
  Crosshair,
  Layers,
  Sparkles,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Eye,
  RefreshCw
} from 'lucide-react';

// Forensic Disciplines & High-Fidelity Dataset
const EVIDENCE_SAMPLES = [
  {
    id: "EVD-2026-F01",
    caseId: "CASE-2026-NIST-891",
    title: "Latent Fingerprint Minutiae Analysis",
    category: "Biometrics",
    substrate: "Glock 19 Slide Surface (Latent Sebaceous)",
    recoveredAt: "Crime Scene Sector B, North District",
    recoveredDate: "2026-11-04 22:14:00 UTC",
    custodian: "Dr. Elena Rostova (Senior Forensic Biometrician)",
    sha256: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    matchScore: 98.7,
    likelihoodRatio: "1.42 × 10⁸ (Extremely Strong Support)",
    daubertCompliant: true,
    status: "Verified Match",
    description: "Minutiae extraction utilizing DeepRidge-CNN v5. 34 characteristic points resolved: 22 bifurcations, 10 ridge endings, 2 independent deltas. Matched against Suspect AFIS Record #S-8891.",
    metrics: [
      { label: "Minutiae Points", value: "34/34 Matched" },
      { label: "Ridge Frequency", value: "0.48 cycles/px" },
      { label: "Spatial Distortion", value: "< 0.02mm (Negligible)" },
      { label: "False Match Rate", value: "1 in 84,000,000" }
    ],
    pipelineSteps: [
      { step: "Gabor Ridge Frequency Denoising", latency: "14ms", status: "Completed" },
      { step: "Minutiae Orientation Field Synthesis", latency: "32ms", status: "Completed" },
      { step: "AFIS Multimodal Template Cross-Match", latency: "68ms", status: "Completed" }
    ],
    custodyTrail: [
      { time: "2026-11-04 22:30", action: "Seized at Crime Scene by CSI Team 4", officer: "Det. Marcus Vance" },
      { time: "2026-11-05 08:15", action: "Received in Cryo Locker A-12 with SHA-256 seal", officer: "C. Mendez, Custodian" },
      { time: "2026-11-05 14:20", action: "Neural Minutiae Ingestion & Scan completed", officer: "Dr. Elena Rostova" },
      { time: "2026-11-06 09:00", action: "Forensic Certificate signed for Superior Court", officer: "Chief Examiner H. Zhang" }
    ]
  },
  {
    id: "EVD-2026-B04",
    caseId: "CASE-2026-NIST-891",
    title: "3D Ballistics Striation Surface Topology",
    category: "Ballistics",
    substrate: "Fired 9x19mm Parabellum Brass Casing",
    recoveredAt: "Primary Hallway Floor, 1.4m from Doorway",
    recoveredDate: "2026-11-04 22:28:10 UTC",
    custodian: "Inspector Rajiv Roy (Forensic Ballistics Chief)",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    matchScore: 96.4,
    likelihoodRatio: "8.75 × 10⁶ (Strong Support)",
    daubertCompliant: true,
    status: "Verified Match",
    description: "Confocal optical profilometry 3D scan of firing pin impression and breech-face striation marks. Compared against test-fired exemplar casing from recovered Glock 19 #SN-772910.",
    metrics: [
      { label: "Striation Lands", value: "18 Matched" },
      { label: "Roughness Profile (Ra)", value: "2.14 µm" },
      { label: "Firing Pin Depth", value: "0.82 mm" },
      { label: "Breech Face Shear", value: "32° Identical" }
    ],
    pipelineSteps: [
      { step: "3D Confocal Point Cloud Filtering", latency: "42ms", status: "Completed" },
      { step: "Striation Micro-Contour Correlation", latency: "88ms", status: "Completed" },
      { step: "IBIS Ballistic Reference Database Check", latency: "115ms", status: "Completed" }
    ],
    custodyTrail: [
      { time: "2026-11-04 22:45", action: "Recovered with non-marring forensic forceps", officer: "Det. Marcus Vance" },
      { time: "2026-11-05 09:30", action: "Entered ballistic evidence vault #B-09", officer: "Inspector Rajiv Roy" },
      { time: "2026-11-05 16:40", action: "3D Confocal Profilometry analysis completed", officer: "Inspector Rajiv Roy" },
      { time: "2026-11-06 10:15", action: "Judicial verification lock engaged", officer: "Chief Examiner H. Zhang" }
    ]
  },
  {
    id: "EVD-2026-D12",
    caseId: "CASE-2026-NIST-891",
    title: "DNA STR 13-CODIS Profiling Analysis",
    category: "Biological DNA",
    substrate: "Epithelial Cells from Firearm Grip",
    recoveredAt: "Recovered Firearm Handle Swab",
    recoveredDate: "2026-11-04 23:02:15 UTC",
    custodian: "Dr. Sarah Al-Mansoor (Molecular Geneticist)",
    sha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    matchScore: 99.99,
    likelihoodRatio: "1.00 × 10¹² (Definitive Support)",
    daubertCompliant: true,
    status: "Verified Match",
    description: "Capillary electrophoresis electropherogram analysis. 13 core CODIS Short Tandem Repeat (STR) loci evaluated. Complete single-source male profile coincident with suspect reference swab.",
    metrics: [
      { label: "CODIS Loci Evaluated", value: "13/13 Complete" },
      { label: "RFU Peak Amplitude", value: "3,850 RFU (Optimum)" },
      { label: "Stutter Ratio", value: "< 7.2% (Baseline)" },
      { label: "Random Match Probability", value: "1 in 4.8 Trillion" }
    ],
    pipelineSteps: [
      { step: "Capillary Electrophoresis Peak Extraction", latency: "18ms", status: "Completed" },
      { step: "Allelic Ladder Size Calling & Binning", latency: "25ms", status: "Completed" },
      { step: "Bayesian Likelihood Genotype Scoring", latency: "52ms", status: "Completed" }
    ],
    custodyTrail: [
      { time: "2026-11-04 23:15", action: "Swabbed with sterile nucleic acid-free swab", officer: "Forensic Tech S. Miller" },
      { time: "2026-11-05 07:45", action: "Cryogenic lysis and robotic PCR amplification", officer: "Dr. Sarah Al-Mansoor" },
      { time: "2026-11-05 18:30", action: "Electropherogram profile verified in CODIS", officer: "Dr. Sarah Al-Mansoor" },
      { time: "2026-11-06 11:00", action: "Statistically validated for court testimony", officer: "Chief Examiner H. Zhang" }
    ]
  },
  {
    id: "EVD-2026-T88",
    caseId: "CASE-2026-NIST-891",
    title: "GC-MS Toxicology Spectral Identification",
    category: "Toxicology",
    substrate: "Blood Plasma Sample (5.0 mL Vacutainer)",
    recoveredAt: "State Medical Examiner Post-Mortem Lab",
    recoveredDate: "2026-11-05 06:30:00 UTC",
    custodian: "Dr. Aris Thorne (Chief Forensic Toxicologist)",
    sha256: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    matchScore: 99.1,
    likelihoodRatio: "3.20 × 10⁵ (High Probability)",
    daubertCompliant: true,
    status: "Verified Match",
    description: "Gas Chromatography-Mass Spectrometry (GC-MS) full scan (m/z 40-550). Fragmentation pattern confirms presence of Carfentanil and Benzodiazepine derivative matching seizure inventory.",
    metrics: [
      { label: "Retention Time (tR)", value: "14.28 min (Exact)" },
      { label: "Base Peak (m/z)", value: "245.1 m/z" },
      { label: "NIST Spectral Match Index", value: "982/1000" },
      { label: "Concentration", value: "3.4 ng/mL" }
    ],
    pipelineSteps: [
      { step: "Total Ion Chromatogram (TIC) Baseline Subtract", latency: "16ms", status: "Completed" },
      { step: "Mass Fragmentation Peak Deconvolution", latency: "45ms", status: "Completed" },
      { step: "NIST/SWGDRUG High-Res Library Alignment", latency: "64ms", status: "Completed" }
    ],
    custodyTrail: [
      { time: "2026-11-05 06:45", action: "Drawn under chain of custody protocol #TOX-99", officer: "Med. Examiner A. Thorne" },
      { time: "2026-11-05 10:10", action: "Solid-phase extraction & derivatization", officer: "Toxicology Specialist K. Lin" },
      { time: "2026-11-05 20:00", action: "GC-MS Quadrupole Run #8801 finished", officer: "Dr. Aris Thorne" },
      { time: "2026-11-06 08:30", action: "Final quantitative toxicology report compiled", officer: "Chief Examiner H. Zhang" }
    ]
  }
];

export default function App() {
  const [selectedSample, setSelectedSample] = useState(EVIDENCE_SAMPLES[0]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [laserActive, setLaserActive] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMinutiae, setShowMinutiae] = useState(true);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [verifyingAll, setVerifyingAll] = useState(false);
  const [allVerified, setAllVerified] = useState(true);

  // New evidence form state for ingestion modal
  const [newEvidence, setNewEvidence] = useState({
    title: "",
    category: "Biometrics",
    substrate: "",
    custodian: "Det. Specialist (Field Unit)"
  });

  const handleCopyHash = (hash) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerifyLedger = () => {
    setVerifyingAll(true);
    setTimeout(() => {
      setVerifyingAll(false);
      setAllVerified(true);
    }, 1200);
  };

  // Filter samples based on category and search
  const filteredSamples = EVIDENCE_SAMPLES.filter(item => {
    const matchesCategory = activeTab === "all" || item.category.toLowerCase().includes(activeTab.toLowerCase());
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.substrate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Top Banner: Academic & Standards Compliance Header */}
      <aside aria-label="Assessment notice" className="bg-slate-900/90 border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between text-slate-400 gap-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Assessment-3: AI for Forensic Science (UG) - Advanced
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">NIST SP 800-86 & ISO/IEC 17025 Standard</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">Vercel Deployment Build: <strong className="text-slate-200 font-mono">v1.4.2-PROD</strong></span>
          <span className="hidden lg:inline text-slate-500">SHA-256 Ledger: <span className="text-emerald-400 font-mono">100% Intact</span></span>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0E17]/90 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Lab Credential */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#090D14] rounded-[10px] flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  ForensIQ Neural<span className="text-emerald-400 text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">AI-v4.8</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">Multimodal Forensic Science & Biometric Intelligence Suite</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleVerifyLedger}
              disabled={verifyingAll}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${verifyingAll ? 'animate-spin' : ''}`} />
              {verifyingAll ? 'Auditing Ledger...' : 'Audit Ledger Hashes'}
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Court Affidavit</span>
            </button>

            <button
              onClick={() => setIsIngestModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Ingest Evidence</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Overview & High-Level Telemetry */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Metric Cards Banner */}
        <section aria-label="Key telemetry metrics" className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Logged Evidence Items</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">1,482</div>
            <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle className="w-3 h-3 inline" /> 100% Chain-of-Custody Verified
            </div>
          </div>

          <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Mean Neural Match Confidence</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">99.42%</div>
            <div className="text-[11px] text-cyan-400/90 mt-1 font-mono">
              Bayesian Likelihood: LR &gt; 1.0e7
            </div>
          </div>

          <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Cryptographic Hash Seal</span>
              <Lock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">SHA-256</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Zero Tamper Flags Across 36 Mos
            </div>
          </div>

          <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Judicial Legal Standard</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">Daubert / Frye</div>
            <div className="text-[11px] text-amber-400/90 mt-1 font-medium">
              Federal Rule of Evidence 702
            </div>
          </div>
        </section>

        {/* Primary Interactive Stage: Dual-Column Forensic Comparator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Visual Scanner (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Sample Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0D121D] p-1.5 rounded-xl border border-slate-800">
              {EVIDENCE_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => setSelectedSample(sample)}
                  className={`flex-1 min-w-[130px] px-3 py-2 rounded-lg text-xs font-medium transition-all text-left flex items-center justify-between gap-2 ${
                    selectedSample.id === sample.id
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <span className="truncate">{sample.category}</span>
                  <span className="text-[10px] font-mono opacity-60">{sample.id.split('-')[2]}</span>
                </button>
              ))}
            </div>

            {/* Visual Viewport Stage */}
            <div className="bg-[#0A0D15] border border-slate-800 rounded-2xl overflow-hidden relative shadow-xl">
              
              {/* Viewport Top Bar */}
              <div className="bg-[#0F1420] border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse"></span>
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Neural Comparative Analysis
                  </span>
                  <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {selectedSample.id}
                  </span>
                </div>

                {/* Viewport Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLaserActive(!laserActive)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      laserActive
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700'
                    }`}
                  >
                    Laser Scan
                  </button>
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      showHeatmap
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700'
                    }`}
                  >
                    Feature Heatmap
                  </button>
                  <button
                    onClick={() => setShowMinutiae(!showMinutiae)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      showMinutiae
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700'
                    }`}
                  >
                    Minutiae Nodes
                  </button>
                </div>
              </div>

              {/* Interactive Canvas / Visual Representation */}
              <div className="relative h-[340px] w-full bg-[#080B11] p-4 flex items-center justify-center overflow-hidden">
                
                {/* Background Grid Texture */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

                {/* Scanning Laser Beam Effect */}
                {laserActive && (
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-laser z-20 pointer-events-none"></div>
                )}

                {/* Dynamic Forensic Visualization according to active category */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  
                  {selectedSample.category === "Biometrics" && (
                    <div className="relative w-64 h-64 flex items-center justify-center">
                      {/* Synthetic Latent Ridge Pattern */}
                      <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-400/80 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                        <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
                        <path d="M100 20 A80 80 0 0 1 180 100 A80 80 0 0 1 100 180 A80 80 0 0 1 20 100 A80 80 0 0 1 100 20" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                        <path d="M100 35 A65 65 0 0 1 165 100 A65 65 0 0 1 100 165 A65 65 0 0 1 35 100 A65 65 0 0 1 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                        <path d="M100 50 A50 50 0 0 1 150 100 A50 50 0 0 1 100 150 A50 50 0 0 1 50 100 A50 50 0 0 1 100 50" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M100 65 A35 35 0 0 1 135 100 A35 35 0 0 1 100 135 A35 35 0 0 1 65 100 A35 35 0 0 1 100 65" fill="none" stroke="currentColor" strokeWidth="2.2" />
                        <path d="M100 80 A20 20 0 0 1 120 100 A20 20 0 0 1 100 120 A20 20 0 0 1 80 100 A20 20 0 0 1 100 80" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="100" cy="100" r="4" fill="#10B981" />
                      </svg>

                      {/* Minutiae Nodes Overlay */}
                      {showMinutiae && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-[32%] left-[48%] flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 animate-ping"></span>
                            <span className="text-[9px] font-mono text-cyan-300 bg-slate-900/90 px-1 rounded border border-cyan-500/30">Bifurcation #14</span>
                          </div>
                          <div className="absolute top-[65%] left-[28%] flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
                            <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/90 px-1 rounded border border-emerald-500/30">Ending #22</span>
                          </div>
                          <div className="absolute top-[55%] left-[72%] flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-400 ring-4 ring-purple-400/20"></span>
                            <span className="text-[9px] font-mono text-purple-300 bg-slate-900/90 px-1 rounded border border-purple-500/30">Delta #01</span>
                          </div>
                          <div className="absolute top-[80%] left-[50%] flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
                            <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/90 px-1 rounded border border-emerald-500/30">Bifurcation #09</span>
                          </div>
                        </div>
                      )}

                      {/* Heatmap Glow */}
                      {showHeatmap && (
                        <div className="absolute inset-0 bg-radial from-emerald-500/20 via-cyan-500/10 to-transparent pointer-events-none rounded-full blur-xl"></div>
                      )}
                    </div>
                  )}

                  {selectedSample.category === "Ballistics" && (
                    <div className="w-full max-w-md h-52 flex flex-col justify-center">
                      <div className="text-[11px] font-mono text-slate-400 text-center mb-2 flex items-center justify-center gap-2">
                        <span>Breech-Face Striation Micro-Grooves</span>
                        <span className="text-emerald-400 font-bold">18 Concordant Marks</span>
                      </div>
                      {/* Striation Surface Lines SVG */}
                      <svg viewBox="0 0 400 120" className="w-full h-32 text-amber-400">
                        <defs>
                          <linearGradient id="casingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        {/* 18 Striation Comparison Curves */}
                        {[15, 35, 55, 80, 110, 135, 160, 190, 215, 240, 265, 290, 315, 340, 365, 385].map((x, i) => (
                          <g key={i}>
                            <line x1={x} y1="10" x2={x + (i % 2 === 0 ? 6 : -4)} y2="110" stroke="url(#casingGrad)" strokeWidth={i % 3 === 0 ? "3" : "1.5"} opacity={0.7 + (i % 3) * 0.1} />
                            {showMinutiae && i % 4 === 0 && (
                              <circle cx={x} cy={30 + (i * 5)} r="3" fill="#06B6D4" />
                            )}
                          </g>
                        ))}
                      </svg>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 px-4 mt-2">
                        <span>Recovered Casing #EVD-B04</span>
                        <span className="text-emerald-400 font-semibold">96.4% Cross-Correlation</span>
                        <span>Exemplar Firearm #G19-7729</span>
                      </div>
                    </div>
                  )}

                  {selectedSample.category === "Biological DNA" && (
                    <div className="w-full max-w-lg h-56 flex flex-col justify-center px-4">
                      <div className="text-[11px] font-mono text-slate-400 text-center mb-2 flex items-center justify-center gap-2">
                        <span>Capillary Electrophoresis STR Peaks</span>
                        <span className="text-emerald-400 font-bold">13/13 CODIS Loci</span>
                      </div>
                      {/* DNA Electropherogram SVG */}
                      <svg viewBox="0 0 500 130" className="w-full h-32">
                        <line x1="10" y1="110" x2="490" y2="110" stroke="#334155" strokeWidth="1.5" />
                        {/* Peak 1: D8S1179 */}
                        <path d="M 40 110 L 60 25 L 80 110" fill="none" stroke="#10B981" strokeWidth="2.5" />
                        <text x="50" y="18" fill="#10B981" fontSize="9" fontFamily="monospace">D8S1179 [13,14]</text>

                        {/* Peak 2: D21S11 */}
                        <path d="M 130 110 L 150 15 L 170 110" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                        <text x="140" y="10" fill="#06B6D4" fontSize="9" fontFamily="monospace">D21S11 [29,30]</text>

                        {/* Peak 3: TH01 */}
                        <path d="M 230 110 L 250 35 L 270 110" fill="none" stroke="#A855F7" strokeWidth="2.5" />
                        <text x="240" y="28" fill="#A855F7" fontSize="9" fontFamily="monospace">TH01 [7,9.3]</text>

                        {/* Peak 4: vWA */}
                        <path d="M 330 110 L 350 20 L 370 110" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                        <text x="340" y="14" fill="#F59E0B" fontSize="9" fontFamily="monospace">vWA [16,18]</text>

                        {/* Peak 5: FGA */}
                        <path d="M 420 110 L 440 28 L 460 110" fill="none" stroke="#EC4899" strokeWidth="2.5" />
                        <text x="430" y="22" fill="#EC4899" fontSize="9" fontFamily="monospace">FGA [21,24]</text>
                      </svg>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 px-2 mt-1">
                        <span>Base Pairs: 100bp</span>
                        <span>200bp</span>
                        <span>300bp</span>
                        <span>400bp</span>
                        <span className="text-emerald-400 font-semibold">Match: 1 in 4.8 Trillion</span>
                      </div>
                    </div>
                  )}

                  {selectedSample.category === "Toxicology" && (
                    <div className="w-full max-w-md h-52 flex flex-col justify-center px-4">
                      <div className="text-[11px] font-mono text-slate-400 text-center mb-2 flex items-center justify-center gap-2">
                        <span>GC-MS Total Ion Chromatogram (TIC)</span>
                        <span className="text-emerald-400 font-bold">NIST Match #982</span>
                      </div>
                      <svg viewBox="0 0 450 120" className="w-full h-32">
                        <line x1="20" y1="105" x2="430" y2="105" stroke="#334155" strokeWidth="1" />
                        {/* Background solvent delay */}
                        <path d="M 20 105 Q 60 104 80 105" fill="none" stroke="#64748B" strokeWidth="1" />
                        {/* Peak 1: Internal Standard */}
                        <path d="M 120 105 L 135 60 L 150 105" fill="none" stroke="#06B6D4" strokeWidth="2" />
                        <text x="125" y="52" fill="#06B6D4" fontSize="9" fontFamily="monospace">IS-d5</text>
                        {/* Peak 2: Analyte of interest (Carfentanil) */}
                        <path d="M 240 105 L 255 12 L 270 105" fill="none" stroke="#EF4444" strokeWidth="3" />
                        <text x="240" y="8" fill="#EF4444" fontSize="9" fontFamily="monospace">Carfentanil (tR=14.28)</text>
                        {/* Peak 3: Metabolite */}
                        <path d="M 340 105 L 352 48 L 364 105" fill="none" stroke="#10B981" strokeWidth="2" />
                        <text x="345" y="42" fill="#10B981" fontSize="9" fontFamily="monospace">Norfentanyl</text>
                      </svg>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 px-2 mt-1">
                        <span>Scan Time: 0.0 min</span>
                        <span>10.0 min</span>
                        <span>20.0 min</span>
                        <span className="text-emerald-400 font-semibold">99.1% Confidence</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Confidence Badge in Viewport */}
                <div className="absolute bottom-3 left-3 bg-[#0E131F]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-mono font-medium text-slate-300">
                    Match Confidence: <strong className="text-emerald-400">{selectedSample.matchScore}%</strong>
                  </span>
                </div>
              </div>

              {/* Inference Pipeline Telemetry Bar */}
              <div className="bg-[#0B0F19] border-t border-slate-800 p-4">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>AI Inference Pipeline Steps</span>
                  <span className="text-[11px] font-mono text-emerald-400">Total Latency: 114ms</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedSample.pipelineSteps.map((step, index) => (
                    <div key={index} className="bg-[#101522] border border-slate-800/80 rounded-lg p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-slate-400">Stage 0{index + 1}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{step.latency}</span>
                      </div>
                      <div className="text-xs font-medium text-slate-200 truncate">{step.step}</div>
                      <div className="text-[10px] text-emerald-400/90 mt-1 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3 text-emerald-400" /> {step.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Evidentiary Dossier & Chain of Custody (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Dossier Meta Card */}
            <div className="bg-[#0D121D] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Evidence Profile</span>
                  <h2 className="text-base font-bold text-white leading-tight mt-0.5">{selectedSample.title}</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {selectedSample.status}
                </span>
              </div>

              {/* Substrate & Location */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Substrate / Matrix:</span>
                  <span className="text-slate-200 font-medium text-right">{selectedSample.substrate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Recovery Location:</span>
                  <span className="text-slate-200 text-right">{selectedSample.recoveredAt}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Lead Custodian:</span>
                  <span className="text-slate-200 text-right font-medium">{selectedSample.custodian}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Likelihood Ratio:</span>
                  <span className="text-emerald-400 font-mono text-right">{selectedSample.likelihoodRatio}</span>
                </div>
              </div>

              {/* Scientific Metric Badges */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {selectedSample.metrics.map((m, i) => (
                  <div key={i} className="bg-[#121826] border border-slate-800 rounded-lg p-2">
                    <div className="text-[10px] text-slate-400 uppercase">{m.label}</div>
                    <div className="text-xs font-mono font-semibold text-slate-100 mt-0.5 truncate">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Cryptographic SHA-256 Seal Box */}
              <div className="bg-[#090C12] border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    Cryptographic Seal (SHA-256)
                  </span>
                  <button
                    onClick={() => handleCopyHash(selectedSample.sha256)}
                    className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-slate-300 break-all bg-slate-900/80 p-2 rounded border border-slate-800 select-all">
                  {selectedSample.sha256}
                </div>
              </div>

              {/* Chain of Custody Audit Trail */}
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Immutable Chain-of-Custody Log
                </span>
                <div className="space-y-2.5 relative pl-4 border-l border-slate-800">
                  {selectedSample.custodyTrail.map((hop, i) => (
                    <div key={i} className="relative text-xs">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400/80 ring-4 ring-slate-900"></span>
                      <div className="text-[11px] font-mono text-slate-400">{hop.time}</div>
                      <div className="text-slate-200 font-medium">{hop.action}</div>
                      <div className="text-[11px] text-slate-400">By: {hop.officer}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section: Searchable Evidence Inventory Table */}
        <section aria-label="Evidence inventory table" className="bg-[#0D121D] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Forensic Evidence Inventory & Master Ledger</h2>
              <p className="text-xs text-slate-400">Filter, inspect, and verify court-admissible physical & digital artifacts</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-[#090C12] p-1 rounded-lg border border-slate-800 text-xs">
                {['all', 'biometrics', 'ballistics', 'biological', 'toxicology'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                      activeTab === cat
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search case, tag, substrate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#090C12] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-48 sm:w-60"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#090D15] text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Evidence ID</th>
                  <th className="py-2.5 px-3">Discipline</th>
                  <th className="py-2.5 px-3">Substrate / Target</th>
                  <th className="py-2.5 px-3">Lead Examiner</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredSamples.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-emerald-400">{item.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-200">{item.category}</td>
                    <td className="py-3 px-3 text-slate-300 max-w-[200px] truncate">{item.substrate}</td>
                    <td className="py-3 px-3 text-slate-400">{item.custodian.split('(')[0]}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{item.matchScore}%</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedSample(item);
                          window.scrollTo({ top: 180, behavior: 'smooth' });
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
      <footer className="border-t border-slate-800/80 bg-[#070A0F] py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">ForensIQ Neural™ Systems</span>
            <span>—</span>
            <span>Assessment-3: Frontend Deployment on Vercel</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Course: AI for Forensic Science (UG)</span>
            <span>NIST SP 800-86</span>
            <span>ISO/IEC 17025 Standard</span>
          </div>
        </div>
      </footer>

      {/* Ingestion Modal */}
      {isIngestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121D] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                Ingest New Forensic Evidence
              </h3>
              <button
                onClick={() => setIsIngestModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Evidence Title / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Latent print on trigger guard"
                  value={newEvidence.title}
                  onChange={(e) => setNewEvidence({...newEvidence, title: e.target.value})}
                  className="w-full bg-[#090C12] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Forensic Category</label>
                <select
                  value={newEvidence.category}
                  onChange={(e) => setNewEvidence({...newEvidence, category: e.target.value})}
                  className="w-full bg-[#090C12] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Biometrics">Biometrics (Fingerprint / Face / Iris)</option>
                  <option value="Ballistics">Ballistics & Toolmark Impression</option>
                  <option value="Biological DNA">Biological DNA (STR / SNP Profile)</option>
                  <option value="Toxicology">Toxicology & Mass Spectrometry</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Substrate / Physical Carrier</label>
                <input
                  type="text"
                  placeholder="e.g. Polyethylene grip, blood on denim"
                  value={newEvidence.substrate}
                  onChange={(e) => setNewEvidence({...newEvidence, substrate: e.target.value})}
                  className="w-full bg-[#090C12] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Simulated Hash Generator */}
              <div className="p-3 bg-[#090C12] border border-slate-800 rounded-lg text-slate-400 font-mono text-[11px]">
                <div className="text-slate-500 text-[10px] uppercase">Auto-Generated SHA-256 Hash Seal:</div>
                <div className="text-emerald-400 mt-1 break-all">
                  a78f24b8981c...99cfa12 (Cryptographic Integrity Pre-Sealed)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsIngestModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Evidence ingested into tamper-evident ledger! Ready for neural matching.");
                  setIsIngestModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md"
              >
                Seal & Ingest Evidence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Court Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B0F17] border border-slate-700/80 rounded-2xl max-w-2xl w-full p-7 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Official Judicial Certificate</span>
                <h3 className="text-lg font-bold text-white">Forensic Laboratory Examination Certificate</h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed bg-[#080B10] p-5 rounded-xl border border-slate-800">
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px] pb-3 border-b border-slate-800">
                <div>
                  <span className="text-slate-500">Case Reference: </span>
                  <span className="text-white font-bold">{selectedSample.caseId}</span>
                </div>
                <div>
                  <span className="text-slate-500">Evidence Tag: </span>
                  <span className="text-emerald-400 font-bold">{selectedSample.id}</span>
                </div>
                <div>
                  <span className="text-slate-500">Examination Date: </span>
                  <span className="text-white">2026-11-06</span>
                </div>
                <div>
                  <span className="text-slate-500">ISO Standard: </span>
                  <span className="text-white">ISO/IEC 17025 Accredited</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wide mb-1">1. Summary of Examination</h4>
                <p className="text-slate-300">{selectedSample.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wide mb-1">2. Quantitative Likelihood Ratio & Confidence</h4>
                <p className="text-slate-300">
                  Bayesian Likelihood Ratio is calculated at <strong className="text-emerald-400 font-mono">{selectedSample.likelihoodRatio}</strong>. In accordance with the ENFSI (European Network of Forensic Science Institutes) verbal scale, this provides extremely strong scientific support for identity concurrence.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wide mb-1">3. Legal Admissibility Statement</h4>
                <p className="text-slate-400 text-[11px]">
                  This evaluation adheres to Federal Rule of Evidence 702 (Daubert Standard) and Frye General Acceptance. The machine-learning algorithm (DeepRidge-CNN v5) has been peer-reviewed with an empirical false-match error rate of less than 1 in 84,000,000.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-serif italic text-emerald-400">Dr. Elena Rostova, Ph.D.</div>
                  <div className="text-[10px] text-slate-500">Lead Forensic Biometrician & State Witness</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-emerald-400">SEAL #17025-2026-NIST</div>
                  <div className="text-[10px] text-slate-500">Cryptographically Signed & Timestamped</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

