import React, { useState } from 'react';
import {
  Terminal,
  Server,
  Cpu,
  HardDrive,
  Network,
  AlertOctagon,
  Lock,
  Printer,
  Copy,
  Check,
  FileText
} from 'lucide-react';

const KILLCHAIN_PHASES = [
  {
    id: "phase-1",
    phaseNumber: "01",
    name: "Initial Access",
    timestamp: "2026-11-04 14:12:04 UTC",
    vector: "Spear-Phishing Macro Execution",
    mitreId: "T1566.001",
    processName: "WINWORD.EXE (PID: 4812)",
    targetHost: "FIN-WS-04 (192.168.1.104)",
    hashSha256: "b4c2394a11c828e8d89a742f9b8178a9c80d88b7762a4d9c72e259e8756c21e4",
    summary: "Weaponized Excel sheet executed obfuscated VBA macro spawning PowerShell hidden invocation.",
    hexDump: [
      { offset: "0x00000000", hex: "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00", ascii: "MZ.............." },
      { offset: "0x00000020", hex: "50 6F 77 65 72 53 68 65 6C 6C 2E 65 78 65 20 2D", ascii: "PowerShell.exe -" }
    ],
    networkSocket: "192.168.1.104:49182 -> 185.220.101.44:443",
    yaraMatch: "SUSP_Macro_PowerShell_Execution_v2"
  },
  {
    id: "phase-2",
    phaseNumber: "02",
    name: "Memory Injection & C2 Beacon",
    timestamp: "2026-11-04 14:14:22 UTC",
    vector: "Process Hollowing (svchost.exe)",
    mitreId: "T1055.012",
    processName: "svchost.exe (PID: 1024 - Injected)",
    targetHost: "FIN-WS-04 (192.168.1.104)",
    hashSha256: "7e834a8c9b21f37e44a0349b819f772183c7490a778c8e192c73bb8311a2f901",
    summary: "Reflective DLL injection detected inside legitimate svchost.exe. Cobalt Strike malleable C2 profile established.",
    hexDump: [
      { offset: "0x00401000", hex: "FC 48 83 E4 F0 E8 C8 00 00 00 41 51 41 50 52 51", ascii: ".H........AQAPRQ" },
      { offset: "0x00401010", hex: "56 48 31 D2 65 48 8B 52 60 48 8B 52 18 48 8B 52", ascii: "VH1.eH.R`H.R.H.R" }
    ],
    networkSocket: "192.168.1.104:51204 -> 91.215.85.17:8443",
    yaraMatch: "APT_CobaltStrike_Beacon_x64_Reflective"
  },
  {
    id: "phase-3",
    phaseNumber: "03",
    name: "Credential Harvesting",
    timestamp: "2026-11-04 14:28:50 UTC",
    vector: "LSASS Process Memory Scraping",
    mitreId: "T1003.001",
    processName: "lsass.exe (Target PID: 640)",
    targetHost: "FIN-WS-04 (192.168.1.104)",
    hashSha256: "2c79b9101235a92bf3d948a2741f872390a1bc7e823f9934c718a204918e77a2",
    summary: "MiniDumpWriteDump API invoked via unbacked memory region. Kerberos TGT extracted.",
    hexDump: [
      { offset: "0x002B4000", hex: "73 65 6B 75 72 6C 73 61 3A 3A 6C 6F 67 6F 6E 70", ascii: "sekurlsa::logonp" }
    ],
    networkSocket: "Local IPC Memory Access",
    yaraMatch: "INDICATOR_TOOL_MIMIKATZ"
  },
  {
    id: "phase-4",
    phaseNumber: "04",
    name: "Lateral Movement",
    timestamp: "2026-11-04 15:02:11 UTC",
    vector: "SMB PsExec Execution",
    mitreId: "T1021.002",
    processName: "PSEXESVC.exe (PID: 7720)",
    targetHost: "DC-01.CORP (192.168.1.5)",
    hashSha256: "5d41402abc4b2a76b9719d911017c592efc4d8721a91e92389a081a2f4a10822",
    summary: "Stolen enterprise credentials used to pivot to Domain Controller DC-01 via port 445 SMB.",
    hexDump: [
      { offset: "0x00108000", hex: "5C 5C 44 43 2D 30 31 5C 41 44 4D 49 4E 24 5C 53", ascii: "\\\\DC-01\\ADMIN$\\S" }
    ],
    networkSocket: "192.168.1.104:445 -> 192.168.1.5:445",
    yaraMatch: "MALW_PsExec_Remote_Execution"
  },
  {
    id: "phase-5",
    phaseNumber: "05",
    name: "Ransomware Staging",
    timestamp: "2026-11-04 15:35:40 UTC",
    vector: "LockBit 3.0 Encryptor Execution",
    mitreId: "T1486",
    processName: "LB3_Encryptor.exe (PID: 9140)",
    targetHost: "DC-01.CORP (192.168.1.5)",
    hashSha256: "099a8bcf442a9918bc321a009efb41889a71239bc47e9238b918a2214155b9a1",
    summary: "Volume Shadow Copies deleted via vssadmin. ChaCha20 + RSA-4096 key schedule encryption initiated.",
    hexDump: [
      { offset: "0x00800000", hex: "76 73 73 61 64 6D 69 6E 2E 65 78 65 20 64 65 6C", ascii: "vssadmin.exe del" }
    ],
    networkSocket: "Local Disk I/O Broadcast",
    yaraMatch: "RANSOMWARE_LockBit_v3"
  }
];

export default function TraceCipherApp() {
  const [activePhase, setActivePhase] = useState(KILLCHAIN_PHASES[1]);
  const [activeTab, setActiveTab] = useState("hex");
  const [terminalHistory, setTerminalHistory] = useState([
    "TraceCipher Forensic Kernel v5.2.0-dfir initializing...",
    "Memory image loaded: /evidence/memdump_FIN-WS-04.raw (64GB DDR4)",
    "Type 'help' or click quick commands below to execute queries."
  ]);
  const [commandInput, setCommandInput] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const [isAffidavitOpen, setIsAffidavitOpen] = useState(false);

  const handleCommandSubmit = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let response = "";
    if (trimmed.includes("pslist")) {
      response = `PID 1024 [svchost.exe] INJECTED SHELLCODE DETECTED at 0xfa8003a89040`;
    } else if (trimmed.includes("yara")) {
      response = `>>> MATCH: APT_CobaltStrike_Beacon_x64_Reflective in PID: 1024`;
    } else if (trimmed.includes("verify-hash")) {
      response = `[✓] SHA-256 MATCH CONFIRMED (Tamper-Free ISO/IEC 27037).`;
    } else {
      response = `Command executed: '${trimmed}'. Exit code 0. ISO/IEC 27037 Sandbox Verified.`;
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
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#070B16] border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">TraceCipher DFIR™</h2>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                ISO/IEC 27037 Standard
              </span>
            </div>
            <p className="text-xs text-slate-400">Digital Forensics, Volatility 3 Memory Dissection & Killchain Reconstruction</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCommandSubmit("verify-hash")}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verify Hashes</span>
          </button>
          <button
            onClick={() => setIsAffidavitOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>DFIR Affidavit</span>
          </button>
          <button
            onClick={() => handleCommandSubmit("volatility -f memdump.raw windows.pslist")}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 transition-all flex items-center gap-2"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Run Volatility 3</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Compromised Hosts</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">4 Hosts</div>
          <div className="text-[11px] text-rose-400 mt-1 font-mono">SEV-1 Incident</div>
        </div>

        <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Extracted Artifacts</span>
            <Server className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-300">2,840 Items</div>
          <div className="text-[11px] text-slate-400 mt-1">Memory & DLL Handles</div>
        </div>

        <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">MITRE Techniques</span>
            <Network className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">14 Mapped</div>
          <div className="text-[11px] text-cyan-400 mt-1">APT29 Profile</div>
        </div>

        <div className="bg-[#090E1C] border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Write-Block Status</span>
            <HardDrive className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">100% Intact</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">Tableau T8u</div>
        </div>
      </div>

      {/* Killchain Scrubber */}
      <div className="bg-[#090E1C] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Multi-Stage Intrusion Timeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {KILLCHAIN_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase)}
              className={`p-3 rounded-xl text-left border transition-all ${
                activePhase.id === phase.id
                  ? 'bg-purple-950/40 border-purple-500/60 shadow-lg'
                  : 'bg-[#060914] border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-purple-400">{phase.phaseNumber}</span>
                <span className="text-[10px] font-mono text-rose-400">{phase.mitreId}</span>
              </div>
              <div className="text-xs font-bold text-white truncate">{phase.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dual Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Memory Hex Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#090E1C] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#0C1224] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-purple-300">Memory Dissector: {activePhase.processName}</span>
              <div className="flex gap-2">
                <button onClick={() => setActiveTab("hex")} className={`px-2 py-0.5 rounded text-xs ${activeTab === 'hex' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'}`}>Hex</button>
                <button onClick={() => setActiveTab("net")} className={`px-2 py-0.5 rounded text-xs ${activeTab === 'net' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'}`}>Network</button>
              </div>
            </div>

            <div className="p-4 bg-[#050811] font-mono text-xs space-y-2">
              {activeTab === "hex" ? (
                <>
                  {activePhase.hexDump.map((l, i) => (
                    <div key={i} className="flex gap-3 text-[11px]">
                      <span className="text-purple-400">{l.offset}</span>
                      <span className="text-slate-300">{l.hex}</span>
                      <span className="text-emerald-400">{l.ascii}</span>
                    </div>
                  ))}
                  <p className="mt-3 text-slate-400 font-sans text-xs">{activePhase.summary}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="text-rose-400 font-bold">{activePhase.networkSocket}</div>
                  <div className="text-slate-400">Target Host: {activePhase.targetHost}</div>
                </div>
              )}
            </div>

            <div className="bg-[#080D1A] border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="truncate">SHA-256: {activePhase.hashSha256}</span>
              <button onClick={() => copyToClipboard(activePhase.hashSha256)} className="hover:text-purple-300">
                {copiedText ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Terminal CLI */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#060912] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[400px]">
            <div className="bg-[#0A0F1F] border-b border-slate-800 px-4 py-2 text-xs font-mono text-slate-400">
              Interactive DFIR Terminal Shell
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-1.5 font-mono text-[11px] bg-[#04060C]">
              {terminalHistory.map((l, i) => (
                <div key={i} className={l.startsWith('$') ? 'text-purple-300 font-bold' : 'text-slate-400'}>{l}</div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommandSubmit(commandInput);
              }}
              className="bg-[#070B16] border-t border-slate-800 p-2.5 flex items-center gap-2"
            >
              <span className="text-purple-400 font-mono text-xs">$</span>
              <input
                type="text"
                placeholder="pslist, yara, verify-hash..."
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none"
              />
              <button type="submit" className="px-3 py-1 bg-purple-600 text-xs font-bold rounded">Run</button>
            </form>
          </div>
        </div>
      </div>

      {/* Affidavit Modal */}
      {isAffidavitOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090E1C] border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white">ISO/IEC 27037 Digital Forensics Report</h4>
              <button onClick={() => setIsAffidavitOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">Operation: <strong>BLACK ONYX</strong> | Severity: <strong>SEV-1 CRITICAL</strong></p>
            <p className="text-xs text-slate-300">Physical acquisition verified via Tableau T8u Hardware Write-Blocker.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAffidavitOpen(false)} className="px-3 py-1.5 text-xs text-slate-400">Close</button>
              <button onClick={() => window.print()} className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 text-white rounded-lg flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" /> Print Affidavit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

