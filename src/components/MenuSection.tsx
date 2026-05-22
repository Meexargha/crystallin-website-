import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Search, Flame, Leaf, HelpCircle, Utensils, IndianRupee, Clock, Plus, Minus, Trash, ShoppingBag } from 'lucide-react';

interface MenuSectionProps {
  onAddSelectedFood: (items: { id: string; quantity: number }[]) => void;
  activeOrderItems: { id: string; quantity: number }[];
  setActiveOrderItems: Dispatch<SetStateAction<{ id: string; quantity: number }[]>>;
}

export default function MenuSection({ onAddSelectedFood, activeOrderItems, setActiveOrderItems }: MenuSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState(false);

  // Filter calculations
  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'specialty', label: 'Chef-Special Shellfish' },
    { id: 'tandoor', label: 'Smoked Tandoor' },
    { id: 'thali', label: 'Bengal Thalis' },
    { id: 'chinese', label: 'Indo-Chinese' },
    { id: 'starters', label: 'Starters & Papad' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.bengaliName && item.bengaliName.includes(searchTerm));
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchVeg = !vegOnly || item.isVeg;
      return matchSearch && matchCategory && matchVeg;
    });
  }, [searchTerm, selectedCategory, vegOnly]);

  // Order helper functions
  const handleAddToDraft = (itemId: string) => {
    setActiveOrderItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    setActiveOrderItems(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.quantity + change;
          return newQty <= 0 ? null : { ...i, quantity: newQty };
        }
        return i;
      }).filter((i): i is { id: string; quantity: number } => i !== null);
    });
  };

  const clearDraft = () => {
    setActiveOrderItems([]);
  };

  // Compute stats of simulated order
  const orderDetailsSummary = useMemo(() => {
    let total = 0;
    let maxPrepTime = 0;
    let itemCount = 0;

    activeOrderItems.forEach(cartItem => {
      const actualItem = MENU_ITEMS.find(m => m.id === cartItem.id);
      if (actualItem) {
        total += actualItem.price * cartItem.quantity;
        itemCount += cartItem.quantity;

        // Simulate wait times: lobsters take longer, starters are quicker
        let itemPrep = 12; // base minutes
        if (actualItem.category === 'specialty') itemPrep = 25;
        else if (actualItem.category === 'tandoor') itemPrep = 18;
        else if (actualItem.category === 'starters') itemPrep = 5;
        else if (actualItem.category === 'thali') itemPrep = 10;

        if (itemPrep > maxPrepTime) {
          maxPrepTime = itemPrep;
        }
      }
    });

    return { total, maxPrepTime, itemCount };
  }, [activeOrderItems]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search specialties (e.g. Lobster, Crab, Masala Papad, আফগানি...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-rose-400 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Veg Toggle */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={vegOnly} 
              onChange={() => setVegOnly(!vegOnly)} 
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            <span className="ml-3 text-xs font-bold text-slate-700 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              Veg Only
            </span>
          </label>
        </div>
      </div>

      {/* Categories Horizontal Tabs scrollable */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Food items vs Simulated Ticket Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Food Grid */}
        <div className="lg:col-span-2 space-y-6">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 text-base">No matches found</h4>
              <p className="text-slate-500 text-xs mt-1">Try modifying your search or clearing the filters.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); setVegOnly(false); }}
                className="mt-4 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-slate-800"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between space-y-4 ${
                    item.isSpecial 
                      ? 'border-amber-200 shadow-xs ring-4 ring-amber-50 relative overflow-hidden' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Watermark/Accent for Lobster/Afghani and Chef-Specials */}
                  {item.isSpecial && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-bl-xl tracking-wider flex items-center gap-1 z-10">
                      <Flame className="w-2.5 h-2.5 fill-white" />
                      Guest Favorite
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      {/* Veg indicator badge */}
                      <span className={`inline-block w-4 h-4 text-[9px] font-serif border-2 text-center leading-none font-black shrink-0 mr-2 rounded-xs ${
                        item.isVeg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'
                      }`}>
                        {item.isVeg ? "●" : "▲"}
                      </span>

                      <div className="flex-1">
                        <h4 className="font-bold text-slate-950 text-sm leading-tight">{item.name}</h4>
                        {item.bengaliName && (
                          <span className="text-[11px] font-medium text-slate-500 mt-0.5 block italic">{item.bengaliName}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <span className="text-[15px] font-extrabold text-slate-900 flex items-center">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
                      {item.price}
                    </span>

                    <button
                      onClick={() => handleAddToDraft(item.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Combo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Simulated Interactive Order Ticket */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col justify-between min-h-[460px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4.5 h-4.5 text-rose-400" />
                  <h4 className="font-bold text-sm uppercase tracking-wider">Taste Simulator</h4>
                </div>
                {activeOrderItems.length > 0 && (
                  <button 
                    onClick={clearDraft}
                    className="text-slate-400 hover:text-white transition-colors text-[10px] font-bold"
                  >
                    Clear Ticket
                  </button>
                )}
              </div>

              {/* Added items list */}
              {activeOrderItems.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-300">Draft Your Combo</h5>
                    <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto mt-0.5">
                      Select multiple items to simulate your family's banquet cost and estimated kitchen waits.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                  {activeOrderItems.map(cartIndex => {
                    const actualItem = MENU_ITEMS.find(m => m.id === cartIndex.id);
                    if (!actualItem) return null;
                    return (
                      <div key={cartIndex.id} className="flex justify-between items-center text-xs bg-white/5 p-2.5 rounded-lg border border-white/5">
                        <div className="space-y-0.5 flex-1 pr-2">
                          <span className="font-semibold block truncate max-w-[120px]">{actualItem.name}</span>
                          <span className="text-[10px] text-slate-400 flex items-center">
                            <IndianRupee className="w-2.5 h-2.5" /> {actualItem.price} each
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button 
                            onClick={() => handleUpdateQuantity(cartIndex.id, -1)}
                            className="bg-white/10 text-white p-1 rounded-md hover:bg-white/20 transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold w-4 text-center">{cartIndex.quantity}</span>
                          <button 
                            onClick={() => handleAddToDraft(cartIndex.id)}
                            className="bg-white/10 text-white p-1 rounded-md hover:bg-white/20 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Calculations & Total */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Selected Dishes</span>
                  <span>{orderDetailsSummary.itemCount} items</span>
                </div>
                
                {/* Simulated Wait Times */}
                <div className="flex justify-between items-center bg-amber-500/10 text-amber-300 p-2 rounded-lg border border-amber-500/20">
                  <span className="flex items-center gap-1 text-[11px] font-semibold">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    Est. Preparing Time:
                  </span>
                  <span className="font-bold text-[11px]">{orderDetailsSummary.itemCount > 0 ? `${orderDetailsSummary.maxPrepTime} mins` : "0 mins"}</span>
                </div>
                
                <p className="text-[9px] text-slate-400 leading-relaxed italic">
                  *We prepare every curry from scratch to preserve regional quality. Real dining wait times are slightly higher.
                </p>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xs text-slate-300 font-medium">Simulated Bill Total:</span>
                <span className="text-xl font-black text-rose-400 flex items-center">
                  <IndianRupee className="w-4 h-4 shrink-0" />
                  {orderDetailsSummary.total}
                </span>
              </div>

              {/* Button to confirm food in bookings tab */}
              <button
                disabled={activeOrderItems.length === 0}
                onClick={() => {
                  const draftElement = document.getElementById("main-content-start");
                  if (draftElement) draftElement.scrollIntoView({ behavior: 'smooth' });
                  onAddSelectedFood(activeOrderItems);
                }}
                className={`w-full font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 ${
                  activeOrderItems.length === 0
                    ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                    : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                }`}
              >
                Proceed to Book Table
              </button>
            </div>
          </div>
          
          {/* Quick Note about pricing */}
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 text-xs text-slate-700 space-y-2">
            <h5 className="font-bold text-rose-900 font-sans uppercase tracking-wider text-[11px]">Note on Expressway Price Integrity</h5>
            <p className="text-[11px] leading-relaxed">
              We charge <strong>Zero extra highway taxes</strong> or hidden surcharges. Our rates stay perfectly pocket-friendly (₹200–400 average person spend).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
