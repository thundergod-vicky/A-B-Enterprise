# 🏢 A B Enterprise — Burdwan Ground Analytics

> A premium, map-based real estate ground pricing intelligence platform focused exclusively on the Burdwan region.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet)
![Three.js](https://img.shields.io/badge/Three.js-r3f-000000?style=flat-square&logo=threedotjs)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📸 Overview

A B Enterprise Ground Analytics is a fully frontend real estate intelligence dashboard that provides:

- **Interactive Map** with real-time ground price markers across West Bengal and major Indian cities
- **Unit Conversion Engine** — instantly converts area across Sq.Ft, Acres, Bigha, and Katha
- **Acquisition Cost Estimator** — total market value projection at current market rates
- **3D Site Viewer** — Three.js powered 3D visualization of property sites
- **International Section** *(Coming Soon)* — global market intelligence

---

## 🚀 Features

### 🗺 National Map View
- Dark-themed interactive map powered by **Leaflet.js** + CartoDB tiles
- Custom emerald green markers for each market hub
- Clickable popups showing price per sq.ft and trend
- Pan & zoom with smooth `flyTo` animation on city selection

### 📐 Unit Conversion (Real-time)
| Unit | Conversion |
|------|-----------|
| 1 Katha | 720 Sq.Ft |
| 1 Bigha | 20 Katha = 14,400 Sq.Ft |
| 1 Acre | 43,560 Sq.Ft |

### 💰 Market Data Coverage

**West Bengal:**
- South Kolkata, North Kolkata, New Town / Rajarhat, Salt Lake (Bidhannagar)
- Howrah City, Durgapur, Siliguri, Asansol, Kharagpur, Haldia

**All India:**
- Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Chennai

> ⚠️ Prices are Q2 2026 market estimates based on publicly available real estate data. This is not financial advice.

### 🧊 3D Site Viewer
- Built with **@react-three/fiber** and **@react-three/drei**
- Orbit controls for full rotation
- Abstract 3D site layout visualization

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 8 |
| Map Engine | Leaflet.js + react-leaflet |
| 3D Graphics | Three.js + @react-three/fiber + @react-three/drei |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | CSS + Inline Styles (no Tailwind dependency) |
| Font | Outfit (Google Fonts) |
| Hosting | Hostinger (Static) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MapComponent.jsx    # Leaflet map with custom markers
│   └── ThreeDViewer.jsx    # Three.js 3D site visualization
├── data/
│   └── pricingData.js      # Market price dataset + unit constants
├── utils/
│   └── mathUtils.js        # Currency formatting + unit conversions
├── App.jsx                 # Main app layout & state
├── index.css               # Global styles & Leaflet overrides
└── main.jsx                # Entry point
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/ab-enterprise.git
cd ab-enterprise

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — ready to upload to Hostinger or any static host.

---

## 🌐 Deployment on Hostinger

1. Run `npm run build`
2. Upload the entire contents of the `dist/` folder to your Hostinger `public_html` directory
3. Ensure your domain points to `public_html`
4. No server-side configuration needed — this is a pure static site

> If using a subdirectory (e.g. `yourdomain.com/analytics`), update `vite.config.js`:
> ```js
> export default defineConfig({ base: '/analytics/' })
> ```

---

## 📊 Data Disclaimer

All pricing data in this application is based on Q2 2026 publicly available real estate market averages and estimates. Prices are approximations and should not be used as the sole basis for any financial or legal decision.

For precise valuations, consult a registered real estate agent or property valuer.

---

## 🗺 Roadmap

- [x] West Bengal market pricing
- [x] All India major city pricing
- [x] Real-time unit conversion (Sq.Ft / Acres / Bigha / Katha)
- [x] Acquisition cost estimator
- [x] 3D site viewer
- [x] Custom map markers
- [ ] International markets (Coming Soon)
- [ ] Price trend charts
- [ ] Location search / geocoding
- [ ] PDF export of estimates
- [ ] Price comparison between two locations

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT © A B Enterprise
