# SentinelVision AI™ | Deepfake & Synthetic Media Forensic Suite

> **Course**: AI for Forensic Science (UG) - Advanced  
> **Assessment**: Assessment-3 — Frontend Deployment on Vercel  
> **Framework**: React 19 + Vite + Tailwind CSS + Lucide Icons  
> **Standards Compliance**: Federal Rule of Evidence 901, SWGDE (Scientific Working Group on Digital Evidence)  

---

## ✦ System Overview & Forensic Architecture

**SentinelVision AI™** is a specialized digital multimedia forensics application created to detect and analyze generative deepfakes, synthetic voice clones, and tampered visual imagery.

### Core Modules:
1. **Interactive Multi-Modal Forensic Inspector**:
   - **Video Lip-Sync GAN Manipulation**: Spatio-temporal boundary pixel tearing detection, 84ms audio desynchronization analysis.
   - **Wiretap Voice Clone Identification**: Multi-band Mel-Spectrogram analysis, robotic frequency cutoffs ($>8\text{ kHz}$), absence of physiological respiration.
   - **Error Level Analysis (ELA) Splicing**: JPEG quantization table gradient inspection for digital insertions and inpainting.
   - **Baseline Authenticity Exemplar**: Authentic bodycam verification with unbroken PRNU camera sensor fingerprint and 74 BPM rPPG pulse.
2. **Interactive Frame Scrubber & Analytical Overlay Engine**:
   - Frame-by-frame scrub controller ($1\text{ to }1264\text{ frames}$).
   - Toggleable overlays: RGB Raw Feed, GAN Artifact Heatmap, Optical Flow Motion Vectors, and Remote Photoplethysmography (rPPG) biological pulse monitor.
3. **Subpoena Dossier & Technical Affidavit Generation**:
   - Generates court-ready technical affidavits citing Federal Rule of Evidence 901 standards.

---

## ✦ Deployment to Vercel (1-Click Ready)

### Option A: Deploy via Vercel Dashboard
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Root Directory** setting, click "Edit" and select:
   ```
   frontend-2-sentinel-vision
   ```
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.

---

## ✦ Local Development

```bash
# Run development server (Port 3002)
npm run dev

# Run production build
npm run build
```

