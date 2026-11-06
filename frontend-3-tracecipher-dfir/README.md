# TraceCipher DFIR™ | Digital Forensics & Incident Response Command Hub

> **Course**: AI for Forensic Science (UG) - Advanced  
> **Assessment**: Assessment-3 — Frontend Deployment on Vercel  
> **Framework**: React 19 + Vite + Tailwind CSS + Lucide Icons  
> **Standards Compliance**: ISO/IEC 27037, NIST SP 800-86, MITRE ATT&CK Matrix  

---

## ✦ System Overview & Forensic Architecture

**TraceCipher DFIR™** is an enterprise-grade digital forensics incident response workstation modeled after national cyber-defense command centers and defense agency forensic labs.

### Core Modules:
1. **Interactive Multi-Stage Attack Killchain Scrubber**:
   - Reconstructs advanced intrusion across 5 phases: *Initial Access (Macro Phishing)* $\rightarrow$ *Memory Injection (svchost.exe)* $\rightarrow$ *Credential Harvesting (LSASS Mimikatz)* $\rightarrow$ *Lateral Movement (PsExec)* $\rightarrow$ *Ransomware Deployment (LockBit 3.0)*.
2. **Volatile Memory Dissector & Hex Viewer**:
   - Interactive live raw hex viewer with ASCII decode and highlighted RWX memory addresses.
   - External C2 network socket inspection and YARA rule signature matching (`APT_CobaltStrike_Beacon_x64`).
3. **Interactive Forensic Terminal (CLI Simulator)**:
   - Interactive command terminal simulating Volatility 3, YARA scans, hash audits, and MITRE correlation queries.
4. **Hardware Write-Block Seizure Locker**:
   - ISO/IEC 27037 compliant hardware write-blocker verification for forensic disk images (E01/DD).
5. **Courtroom Evidence Affidavit**:
   - Print-ready digital evidence affidavit with cryptographic hash stamps and investigator signatures.

---

## ✦ Deployment to Vercel (1-Click Ready)

### Option A: Deploy via Vercel Dashboard
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Root Directory** setting, click "Edit" and select:
   ```
   frontend-3-tracecipher-dfir
   ```
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.

---

## ✦ Local Development

```bash
# Run development server (Port 3003)
npm run dev

# Run production build
npm run build
```
