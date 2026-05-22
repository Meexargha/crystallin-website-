import { useState, useMemo, FormEvent, useEffect } from 'react';
import { MENU_ITEMS, ROOM_OPTIONS, RESTAURANT_INFO } from '../data';
import { BookingDetails } from '../types';
import { 
  CalendarCheck, ShieldCheck, Printer, CheckCircle, Smartphone, User, 
  Mail, CreditCard, Clock, MapPin, Sparkles, UserPlus, Server, Wifi, 
  Terminal, ThumbsUp, BellRing, BellOff, RefreshCw, Send, Lock, HelpCircle
} from 'lucide-react';

interface BookingsSectionProps {
  activeOrderItems: { id: string; quantity: number }[];
  selectedRoomId: string | null;
  onClearAll: () => void;
}

export default function BookingsSection({ activeOrderItems, selectedRoomId, onClearAll }: BookingsSectionProps) {
  const [bookingType, setBookingType] = useState<'table' | 'lodging'>(selectedRoomId ? 'lodging' : 'table');
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2026-05-20");
  const [time, setTime] = useState("13:30");
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active state handlers
  const [activeReceipt, setActiveReceipt] = useState<BookingDetails | null>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [transmissionStepText, setTransmissionStepText] = useState("");

  const transmissionSteps = [
    "Establishing peer-to-peer lane with Kanchrapara Expressway Gateway...",
    "Transmitting requested food order & custom combos directly to Kitchen Terminal Screen...",
    "Locking stay/table accommodations inside Lodging Room ledger database...",
    "Sending SMS broadcast & push alert directly to Manager's mobile hotline...",
    "Finalizing Expressway Fast-Pass vouchers and minting unique check-in QR credentials..."
  ];

  // Stays config
  const [stayUnit, setStayUnit] = useState<'hours' | 'days'>('days');
  const [stayValue, setStayValue] = useState(1);

  // Sound generator
  const triggerTerminalChirp = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Tone 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.type = 'sine';
      gain1.gain.setValueAtTime(0.08, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.12);

      // Tone 2 immediately after
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.frequency.setValueAtTime(880.00, ctx.currentTime); // A5
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.12, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.25);
      }, 100);
    } catch (e) {
      // Audio autoplay restrictions caught gracefully
    }
  };

  // Simulated live progress pipeline
  useEffect(() => {
    let timer: any;
    if (isTransmitting) {
      if (transmissionProgress < transmissionSteps.length) {
        setTransmissionStepText(transmissionSteps[transmissionProgress]);
        timer = setTimeout(() => {
          setTransmissionProgress(prev => prev + 1);
        }, 1200);
      } else {
        // Finished transmitting, output final results
        setIsTransmitting(false);
        triggerTerminalChirp();

        const generatedReceipt: BookingDetails = {
          bookingId: `CI-${Math.floor(100000 + Math.random() * 900000)}`,
          customerName,
          email: email || "walkin@guest.com",
          phone,
          type: bookingType,
          date,
          time,
          guestsCount,
          roomTypeId: bookingType === 'lodging' ? (selectedRoomId || "room-deluxe") : undefined,
          duration: bookingType === 'lodging' ? stayValue : undefined,
          durationUnit: bookingType === 'lodging' ? stayUnit : undefined,
          totalAmount: grandTotal,
          specialRequests: specialRequests || "Spiced shellfish prep, hot and fast transit stopover",
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + new Date().toLocaleDateString(),
          isConfirmed: true
        };
        setActiveReceipt(generatedReceipt);
      }
    }
    return () => clearTimeout(timer);
  }, [isTransmitting, transmissionProgress]);

  // Compute values for selected food
  const foodDetails = useMemo(() => {
    let price = 0;
    let list: string[] = [];
    activeOrderItems.forEach(item => {
      const match = MENU_ITEMS.find(m => m.id === item.id);
      if (match) {
        price += match.price * item.quantity;
        list.push(`${match.name} x ${item.quantity}`);
      }
    });
    return { price, list };
  }, [activeOrderItems]);

  // Compute values for lodging
  const roomDetails = useMemo(() => {
    const room = ROOM_OPTIONS.find(r => r.id === selectedRoomId);
    if (!room) return null;
    const rate = stayUnit === 'days' ? room.pricePerDay : room.pricePerHour;
    const price = rate * stayValue;
    return { room, price };
  }, [selectedRoomId, stayUnit, stayValue]);

  // Total estimate sum
  const grandTotal = useMemo(() => {
    let sum = 0;
    if (bookingType === 'table') {
      sum = foodDetails.price;
    } else {
      sum = (roomDetails?.price || 1800) + foodDetails.price;
    }
    return sum;
  }, [bookingType, foodDetails, roomDetails]);

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    // Trigger transmission step sequence
    setIsTransmitting(true);
    setTransmissionProgress(0);
  };

  const selectedRoomNode = ROOM_OPTIONS.find(r => r.id === selectedRoomId) || ROOM_OPTIONS[0];

  const handleReset = () => {
    setActiveReceipt(null);
    setCustomerName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
    onClearAll();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Visual Sync Info Header Banner */}
      {!activeReceipt && !isTransmitting && (
        <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-805 bg-amber-100 border border-amber-200 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider inline-block">
              Express Terminal Synced
            </span>
            <h4 className="text-sm font-bold text-slate-900 leading-none">
              {activeOrderItems.length > 0 || selectedRoomId 
                ? 'Your order and rooms choices are ready to beam!' 
                : 'Configure Your Table or Fast Lodging Rest Room'}
            </h4>
            <p className="text-[11px] text-slate-650 max-w-xl">
              {activeOrderItems.length > 0 && `✓ Selected ${activeOrderItems.length} delicacies (₹${foodDetails.price}). `}
              {selectedRoomId && `✓ Selected lodging stay room (${selectedRoomNode.name}).`}
              Instant desk notification fires as soon as you commit the booking.
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => setBookingType('table')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bookingType === 'table' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-705 border border-slate-200'
              }`}
            >
              Dine-In Table
            </button>
            <button 
              type="button"
              onClick={() => setBookingType('lodging')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bookingType === 'lodging' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-705 border border-slate-200'
              }`}
            >
              Lodge Suite stay
            </button>
          </div>
        </div>
      )}

      {/* RENDER PROGRESS SIMULATOR */}
      {isTransmitting && (
        <div className="max-w-2xl mx-auto bg-slate-950 text-white p-8 rounded-3xl border-2 border-slate-800 shadow-2xl relative overflow-hidden my-12 space-y-6">
          <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500" style={{ width: `${(transmissionProgress / transmissionSteps.length) * 100}%` }}></div>
          
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-rose-500 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold tracking-wider font-mono">CRYSTAL INN TRANSMITTER NODE v2.4</h4>
                <p className="text-[10px] text-slate-400">Direct Pipeline to Kalyani Barrackpore Expressway Desk</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-xs text-rose-400 font-bold font-mono">LIVE SYNC</span>
            </div>
          </div>

          {/* Stepped animation block */}
          <div className="space-y-4 font-mono text-xs">
            {transmissionSteps.map((step, idx) => {
              const isDone = idx < transmissionProgress;
              const isCurrent = idx === transmissionProgress;
              return (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 transition-opacity duration-350 p-2 rounded-lg ${
                    isDone ? 'text-emerald-400 opacity-90' : isCurrent ? 'text-rose-450 bg-white/5 font-extrabold' : 'text-slate-600 opacity-40'
                  }`}
                >
                  <span className="shrink-0 font-bold">{isDone ? "[✓]" : isCurrent ? "[▶]" : "[ ]"}</span>
                  <p className="leading-relaxed text-[11px]">{step}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-mono">Transmitting data combo packages ({foodDetails.list.length} dishes, {selectedRoomId ? "1 suite" : "0 suite"})</span>
            <span className="font-bold text-amber-400 font-mono">
              {Math.round((transmissionProgress / transmissionSteps.length) * 100)}% Complete
            </span>
          </div>
        </div>
      )}

      {/* Booking Form Layout vs Printable Receipt Slip */}
      {activeReceipt && !isTransmitting ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Column 1: PRINTABLE SLIP TEMPLATE */}
          <div className="lg:col-span-3 bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            
            {/* Slip Header */}
            <div className="bg-slate-950 text-white p-6 text-center space-y-1.5 relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider leading-none">
                Confirmed instantly
              </div>
              <h3 className="font-serif font-black text-xl tracking-wider">CRYSTAL INN RECEIPT</h3>
              <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider block">Family Restaurant & Stays</span>
              <p className="text-[9px] text-slate-400 font-sans mt-1">Kanchrapara Roadside Transit Hub, West Bengal 743145</p>
            </div>

            {/* Slip Body */}
            <div className="p-6 space-y-5 text-xs text-slate-850 font-sans">
              
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">FAST-PASS CODE</span>
                  <span className="font-mono text-sm font-bold text-slate-950">{activeReceipt.bookingId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">REGISTRATION TIMING</span>
                  <span className="font-mono text-slate-600 font-semibold">{activeReceipt.createdAt}</span>
                </div>
              </div>

              {/* Client info block */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">VOUCHER HOLDER</span>
                  <span className="font-bold text-slate-900">{activeReceipt.customerName}</span>
                  <span className="block text-[11px] text-slate-600 font-mono mt-0.5">{activeReceipt.phone}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">EST. ARRIVALS SCHEDULE</span>
                  <span className="font-bold text-slate-900">{activeReceipt.date}</span>
                  <span className="block text-[11px] text-slate-600 font-mono mt-0.5">{activeReceipt.time}</span>
                </div>
              </div>

              {/* Booking Details specifications */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <span className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider border-b border-slate-200 pb-1.5">
                  Acquired Transit Service Type: {activeReceipt.type === 'lodging' ? 'LODGING STAY + COMBOS' : 'DINE-IN RESERVATION'}
                </span>

                {/* Lodging parameters if stay */}
                {activeReceipt.type === 'lodging' && (
                  <div className="flex justify-between items-center text-slate-800">
                    <div>
                      <span className="font-bold">{selectedRoomNode.name}</span>
                      <span className="text-[10px] text-slate-500 block">Stay Duration: {activeReceipt.duration} {activeReceipt.durationUnit}</span>
                    </div>
                    <span className="font-bold font-mono">₹{roomDetails?.price}</span>
                  </div>
                )}

                {/* Imported food if any */}
                {foodDetails.list.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
                      <span>Imported Food Combos</span>
                      <span>Combo Price: ₹{foodDetails.price}</span>
                    </div>
                    <ul className="text-slate-700 space-y-0.5 text-[11px] list-disc list-inside">
                      {foodDetails.list.map((food, idx) => (
                        <li key={idx} className="truncate">{food}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Total calculation */}
                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline font-bold">
                  <span className="text-[11px] uppercase tracking-wider text-slate-900">Total Net Amount (Pay at Desk)</span>
                  <span className="text-base text-rose-700 font-mono">₹{activeReceipt.totalAmount}</span>
                </div>

                <div className="text-[10px] text-slate-500 font-medium border-t border-dotted border-slate-200 pt-2 flex items-center gap-1">
                  <span>Instructions:</span>
                  <span className="italic block font-normal text-slate-700">"{activeReceipt.specialRequests}"</span>
                </div>
              </div>

              {/* Visual terms summary */}
              <div className="text-[10px] text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <p className="flex items-start gap-1">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Please present this slip code / ID to the counter on arrival.</span>
                </p>
                <p className="flex items-start gap-1">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Table reservations are held for exactly 30 minutes after scheduled hour.</span>
                </p>
                <p className="flex items-start gap-1">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Both partners must supply a photographic matching State identity proof for standard room lodging checks.</span>
                </p>
              </div>

              {/* Slip Printing & Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Voucher
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all text-center"
                >
                  Book New Stay/Table
                </button>
              </div>

            </div>

            <div className="bg-slate-100 py-3 text-center text-[10px] font-semibold text-slate-500 border-t border-slate-200">
              Thank you for choosing Crystal Inn. Safe Travels!
            </div>

          </div>

          {/* Column 2: REAL-TIME FRONT DESK PANEL (Simulating that the product is received immediately) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Live Front Desk Terminal Feed */}
            <div className="bg-slate-950 text-emerald-400 p-6 rounded-3xl border-2 border-slate-800 space-y-5 font-mono shadow-xl relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[9px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>DESK_ONLINE</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  Desk Terminal Feed
                </h4>
                <p className="text-[10px] text-slate-500">Live transaction synchronization logs</p>
              </div>

              {/* Virtual Receipt Code Visualizing QR Barcode */}
              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center space-y-2 border border-slate-850">
                <span className="text-[8px] text-slate-500 tracking-wider">SECURE INSTANT SPEED-CHECK QR</span>
                
                {/* Embedded cool generated vector QR code block */}
                <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  {/* Outer boundaries */}
                  <rect x="5" y="5" width="22" height="22" rx="2" strokeWidth="4" stroke="black" />
                  <rect x="9" y="9" width="14" height="14" strokeWidth="2" stroke="black" />
                  <rect x="73" y="5" width="22" height="22" rx="2" strokeWidth="4" stroke="black" />
                  <rect x="77" y="9" width="14" height="14" strokeWidth="2" stroke="black" />
                  <rect x="5" y="73" width="22" height="22" rx="2" strokeWidth="4" stroke="black" />
                  <rect x="9" y="77" width="14" height="14" strokeWidth="2" stroke="black" />
                  {/* Internal pseudo-random code matrices */}
                  <path d="M40,5 H55 M42,12 H62 M45,18 H50 M60,6 H70 M62,22 H70" stroke="black" strokeWidth="3" />
                  <path d="M5,40 V55 M12,42 V62 M18,45 V50 M6,60 V70 M22,62 V70" stroke="black" strokeWidth="3" strokeLinecap="square" />
                  <path d="M40,40 H60 V60 H40 Z" fill="black" />
                  <circle cx="50" cy="50" r="4" fill="white" />
                  <path d="M40,75 H60 M42,82 H95 M65,75 V95 M72,85 V95 M85,40 H95" stroke="black" strokeWidth="3.5" />
                  <rect x="52" y="8" width="6" height="6" fill="black" />
                  <rect x="85" y="55" width="8" height="8" fill="black" />
                </svg>

                <div className="text-center">
                  <span className="text-[10px] text-slate-900 font-extrabold tracking-widest">{activeReceipt.bookingId}</span>
                  <span className="text-[8px] text-slate-500 block leading-tight">Flash QR code to counter clerk</span>
                </div>
              </div>

              {/* Real-time status list displaying fast pipeline */}
              <div className="space-y-3.5 pt-2 text-[11px] text-slate-350">
                <div className="flex justify-between items-start border-l-2 border-emerald-500 pl-2.5">
                  <div>
                    <span className="font-semibold text-white block">Table & Lodging Hold</span>
                    <span className="text-[10px] text-slate-500">Suite room check availability locked</span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded text-[10px]">LOCKED</span>
                </div>

                {foodDetails.list.length > 0 && (
                  <div className="flex justify-between items-start border-l-2 border-emerald-500 pl-2.5">
                    <div>
                      <span className="font-semibold text-white block">Active Kitchen Order</span>
                      <span className="text-[10px] text-slate-500">{foodDetails.list.length} dishes logged to Chef</span>
                    </div>
                    <span className="text-emerald-405 font-bold bg-yellow-950/60 text-yellow-400 px-2 py-0.5 rounded text-[10px]">QUEUED</span>
                  </div>
                )}

                <div className="flex justify-between items-start border-l-2 border-emerald-500 pl-2.5">
                  <div>
                    <span className="font-semibold text-white block">Manager Hotline Piped</span>
                    <span className="text-[10px] text-slate-500">Hotline SMS queued to +91 85858 49866</span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded text-[10px]">BEAMED</span>
                </div>
              </div>

              {/* acoustic notification alert ping control */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Desk notification sound</span>
                <button
                  type="button"
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    triggerTerminalChirp();
                  }}
                  className={`p-1.5 rounded-xl transition-all ${
                    soundEnabled 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : 'bg-slate-900 text-slate-650'
                  }`}
                >
                  {soundEnabled ? (
                    <span className="flex items-center gap-1 font-bold text-[10px]">
                      <BellRing className="w-3.5 h-3.5 animate-bounce" /> Sound On
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-[10px]">
                      <BellOff className="w-3.5 h-3.5" /> Muted
                    </span>
                  )}
                </button>
              </div>

            </div>

            {/* Simulated direct call manager tip */}
            <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl space-y-3.5">
              <h5 className="font-bold text-rose-950 text-xs uppercase tracking-wider">Fast Lane Check-In Guide</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Your reservation was processed in <strong>under 1.2 seconds</strong>. No prepayment is needed online. Present the Voucher on your phone at checkout.
              </p>
              <div className="flex justify-between gap-2">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full bg-slate-900 text-white text-center font-bold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" /> Call: {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* CORE FORM DEFINITION (WHEN NOT TRANSMITTED YET) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Form controls */}
          <form onSubmit={handleSubmitBooking} className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            
            <div className="border-b border-rose-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {bookingType === 'lodging' ? 'Reserve Lodging Room stay' : 'Book a Dining Table'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Deliver these products immediately to the desk. We lock down your space with zero advance fees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-505 font-bold uppercase tracking-wide flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-rose-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sayan kundu"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 font-medium focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Phone number */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-505 font-bold uppercase tracking-wide flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-rose-500" />
                  <span>Contact Phone Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 85858 49866"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 font-medium focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-550 font-bold uppercase tracking-wide flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. sayandev@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 font-medium focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Arriving Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-550 font-bold uppercase tracking-wide flex items-center gap-1">
                  <CalendarCheck className="w-3.5 h-3.5 text-rose-500" />
                  <span>Arriving Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 font-medium focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Arrival clock time */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-550 font-bold uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  <span>Arriving Time * (11 AM to 10 PM)</span>
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 font-medium focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Number of Guests */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-550 font-bold uppercase tracking-wide flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5 text-rose-500" />
                  <span>Number of Guests *</span>
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-rose-400 focus:bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Extra context fields based on Stay vs Table */}
            {bookingType === 'lodging' && (
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Lodging Duration Parameter</span>
                  <p className="text-xs text-slate-850 font-bold">Stay Room Category: {selectedRoomNode.name}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={stayUnit}
                    onChange={(e) => {
                      setStayUnit(e.target.value as 'hours' | 'days');
                      setStayValue(1);
                    }}
                    className="bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-805"
                  >
                    <option value="days">Days Stay</option>
                    <option value="hours">Hours Rest</option>
                  </select>

                  <input
                    type="number"
                    min={1}
                    max={stayUnit === 'days' ? 30 : 12}
                    value={stayValue}
                    onChange={(e) => setStayValue(Number(e.target.value))}
                    className="w-16 bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-center text-slate-805"
                  />
                </div>
              </div>
            )}

            {/* Special Request Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block">Any Special Instructions or Road Itinerary details?</label>
              <textarea
                placeholder="e.g. Traveling from Kolkata to Kalyani, need ground floor room, spicy lobster preference..."
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 focus:outline-hidden focus:border-rose-400 focus:bg-white resize-none"
              ></textarea>
            </div>

            {/* Form submit */}
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md text-center inline-block cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TRANSMIT DIRECTLY TO HOTEL DESK</span>
            </button>

          </form>

          {/* Right Summary Sidebar showing selected parameters */}
          <div className="space-y-6">
            <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Smartphone className="w-4.5 h-4.5 text-rose-400" />
                <h4 className="font-bold text-sm uppercase tracking-wider">Tab checkout</h4>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                
                {/* Stay Summary if stay */}
                {bookingType === 'lodging' && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Suite stay details</span>
                    <div className="flex justify-between items-center text-white">
                      <span className="font-bold">{selectedRoomNode.name}</span>
                      <span>₹{roomDetails?.price}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Stay type: {stayValue} {stayUnit === 'days' ? 'Day(s)' : 'Hour(s)'} rest schedule
                    </p>
                  </div>
                )}

                {/* Selected Food summary if any */}
                {foodDetails.list.length > 0 ? (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                      <span>Imported Dishes Combo</span>
                      <span className="text-white">₹{foodDetails.price}</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {foodDetails.list.map((food, i) => (
                        <li key={i} className="truncate">✓ {food}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-4 text-slate-500 text-[11px] italic">
                    No food dishes drafted yet. You can purchase food directly on-arrival at the restaurant!
                  </div>
                )}

                {/* Total sum calculation block */}
                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline font-bold">
                  <span className="text-white">Estimated Desk Pay:</span>
                  <span className="text-2xl text-rose-400 font-mono flex items-center">
                    <CreditCard className="w-4.5 h-4.5 text-rose-400 mr-1 shrink-0 animate-pulse" />
                    ₹{grandTotal}
                  </span>
                </div>

                <div className="bg-white/5 p-3 rounded-lg text-[10px] text-slate-400 leading-relaxed text-justify">
                  *Our highway desk takes all UPIs, major cards, and Cash. No deposit is required online.
                </div>
              </div>
            </div>

            {/* Contact details Card info */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 space-y-3.5">
              <h5 className="font-bold text-rose-955 text-sm">Need Direct Service?</h5>
              <p className="text-slate-600 text-xs">
                To order catering delivery along Kalyani Expressway or manually book group stays, dial:
              </p>
              <div className="bg-white rounded-xl p-3 border border-rose-100 flex items-center justify-between text-xs font-bold text-slate-900 shadow-sm">
                <span>Call Hotline</span>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-rose-600 hover:underline">{RESTAURANT_INFO.phone}</a>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
