import React, { useState, useEffect } from 'react';
import {
  Terminal,
  ShieldAlert,
  ShieldCheck,
  Server,
  Cpu,
  HardDrive,
  Network,
  Activity,
  FileCode,
  FileText,
  Search,
  ExternalLink,
  Download,
  AlertOctagon,
  CornerDownRight,
  ChevronRight,
  Database,
  Lock,
  Printer,
  Copy,
  Check,
  RefreshCw,
  FolderGit2
} from 'lucide-react';

const KILLCHAIN_PHASES = [
  {
    id: "phase-1",
    phaseNumber: "01",
    name: "Initial Access",
    timestamp: "2026-11-04 14:12:04 UTC",
    vector: "Spear-Phishing Attachment (Macro Execution)",
    mitreId: "T1566.001",
    severity: "High",
    processName: "WINWORD.EXE (PID: 4812)",
    targetHost: "FIN-WS-04 (192.168.1.104)",
    hashSha256: "b4c2394a11c828e8d89a742f9b8178a9c80d88b7762a4d9c72e259e8756c21e4",
    summary: "Weaponized Excel sheet executed obfuscated VBA macro spawning PowerShell hidden invocation.",
    hexDump: [
      { offset: "0x00000000", hex: "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00", ascii: "MZ.............." },
      { offset: "0x00000010", hex: "B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00", ascii: "........@......." },
      { offset: "0x00000020", hex: "50 6F 77 65 72 53 68 65 6C 6C 2E 65 78 65 20 2D", ascii: "PowerShell.exe -" },
      { offset: "0x00000030", hex: "45 6E 63 6F 64 65 64 43 6F 6D 6D 61 6E 64 20 53", ascii: "EncodedCommand S" }
    ],
    networkSocket: "192.168.1.104:49182 -> 185.220.101.44:443 (TOR Exit Node)",
    yaraMatch: "SUSP_Macro_PowerShell_Execution_v2"
  },
  {
    id: "phase-2",
    phaseNumber: "02",
    name: "Memory Injection & C2 Beacon",
    timestamp: "2026-11-04 14:14:22 UTC",
    vector: "Process Hollowing (svchost.exe injection)",
    mitreId: "T1055.012",
    severity: "Critical",
    processName: "svchost.exe (PID: 1024 - Injected)",
    targetHost: "FIN-WS-04 (192.168.1.104)",
    hashSha256: "7e834a8c9b21f37e44a0349b819f772183c7490a778c8e192c73bb8311a2f901",
    summary: "Reflective DLL injection detected inside legitimate svchost.exe. Cobalt Strike malleable C2 profile established with 15s jitter.",
    hexDump: [
      { offset: "0x00401000", hex: "FC 48 83 E4 F0 E8 C8 00 00 00 41 51 41 50 52 51", ascii: ".H........AQAPRQ" },
      { offset: "0x00401010", hex: "56 48 31 D2 65 48 8B 52 60 48 8B 52 18 48 8B 52", ascii: "VH1.eH.R`H.R.H.R" },
      { offset: "0x00401020", hex: "20 48 8B 72 50 48 0F B7 4A 4A 4D 31 C9 48 31 C0", ascii: " H.rPH..JJM1.H1." },
      { offset: "0x00401030", hex: "AC 3C 61 7C 02 2C 20 41 C1 C9 0D 41 01 C1 E2 ED", ascii: ".<a|., A...A...." }
    ],
    networkSocket: "192.168.1.104:51204 -> 91.215.85.17:8443 (Cobalt Strike C2)",
    yaraMatch: "APT_CobaltStrike_Beacon_x64_Reflective"
  },
  {
    id: "phase-3",
    phaseNumber: "03",
    name: "Credential Harvesting",
    timestamp: "2026-11-04 14:28:50 UTC",
    vector: "LSASS Process Memory Scraping",
    mitreId: "T1003.001",
    severity: "Critical",
    processName: "lsass.exe (Target PID: 640)",
    targetHost: "FIN-WS-04 (192.168.1.104)",
    hashSha256: "2c79b9101235a92bf3d948a2741f872390a1bc7e823f9934c718a204918e77a2",
    summary: "MiniDumpWriteDump API invoked via unbacked memory region. Kerberos ticket-granting tickets (TGT) extracted for Enterprise Admin account.",
    hexDump: [
      { offset: "0x002B4000", hex: "73 65 6B 75 72 6C 73 61 3A 3A 6C 6F 67 6F 6E 70", ascii: "sekurlsa::logonp" },
      { offset: "0x002B4010", hex: "61 73 73 77 6F 72 64 73 00 00 00 00 4B 45 52 42", ascii: "asswords....KERB" },
      { offset: "0x002B4020", hex: "45 52 4F 53 2D 54 49 43 4B 45 54 2D 54 47 54 00", ascii: "EROS-TICKET-TGT." },
      { offset: "0x002B4030", hex: "61 64 6D 69 6E 5F 65 6E 74 65 72 70 72 69 73 65", ascii: "admin_enterprise" }
    ],
    networkSocket: "Local IPC / Anonymous Pipe Memory Access",
    yaraMatch: "INDICATOR_TOOL_MIMIKATZ_Memory_Dump"
  },
  {
    id: "phase-4",
    phaseNumber: "04",
    name: "Lateral Movement",
    timestamp: "2026-11-04 15:02:11 UTC",
    vector: "SMB PsExec Execution & Remote WMI",
    mitreId: "T1021.002",
    severity: "High",
    processName: "PSEXESVC.exe (PID: 7720)",
    targetHost: "DC-01.CORP (192.168.1.5 - Domain Controller)",
    hashSha256: "5d41402abc4b2a76b9719d911017c592efc4d8721a91e92389a081a2f4a10822",
    summary: "Stolen enterprise credentials used to pivot to Domain Controller DC-01 via port 445 SMB named pipe.",
    hexDump: [
      { offset: "0x00108000", hex: "5C 5C 44 43 2D 30 31 5C 41 44 4D 49 4E 24 5C 53", ascii: "\\\\DC-01\\ADMIN$\\S" },
      { offset: "0x00108010", hex: "79 73 74 65 6D 33 32 5C 50 53 45 58 45 53 56 43", ascii: "ystem32\\PSEXESVC" },
      { offset: "0x00108020", hex: "2E 65 78 65 00 00 00 00 73 65 72 76 69 63 65 73", ascii: ".exe....services" },
      { offset: "0x00108030", hex: "2E 65 78 65 20 2D 6B 20 6E 65 74 73 76 63 73 00", ascii: ".exe -k netsvcs." }
    ],
    networkSocket: "192.168.1.104:445 -> 192.168.1.5:445 (SMB Session)",
    yaraMatch: "MALW_PsExec_Remote_Service_Execution"
  },
  {
    id: "phase-5",
    phaseNumber: "05",
    name: "Ransomware Staging",
    timestamp: "2026-11-04 15:35:40 UTC",
    vector: "LockBit 3.0 Encryptor Execution",
    mitreId: "T1486",
    severity: "CRITICAL",
    processName: "LB3_Encryptor.exe (PID: 9140)",
    targetHost: "DC-01.CORP (192.168.1.5)",
    hashSha256: "099a8bcf442a9918bc321a009efb41889a71239bc47e9238b918a2214155b9a1",
    summary: "Volume Shadow Copies deleted via vssadmin. ChaCha20 + RSA-4096 key schedule encryption initiated across network shares.",
    hexDump: [
      { offset: "0x00800000", hex: "76 73 73 61 64 6D 69 6E 2E 65 78 65 20 64 65 6C", ascii: "vssadmin.exe del" },
      { offset: "0x00800010", hex: "65 74 65 20 73 68 61 64 6F 77 73 20 2F 61 6C 6C", ascii: "ete shadows /all" },
      { offset: "0x00800020", hex: "20 2F 71 75 69 65 74 00 2E 6C 6F 63 6B 62 69 74", ascii: " /quiet..lockbit" },
      { offset: "0x00800030", hex: "5F 72 65 61 64 6D 65 2E 74 78 74 00 00 00 00 00", ascii: "_readme.txt....." }
    ],
    networkSocket: "Local Disk I/O & Network Share Broadcast",
    yaraMatch: "RANSOMWARE_LockBit_v3_Black_Payload"
  }
];

const SEIZED_EVIDENCE_DEVICES = [
  {
    id: "DEV-E01-901",
    label: "Primary Domain Controller NVMe Image",
    device: "Samsung 980 PRO 2TB (Serial: S6B0NX0R102)",
    writeBlocker: "Tableau T8u USB 3.0 Forensic Bridge",
    imagingFormat: "Expert Witness Format (E01 - Raw L01)",
    md5: "79054025255fb1a26e4bc422aef54eb4",
    sha256: "5d41402abc4b2a76b9719d911017c592efc4d8721a91e92389a081a2f4a10822",
    tamperCheck: "VERIFIED_INTACT",
    custodian: "Special Agent R. Sterling (DFIR Lead)"
  },
  {
    id: "DEV-MEM-104",
    label: "Volatile RAM Dump — Workstation 04",
    device: "64GB DDR4 Physical Memory Dump (RAW)",
    writeBlocker: "Belkasoft RAM Capturer Live DMA Capture",
    imagingFormat: "Raw Memory Dump (memdump.raw)",
    md5: "c4ca4238a0b923820dcc509a6f75849b",
    sha256: "7e834a8c9b21f37e44a0349b819f772183c7490a778c8e192c73bb8311a2f901",
    tamperCheck: "VERIFIED_INTACT",
    custodian: "Digital Forensic Specialist Chen"
  }
];

export default function App() {
  const [activePhase, setActivePhase] = useState(KILLCHAIN_PHASES[1]); // Default to memory injection
  const [activeTab, setActiveTab] = useState("hex"); // 'hex' | 'pstree' | 'network' | 'yara'
  const [terminalHistory, setTerminalHistory] = useState([
    "TraceCipher Forensic Kernel v5.2.0-dfir initializing...",
    "Memory image loaded: /evidence/memdump_FIN-WS-04.raw (64GB DDR4)",
    "Volatility 3 Symbol Tables: Windows 10 x64 (Build 19045) loaded.",
    "Type 'help' or click any command below to execute live forensic queries."
  ]);
  const [commandInput, setCommandInput] = useState("");
  const [isAffidavitOpen, setIsAffidavitOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleCommandSubmit = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let response = "";
    if (trimmed === "help") {
      response = "Available queries: 'volatility -f memdump.raw windows.pslist', 'yara -r rules.yar', 'verify-hash', 'mitre-correlate'";
    } else if (trimmed.includes("pslist")) {
      response = `PID   PPID  ImageFileName      Offset(V)          Threads  Handles  SessionId
1024  780   svchost.exe        0xfa8003a89040     14       382      1        [INJECTED SHELLCODE DETECTED]
4812  3304  WINWORD.EXE        0xfa8003921100     8        194      1        [MACRO SPAWN]
640   544   lsass.exe          0xfa8003710080     22       890      0        [MEMORY DUMP TARGET]`;
    } else if (trimmed.includes("yara")) {
      response = `[+] Scanning /evidence/memdump.raw against 4,812 APT rules...
>>> MATCH: APT_CobaltStrike_Beacon_x64_Reflective at 0x00401000 in PID: 1024
>>> MATCH: SUSP_Macro_PowerShell_Execution at 0x002B4020 in PID: 4812
[!] 2 Critical Indicators of Compromise confirmed.`;
    } else if (trimmed.includes("verify-hash")) {
      response = `[+] SHA-256 (Image): 5d41402abc4b2a76b9719d911017c592efc4d8721a91e92389a081a2f4a10822
[+] SHA-256 (Seizure Log): 5d41402abc4b2a76b9719d911017c592efc4d8721a91e92389a081a2f4a10822
[✓] HASH MATCH CONFIRMED (Tamper-Free ISO/IEC 27037).`;
    } else if (trimmed.includes("mitre-correlate")) {
      response = `[+] MITRE ATT&CK Matrix Correlation:
- T1566.001 (Spearphishing Attachment)
- T1055.012 (Process Hollowing into svchost.exe)
- T1003.001 (LSASS Memory Scraping)
- T1021.002 (SMB/Windows Admin Shares)
- T1486 (Data Encrypted for Impact - LockBit 3.0)`;
    } else {
      response = `Command executed: '${trimmed}'. Process return code: 0. Evaluated against ISO/IEC 27037 sandbox.`;
    }

    setTerminalHistory(prev => [...prev, `$ ${trimmed}`, response]);
    setCommandInput("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      
      {/* Top Banner: Academic & Standards Compliance Header */}
      <aside aria-label="Assessment notice" className="bg-[#080D1A] border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between text-slate-400 gap-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            Assessment-3: AI for Forensic Science (UG) - Advanced
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">ISO/IEC 27037 & NIST SP 800-86 DFIR Standards</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">Incident Severity: <strong className="text-rose-500 font-mono">SEV-1 CRITICAL</strong></span>
          <span className="hidden lg:inline text-slate-500">Operation: <span className="text-purple-300 font-bold">BLACK ONYX</span></span>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070B16]/90 border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  TraceCipher DFIR<span className="text-purple-400 text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">OPS-v5.2</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">Digital Forensics & Incident Response Cyber Command Hub</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleCommandSubmit("verify-hash")}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verify Hardware Hashes</span>
            </button>

            <button
              onClick={() => setIsAffidavitOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DFIR Affidavit</span>
            </button>

            <button
              onClick={() => handleCommandSubmit("volatility -f memdump.raw windows.pslist")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Run Volatility 3</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* KPI Banner */}
        <section aria-label="Incident metrics" className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Compromised Endpoints</span>
              <AlertOctagon className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">4 Hosts</div>
            <div className="text-[11px] text-rose-400 mt-1 font-mono">
              FIN-WS-04, DC-01, SQL-02, FS-01
            </div>
          </div>

          <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Extracted Volatile Artifacts</span>
              <Server className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-300 tracking-tight">2,840 Items</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Processes, VAD Nodes & Sockets
            </div>
          </div>

          <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">MITRE Techniques Mapped</span>
              <Network className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">14 Mapped</div>
            <div className="text-[11px] text-cyan-400 mt-1">
              APT29 / CozyBear Profile
            </div>
          </div>

          <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">ISO/IEC 27037 Integrity</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">100% Intact</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Tableau Hardware Write-Block
            </div>
          </div>
        </section>

        {/* Attack Killchain & Incident Timeline Scrubber */}
        <section aria-label="Attack killchain timeline" className="bg-[#090E1C] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold">Incident Attack Killchain</span>
              <h2 className="text-base font-bold text-white">Reconstructed Multi-Stage Intrusion Timeline</h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Click any phase to inspect memory artifacts & shellcode</span>
          </div>

          {/* Interactive Phase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
            {KILLCHAIN_PHASES.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase)}
                className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden ${
                  activePhase.id === phase.id
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/10'
                    : 'bg-[#060914] border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    activePhase.id === phase.id ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {phase.phaseNumber}
                  </span>
                  <span className="text-[10px] font-mono text-rose-400">{phase.mitreId}</span>
                </div>
                <div className="text-xs font-bold text-white truncate">{phase.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono truncate">{phase.timestamp.split(' ')[1]}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Dual Primary Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Artifact Dissector & Hex View (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="bg-[#090E1C] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              
              {/* Header with View Tabs */}
              <div className="bg-[#0C1224] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50 animate-pulse"></span>
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Volatile Memory Dissector
                  </span>
                  <span className="text-[11px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                    {activePhase.processName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setActiveTab("hex")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                      activeTab === "hex" ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Raw Hex Dump
                  </button>
                  <button
                    onClick={() => setActiveTab("network")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                      activeTab === "network" ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    C2 Socket
                  </button>
                  <button
                    onClick={() => setActiveTab("yara")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                      activeTab === "yara" ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    YARA Match
                  </button>
                </div>
              </div>

              {/* Dissector Body Content */}
              <div className="p-4 bg-[#050811] min-h-[300px] font-mono text-xs">
                
                {activeTab === "hex" && (
                  <div className="space-y-3">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pb-2 border-b border-slate-800">
                      <span>VAD Node Memory Region: <strong className="text-purple-400">PAGE_EXECUTE_READWRITE (RWX)</strong></span>
                      <span className="text-rose-400 font-bold">Unbacked Shellcode</span>
                    </div>

                    <div className="space-y-1.5 overflow-x-auto text-[11px]">
                      {activePhase.hexDump.map((line, idx) => (
                        <div key={idx} className="flex items-center gap-4 hover:bg-slate-900/60 px-2 py-1 rounded transition-colors">
                          <span className="text-purple-400 select-none">{line.offset}</span>
                          <span className="text-slate-300 tracking-wider">{line.hex}</span>
                          <span className="text-slate-500">|</span>
                          <span className="text-emerald-400 font-bold">{line.ascii}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-[#090E1C] border border-slate-800 text-[11px] text-slate-300">
                      <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Forensic Analyst Finding:</div>
                      <p>{activePhase.summary}</p>
                    </div>
                  </div>
                )}

                {activeTab === "network" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#090E1C] border border-slate-800 rounded-xl space-y-2">
                      <div className="text-[10px] font-mono uppercase text-slate-400">Active External C2 Socket:</div>
                      <div className="text-sm font-bold text-rose-400">{activePhase.networkSocket}</div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-400">Target Host Endpoint:</span>
                        <span className="text-slate-200">{activePhase.targetHost}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-400">Associated Process:</span>
                        <span className="text-purple-300">{activePhase.processName}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-400">Protocol & Encryption:</span>
                        <span className="text-slate-200">TLS 1.3 / Custom HTTPS Malleable C2</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "yara" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#090E1C] border border-slate-800 rounded-xl space-y-2">
                      <div className="text-[10px] font-mono uppercase text-slate-400">YARA Signature Rule Trigger:</div>
                      <div className="text-sm font-bold text-emerald-400">{activePhase.yaraMatch}</div>
                    </div>
                    <div className="p-3 bg-[#070A14] rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
                      <div>rule {activePhase.yaraMatch} {'{'}</div>
                      <div className="pl-4 text-purple-300">strings: $c2_str = "ReflectiveLoader" $guid = "LockBit"</div>
                      <div className="pl-4 text-emerald-300">condition: all of them and uint16(0) == 0x5A4D</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                )}

              </div>

              {/* SHA-256 Monospace Footer */}
              <div className="bg-[#080D1A] border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-xs sm:max-w-md">SHA-256: {activePhase.hashSha256}</span>
                <button
                  onClick={() => copyToClipboard(activePhase.hashSha256)}
                  className="hover:text-purple-300 flex items-center gap-1"
                >
                  {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Seized Hardware Write-Block Evidence Locker */}
            <div className="bg-[#090E1C] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  Physical Hardware Evidence Seizure Locker (ISO/IEC 27037)
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Write-Block Active
                </span>
              </div>

              <div className="space-y-2">
                {SEIZED_EVIDENCE_DEVICES.map(dev => (
                  <div key={dev.id} className="bg-[#050811] border border-slate-800/80 rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-purple-400">{dev.id}</span>
                        <span className="font-semibold text-white">{dev.label}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{dev.device} • {dev.writeBlocker}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-emerald-400 font-semibold block">{dev.tamperCheck}</span>
                      <span className="text-[10px] text-slate-500 font-mono">By: {dev.custodian}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Forensic Terminal (CLI Simulator) (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#060912] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[520px]">
              
              {/* Terminal Window Header */}
              <div className="bg-[#0A0F1F] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">dfir-shell@forensiq-ops:~</span>
                </div>
                <span className="text-[10px] font-mono text-purple-400">SESSION: TTY-01</span>
              </div>

              {/* Terminal Logs Output */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-2 font-mono text-[11px] text-slate-300 select-text bg-[#04060C]">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${
                    line.startsWith('$') ? 'text-purple-300 font-bold' :
                    line.includes('[+]') ? 'text-emerald-400' :
                    line.includes('[!]') || line.includes('INJECTED') ? 'text-rose-400' :
                    'text-slate-400'
                  }`}>
                    {line}
                  </div>
                ))}
              </div>

              {/* Suggested Quick Commands */}
              <div className="bg-[#090E1C] border-t border-slate-800/80 p-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                <span className="text-slate-500 px-1">Quick:</span>
                <button
                  onClick={() => handleCommandSubmit("volatility -f memdump.raw windows.pslist")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700"
                >
                  pslist
                </button>
                <button
                  onClick={() => handleCommandSubmit("yara -r /rules/malware.yar /dump/mem.raw")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
                >
                  yara scan
                </button>
                <button
                  onClick={() => handleCommandSubmit("verify-hash /evidence/disk_sda.E01")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                >
                  verify hash
                </button>
                <button
                  onClick={() => handleCommandSubmit("mitre-correlate --incident INC-9021")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
                >
                  mitre correlate
                </button>
              </div>

              {/* Terminal Command Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommandSubmit(commandInput);
                }}
                className="bg-[#070B16] border-t border-slate-800 p-2.5 flex items-center gap-2"
              >
                <span className="text-purple-400 font-mono text-xs font-bold">$</span>
                <input
                  type="text"
                  placeholder="Enter command (e.g. pslist, yara, verify-hash)..."
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none placeholder-slate-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                >
                  Run
                </button>
              </form>

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#050811] py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">TraceCipher DFIR™ Systems</span>
            <span>—</span>
            <span>Assessment-3: Frontend Deployment on Vercel</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Course: AI for Forensic Science (UG)</span>
            <span>ISO/IEC 27037 Standard</span>
            <span>MITRE ATT&CK Matrix Correlation</span>
          </div>
        </div>
      </footer>

      {/* DFIR Court Affidavit Modal */}
      {isAffidavitOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090E1C] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Digital Evidence Affidavit</span>
                <h3 className="text-lg font-bold text-white">ISO/IEC 27037 Digital Forensics Incident Report</h3>
              </div>
              <button
                onClick={() => setIsAffidavitOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 bg-[#050811] p-4 rounded-xl border border-slate-800 font-sans leading-relaxed">
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] border-b border-slate-800 pb-3">
                <div>
                  <span className="text-slate-500">Operation: </span>
                  <span className="text-purple-400 font-bold">BLACK ONYX</span>
                </div>
                <div>
                  <span className="text-slate-500">Incident Code: </span>
                  <span className="text-white">INC-2026-9021</span>
                </div>
                <div>
                  <span className="text-slate-500">Admissibility: </span>
                  <span className="text-emerald-400 font-bold">ISO/IEC 27037 Validated</span>
                </div>
                <div>
                  <span className="text-slate-500">Threat Group: </span>
                  <span className="text-white">APT29 / CozyBear Profile</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] mb-1">1. Seizure & Chain of Custody Integrity</h4>
                <p className="text-slate-300">
                  Physical disk imaging was executed utilizing a Tableau T8u USB 3.0 Hardware Write-Blocker. Initial cryptographic hash match between physical acquisition and courtroom verification is verified at SHA-256 <code className="text-purple-300 font-mono text-[10px]">5d41402...10822</code>.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] mb-1">2. Memory Injection Attribution</h4>
                <p className="text-slate-300">
                  Volatile memory examination confirms unbacked executable memory allocation (<code className="text-purple-300 font-mono text-[10px]">PAGE_EXECUTE_READWRITE</code>) at address <code className="text-emerald-400 font-mono text-[10px]">0x00401000</code> inside system process <code className="text-white font-mono text-[10px]">svchost.exe (PID: 1024)</code>. YARA match indicates Cobalt Strike Beacon payload connecting to external Tor exit node.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-serif italic text-purple-400 text-[11px]">Special Agent Richard Sterling, CISSP</div>
                  <div className="text-[10px] text-slate-500">Lead Cyber Incident & Forensic Witness</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-purple-400 text-[11px]">STAMP #DFIR-27037-COURT</div>
                  <div className="text-[10px] text-slate-500">Cryptographically Signed & Timestamped</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsAffidavitOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md"
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
