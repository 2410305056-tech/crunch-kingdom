# ForensIQ Neural™ | Multimodal Forensic Intelligence & Evidence Locker

> **Course**: AI for Forensic Science (UG) - Advanced  
> **Assessment**: Assessment-3 — Frontend Deployment on Vercel  
> **Framework**: React 19 + Vite + Tailwind CSS + Lucide Icons  
> **Standards Compliance**: ISO/IEC 17025, NIST SP 800-86, Daubert / Frye Court Admissibility  

---

## ✦ System Overview & Design Philosophy

Crafted with high-precision UI/UX principles, **ForensIQ Neural™** is a mission-grade forensic science workstation designed for state crime laboratories, judicial examiners, and forensic pathologists.

### Core Modules:
1. **Interactive Neural Comparative Analysis Stage**:
   - **Latent Fingerprint Minutiae Extraction**: Gabor ridge filter, bifurcation & ending detection with likelihood ratio calculation ($LR > 1.4 \times 10^8$).
   - **3D Ballistics Striation Surface Topology**: Confocal profilometry matching cartridge breech-face shear against weapon exemplars.
   - **DNA STR 13-CODIS Profiling**: Fluorescent allelic peak deconvolution with random match probability evaluation (1 in 4.8 Trillion).
   - **GC-MS Toxicology Spectral Curve**: Total Ion Chromatogram (TIC) and mass-to-charge ($m/z$) library comparison.
2. **Cryptographic Chain of Custody (SHA-256)**:
   - Real-time cryptographic ledger with tamper-evident audit history from seizure to court safe.
3. **Official Judicial Examination Certificate Generation**:
   - One-click print-ready court affidavit complying with Federal Rule of Evidence 702.
4. **Master Forensic Evidence Inventory**:
   - Searchable, filterable ledger with instant sample inspection.

---

## ✦ Deployment to Vercel (1-Click Ready)

### Option A: Deploy via Vercel Dashboard
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Root Directory** setting, click "Edit" and select:
   ```
   frontend-1-forensiq-neural
   ```
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.

---

## ✦ Local Development

```bash
# Run development server (Port 3001)
npm run dev

# Run production build
npm run build
```
