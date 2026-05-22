import { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data';
import { Clock, Phone, MapPin, Sparkles, Menu, X, Hotel } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [timeStr, setTimeStr] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Determine dynamic open status of Crystal Inn
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Opens at 11:00 AM, Closes at 10:30 PM (22:30, i.e. 1350 minutes)
      const openMinutes = 11 * 60; // 11:00 AM
      const closeMinutes = 22 * 60 + 30; // 10:30 PM

      const textTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeStr(textTime);

      if (totalMinutes >= openMinutes && totalMinutes < closeMinutes) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'menu', name: 'Menu & Food' },
    { id: 'lodging', name: 'Premium Lodging' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'booking', name: 'Save & Booking' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    const element = document.getElementById("main-content-start");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-rose-100 shadow-xs">
      {/* Top micro-announcement info bar */}
      <div className="bg-amber-950 text-amber-50 py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kanchrapara Roadside Transit Hub (Kalyani Barrackpore Expressway)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-amber-200">
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {RESTAURANT_INFO.phone}</span>
            </a>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Hours: 11 AM – 10:30 PM</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Translation */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-rose-600 rounded-xl flex items-center justify-center text-white font-serif font-black shadow-md shadow-rose-200 tracking-tighter">
              CI
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none font-sans">
                  {RESTAURANT_INFO.name}
                </h1>
                <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-medium border border-rose-200">
                  ★ {RESTAURANT_INFO.rating}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-0.5 max-w-[250px] md:max-w-none truncate sm:whitespace-normal">
                {RESTAURANT_INFO.bengaliName}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-100'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Call to Actions & Open Status Indicator */}
          <div className="hidden sm:flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
              isOpen
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              {isOpen ? 'Open Now' : 'Closed'}
            </span>

            <button
              onClick={() => handleTabClick('booking')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Hotel className="w-3.5 h-3.5" />
              Book Space
            </button>
          </div>

          {/* Mobile Menu Action */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-rose-100 animate-in fade-in slide-in-from-top-4 duration-200 px-4 py-4 space-y-2 shadow-inner">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigation Tabs</span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
              isOpen ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {isOpen ? 'Open Now (Closes 10:30 PM)' : 'Closed'}
            </span>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all flex justify-between items-center ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{tab.name}</span>
              {tab.id === 'booking' && <Sparkles className="w-3.5 h-3.5 opacity-80" />}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-rose-600" />
              Call Now: {RESTAURANT_INFO.phone}
            </a>
            <button
              onClick={() => handleTabClick('booking')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg text-xs tracking-wide transition-colors"
            >
              Interactive Booking Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
