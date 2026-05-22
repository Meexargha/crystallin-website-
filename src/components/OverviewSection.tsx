import { useState } from 'react';
import { RESTAURANT_INFO } from '../data';
import { MapPin, Phone, Car, Compass, Smile, Flame, ShieldCheck, Heart, Coffee, Star } from 'lucide-react';

interface OverviewSectionProps {
  onNavigateTab: (tabId: string) => void;
}

export default function OverviewSection({ onNavigateTab }: OverviewSectionProps) {
  const [departure, setDeparture] = useState("Kolkata");
  const [vehicle, setVehicle] = useState("Car");

  // Stopover travel advice based on current Expressway itinerary
  const travelAdvice: Record<string, { distance: string; travelTime: string; suggestion: string; mealDeal: string }> = {
    Kolkata: {
      distance: "42 km",
      travelTime: "1 hour 15 mins",
      suggestion: "An excellent half-way dinner stop or refreshing nightstay! Leave Kolkata after work, avoid city traffic, and stop here by 8 PM for fresh Tandoori Pomfret or the celebrated Afghani Chicken.",
      mealDeal: "Hourly Rest (3 hrs) + Deluxe Seafood Feast"
    },
    Kalyani: {
      distance: "12 km",
      travelTime: "20 mins",
      suggestion: "Extremely nearby! Best place to bring family for Sunday lunch or late evening hangouts. Try the premium Veg Thali and fresh lobster curry.",
      mealDeal: "Family Table Booking + Specialty Crabs"
    },
    Barrackpore: {
      distance: "18 km",
      travelTime: "30 mins",
      suggestion: "A smooth, quick drive up the expressway. If you are seeking couples lodging or standard local lodging with absolute safety, book our Deluxe AC room hourly.",
      mealDeal: "Hourly AC Room + Tandoor Starter Platter"
    },
    Sodpur: {
      distance: "22 km",
      travelTime: "40 mins",
      suggestion: "Excellent destination for a quick drive-through or take-away for home parties. Order ahead so your food gets packed hot by the time you arrive.",
      mealDeal: "Drive-Through Hot Pack Combo"
    }
  };

  const currentAdvice = travelAdvice[departure];

  return (
    <div className="space-y-12">
      {/* Visual Elegant Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white min-h-[460px] flex items-center">
        {/* Overlay Background */}
        <div className="absolute inset-0 z-0 opacity-45 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 px-6 md:px-12 py-16 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/95 text-xs font-bold rounded-full uppercase tracking-wider text-white shadow-xs">
            <Flame className="w-3 h-3 fill-white" />
            Expressway Dining & Lodging
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-white">
              CRYSTAL INN
            </h2>
            <p className="text-lg md:text-xl text-rose-300 font-semibold tracking-wide">
              ক্রিস্টাল আইএনএন — এ ফ্যামিলি রেস্টুরেন্ট উইথ লজিং
            </p>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Experience the culinary magic of marine delicacies and cozy rooms directly on the 
            <strong> Kalyani Barrackpore Expressway (Chendua Road Intersection)</strong>. 
            Renowned for cheap rates, premium taste, and safe hourly/daily lodging.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-rose-300 block font-medium">Visitor Rating</span>
              <span className="text-lg font-bold">★ 4.2 / 5.0</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-rose-300 block font-medium">Avg Budget</span>
              <span className="text-lg font-bold">₹200 – ₹400</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center col-span-2 sm:col-span-1">
              <span className="text-xs text-rose-300 block font-medium">Closing Status</span>
              <span className="text-lg font-bold text-emerald-400">10:30 PM Sharp</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={() => onNavigateTab("menu")}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
            >
              Explore Food Menu
            </button>
            <button
              onClick={() => onNavigateTab("booking")}
              className="bg-white hover:bg-white/90 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
            >
              Book Stay Rooms
            </button>
          </div>
        </div>
      </div>

      {/* Triple Service Quick Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 flex items-start gap-4">
          <div className="p-3 bg-rose-500 text-white rounded-xl">
            <UtensilsIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base">Dine-in Excellence</h4>
            <p className="text-slate-600 text-xs mt-1">Excellent hygiene, spacious family tables, and instant hospitality with standard waiting times.</p>
            <span className="inline-block mt-2 text-[10px] text-rose-700 font-bold uppercase tracking-wider">● Hot & Fresh Food</span>
          </div>
        </div>

        <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 flex items-start gap-4">
          <div className="p-3 bg-amber-600 text-white rounded-xl">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base">Drive-through Parking</h4>
            <p className="text-slate-600 text-xs mt-1">Spacious parking space right beside the expressway. Drop by, pick up hot tandoori bites safely.</p>
            <span className="inline-block mt-2 text-[10px] text-amber-700 font-bold uppercase tracking-wider">● Easy Highway Entry</span>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-slate-800 text-white rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base">No-contact Safety</h4>
            <p className="text-slate-600 text-xs mt-1">Fully sanitized logistics, packaged takeaways, and transparent family rest-room sanitization.</p>
            <span className="inline-block mt-2 text-[10px] text-slate-700 font-bold uppercase tracking-wider">● Inspected Daily</span>
          </div>
        </div>
      </div>

      {/* Main Overview Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* About & Location Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <div className="border-b border-rose-100 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 font-serif">Family Dining Meets Express Transit</h3>
              <p className="text-sm text-slate-500 mt-1">The middle-class paradise for authentic marine shellfish & comfortable stays.</p>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Crystal Inn represents the classic Kanchrapara road trip landmark. Known for rich, heavy-grain Indian and Chinese starters, we excel specifically in 
              <strong> fresh, large lobsters, mud crabs, and our unique cashewnut-marinated Afghani Chicken</strong>.
            </p>

            {/* Specialty highlights bulletin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                <Coffee className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-xs text-slate-900">Middle-Class Priced</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">Budget-friendly meals with thalis costing only ₹180-240.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                <Heart className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-xs text-slate-900 font-sans">Decent & Safe Environment</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">Discreet corporate & family lodging with CCTV protected entry keys.</p>
                </div>
              </div>
            </div>

            {/* Address info and quick action block */}
            <div className="p-5 bg-gradient-to-br from-rose-50/50 to-orange-50/50 rounded-xl border border-rose-100/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>How to Reach Us</span>
                </div>
                <p className="text-[12px] text-slate-700 max-w-md font-sans">
                  {RESTAURANT_INFO.address}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Manager
                </a>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Map Pin
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Interactive Live Transit Stopover advisor */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white p-6 rounded-2xl shadow-md border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Expressway Guide</span>
            </div>

            <div>
              <h4 className="text-lg font-bold tracking-tight">Stopover Planner</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Plan your stopover and check transit mileage instantly.</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1">Departure Point</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["Kolkata", "Kalyani", "Barrackpore", "Sodpur"].map((dep) => (
                    <button
                      key={dep}
                      onClick={() => setDeparture(dep)}
                      className={`py-2 px-3 rounded-lg font-medium transition-all text-left ${
                        departure === dep
                          ? 'bg-rose-500 text-white border-transparent'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {dep}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1">Transport Vehicle</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {["Car", "Bike", "Cab"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVehicle(v)}
                      className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all ${
                        vehicle === v
                          ? 'bg-white text-slate-950 font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Answer Display */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-xs space-y-3">
              <div className="flex justify-between items-center text-amber-300 font-semibold text-[11px]">
                <span>Distance: {currentAdvice.distance}</span>
                <span>Est: {currentAdvice.travelTime}</span>
              </div>
              
              <p className="text-slate-300 text-[11px] leading-relaxed italic">
                "{currentAdvice.suggestion}"
              </p>

              <div className="pt-2 border-t border-white/10 text-[11px] flex justify-between items-center">
                <span className="text-slate-400">Recommended Order:</span>
                <span className="font-bold text-rose-300 text-right">{currentAdvice.mealDeal}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab("booking")}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs uppercase tracking-wider font-bold py-3 rounded-xl transition-all shadow-md text-center inline-block"
            >
              Draft Transit Reservation
            </button>
          </div>

          {/* Quick FAQ / Food Highlights */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3.5">
            <h4 className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-rose-500" />
              Middle-Class Highlights
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold mr-1">•</span>
                <span><strong>Affordable Dining:</strong> Experience fine lobster and crab delicacies under standard family rates (₹200–400).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold mr-1">•</span>
                <span><strong>Hourly Stay:</strong> Ideal for travelers and highway commuters seeking comfort and a quick rest.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold mr-1">•</span>
                <span><strong>Always Hot:</strong> Every dish is individually prepared over tandoor or fresh pans to ensure absolute freshness.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

// A fast local Lucide-like SVG integration for Utensils to prevent error since Lucide sometimes has different names
function UtensilsIcon({ className }: { className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}
