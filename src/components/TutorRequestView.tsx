import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Calendar, 
  Phone, 
  Building, 
  User, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  ShieldCheck, 
  Clock, 
  Users,
  Briefcase,
  Calculator,
  Check,
  Zap,
  Flame,
  CreditCard,
  Camera,
  Mic,
  QrCode
} from 'lucide-react';
import { TutorRequest } from '../types';
import confetti from 'canvas-confetti';

interface TutorRequestViewProps {
  onSubmitRequest: (req: Omit<TutorRequest, 'id' | 'created_at' | 'status'>) => void;
  onExploreCourses: () => void;
  onBack: () => void;
}

interface PackageTier {
  id: string;
  name: string;
  lugandaName: string;
  durationHours: string;
  priceUgx: number;
  badge?: string;
  description: string;
  features: string[];
}

export const TutorRequestView: React.FC<TutorRequestViewProps> = ({
  onSubmitRequest,
  onExploreCourses,
  onBack
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [skillTopic, setSkillTopic] = useState('CapCut Video & Reels (Product Videos)');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing & Package Calculator State
  const packageTiers: PackageTier[] = [
    {
      id: 'half_day',
      name: 'Half-Day Intensive',
      lugandaName: 'Essawa 3 ez’Obukugu',
      durationHours: '3 Hours',
      priceUgx: 60000,
      description: 'Focused hands-on training on 1 specific tool (CapCut basics, Canva posters, or WhatsApp Business catalogue).',
      features: ['Up to 2 learners included', '1 finished template/reel created', 'Luganda step-by-step guidance']
    },
    {
      id: 'full_day',
      name: 'Full-Day Shop Overhaul',
      lugandaName: 'Olunaku Lulamba',
      durationHours: '6 Hours',
      priceUgx: 110000,
      badge: '🔥 Most Popular for Shops',
      description: 'Complete digital transformation: product photo session + Canva templates + 3 finished Reels ready to post.',
      features: ['Up to 4 learners included', '3 finished customer videos filmed', 'Catalogue setup + pricing cards', 'WhatsApp greeting automation']
    },
    {
      id: 'multi_day',
      name: '3-Day Staff Masterclass',
      lugandaName: 'Ennaku 3 ez’Abakozi Bonna',
      durationHours: '3 Days (3 hrs/day)',
      priceUgx: 280000,
      badge: '⚡ Complete Mastery',
      description: 'Comprehensive staff training for boutiques, supermarkets, salons, and workshops with standard operating procedures.',
      features: ['Up to 8 staff participants', 'Canva + CapCut + TikTok mastery', 'Standard shop filming routine', '30-day WhatsApp instructor support']
    }
  ];

  const [selectedTierId, setSelectedTierId] = useState<string>('full_day');
  const [staffCountTier, setStaffCountTier] = useState<'1-2' | '3-5' | '6+'>('1-2');
  
  // Add-ons
  const [includeRingLight, setIncludeRingLight] = useState(false);
  const [includeLapelMic, setIncludeLapelMic] = useState(false);
  const [includePrintedCards, setIncludePrintedCards] = useState(false);

  const selectedTier = packageTiers.find((t) => t.id === selectedTierId) || packageTiers[1];

  // Calculate live total
  const basePrice = selectedTier.priceUgx;
  const staffExtra = staffCountTier === '3-5' ? 15000 : staffCountTier === '6+' ? 30000 : 0;
  const ringLightExtra = includeRingLight ? 25000 : 0;
  const lapelMicExtra = includeLapelMic ? 15000 : 0;
  const printedCardsExtra = includePrintedCards ? 20000 : 0;

  const totalCalculatedUgx = basePrice + staffExtra + ringLightExtra + lapelMicExtra + printedCardsExtra;

  const [submittedData, setSubmittedData] = useState<{
    name: string;
    businessName: string;
    location: string;
    phone: string;
    topic: string;
    packageName: string;
    totalUgx: number;
  } | null>(null);

  const skillOptions = [
    'CapCut Video & Reels (Product Videos)',
    'Canva Graphics & Shop Posters',
    'WhatsApp Business Setup & Catalogues',
    'Smartphone Product Photography & Lighting',
    'TikTok Marketing for Local Shops & Cafés',
    'E-commerce & Mobile Money Payment Flow'
  ];

  const popularLocations = [
    'Kyotera Town',
    'Masaka Market Area / Elgin St',
    'Kampala (Central / Nakawa)',
    'Kalisizo / Rakai',
    'Entebbe',
    'Gulu'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !businessName || !phone || !location) {
      return;
    }

    setIsSubmitting(true);

    const calculatedSummaryNote = [
      `[Package]: ${selectedTier.name} (${selectedTier.durationHours} - UGX ${selectedTier.priceUgx.toLocaleString()})`,
      `[Staff Count]: ${staffCountTier} participants`,
      includeRingLight ? '+ Ring Light Kit (UGX 25,000)' : '',
      includeLapelMic ? '+ Lapel Mic Kit (UGX 15,000)' : '',
      includePrintedCards ? '+ 10 Printed QR Cards (UGX 20,000)' : '',
      `[Estimated Total]: UGX ${totalCalculatedUgx.toLocaleString()}`,
      notes ? `[Client Note]: ${notes}` : ''
    ].filter(Boolean).join(' | ');

    setTimeout(() => {
      onSubmitRequest({
        requester_name: name,
        business_name: businessName,
        phone,
        location,
        skill_topic: skillTopic,
        preferred_date: preferredDate || undefined,
        notes: calculatedSummaryNote
      });

      setSubmittedData({
        name,
        businessName,
        location,
        phone,
        topic: skillTopic,
        packageName: selectedTier.name,
        totalUgx: totalCalculatedUgx
      });

      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // graceful fallback
      }
    }, 600);
  };

  const somesaPhone = '256701445566';
  const whatsappUrl = submittedData 
    ? `https://wa.me/${somesaPhone}?text=Hi%20SOMESA,%20I%20requested%20an%20in-person%20tutor%20(${encodeURIComponent(submittedData.packageName)}%20-%20UGX%20${submittedData.totalUgx.toLocaleString()})%20for%20${encodeURIComponent(submittedData.businessName)}%20in%20${encodeURIComponent(submittedData.location)}.`
    : '#';

  return (
    <div className="min-h-screen bg-[#F5F2ED] py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Screen */}
        {submittedData ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E3DA] shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-300 max-w-3xl mx-auto">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-3xl bg-[#0A2E24] text-white mx-auto flex items-center justify-center shadow-xl ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="absolute -top-1 -right-1 bg-[#FF6321] text-white p-1.5 rounded-full shadow">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tutor Dispatch Request Received</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#121715]">
                We've received your booking request!
              </h2>
              <p className="text-sm sm:text-base text-[#121715]/80 font-medium max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{submittedData.name}</strong>. A certified SOMESA instructor will contact your number (<strong>{submittedData.phone}</strong>) within 2 hours to confirm arrival at <strong>{submittedData.businessName}</strong>.
              </p>
            </div>

            {/* Recap Box */}
            <div className="bg-[#F5F2ED] rounded-2xl p-5 border border-[#E8E3DA] max-w-md mx-auto text-left text-xs space-y-2.5 text-[#121715]/85">
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#121715]/60">Selected Package</span>
                <span className="font-bold text-[#0A2E24]">{submittedData.packageName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#121715]/60">Location</span>
                <span className="font-bold text-[#0A2E24]">{submittedData.location}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#121715]/60">Topic Focus</span>
                <span className="font-semibold text-[#121715]">{submittedData.topic}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#121715]/60">Estimated Total Fee</span>
                <span className="font-extrabold text-sm text-[#0A2E24]">UGX {submittedData.totalUgx.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#121715]/60">Payment Terms</span>
                <span className="font-bold text-emerald-700">Pay on Arrival (MoMo / Cash)</span>
              </div>
            </div>

            {/* Direct WhatsApp Fallback Link */}
            <div className="pt-2 max-w-md mx-auto space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Confirm on WhatsApp ({somesaPhone})</span>
              </a>

              <button
                onClick={onExploreCourses}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-xs text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] transition-colors cursor-pointer"
              >
                Meanwhile, Explore Luganda Video Academy →
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form & Calculator */
          <div className="space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>In-Person Shop &amp; Business Training</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#121715] tracking-tight">
                Get a certified digital instructor at your business.
              </h1>
              <p className="text-sm sm:text-base text-[#121715]/80 leading-relaxed">
                Choose a transparent session package below. Our certified instructors come directly to your shop in Kyotera, Masaka, Kampala, or surrounding areas.
              </p>
            </div>

            {/* Transparent Session Pricing & Package Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#FF6321]" />
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#121715]">
                    1. Select Your Training Package
                  </h3>
                </div>
                <span className="text-xs font-medium text-[#0A2E24] bg-[#0A2E24]/10 px-2.5 py-1 rounded-full">
                  Transparent Fixed Rates
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packageTiers.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#0A2E24] bg-white shadow-lg ring-4 ring-[#0A2E24]/5 scale-101'
                          : 'border-[#E8E3DA] bg-white/70 hover:bg-white hover:border-[#0A2E24]/40'
                      }`}
                    >
                      {tier.badge && (
                        <span className="absolute -top-3 left-4 bg-[#FF6321] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                          {tier.badge}
                        </span>
                      )}

                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display font-bold text-base text-[#121715]">
                              {tier.name}
                            </h4>
                            <p className="text-xs font-editorial italic text-[#0A2E24]">
                              «{tier.lugandaName}»
                            </p>
                          </div>
                          <span className="text-xs font-bold bg-[#F5F2ED] text-[#121715]/75 px-2 py-0.5 rounded-full shrink-0">
                            {tier.durationHours}
                          </span>
                        </div>

                        <div className="mt-4 mb-3">
                          <p className="font-display font-black text-2xl text-[#0A2E24]">
                            UGX {tier.priceUgx.toLocaleString()}
                          </p>
                          <p className="text-[11px] text-[#121715]/55 font-medium">
                            No upfront deposit required
                          </p>
                        </div>

                        <p className="text-xs text-[#121715]/75 leading-relaxed mb-4">
                          {tier.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-[#E8E3DA]">
                          {tier.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#121715]/85">
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#E8E3DA]/60">
                        <button
                          type="button"
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#0A2E24] text-white shadow-xs'
                              : 'bg-[#F5F2ED] text-[#121715]/70'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Selected Package</span>
                            </>
                          ) : (
                            <span>Choose This Tier</span>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Equipment & Staff Calculator Options */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-md space-y-6">
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF6321]" />
                <h3 className="font-display font-bold text-base text-[#121715]">
                  2. Customize Attendees &amp; Equipment Add-Ons
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Staff Attendees Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#121715]">
                    How many people will join the training?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setStaffCountTier('1-2')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        staffCountTier === '1-2'
                          ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/80 border-[#E8E3DA]'
                      }`}
                    >
                      <div>1 - 2 Staff</div>
                      <div className="text-[10px] font-normal opacity-80">Included</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStaffCountTier('3-5')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        staffCountTier === '3-5'
                          ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/80 border-[#E8E3DA]'
                      }`}
                    >
                      <div>3 - 5 Staff</div>
                      <div className="text-[10px] font-normal opacity-80">+UGX 15k</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStaffCountTier('6+')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        staffCountTier === '6+'
                          ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/80 border-[#E8E3DA]'
                      }`}
                    >
                      <div>6+ Whole Team</div>
                      <div className="text-[10px] font-normal opacity-80">+UGX 30k</div>
                    </button>
                  </div>
                </div>

                {/* Equipment Kits Checkbox list */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#121715]">
                    Equipment &amp; Hardware Kits (Optional)
                  </label>
                  
                  <div className="space-y-2">
                    {/* Ring Light */}
                    <label className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${includeRingLight ? 'bg-[#0A2E24]/5 border-[#0A2E24]' : 'bg-[#F5F2ED]/60 border-[#E8E3DA]'}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeRingLight}
                          onChange={(e) => setIncludeRingLight(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0A2E24] focus:ring-[#0A2E24]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#121715]">Tutor brings Ring Light &amp; Tripod</p>
                          <p className="text-[10px] text-[#121715]/60">Hands-on shop lighting training</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#0A2E24]">+UGX 25,000</span>
                    </label>

                    {/* Wireless Mic */}
                    <label className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${includeLapelMic ? 'bg-[#0A2E24]/5 border-[#0A2E24]' : 'bg-[#F5F2ED]/60 border-[#E8E3DA]'}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeLapelMic}
                          onChange={(e) => setIncludeLapelMic(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0A2E24] focus:ring-[#0A2E24]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#121715]">Tutor brings Wireless Lapel Mic Kit</p>
                          <p className="text-[10px] text-[#121715]/60">Record crystal-clear Luganda voiceovers</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#0A2E24]">+UGX 15,000</span>
                    </label>

                    {/* Printed QR Cards */}
                    <label className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${includePrintedCards ? 'bg-[#0A2E24]/5 border-[#0A2E24]' : 'bg-[#F5F2ED]/60 border-[#E8E3DA]'}`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includePrintedCards}
                          onChange={(e) => setIncludePrintedCards(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0A2E24] focus:ring-[#0A2E24]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#121715]">10 Laminated Shop QR / Price Cards</p>
                          <p className="text-[10px] text-[#121715]/60">Printed &amp; delivered for tables/counter</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#0A2E24]">+UGX 20,000</span>
                    </label>
                  </div>

                </div>

              </div>

              {/* Dynamic Price Summary Bar */}
              <div className="p-4 rounded-2xl bg-[#0A2E24] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-300">Live Calculated Total:</span>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
                      {selectedTier.name} ({selectedTier.durationHours})
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-1">
                    No payment needed now · Pay in person via MTN MoMo / Airtel / Cash
                  </p>
                </div>

                <div className="text-center sm:text-right">
                  <p className="font-display font-black text-2xl sm:text-3xl text-emerald-300">
                    UGX {totalCalculatedUgx.toLocaleString()}
                  </p>
                </div>
              </div>

            </div>

            {/* Booking Form Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-xl">
              
              <div className="mb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-[#FF6321]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-[#121715]">
                  3. Enter Shop Location &amp; Contact Details
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Requester Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#121715]">
                      Your Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Grace Nakimbugwe"
                        className="w-full pl-10 pr-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none placeholder-[#121715]/40"
                      />
                    </div>
                  </div>

                  {/* Business / Shop Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#121715]">
                      Business / Shop Name <span className="text-[#FF6321]">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Nabugabo Fresh Fish & Grill"
                        className="w-full pl-10 pr-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none placeholder-[#121715]/40"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#121715]">
                      Phone Number (WhatsApp preferred) <span className="text-[#FF6321]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +256 772 123456"
                        className="w-full pl-10 pr-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none placeholder-[#121715]/40"
                      />
                    </div>
                  </div>

                  {/* Location / Town */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#121715]">
                      Location / Town <span className="text-[#FF6321]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Kyotera Main Street / Masaka Town"
                        className="w-full pl-10 pr-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none placeholder-[#121715]/40"
                      />
                    </div>
                    {/* Quick location chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-[#121715]/50">Quick pick:</span>
                      {popularLocations.slice(0, 3).map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#F5F2ED] hover:bg-[#E8E3DA] text-[#0A2E24] font-medium"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Skill Topic Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#121715]">
                    Primary Topic of Training <span className="text-[#FF6321]">*</span>
                  </label>
                  <select
                    value={skillTopic}
                    onChange={(e) => setSkillTopic(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none cursor-pointer"
                  >
                    {skillOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#121715]">
                    Preferred Training Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Notes / Specific Questions */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#121715]">
                    Specific Shop Needs or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us what phones you have or specific products you want to film/photograph during the session..."
                    className="w-full p-3.5 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none placeholder-[#121715]/40"
                  />
                </div>

                {/* Benefits / Assurance box */}
                <div className="bg-[#F5F2ED] rounded-2xl p-4 border border-[#E8E3DA] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#121715]/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Certified Female Tutor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{selectedTier.durationHours} Direct Visit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Pay Upon Tutor Arrival</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-xs font-semibold text-[#121715]/60 hover:text-[#121715] cursor-pointer"
                  >
                    Cancel &amp; Return
                  </button>

                  <button
                    id="submit-tutor-request-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#FF6321]" />
                        <span>Dispatch Tutor (UGX {totalCalculatedUgx.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

