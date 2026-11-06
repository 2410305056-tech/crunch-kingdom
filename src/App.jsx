import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Clock,
  Calendar,
  Check,
  CheckCircle,
  Star,
  Scissors,
  Droplet,
  Heart,
  Shield,
  ShoppingBag,
  X,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  Filter,
  User,
  Award,
  Coffee,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  Info,
  CalendarCheck
} from 'lucide-react';

// Currencies support
const CURRENCIES = {
  GBP: { symbol: '£', rate: 1.0 },
  USD: { symbol: '$', rate: 1.28 },
  EUR: { symbol: '€', rate: 1.18 }
};

// Services Catalog
const SERVICES = [
  {
    id: "srv-01",
    category: "cut",
    title: "The Atelier Bespoke Cut & Styling",
    subtitle: "Precision scissor architecture tailored to facial geometry",
    description: "Includes bespoke consultation, sensorial botanical wash with white truffle scalp massage, micro-point scissor geometry, and signature runway blowout.",
    durationMinutes: 75,
    durationText: "1h 15m",
    priceGBP: 145,
    stylistTier: "Master Stylist",
    highlight: "Signature Service",
    botanical: "White Truffle & Camellia Seed Oil"
  },
  {
    id: "srv-02",
    category: "color",
    title: "Signature French Luminous Balayage",
    subtitle: "Hand-painted dimensional contrast with organic root melt",
    description: "Custom freehand light diffusion tailored to bone structure. Includes Olaplex No. 1 & 2 molecular bond reinforcement, French glaze gloss toning, and anti-porosity seal.",
    durationMinutes: 180,
    durationText: "3h 00m",
    priceGBP: 285,
    stylistTier: "Principal Color Director",
    highlight: "Vogue Awarded",
    botanical: "Fermented Rice Amino Acids & Squalane"
  },
  {
    id: "srv-03",
    category: "spa",
    title: "Japanese Botanical Scalp Sanctuary",
    subtitle: "15-step holistic head spa with microscopic follicle analysis",
    description: "Begins with 200x scalp dermascope diagnostic, followed by ultrasonic dead-sea peeling, warm herbal water cascade halo, shiatsu cranial pressure massage, and cold laser phototherapy.",
    durationMinutes: 90,
    durationText: "1h 30m",
    priceGBP: 165,
    stylistTier: "Holistic Scalp Master",
    highlight: "Sensory Ritual",
    botanical: "Wild Rosemary, Centella Asiatica & Ginseng"
  },
  {
    id: "srv-04",
    category: "color",
    title: "Haute Couture Platinum Blonde & Glaze",
    subtitle: "Clean crystal lift with zero-compromise bond preservation",
    description: "Gentle low-heat micro-foil foilayage lifting to pure clean canvas, followed by dual-phase iced pearl glazing and bio-lipid moisture lock treatment.",
    durationMinutes: 210,
    durationText: "3h 30m",
    priceGBP: 320,
    stylistTier: "Principal Color Director",
    highlight: "High-Fashion Craft",
    botanical: "Organic Murumuru Butter & Hydrolyzed Keratin"
  },
  {
    id: "srv-05",
    category: "treatment",
    title: "Hydrolyzed Raw Silk Mirror Glaze",
    subtitle: "Intensive 8-week anti-humidity glass hair reconstruction",
    description: "Nanotechnology infusion of silk peptides and multi-weight hyaluronic acid. Eliminates frizz while keeping natural volume. Activated with gentle infrared thermo-wand.",
    durationMinutes: 60,
    durationText: "1h 00m",
    priceGBP: 120,
    stylistTier: "Senior Artisan",
    highlight: "Instant Glass Shine",
    botanical: "Hydrolyzed Mulberry Silk & Prickly Pear"
  },
  {
    id: "srv-06",
    category: "cut",
    title: "French Diamond Dry Scissor Restyle",
    subtitle: "Sculpted on dry natural texture to embrace movement",
    description: "Tailored specifically for waves, curls, and effortless Parisian silhouettes. Creates interior negative space so hair falls into place with zero home styling required.",
    durationMinutes: 75,
    durationText: "1h 15m",
    priceGBP: 155,
    stylistTier: "Creative Director",
    highlight: "Effortless Fall",
    botanical: "Cold-Pressed Marula Oil Mist"
  },
  {
    id: "srv-07",
    category: "spa",
    title: "Thermal Detox & Caviar Follicle Therapy",
    subtitle: "Cellular rejuvenation for stressed and thinned hair",
    description: "Deep clarifying volcanic clay scrub followed by bio-fermented caviar peptide ampoule delivered via warm ozone micro-mist cap. Stimulates micro-circulation by +34%.",
    durationMinutes: 75,
    durationText: "1h 15m",
    priceGBP: 140,
    stylistTier: "Holistic Scalp Master",
    highlight: "Cellular Recovery",
    botanical: "Siberian Caviar Peptides & Tea Tree"
  },
  {
    id: "srv-08",
    category: "bridal",
    title: "VIP Bridal Suite Atelier Experience",
    subtitle: "Exclusive private suite session with champagne service",
    description: "Includes initial consultation trial, day-of bridal couture hair sculpture, silk veil integration, bespoke touch-up kit, and private salon suite with vintage Ruinart Champagne.",
    durationMinutes: 240,
    durationText: "4h 00m",
    priceGBP: 480,
    stylistTier: "Founder & Creative Director",
    highlight: "Private Suite",
    botanical: "Prestige White Jasmine & 24K Gold Leaf Serum"
  }
];

// Master Stylists Team
const STYLISTS = [
  {
    id: "camille",
    name: "Camille Laurent",
    role: "Founder & Creative Director",
    experience: "19 Years",
    heritage: "Former Artistic Director, Vidal Sassoon Mayfair",
    specialty: "Precision Architectural Cutting & Parisian Textured Bobs",
    availableDays: "Tue, Thu, Sat",
    rating: "4.99",
    reviewsCount: 840,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    quote: "True luxury is hair that falls flawlessly with zero effort, sculpted to honor your innate bone structure."
  },
  {
    id: "julian",
    name: "Julian Vance",
    role: "Principal Color Director",
    experience: "14 Years",
    heritage: "L'Oréal Haute Coiffure Paris Alum • Elle UK Contributor",
    specialty: "Seamless Sunkissed Balayage & French Dimension",
    availableDays: "Wed, Fri, Sun",
    rating: "4.98",
    reviewsCount: 612,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    quote: "Color should look as though the Mediterranean sun has gently blessed your hair across three summers."
  },
  {
    id: "mei",
    name: "Mei Lin",
    role: "Head of Trichology & Japanese Head Spa",
    experience: "12 Years",
    heritage: "Certified Master Trichologist, Ginza Tokyo",
    specialty: "Holistic Scalp Rejuvenation & Shiatsu Cranial Therapy",
    availableDays: "Tue, Wed, Thu, Fri, Sat",
    rating: "5.00",
    reviewsCount: 498,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    quote: "A luminous crown is impossible without a balanced, breathing, and nourished scalp ecosystem."
  },
  {
    id: "antoine",
    name: "Antoine Moreau",
    role: "Senior Texture Artisan",
    experience: "10 Years",
    heritage: "Fashion Week Paris & Milan Backstage Stylist",
    specialty: "Dry Sculpting, Natural Wave Definition & Glass Glazes",
    availableDays: "Thu, Fri, Sat, Sun",
    rating: "4.97",
    reviewsCount: 385,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    quote: "Working with the hair's natural resistance creates forms that live and breathe with the client."
  }
];

// Transformation Case Studies
const TRANSFORMATIONS = [
  {
    id: "tr-01",
    client: "Genevieve R. (Mayfair, London)",
    stylist: "Julian Vance",
    title: "Over-Processed Brassy Foil to Cashmere French Balayage",
    formula: "AirTouch dimensional diffusion + Root shadow 7.1 + Luminous Opal gloss",
    duration: "3h 15m",
    beforeText: "Dull, brassy yellow stripes with dry ends",
    afterText: "Seamless seamless champagne gradient with high-mirror reflection",
    beforeImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    afterImg: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tr-02",
    client: "Eleanor S. (SoHo, New York)",
    stylist: "Camille Laurent",
    title: "Weighty Shapeless Length to French Textured Micro-Bob",
    formula: "Diamond dry scissor architecture + Face-framing cheekbone contour",
    duration: "1h 30m",
    beforeText: "Heavy, lifeless perimeter dragging down facial features",
    afterText: "Chic Parisian movement highlighting cheekbones and jawline",
    beforeImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    afterImg: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tr-03",
    client: "Sora K. (Kensington, London)",
    stylist: "Mei Lin",
    title: "Sebum-Congested Sensitive Scalp to Purified Follicle Rebirth",
    formula: "Japanese 15-step botanical cascade + Centella oxygen infusion",
    duration: "1h 45m",
    beforeText: "Flaking, redness, micro-inflammation around hairline",
    afterText: "Crystal-clear oxygenated follicles with +40% root lift",
    beforeImg: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    afterImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
  }
];

// Retail Apothecary Products
const PRODUCTS = [
  {
    id: "prod-01",
    name: "Élixir No. 7 Caviar Hair Oil",
    subtitle: "Weightless velvet gloss & heat shield (230°C)",
    volume: "50 ml / 1.7 fl oz",
    priceGBP: 68,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1608248597359-0a649d28dbb3?auto=format&fit=crop&w=500&q=80",
    description: "Siberian caviar peptides and cold-pressed Camellia flower oil infused with 24K gold flecks for mirror-shine."
  },
  {
    id: "prod-02",
    name: "White Truffle & Rosemary Follicle Tonic",
    subtitle: "Micro-circulation activator & root densifier",
    volume: "100 ml / 3.4 fl oz",
    priceGBP: 74,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    description: "Wild rosemary hydro-distillate and Piedmont white truffle enzymes to stimulate dormant follicle density."
  },
  {
    id: "prod-03",
    name: "Raw Mulberry Silk Biomimetic Masque",
    subtitle: "Intensive deep lipid & amino acid replenishment",
    volume: "200 ml / 6.7 fl oz",
    priceGBP: 82,
    rating: 4.96,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80",
    description: "Bio-engineered silk fibroin matches natural keratin protein to rebuild damaged internal cortex bonds."
  },
  {
    id: "prod-04",
    name: "Damask Rose & Bamboo Scalp Mist",
    subtitle: "Anti-pollution sensory refresher & microbiome balancer",
    volume: "120 ml / 4.0 fl oz",
    priceGBP: 48,
    rating: 4.94,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
    description: "Hand-harvested Bulgarian organic rose water with fermented bamboo extract to soothe stressed roots."
  }
];

export default function App() {
  const [currency, setCurrency] = useState('GBP');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reservedServices, setReservedServices] = useState([SERVICES[0]]);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [activeDate, setActiveDate] = useState('2026-11-12');
  const [activeTimeSlot, setActiveTimeSlot] = useState('11:30 AM');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: services, 2: stylist, 3: date/time, 4: details, 5: confirmed
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Client Concierge Details
  const [guestDetails, setGuestDetails] = useState({
    fullName: "Lady Victoria Sterling",
    email: "victoria.sterling@mayfair.co.uk",
    phone: "+44 20 7946 0912",
    beveragePreference: "Vintage Ruinart Rosé Champagne",
    notes: "Prefer a quiet session with minimal heat styling. Interested in Japanese head spa consultation."
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Convert prices based on active currency
  const formatPrice = (priceGBP) => {
    const cur = CURRENCIES[currency];
    const converted = Math.round(priceGBP * cur.rate);
    return `${cur.symbol}${converted}`;
  };

  // Total Duration and Price for reserved services
  const totalDuration = useMemo(() => {
    return reservedServices.reduce((sum, s) => sum + s.durationMinutes, 0);
  }, [reservedServices]);

  const totalPrice = useMemo(() => {
    const rawGBP = reservedServices.reduce((sum, s) => sum + s.priceGBP, 0);
    return formatPrice(rawGBP);
  }, [reservedServices, currency]);

  // Toggle service selection
  const toggleService = (service) => {
    if (reservedServices.some(s => s.id === service.id)) {
      if (reservedServices.length === 1) {
        showToast("At least one bespoke ritual must remain selected");
        return;
      }
      setReservedServices(prev => prev.filter(s => s.id !== service.id));
      showToast(`Removed "${service.title}" from session`);
    } else {
      setReservedServices(prev => [...prev, service]);
      showToast(`Added "${service.title}" to session`);
    }
  };

  // Add retail product to cart
  const handleAddProduct = (product) => {
    setCartItems(prev => [...prev, product]);
    showToast(`Added ${product.name} to your boutique bag`);
  };

  // Filtered Services
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return SERVICES;
    return SERVICES.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#E8E5DF] font-sans selection:bg-[#C5A880]/30 selection:text-[#F7F4EF]">
      
      {/* ✦ 1. Top Announcement Header Bar */}
      <aside aria-label="Atelier concierge notice" className="bg-[#12141B] border-b border-[#222530] text-xs px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[#A5A198]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#C5A880] font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>ÉLAN ATELIER PRIVÉ</span>
          </span>
          <span className="hidden md:inline text-stone-600">|</span>
          <span className="hidden sm:inline">Complimentary Vintage Rosé Champagne & Micro-Scalp Scan with every ritual</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden lg:inline text-[#8E8A82]">
            Mayfair, London &bull; SoHo, New York &bull; Le Marais, Paris
          </span>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-[#1A1D26] px-2 py-0.5 rounded-full border border-stone-800 text-[11px]">
            {Object.keys(CURRENCIES).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  currency === c ? 'bg-[#C5A880] text-[#0B0C10] font-bold' : 'text-[#8E8A82] hover:text-[#E8E5DF]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ✦ 2. Main Sticky Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0B0E]/90 border-b border-stone-800/80 px-4 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8C6D46] via-[#C5A880] to-[#E8D5B5] p-[1.5px] shadow-lg shadow-[#C5A880]/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#0E1015] rounded-full flex items-center justify-center group-hover:bg-[#151720] transition-colors">
                <Scissors className="w-4 h-4 text-[#C5A880]" />
              </div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-light tracking-[0.18em] text-[#F7F4EF] uppercase flex items-center gap-2">
                ÉLAN <span className="text-[#C5A880] font-normal italic">Atelier</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8E8A82] font-medium">Haute Coiffure & Scalp Sanctuary</p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-[#A5A198]">
            <a href="#services" className="hover:text-[#C5A880] transition-colors">Treatment Menu</a>
            <a href="#transformations" className="hover:text-[#C5A880] transition-colors">Lookbook</a>
            <a href="#stylists" className="hover:text-[#C5A880] transition-colors">Master Artisans</a>
            <a href="#apothecary" className="hover:text-[#C5A880] transition-colors">Botanical Apothecary</a>
            <a href="#experience" className="hover:text-[#C5A880] transition-colors">The Experience</a>
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-3">
            
            {/* Live Session Tally Pill */}
            <button
              onClick={() => {
                setBookingStep(1);
                setIsBookingOpen(true);
              }}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#151821] hover:bg-[#1E222E] border border-stone-800 text-xs transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse"></div>
              <span className="text-[#A5A198]">{reservedServices.length} Ritual{reservedServices.length > 1 ? 's' : ''}</span>
              <span className="font-serif font-bold text-[#F7F4EF] text-sm">{totalPrice}</span>
            </button>

            {/* Reserve CTA Button */}
            <button
              onClick={() => {
                setBookingStep(1);
                setIsBookingOpen(true);
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#C5A880] via-[#D8C1A0] to-[#C5A880] hover:from-[#D8C1A0] hover:to-[#E8D5B5] text-[#0A0B0E] font-bold shadow-md shadow-[#C5A880]/15 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Reserve Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>
      </header>

      {/* ✦ 3. Hero Stage (High-Fashion Editorial Typography & Atmosphere) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-atelier-radial">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171A24] border border-[#2B2F3D] text-[11px] font-medium tracking-widest uppercase text-[#C5A880]">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>The Architecture of Modern Hair & Botanical Harmony</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#F7F4EF] leading-[1.08] tracking-tight">
                Where high-fashion <span className="italic font-normal text-[#C5A880]">sculpture</span> meets sensory botanical <span className="italic font-normal">rejuvenation.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#A5A198] max-w-xl font-light leading-relaxed">
                Nestled in Mount Street Mayfair and Prince Street SoHo. We curate bespoke French balayage, diamond dry scissor geometry, and 15-step Japanese head spa rituals that transform hair from cellular root to radiant perimeter.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setBookingStep(1);
                    setIsBookingOpen(true);
                  }}
                  className="px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#C5A880] hover:bg-[#D8C1A0] text-[#0B0C10] font-bold transition-all shadow-lg shadow-[#C5A880]/20 flex items-center gap-2.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Private Consultation</span>
                </button>

                <a
                  href="#services"
                  className="px-6 py-3.5 rounded-full text-xs font-medium uppercase tracking-widest bg-transparent hover:bg-stone-800/40 text-[#E8E5DF] border border-stone-800 hover:border-stone-700 transition-all"
                >
                  Explore Treatment Menu
                </a>
              </div>

              {/* Accolades Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-800/80">
                <div>
                  <div className="font-serif text-2xl font-light text-[#F7F4EF]">4.99 <span className="text-[#C5A880] text-sm">★</span></div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8E8A82] mt-0.5">3,200+ Verified Sessions</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-light text-[#F7F4EF]">100%</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8E8A82] mt-0.5">Biodynamic Vegan Botanicals</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-light text-[#F7F4EF]">VOGUE</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8E8A82] mt-0.5">Atelier of the Year 2025/26</div>
                </div>
              </div>

            </div>

            {/* Right Visual Composition (Editorial Split Showcase) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                
                {/* Main Luxury Imagery Card */}
                <div className="rounded-3xl overflow-hidden border border-stone-800/80 bg-[#12141C] shadow-2xl relative group">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
                    alt="Élan Atelier Haute Coiffure Mayfair"
                    className="w-full h-[460px] object-cover object-center filter brightness-[0.92] contrast-[1.04] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating Atelier Card Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md bg-[#10121A]/85 border border-stone-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-base text-[#F7F4EF]">Haute Balayage &amp; Scalp Glow</span>
                      <span className="text-[10px] font-mono uppercase text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded-full border border-[#C5A880]/20">
                        Mayfair Private Suite
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A5A198]">Curated with raw silk infusion, freehand dimensional contouring, and cold laser scalp phototherapy.</p>
                  </div>
                </div>

                {/* Floating Stylist Badge */}
                <div className="absolute -top-4 -right-4 p-3.5 rounded-2xl backdrop-blur-lg bg-[#161822]/90 border border-stone-700/80 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C5A880]/50">
                    <img src={STYLISTS[0].image} alt="Camille Laurent" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-semibold text-white">Camille Laurent</div>
                    <div className="text-[10px] text-[#C5A880]">Founder &bull; 2 slots open this week</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ✦ 4. The 3 Sanctuary Pillars (Bento Grid) */}
      <section className="py-12 border-y border-stone-800/80 bg-[#0E1017]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#12141D] border border-stone-800/90 space-y-3 hover:border-[#C5A880]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#1D212E] flex items-center justify-center text-[#C5A880]">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-light text-[#F7F4EF]">Architectural Diamond Cut</h3>
              <p className="text-xs text-[#A5A198] leading-relaxed">
                Sculpted in harmony with your facial bone density and organic hair growth cowlicks. Zero thinning shears—only Japanese hand-honed shears for pure integrity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12141D] border border-stone-800/90 space-y-3 hover:border-[#C5A880]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#1D212E] flex items-center justify-center text-[#C5A880]">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-light text-[#F7F4EF]">Sensory Japanese Head Spa</h3>
              <p className="text-xs text-[#A5A198] leading-relaxed">
                Customized after high-resolution microscopic scalp diagnostics. Unclogs follicle plugs, relieves cranial fatigue, and restores natural hair root buoyancy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12141D] border border-stone-800/90 space-y-3 hover:border-[#C5A880]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#1D212E] flex items-center justify-center text-[#C5A880]">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-light text-[#F7F4EF]">Mayfair Private Suite Concierge</h3>
              <p className="text-xs text-[#A5A198] leading-relaxed">
                Acoustically secluded suites, private wash beds with neck zero-gravity support, Dyson Supersonic r™ systems, and vintage Ruinart Champagne.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ✦ 5. Interactive Treatment Menu & Reservation Suite */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">Curated Service Menu</div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4EF]">
              Haute Coiffure, Balayage &amp; <span className="italic text-[#C5A880]">Rituals</span>
            </h2>
          </div>
          <p className="text-xs text-[#A5A198] max-w-md">
            All appointments include a bespoke botanical wash, shiatsu scalp massage, and custom beverage pairing. Prices automatically convert to <strong className="text-white">{currency}</strong>.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-800/60 pb-4">
          {[
            { id: 'all', label: 'All Rituals' },
            { id: 'cut', label: 'Haute Cuts & Styling' },
            { id: 'color', label: 'French Balayage & Color' },
            { id: 'spa', label: 'Scalp Sanctuary Head Spa' },
            { id: 'treatment', label: 'Silk Glaze & Repair' },
            { id: 'bridal', label: 'VIP Bridal Suite' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#C5A880] text-[#0A0B0E] font-bold shadow-md shadow-[#C5A880]/15'
                  : 'bg-[#14161F] text-[#8E8A82] hover:text-[#E8E5DF] hover:bg-[#1B1E2B] border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map(service => {
            const isSelected = reservedServices.some(s => s.id === service.id);
            return (
              <div
                key={service.id}
                className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between gap-5 group ${
                  isSelected
                    ? 'bg-[#161924] border-[#C5A880] shadow-xl shadow-[#C5A880]/10'
                    : 'bg-[#11131B] border-stone-800/90 hover:border-stone-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded-full border border-[#C5A880]/20">
                      {service.highlight}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#8E8A82]">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{service.durationText}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F7F4EF] leading-snug group-hover:text-[#C5A880] transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs text-[#C5A880] italic">{service.subtitle}</div>
                  <p className="text-xs text-[#A5A198] leading-relaxed pt-1">{service.description}</p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase text-[#8E8A82]">Tier: {service.stylistTier}</div>
                    <div className="font-serif text-2xl font-bold text-[#F7F4EF] tracking-tight">
                      {formatPrice(service.priceGBP)}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#C5A880] text-[#0B0C10] font-bold shadow-md'
                        : 'bg-[#1A1D28] hover:bg-[#252938] text-[#E8E5DF] border border-stone-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected in Session</span>
                      </>
                    ) : (
                      <>
                        <span>Select Treatment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Services Floating Summary Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171A24] via-[#1A1D29] to-[#171A24] border border-[#C5A880]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-[#C5A880] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Current Private Session Composition</span>
            </div>
            <div className="text-xs text-[#A5A198]">
              {reservedServices.map(s => s.title).join(' • ')} ({totalDuration} mins total)
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] uppercase text-[#8E8A82]">Session Investment</div>
              <div className="font-serif text-2xl font-bold text-[#F7F4EF]">{totalPrice}</div>
            </div>
            <button
              onClick={() => {
                setBookingStep(2);
                setIsBookingOpen(true);
              }}
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C5A880] hover:bg-[#D8C1A0] text-[#0A0B0E] transition-all shadow-md shadow-[#C5A880]/20 flex items-center gap-2"
            >
              <span>Continue Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* ✦ 6. Transformation Studio Lookbook */}
      <section id="transformations" className="py-20 bg-[#0E1017] border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">Editorial Case Studies</div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4EF]">
                Before &amp; After <span className="italic text-[#C5A880]">Transformations</span>
              </h2>
            </div>
            <p className="text-xs text-[#A5A198] max-w-md">
              Real clientele results achieved through bespoke French balayage formulations and Japanese head spa follicle detoxification.
            </p>
          </div>

          {/* Transformation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRANSFORMATIONS.map(item => (
              <div key={item.id} className="bg-[#12141D] rounded-2xl border border-stone-800/80 overflow-hidden shadow-xl space-y-4 p-4">
                
                {/* Visual Dual Compare */}
                <div className="grid grid-cols-2 gap-2 relative rounded-xl overflow-hidden">
                  <div className="relative group">
                    <img src={item.beforeImg} alt="Before" className="w-full h-56 object-cover filter grayscale contrast-125" />
                    <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] uppercase font-mono text-stone-400">
                      Before
                    </span>
                  </div>
                  <div className="relative group">
                    <img src={item.afterImg} alt="After" className="w-full h-56 object-cover" />
                    <span className="absolute bottom-2 right-2 bg-[#C5A880] px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold text-black">
                      Élan Result
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="text-[11px] text-[#C5A880] font-semibold">{item.client}</div>
                  <h3 className="font-serif text-lg font-light text-[#F7F4EF] leading-snug">{item.title}</h3>
                  <p className="text-[#8E8A82] text-[11px]"><strong className="text-stone-300">Formula:</strong> {item.formula}</p>
                  
                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-[#A5A198]">
                    <span>Artisan: <strong className="text-white">{item.stylist}</strong></span>
                    <span>Session: {item.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBookingStep(1);
                    setIsBookingOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1A1D27] hover:bg-[#C5A880] hover:text-[#0A0B0E] text-[#E8E5DF] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Request Similar Transformation</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ✦ 7. Master Stylists & Color Directors */}
      <section id="stylists" className="py-20 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">The Artisans</div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4EF]">
              Meet Our <span className="italic text-[#C5A880]">Master Directors</span>
            </h2>
          </div>
          <p className="text-xs text-[#A5A198] max-w-md">
            Alumni of Vidal Sassoon Mayfair, Ginza Tokyo Trichology, and Paris Fashion Week, dedicated exclusively to your hair integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLISTS.map(stylist => (
            <div
              key={stylist.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                selectedStylist.id === stylist.id
                  ? 'bg-[#151822] border-[#C5A880] shadow-lg shadow-[#C5A880]/10'
                  : 'bg-[#11131B] border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-900">
                  <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono text-[#C5A880] border border-stone-700">
                    ★ {stylist.rating} ({stylist.reviewsCount})
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-light text-[#F7F4EF]">{stylist.name}</h3>
                  <div className="text-xs text-[#C5A880] font-medium">{stylist.role}</div>
                  <div className="text-[11px] text-[#8E8A82] mt-0.5">{stylist.heritage}</div>
                </div>

                <p className="text-xs text-[#A5A198] leading-relaxed italic border-l-2 border-[#C5A880]/50 pl-2">
                  "{stylist.quote}"
                </p>

                <div className="text-[11px] text-stone-400 font-mono">
                  Available: <span className="text-white">{stylist.availableDays}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedStylist(stylist);
                  setBookingStep(3);
                  setIsBookingOpen(true);
                }}
                className={`w-full py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedStylist.id === stylist.id
                    ? 'bg-[#C5A880] text-[#0A0B0E] font-bold'
                    : 'bg-[#1A1D28] hover:bg-[#252938] text-[#E8E5DF] border border-stone-800'
                }`}
              >
                {selectedStylist.id === stylist.id ? 'Stylist Selected' : `Book with ${stylist.name.split(' ')[0]}`}
              </button>
            </div>
          ))}
        </div>

      </section>

      {/* ✦ 8. Botanical Hair Care Apothecary (E-Commerce Luxury Retail) */}
      <section id="apothecary" className="py-20 bg-[#0E1017] border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">Home Rituals</div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4EF]">
                The Botanical <span className="italic text-[#C5A880]">Apothecary</span>
              </h2>
            </div>
            <p className="text-xs text-[#A5A198] max-w-md">
              Bio-fermented cellular formulations prescribed by our trichologists to preserve salon luminosity and scalp micro-flora balance between appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-[#12141D] rounded-2xl border border-stone-800/90 p-5 flex flex-col justify-between gap-4 hover:border-[#C5A880]/50 transition-all group">
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-square bg-[#08090D] flex items-center justify-center p-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-black/80 px-2 py-0.5 rounded text-[#C5A880]">
                      {product.volume}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-light text-[#F7F4EF] leading-snug group-hover:text-[#C5A880] transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-xs text-[#8E8A82] mt-0.5">{product.subtitle}</div>
                    <p className="text-[11px] text-[#A5A198] mt-2 leading-relaxed">{product.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="font-serif text-xl font-bold text-[#F7F4EF]">
                    {formatPrice(product.priceGBP)}
                  </div>
                  <button
                    onClick={() => handleAddProduct(product)}
                    className="px-3 py-1.5 rounded-full bg-[#1A1D27] hover:bg-[#C5A880] hover:text-[#0A0B0E] text-xs font-semibold uppercase tracking-wider text-[#E8E5DF] transition-all flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ✦ 9. Editorial Testimonials & Press */}
      <section id="experience" className="py-20 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">Critical Acclaim</div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4EF]">
            Praised by the <span className="italic text-[#C5A880]">International Press</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[#12141D] border border-stone-800 space-y-4">
            <div className="font-serif text-xl font-bold tracking-widest text-[#F7F4EF]">BRITISH VOGUE</div>
            <p className="font-serif text-lg italic text-[#E8E5DF] leading-relaxed">
              "Élan Atelier has revolutionized Mayfair hair care. Their bespoke French balayage looks entirely organic, and the Japanese head spa is pure transcendent bliss."
            </p>
            <div className="text-xs text-[#8E8A82]">&mdash; Beauty &amp; Wellness Director</div>
          </div>

          <div className="p-7 rounded-2xl bg-[#12141D] border border-stone-800 space-y-4">
            <div className="font-serif text-xl font-bold tracking-widest text-[#F7F4EF]">HARPER'S BAZAAR</div>
            <p className="font-serif text-lg italic text-[#E8E5DF] leading-relaxed">
              "The scissor architecture executed by Camille Laurent creates hair that falls into place with zero effort. The premier sanctuary for high-society London."
            </p>
            <div className="text-xs text-[#8E8A82]">&mdash; Luxury Lifestyle Review</div>
          </div>

          <div className="p-7 rounded-2xl bg-[#12141D] border border-stone-800 space-y-4">
            <div className="font-serif text-xl font-bold tracking-widest text-[#F7F4EF]">ELLE UK</div>
            <p className="font-serif text-lg italic text-[#E8E5DF] leading-relaxed">
              "A breath of fresh, quiet luxury. The private suites, Ruinart champagne service, and molecular silk treatments define modern haute coiffure."
            </p>
            <div className="text-xs text-[#8E8A82]">&mdash; Executive Beauty Editor</div>
          </div>
        </div>
      </section>

      {/* ✦ 10. Footer & Atelier Concierge Information */}
      <footer className="bg-[#0B0C10] border-t border-stone-800/80 pt-16 pb-12 text-xs text-[#8E8A82]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand Narrative */}
            <div className="lg:col-span-2 space-y-4">
              <div className="font-serif text-2xl font-light tracking-[0.18em] text-[#F7F4EF] uppercase">
                ÉLAN <span className="text-[#C5A880] italic">Atelier</span>
              </div>
              <p className="text-xs text-[#A5A198] max-w-sm leading-relaxed">
                Haute coiffure, dimensional French balayage, and holistic Japanese head spa rituals. Operating private ateliers in Mount Street Mayfair and Prince Street SoHo.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[#C5A880]">
                <span>London</span> &bull; <span>New York</span> &bull; <span>Paris</span>
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#F7F4EF] font-bold">Atelier Locations</div>
              <div className="space-y-2 text-[#A5A198]">
                <div>
                  <strong className="text-white block font-serif">Mayfair Atelier</strong>
                  42 Mount Street, London W1K 2RX<br />
                  +44 20 7946 0912
                </div>
                <div className="pt-2">
                  <strong className="text-white block font-serif">SoHo Atelier</strong>
                  114 Prince Street, New York, NY 10012<br />
                  +1 (212) 555-0198
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#F7F4EF] font-bold">Private Hours</div>
              <div className="space-y-1.5 text-[#A5A198]">
                <div className="flex justify-between"><span>Tuesday &ndash; Friday</span><span className="text-white">9:00 AM &ndash; 8:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="text-white">8:30 AM &ndash; 7:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-white">10:00 AM &ndash; 6:00 PM</span></div>
                <div className="flex justify-between text-stone-500"><span>Monday</span><span>Private Suite Bookings Only</span></div>
              </div>
            </div>

            {/* Newsletter Club */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#F7F4EF] font-bold">Private Newsletter</div>
              <p className="text-[11px] text-[#A5A198]">Receive seasonal lookbooks and private priority reservation releases.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) {
                    showToast("Thank you for subscribing to Élan Atelier Journal");
                    setNewsletterEmail('');
                  }
                }}
                className="space-y-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#14161F] border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#C5A880] hover:bg-[#D8C1A0] text-[#0A0B0E] font-bold uppercase tracking-wider rounded-lg text-[11px] transition-colors"
                >
                  Join Guest List
                </button>
              </form>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>&copy; {new Date().getFullYear()} Élan Atelier Privé Ltd. All Rights Reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Concierge Terms</a>
              <a href="#" className="hover:text-white">Press Inquiries</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ✦ 11. Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161822] text-[#F7F4EF] border border-[#C5A880]/50 px-4 py-2.5 rounded-full shadow-2xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ✦ 12. Interactive Multi-Step Reservation Modal / Drawer */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10121A] border border-stone-700/80 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#151722] border-b border-stone-800 p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold">Atelier Private Reservation</span>
                <h3 className="font-serif text-2xl font-light text-[#F7F4EF]">
                  {bookingStep === 1 && "Curate Your Session Rituals"}
                  {bookingStep === 2 && "Select Master Artisan"}
                  {bookingStep === 3 && "Select Date & Time Slot"}
                  {bookingStep === 4 && "Guest Concierge Details"}
                  {bookingStep === 5 && "Reservation Confirmed"}
                </h3>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1F2230] text-[#A5A198] hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Indicators */}
            <div className="bg-[#12141D] border-b border-stone-800 px-6 py-2.5 flex items-center justify-between text-xs">
              {[
                { num: 1, label: "Rituals" },
                { num: 2, label: "Artisan" },
                { num: 3, label: "Schedule" },
                { num: 4, label: "Concierge" }
              ].map(st => (
                <div key={st.num} className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    bookingStep === st.num
                      ? 'bg-[#C5A880] text-black'
                      : bookingStep > st.num
                      ? 'bg-stone-700 text-white'
                      : 'bg-stone-900 text-stone-500'
                  }`}>
                    {bookingStep > st.num ? '✓' : st.num}
                  </span>
                  <span className={`hidden sm:inline text-[11px] ${bookingStep === st.num ? 'text-white font-bold' : 'text-stone-500'}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Body Content by Step */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* Step 1: Services List Toggle */}
              {bookingStep === 1 && (
                <div className="space-y-3">
                  <p className="text-[#A5A198]">Select or customize the rituals for your visit. Multiple rituals can be grouped in a single private session.</p>
                  
                  <div className="space-y-2.5">
                    {SERVICES.map(srv => {
                      const isSel = reservedServices.some(s => s.id === srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isSel
                              ? 'bg-[#181C28] border-[#C5A880]'
                              : 'bg-[#12141C] border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="font-serif text-base font-medium text-white">{srv.title}</div>
                            <div className="text-[11px] text-[#8E8A82] flex items-center gap-2">
                              <span>{srv.durationText}</span> &bull; <span>{srv.stylistTier}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif text-base font-bold text-[#F7F4EF]">{formatPrice(srv.priceGBP)}</div>
                            <span className={`text-[10px] font-bold uppercase ${isSel ? 'text-[#C5A880]' : 'text-stone-500'}`}>
                              {isSel ? 'Selected' : '+ Add'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Stylist Selection */}
              {bookingStep === 2 && (
                <div className="space-y-3">
                  <p className="text-[#A5A198]">Choose your designated creative director or holistic scalp specialist.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STYLISTS.map(stylist => (
                      <div
                        key={stylist.id}
                        onClick={() => setSelectedStylist(stylist)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          selectedStylist.id === stylist.id
                            ? 'bg-[#181C28] border-[#C5A880]'
                            : 'bg-[#12141C] border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <div className="font-serif text-base font-medium text-white">{stylist.name}</div>
                          <div className="text-[11px] text-[#C5A880]">{stylist.role}</div>
                          <div className="text-[10px] text-stone-500 font-mono">Rating: ★ {stylist.rating}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Slot Picker */}
              {bookingStep === 3 && (
                <div className="space-y-4">
                  <p className="text-[#A5A198]">Select an upcoming appointment date and exclusive private suite time slot.</p>
                  
                  {/* Date Selector Pills */}
                  <div>
                    <label className="text-stone-400 block mb-1.5 font-medium">Available Dates (Mayfair Atelier)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[
                        { date: '2026-11-12', label: 'Thu 12 Nov' },
                        { date: '2026-11-13', label: 'Fri 13 Nov' },
                        { date: '2026-11-14', label: 'Sat 14 Nov' },
                        { date: '2026-11-15', label: 'Sun 15 Nov' },
                        { date: '2026-11-17', label: 'Tue 17 Nov' }
                      ].map(d => (
                        <button
                          key={d.date}
                          onClick={() => setActiveDate(d.date)}
                          className={`p-2.5 rounded-xl text-center border transition-all text-xs ${
                            activeDate === d.date
                              ? 'bg-[#C5A880] text-black font-bold border-[#C5A880]'
                              : 'bg-[#14161F] text-stone-300 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="text-stone-400 block mb-1.5 font-medium">Available Private Session Times</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        '09:30 AM', '11:15 AM', '01:45 PM', '03:30 PM',
                        '05:00 PM', '06:30 PM'
                      ].map(slot => (
                        <button
                          key={slot}
                          onClick={() => setActiveTimeSlot(slot)}
                          className={`p-2.5 rounded-xl text-center border transition-all text-xs font-mono ${
                            activeTimeSlot === slot
                              ? 'bg-[#C5A880] text-black font-bold border-[#C5A880]'
                              : 'bg-[#14161F] text-stone-300 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#131620] rounded-xl border border-stone-800 text-[11px] text-[#A5A198] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#C5A880]" />
                    <span>Stylist {selectedStylist.name} is confirmed for this window.</span>
                  </div>
                </div>
              )}

              {/* Step 4: Guest Details */}
              {bookingStep === 4 && (
                <div className="space-y-3">
                  <p className="text-[#A5A198]">Enter your contact preferences for appointment confirmation and concierge preparation.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-stone-400 block mb-1 text-[11px]">Full Name</label>
                      <input
                        type="text"
                        value={guestDetails.fullName}
                        onChange={(e) => setGuestDetails({...guestDetails, fullName: e.target.value})}
                        className="w-full bg-[#14161F] border border-stone-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1 text-[11px]">Email Address</label>
                      <input
                        type="email"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                        className="w-full bg-[#14161F] border border-stone-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-stone-400 block mb-1 text-[11px]">Phone / Mobile Number</label>
                      <input
                        type="text"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                        className="w-full bg-[#14161F] border border-stone-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1 text-[11px]">Complimentary Beverage Preference</label>
                      <select
                        value={guestDetails.beveragePreference}
                        onChange={(e) => setGuestDetails({...guestDetails, beveragePreference: e.target.value})}
                        className="w-full bg-[#14161F] border border-stone-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Vintage Ruinart Rosé Champagne">Vintage Ruinart Rosé Champagne</option>
                        <option value="Ceremonial Uji Matcha Latte">Ceremonial Uji Matcha Latte</option>
                        <option value="Artisan Espresso & Almond Milk">Artisan Espresso &amp; Almond Milk</option>
                        <option value="Sparkling Mineral Water & Fresh Mint">Sparkling Mineral Water &amp; Fresh Mint</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-stone-400 block mb-1 text-[11px]">Special Concierge Requests</label>
                    <textarea
                      rows={2}
                      value={guestDetails.notes}
                      onChange={(e) => setGuestDetails({...guestDetails, notes: e.target.value})}
                      className="w-full bg-[#14161F] border border-stone-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation Pass */}
              {bookingStep === 5 && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center border border-[#C5A880]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] font-bold">Booking Reference: ELN-2026-9812</span>
                    <h3 className="font-serif text-3xl font-light text-white mt-1">Your Atelier Session is Confirmed</h3>
                    <p className="text-[#A5A198] text-xs max-w-md mx-auto mt-1">
                      A personalized digital calendar invite and private arrival pass have been dispatched to <strong className="text-white">{guestDetails.email}</strong>.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-[#141620] border border-stone-800 text-left text-xs max-w-md mx-auto space-y-2">
                    <div className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Atelier Suite:</span>
                      <span className="text-white font-medium">Mayfair 42 Mount St, London</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Master Artisan:</span>
                      <span className="text-[#C5A880] font-medium">{selectedStylist.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Date &amp; Time:</span>
                      <span className="text-white font-medium">{activeDate} at {activeTimeSlot}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Total Duration:</span>
                      <span className="text-white font-medium">{totalDuration} Minutes</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-stone-400">Session Total:</span>
                      <span className="font-serif text-lg font-bold text-[#F7F4EF]">{totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="bg-[#151722] border-t border-stone-800 p-4 flex items-center justify-between">
              {bookingStep > 1 && bookingStep < 5 ? (
                <button
                  onClick={() => setBookingStep(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white"
                >
                  &larr; Back
                </button>
              ) : (
                <div></div>
              )}

              {bookingStep < 4 && (
                <button
                  onClick={() => setBookingStep(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#D8C1A0] text-black font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {bookingStep === 4 && (
                <button
                  onClick={() => setBookingStep(5)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E8D5B5] hover:opacity-95 text-black font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Lock &amp; Confirm Reservation</span>
                </button>
              )}

              {bookingStep === 5 && (
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="w-full py-2.5 rounded-full bg-[#C5A880] text-black font-bold uppercase tracking-wider text-xs"
                >
                  Return to Atelier
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
