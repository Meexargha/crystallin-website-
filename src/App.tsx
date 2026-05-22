import { useState } from 'react';
import Header from './components/Header';
import OverviewSection from './components/OverviewSection';
import MenuSection from './components/MenuSection';
import LodgingSection from './components/LodgingSection';
import ReviewsSection from './components/ReviewsSection';
import BookingsSection from './components/BookingsSection';
import { RESTAURANT_INFO } from './data';
import { Sparkles, Phone, Compass, MapPin, Eye, Fuel, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Shared billing and stay configurations
  const [activeOrderItems, setActiveOrderItems] = useState<{ id: string; quantity: number }[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveTab("booking"); // instant jump to booking to see invoice
  };

  const handleSelectFood = (items: { id: string; quantity: number }[]) => {
    setActiveOrderItems(items);
    setActiveTab("booking");
  };

  const handleClearAll = () => {
    setActiveOrderItems([]);
    setSelectedRoomId(null);
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'menu':
        return (
          <MenuSection 
            onAddSelectedFood={handleSelectFood} 
            activeOrderItems={activeOrderItems} 
            setActiveOrderItems={setActiveOrderItems} 
          />
        );
      case 'lodging':
        return <LodgingSection onSelectRoom={handleSelectRoom} selectedRoomId={selectedRoomId} />;
      case 'reviews':
        return <ReviewsSection />;
      case 'booking':
        return (
          <BookingsSection 
            activeOrderItems={activeOrderItems} 
            selectedRoomId={selectedRoomId} 
            onClearAll={handleClearAll}
          />
        );
      default:
        return <OverviewSection onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container start wrapper */}
      <main id="main-content-start" className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        
        {/* Dynamic section injection */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {renderActiveSection()}
        </div>

      </main>

      {/* Custom styled map & address section near bottom for high visual polish */}
      <section className="bg-slate-100 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase">
                CI
              </div>
              <h4 className="font-bold text-slate-900 text-sm">CRYSTAL INN</h4>
            </div>
            
            <p className="text-slate-600 text-xs leading-relaxed text-justify">
              Nestled right on the Kalyani Barrackpore Expressway, Crystal Inn combines the best of rural Bengal freshness 
              with premium comfort lodging. Open 365 days a year to families, couples, and transit logistics operators.
            </p>

            <div className="flex gap-3 text-rose-600 text-xs font-bold pt-1">
              <span className="flex items-center gap-1">★ 4.2 Rated</span>
              <span>·</span>
              <span>₹200–400 Avg Spends</span>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Quick Landmark & Links</h5>
            <div className="space-y-3.5 text-xs text-slate-600 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  WFC4+W9W, Barrackpore Expressway landmark, Kanchrapara, West Bengal 743145
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:underline text-slate-900 font-bold">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Chendua P Intersection Point</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Highway Transit Values</h5>
            <div className="grid grid-cols-2 gap-2.5 text-[11px] text-slate-600">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-rose-500" />
                <span>Next to Fuel</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>Luggage Lock</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Couple Safe</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Fresh Lobster</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Footer Copyright */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 font-medium">
        <p>© 2026 Crystal Inn Restaurant & Stays. All rights reserved.</p>
        <p className="text-[10px] text-slate-500 mt-1">
          Designed elegantly as a single-screen responsive hub aligning Kanchrapara Kalyani Expressway itineraries.
        </p>
      </footer>

    </div>
  );
}
