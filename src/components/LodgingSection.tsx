import { useState, useMemo } from 'react';
import { ROOM_OPTIONS } from '../data';
import { RoomOption } from '../types';
import { CreditCard, CalendarCheck, Home, Eye, Star, IndianRupee, Clock, Wifi, Sparkles, Plus, Check } from 'lucide-react';

interface LodgingSectionProps {
  onSelectRoom: (roomId: string) => void;
  selectedRoomId: string | null;
}

export default function LodgingSection({ onSelectRoom, selectedRoomId }: LodgingSectionProps) {
  // Stay calculator state
  const [calcRoomId, setCalcRoomId] = useState<string>("room-deluxe");
  const [calcType, setCalcType] = useState<'hours' | 'days'>('days');
  const [calcDuration, setCalcDuration] = useState<number>(1);

  // Selected room details for calculator
  const selectedCalcRoom = useMemo(() => {
    return ROOM_OPTIONS.find(r => r.id === calcRoomId) || ROOM_OPTIONS[0];
  }, [calcRoomId]);

  // Compute estimated quote
  const stayCost = useMemo(() => {
    const rate = calcType === 'days' ? selectedCalcRoom.pricePerDay : selectedCalcRoom.pricePerHour;
    return rate * calcDuration;
  }, [selectedCalcRoom, calcType, calcDuration]);

  const handleIncrement = (val: number) => {
    const minVal = 1;
    const maxVal = calcType === 'days' ? 30 : 12; // cap hours to 12 max for rest stays
    const newVal = calcDuration + val;
    if (newVal >= minVal && newVal <= maxVal) {
      setCalcDuration(newVal);
    }
  };

  const handleCalcTypeChange = (type: 'hours' | 'days') => {
    setCalcType(type);
    setCalcDuration(1); // reset duration
  };

  return (
    <div className="space-y-12">
      {/* Intro info card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
            Flexible Lodging Stays
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-serif">Kanchrapara Transit Comfort</h3>
          <p className="text-slate-600 text-xs max-w-xl">
            Whether managing a long-haul road trip from North Bengal or seeking a private quiet workspace, choose premium daily check-ins or budget hourly micro-stays.
          </p>
        </div>

        <div className="flex gap-4 border-l-0 md:border-l border-slate-200 pl-0 md:pl-6 text-xs text-slate-700 shrink-0">
          <div>
            <span className="font-bold block text-slate-950">✓ 24/7 Desk Support</span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Arrive at any hour seamlessly.</span>
          </div>
          <div>
            <span className="font-bold block text-slate-950">✓ Full Safety Shield</span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Ideal for couples & transit families.</span>
          </div>
        </div>
      </div>

      {/* Main Suite Showcase vs Interactive Quote Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Rooms list */}
        <div className="lg:col-span-2 space-y-6">
          {ROOM_OPTIONS.map((room) => {
            const isSelected = selectedRoomId === room.id;
            return (
              <div 
                key={room.id}
                className={`bg-white rounded-2xl border overflow-hidden flex flex-col md:flex-row md:min-h-[220px] transition-all ${
                  isSelected 
                    ? 'border-rose-500 ring-4 ring-rose-50' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Image panel */}
                <div className="md:w-64 bg-slate-100 relative shrink-0">
                  <img 
                    src={room.imageUrl} 
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 md:h-full object-cover"
                  />
                  {room.tag && (
                    <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-xs font-bold text-white px-2.5 py-1 rounded-md">
                      {room.tag}
                    </span>
                  )}
                </div>

                {/* Info panel */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-slate-950 text-base font-serif">{room.name}</h4>
                      <div className="text-right shrink-0">
                        <span className="text-rose-600 font-extrabold text-base flex items-center justify-end">
                          <IndianRupee className="w-3.5 h-3.5" />
                          {room.pricePerDay}
                          <span className="text-[10px] text-slate-500 font-medium ml-0.5">/ day</span>
                        </span>
                        <span className="text-slate-500 text-[11px] block text-right">
                          or ₹{room.pricePerHour}/hr REST
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {room.amenities.map((amenity, idx) => (
                        <span 
                          key={idx} 
                          className="bg-slate-50 text-slate-600 hover:bg-slate-100/50 text-[10px] px-2.5 py-1 rounded-md font-medium border border-slate-200/50 flex items-center gap-1 transition-colors"
                        >
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-500">
                      Capacity: <strong>Up to {room.capacity} adults</strong>
                    </span>

                    <button
                      onClick={() => {
                        onSelectRoom(room.id);
                        setCalcRoomId(room.id);
                      }}
                      className={`font-semibold text-xs py-2 px-5 rounded-xl transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
                      }`}
                    >
                      {isSelected ? '✓ Stay Selected' : 'Choose Suite'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Stay Calculator Widget */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-5 flex flex-col justify-between min-h-[440px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Clock className="w-4.5 h-4.5 text-rose-400" />
                <h4 className="font-bold text-sm uppercase tracking-wider">Stay Quotation</h4>
              </div>

              {/* Room select */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1.5">Select Class</label>
                <select 
                  value={calcRoomId}
                  onChange={(e) => {
                    setCalcRoomId(e.target.value);
                    onSelectRoom(e.target.value);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:border-rose-400"
                >
                  {ROOM_OPTIONS.map((r) => (
                    <option key={r.id} value={r.id} className="text-slate-900 bg-white">{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Hourly vs Daily Selector */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1.5">Duration Type</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleCalcTypeChange('days')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all ${
                      calcType === 'days'
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    Standard Daily Stay
                  </button>
                  <button
                    onClick={() => handleCalcTypeChange('hours')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all ${
                      calcType === 'hours'
                        ? 'bg-amber-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    Hourly REST Stay
                  </button>
                </div>
              </div>

              {/* Duration Counter */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1">
                  How Many {calcType === 'days' ? 'Days' : 'Hours'}
                </label>
                <span className="text-[10px] text-slate-500 block mb-1.5">
                  {calcType === 'days' 
                    ? '*Stays capped to 30 days max.' 
                    : '*Strict Rest stays limit of 1 to 12 hours.'}
                </span>

                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <button 
                    onClick={() => handleIncrement(-1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                  <span className="font-extrabold text-base">{calcDuration} {calcType === 'days' ? 'Day(s)' : 'Hour(s)'}</span>
                  <button 
                    onClick={() => handleIncrement(1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Quote Display */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-300">Quote Estimate:</span>
                <span className="text-xl font-black text-rose-400 flex items-center">
                  <IndianRupee className="w-4.5 h-4.5 shrink-0" />
                  {stayCost}
                </span>
              </div>

              <div className="text-[10px] text-slate-400 text-center italic bg-white/5 py-1.5 rounded-lg">
                *Couples must bring matching valid ID sheets (Adhar/Voter)
              </div>

              <button
                onClick={() => {
                  const scrollDest = document.getElementById("main-content-start");
                  if (scrollDest) scrollDest.scrollIntoView({ behavior: 'smooth' });
                  onSelectRoom(calcRoomId);
                }}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md text-center inline-block"
              >
                Reserve Space
              </button>
            </div>
          </div>

          {/* Clean Safety Highlight banner */}
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-3">
            <h5 className="font-bold text-emerald-950 text-xs uppercase tracking-wider">🔒 Standard Double Check-In</h5>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              We uphold **family standards across every lodging room**. Constant sanitization and biometric luggage safety are maintained 24/7.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
