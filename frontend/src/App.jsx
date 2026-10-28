import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroStage from "./components/HeroStage";
import SciencePillars from "./components/SciencePillars";
import QuadCrateBuilder from "./components/QuadCrateBuilder";
import ReserveRoster from "./components/ReserveRoster";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { audio } from "./utils/audioEngine";

// Static fallback data for instant render
const FALLBACK_FLAVORS = [
  {
    id: "tikka-tang",
    name: "01. Tikka Tang",
    fullName: "Tikka Tang Reserve",
    profile: "Fiery Profile",
    subtitle: "Kashmiri Degi Mirch & Smoked Coriander Pod Glaze",
    price: 50,
    weight: "65g",
    decibels: 76.4,
    heatScale: "4/5",
    accentColor: "#FF5722",
    ambientGlow: "rgba(255, 87, 34, 0.15)",
    batchCode: "BATCH-DL-1082 / Q3",
    fractureTest: "99.4%",
    description: "Kashmiri degi mirch kettle-fired with roasted coriander pods and cold-pressed oil for an intense, aromatic smoke.",
    chaiPairing: "Cutting Masala Chai",
    packImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQIo19xlIJJy9lox549uAdAE58G-5AhJSMZCvH8dRJv2j1ym-LEG2VnOfB1RiamlVFHYbhmuQ309qLzcqe579dMSaHw--UtG-iFNmYuStWuUNio-pTlYgOKDKl7dA7fVOWOZAGC4pbwVN0gdqZPXDzWwW_k5GoBbtehVqxus452lZvcIgw7CbzJ9FDk04x9ZBCMnbkChGg3xSi4OEWXzhW0QbobBEg_XY5L8kXYJ0",
    chipShot: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGumffBWeNv_629uiItyHOVLIhiz7aSWQ4uJiTrdfdfQXMax72FIFtLaojT-kJnY1fYPUCB0JNmpMMO-8rWONtknozD3KCFirMy7lk4IaFOpg8Om4spXeNdvEEGMKZJov-zgYi-ZHWxC-F8J8tR_8xZlr49ktQfqZPdcTJEJ_yezMPYCp6INzyBtiET1-TDr7Qfh1nVOvQJNUBkEyiBCVPUkuHqFSo8yJbAlmWujA"
  },
  {
    id: "nimbu-pudina",
    name: "02. Nimbu Pudina",
    fullName: "Nimbu Pudina Reserve",
    profile: "Tangy Profile",
    subtitle: "Kagzi Lime Zest & Sun-Dried Himalayan Wild Mint",
    price: 50,
    weight: "65g",
    decibels: 76.8,
    heatScale: "5/5 Tang",
    accentColor: "#10B981",
    ambientGlow: "rgba(16, 185, 129, 0.15)",
    batchCode: "BATCH-BLR-0419 / Q3",
    fractureTest: "99.1%",
    description: "Kagzi lime zest infused with sun-dried Himalayan wild mint and cracked black pepper for a zesty, cooling snap.",
    chaiPairing: "Iced Lemon Sulaimani",
    packImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs1zAksICElGKBvHSNmsz7SsTiHsOkJG-ldNiBEbtpBiaoTeCmeMUe_5Vn4e6r6yJ-5fwMyiAueTkuxQkLByUffGM-0Guor2TyKjaS6b2TlM2tTYZiSVcOooxF6iMJqcqgRd1WwtMrnGiVhs5lHSn5kj57FKJWX_mAhetUEw-2FczCYCX6Sr-sNmZ0hJG-t8LnOdciKCyINUrMn48jySiYX88RskjOJj8OC79BhBo",
    chipShot: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs1zAksICElGKBvHSNmsz7SsTiHsOkJG-ldNiBEbtpBiaoTeCmeMUe_5Vn4e6r6yJ-5fwMyiAueTkuxQkLByUffGM-0Guor2TyKjaS6b2TlM2tTYZiSVcOooxF6iMJqcqgRd1WwtMrnGiVhs5lHSn5kj57FKJWX_mAhetUEw-2FczCYCX6Sr-sNmZ0hJG-t8LnOdciKCyINUrMn48jySiYX88RskjOJj8OC79BhBo"
  },
  {
    id: "rock-salt",
    name: "03. Rock Salt",
    fullName: "Pure Rock Salt Reserve",
    profile: "Pure Profile",
    subtitle: "Single-Origin Himalayan Sendha Salt Crystals",
    price: 50,
    weight: "65g",
    decibels: 76.2,
    heatScale: "100% Purity",
    accentColor: "#FFB800",
    ambientGlow: "rgba(255, 184, 0, 0.15)",
    batchCode: "BATCH-MUM-8821 / Q3",
    fractureTest: "99.8%",
    description: "Single-origin raw Himalayan Sendha rock salt crystals over slow kettle-cooked golden crisps. Raw acoustic snap.",
    chaiPairing: "Adrak Ginger Chai",
    packImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZREwcguV3QbK_Wejq8yhiqmLKkq_fGVYQrpGUNcYJHL73CLs1KiRHYSCdbpWNmf6nhWovbNDmG8XJX-G9HQ-8GNBW1GOez4WzkNH4AHw4SlyHDbbjD4cqMySmwBT6uNtPav8kx0pGpmLW_qbcJNxeVRHQchRSLoSmhXIZ7AiYCxRGQk8YeT-FvwbOpMxDTPbxKt4Qv1nWQit7fuRgpBFyLfaIK2YsDu7-DPSmtXo",
    chipShot: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZREwcguV3QbK_Wejq8yhiqmLKkq_fGVYQrpGUNcYJHL73CLs1KiRHYSCdbpWNmf6nhWovbNDmG8XJX-G9HQ-8GNBW1GOez4WzkNH4AHw4SlyHDbbjD4cqMySmwBT6uNtPav8kx0pGpmLW_qbcJNxeVRHQchRSLoSmhXIZ7AiYCxRGQk8YeT-FvwbOpMxDTPbxKt4Qv1nWQit7fuRgpBFyLfaIK2YsDu7-DPSmtXo"
  },
  {
    id: "cheesy-makhani",
    name: "04. Cheesy Makhani",
    fullName: "Cheesy Makhani Reserve",
    profile: "Velvet Profile",
    subtitle: "Aged Cheddar & Slow-Simmered Sweet Tomato Butter",
    price: 50,
    weight: "65g",
    decibels: 76.0,
    heatScale: "5/5 Rich",
    accentColor: "#F59E0B",
    ambientGlow: "rgba(245, 158, 11, 0.15)",
    batchCode: "BATCH-DEL-3301 / Q3",
    fractureTest: "98.9%",
    description: "Aged sharp cheddar folded with sweet cream butter and slow-simmered tomato makhani gravy spices.",
    chaiPairing: "Kulhad Elaichi Chai",
    packImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9WRAdleGGu5pKozdwcSAuLjtTAKhozoVBhyg5tGSdjG1x4s3ihsRPAUWSpKUU6Wy12M74DOWfbDBBDS_qh3SwRcqstYNcLK-eamtIQALXkkeRSzw7wK7nUv-cwrfxWIkihAQMzzMwq-M1-GzH2-34zICz4XzYFo0CcFTBfYTaPS-9FoYks3dv3UtGyb9OZMVxy53Q9U92ls5gdy1V5_YjJEXIpeS3yxerohR1LaI",
    chipShot: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9WRAdleGGu5pKozdwcSAuLjtTAKhozoVBhyg5tGSdjG1x4s3ihsRPAUWSpKUU6Wy12M74DOWfbDBBDS_qh3SwRcqstYNcLK-eamtIQALXkkeRSzw7wK7nUv-cwrfxWIkihAQMzzMwq-M1-GzH2-34zICz4XzYFo0CcFTBfYTaPS-9FoYks3dv3UtGyb9OZMVxy53Q9U92ls5gdy1V5_YjJEXIpeS3yxerohR1LaI"
  }
];

export default function App() {
  const [flavors, setFlavors] = useState(FALLBACK_FLAVORS);
  const [activeFlavor, setActiveFlavor] = useState(FALLBACK_FLAVORS[0]);
  const [cartItems, setCartItems] = useState([
    { id: "tikka-tang", name: "01. Tikka Tang Reserve", price: 50, quantity: 2 },
    { id: "nimbu-pudina", name: "02. Nimbu Pudina Reserve", price: 50, quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch live flavors from Node.js backend
  useEffect(() => {
    fetch("/api/flavors")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) {
          setFlavors(json.data);
          setActiveFlavor(json.data[0]);
        }
      })
      .catch(() => {
        // Fallback gracefully
      });
  }, []);

  const handleAddToCart = (flavor) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === flavor.id);
      if (existing) {
        return prev.map((item) =>
          item.id === flavor.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: flavor.id, name: flavor.fullName, price: flavor.price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddCrate = (preset) => {
    setCartItems((prev) => {
      const crateId = `crate-${preset.name.toLowerCase().replace(/\s+/g, "-")}`;
      const existing = prev.find((item) => item.id === crateId);
      if (existing) {
        return prev.map((item) =>
          item.id === crateId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        { id: crateId, name: `Quad Crate (${preset.name})`, price: 180, quantity: 1 }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#111319] text-[#e2e2eb] font-sans antialiased selection:bg-[#ffb800] selection:text-[#111319]">
      {/* 1. Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Flagship Hero Stage */}
      <main className="w-full pt-20">
        <HeroStage
          flavors={flavors}
          activeFlavor={activeFlavor}
          onSelectFlavor={(f) => setActiveFlavor(f)}
          onAddToCart={handleAddToCart}
        />

        {/* 3. The 3-Pillar Science Bento */}
        <SciencePillars />

        {/* 4. Curated 4-Pack Crate Builder */}
        <QuadCrateBuilder onAddCrate={handleAddCrate} />

        {/* 5. Signature Reserve Line Roster */}
        <ReserveRoster
          flavors={flavors}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Slide-Out Reservation Bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}

