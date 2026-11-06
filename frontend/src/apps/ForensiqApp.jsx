import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Fingerprint,
  Activity,
  Search,
  FileText,
  Lock,
  Upload,
  CheckCircle,
  Sparkles,
  Printer,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

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

export default function ForensiqApp() {
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

  const handleCopyHash = (hash) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerifyLedger = () => {
    setVerifyingAll(true);
    setTimeout(() => setVerifyingAll(false), 1200);
  };

  const filteredSamples = EVIDENCE_SAMPLES.filter(item => {
    const matchesCategory = activeTab === "all" || item.category.toLowerCase().includes(activeTab.toLowerCase());
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.substrate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0E17] border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#090D14] rounded-[10px] flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">ForensIQ Neural™</h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                AI-v4.8 • ISO/IEC 17025
              </span>
            </div>
            <p className="text-xs text-slate-400">Latent Minutiae, 3D Ballistics, DNA STR CODIS & Mass Spectrometry</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVerifyLedger}
            disabled={verifyingAll}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${verifyingAll ? 'animate-spin' : ''}`} />
            <span>{verifyingAll ? 'Auditing...' : 'Verify Hashes'}</span>
          </button>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Court Affidavit</span>
          </button>
          <button
            onClick={() => setIsIngestModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Ingest Evidence</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Logged Evidence</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">1,482 Items</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 inline" /> 100% Chain Intact
          </div>
        </div>

        <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Mean Neural Match</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">99.42%</div>
          <div className="text-[11px] text-cyan-400 mt-1 font-mono">LR &gt; 1.0e7</div>
        </div>

        <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Cryptographic Seal</span>
            <Lock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">SHA-256</div>
          <div className="text-[11px] text-slate-400 mt-1">Tamper-Proof Audit</div>
        </div>

        <div className="bg-[#0D121D] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Legal Standard</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">Daubert / Frye</div>
          <div className="text-[11px] text-amber-400 mt-1 font-medium">FRE 702 Admissible</div>
        </div>
      </div>

      {/* Main Dual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Comparator */}
        <div className="lg:col-span-7 space-y-4">
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

          <div className="bg-[#0A0D15] border border-slate-800 rounded-2xl overflow-hidden relative shadow-xl">
            <div className="bg-[#0F1420] border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse"></span>
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                  Comparative Analysis
                </span>
                <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {selectedSample.id}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLaserActive(!laserActive)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                    laserActive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                  }`}
                >
                  Laser
                </button>
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                    showHeatmap ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                  }`}
                >
                  Heatmap
                </button>
                <button
                  onClick={() => setShowMinutiae(!showMinutiae)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                    showMinutiae ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                  }`}
                >
                  Minutiae
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative h-[320px] w-full bg-[#080B11] p-4 flex items-center justify-center overflow-hidden">
              {laserActive && (
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-laser z-20 pointer-events-none"></div>
              )}

              {selectedSample.category === "Biometrics" && (
                <div className="relative w-60 h-60 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-400/80">
                    <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
                    <path d="M100 20 A80 80 0 0 1 180 100 A80 80 0 0 1 100 180 A80 80 0 0 1 20 100 A80 80 0 0 1 100 20" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                    <path d="M100 35 A65 65 0 0 1 165 100 A65 65 0 0 1 100 165 A65 65 0 0 1 35 100 A65 65 0 0 1 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                    <path d="M100 50 A50 50 0 0 1 150 100 A50 50 0 0 1 100 150 A50 50 0 0 1 50 100 A50 50 0 0 1 100 50" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M100 65 A35 35 0 0 1 135 100 A35 35 0 0 1 100 135 A35 35 0 0 1 65 100 A35 35 0 0 1 100 65" fill="none" stroke="currentColor" strokeWidth="2.2" />
                    <circle cx="100" cy="100" r="4" fill="#10B981" />
                  </svg>
                  {showMinutiae && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[32%] left-[48%] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20"></span>
                        <span className="text-[9px] font-mono text-cyan-300 bg-slate-900 px-1 rounded">Bifurcation #14</span>
                      </div>
                      <div className="absolute top-[65%] left-[28%] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
                        <span className="text-[9px] font-mono text-emerald-300 bg-slate-900 px-1 rounded">Ending #22</span>
                      </div>
                    </div>
                  )}
                  {showHeatmap && (
                    <div className="absolute inset-0 bg-radial from-emerald-500/20 via-cyan-500/10 to-transparent pointer-events-none rounded-full blur-xl"></div>
                  )}
                </div>
              )}

              {selectedSample.category === "Ballistics" && (
                <div className="w-full max-w-md h-48 flex flex-col justify-center">
                  <div className="text-[11px] font-mono text-slate-400 text-center mb-2">
                    Breech-Face Striation Micro-Grooves: <span className="text-emerald-400 font-bold">18 Matched</span>
                  </div>
                  <svg viewBox="0 0 400 120" className="w-full h-32">
                    {[20, 45, 75, 110, 140, 175, 210, 245, 280, 315, 350, 380].map((x, i) => (
                      <line key={i} x1={x} y1="10" x2={x + 5} y2="110" stroke="#10B981" strokeWidth={i % 2 === 0 ? "3" : "1.5"} opacity={0.8} />
                    ))}
                  </svg>
                </div>
              )}

              {selectedSample.category === "Biological DNA" && (
                <div className="w-full max-w-md h-48 flex flex-col justify-center">
                  <div className="text-[11px] font-mono text-slate-400 text-center mb-2">
                    CODIS 13-Locus Profile: <span className="text-emerald-400 font-bold">1 in 4.8 Trillion</span>
                  </div>
                  <svg viewBox="0 0 400 110" className="w-full h-28">
                    <line x1="10" y1="95" x2="390" y2="95" stroke="#334155" strokeWidth="1.5" />
                    <path d="M 50 95 L 70 20 L 90 95" fill="none" stroke="#10B981" strokeWidth="2.5" />
                    <path d="M 150 95 L 170 15 L 190 95" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                    <path d="M 250 95 L 270 30 L 290 95" fill="none" stroke="#A855F7" strokeWidth="2.5" />
                    <path d="M 330 95 L 350 25 L 370 95" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  </svg>
                </div>
              )}

              {selectedSample.category === "Toxicology" && (
                <div className="w-full max-w-md h-48 flex flex-col justify-center">
                  <div className="text-[11px] font-mono text-slate-400 text-center mb-2">
                    GC-MS Retention Curve: <span className="text-emerald-400 font-bold">99.1% Confidence</span>
                  </div>
                  <svg viewBox="0 0 400 110" className="w-full h-28">
                    <line x1="20" y1="95" x2="380" y2="95" stroke="#334155" strokeWidth="1" />
                    <path d="M 120 95 L 135 50 L 150 95" fill="none" stroke="#06B6D4" strokeWidth="2" />
                    <path d="M 230 95 L 245 10 L 260 95" fill="none" stroke="#EF4444" strokeWidth="2.5" />
                    <path d="M 320 95 L 332 40 L 344 95" fill="none" stroke="#10B981" strokeWidth="2" />
                  </svg>
                </div>
              )}

              <div className="absolute bottom-3 left-3 bg-[#0E131F]/90 px-3 py-1.5 rounded-lg border border-slate-700/80">
                <span className="text-xs font-mono text-slate-300">
                  Match Score: <strong className="text-emerald-400">{selectedSample.matchScore}%</strong>
                </span>
              </div>
            </div>

            {/* Pipeline Steps */}
            <div className="bg-[#0B0F19] border-t border-slate-800 p-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {selectedSample.pipelineSteps.map((step, idx) => (
                  <div key={idx} className="bg-[#101522] border border-slate-800 rounded-lg p-2">
                    <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                      <span>Step 0{idx + 1}</span>
                      <span className="text-emerald-400">{step.latency}</span>
                    </div>
                    <div className="text-slate-200 truncate mt-0.5">{step.step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dossier */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D121D] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">Evidence Details</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedSample.title}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {selectedSample.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Substrate:</span>
                <span className="text-slate-200">{selectedSample.substrate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Lead Custodian:</span>
                <span className="text-slate-200">{selectedSample.custodian}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Likelihood Ratio:</span>
                <span className="text-emerald-400 font-mono">{selectedSample.likelihoodRatio}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {selectedSample.metrics.map((m, i) => (
                <div key={i} className="bg-[#121826] border border-slate-800 rounded-lg p-2">
                  <div className="text-[10px] text-slate-400 uppercase">{m.label}</div>
                  <div className="text-xs font-mono font-semibold text-slate-100 truncate mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#090C12] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>SHA-256 Hash Seal</span>
                <button
                  onClick={() => handleCopyHash(selectedSample.sha256)}
                  className="hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="font-mono text-[10px] text-slate-300 break-all select-all">
                {selectedSample.sha256}
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Generate Judicial Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#0D121D] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white">Forensic Evidence Master Ledger</h3>
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#090C12] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090D15] text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
              <tr>
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3">Discipline</th>
                <th className="py-2.5 px-3">Substrate</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredSamples.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-mono text-emerald-400">{item.id}</td>
                  <td className="py-3 px-3">{item.category}</td>
                  <td className="py-3 px-3 max-w-[200px] truncate">{item.substrate}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">{item.matchScore}%</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedSample(item)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F17] border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white">Forensic Examination Certificate</h4>
              <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 bg-[#080B10] p-4 rounded-xl border border-slate-800">
              <p>Case ID: <strong>{selectedSample.caseId}</strong> | Evidence Tag: <strong>{selectedSample.id}</strong></p>
              <p>{selectedSample.description}</p>
              <p>Calculated Likelihood Ratio: <strong className="text-emerald-400">{selectedSample.likelihoodRatio}</strong></p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsReportModalOpen(false)} className="px-3 py-1.5 text-xs text-slate-400">Close</button>
              <button onClick={() => window.print()} className="px-3.5 py-1.5 text-xs font-bold bg-emerald-500 text-slate-950 rounded-lg flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" /> Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ingest Modal */}
      {isIngestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121D] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white">Ingest Forensic Artifact</h4>
              <button onClick={() => setIsIngestModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">Artifact hash automatically sealed with SHA-256 for judicial admissibility.</p>
            <button
              onClick={() => {
                alert("Artifact ingested into ledger!");
                setIsIngestModalOpen(false);
              }}
              className="w-full py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg"
            >
              Confirm Ingestion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
