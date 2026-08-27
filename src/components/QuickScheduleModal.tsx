import React, { useState, useEffect } from 'react';
import { 
  X, 
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
  Zap,
  Volume2
} from 'lucide-react';
import { TutorRequest, CourseCategory } from '../types';
import confetti from 'canvas-confetti';

interface QuickScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  onSubmitRequest: (req: Omit<TutorRequest, 'id' | 'created_at' | 'status'>) => void;
}

export const QuickScheduleModal: React.FC<QuickScheduleModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'CapCut Video & Reels (Product Videos)',
  onSubmitRequest,
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Kyotera Town');
  const [customLocation, setCustomLocation] = useState('');
  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const [skillTopic, setSkillTopic] = useState(initialTopic);
  const [preferredDate, setPreferredDate] = useState('Tomorrow Morning (9:00 AM - 12:00 PM)');
  const [customDate, setCustomDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    name: string;
    businessName: string;
    location: string;
    phone: string;
    topic: string;
    preferredDate: string;
  } | null>(null);

  // Sync initialTopic when opened with a different category
  useEffect(() => {
    if (initialTopic) {
      setSkillTopic(initialTopic);
    }
  }, [initialTopic, isOpen]);

  if (!isOpen) return null;

  const popularLocations = [
    'Kyotera Town',
    'Masaka Market / Elgin St',
    'Kampala (Central / Nakawa)',
    'Kalisizo / Rakai',
    'Entebbe',
    'Jinja'
  ];

  const skillOptions = [
    'CapCut Video & Reels (Product Videos)',
    'Canva Graphics & Shop Posters',
    'WhatsApp Business Setup & Catalogues',
    'Smartphone Product Photography & Lighting',
    'TikTok Marketing for Local Shops & Cafés',
    'E-commerce & Mobile Money Payment Flow'
  ];

  const timeSlots = [
    'Tomorrow Morning (9:00 AM - 12:00 PM)',
    'Tomorrow Afternoon (2:00 PM - 5:00 PM)',
    'This Weekend (Saturday / Sunday)',
    'Flexible (Within next 3-4 days)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLocation = isCustomLocation ? customLocation.trim() : location;
    const finalDate = customDate.trim() || preferredDate;

    if (!name.trim() || !businessName.trim() || !phone.trim() || !finalLocation) {
      return;
    }

    setIsSubmitting(true);
    const trackingId = `SOMESA-TUT-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      onSubmitRequest({
        requester_name: name.trim(),
        business_name: businessName.trim(),
        phone: phone.trim(),
        location: finalLocation,
        skill_topic: skillTopic,
        preferred_date: finalDate,
        notes: notes.trim() ? `[Quick Scheduled] ${notes.trim()}` : '[Quick Scheduled from Learn Academy]'
      });

      setSubmittedData({
        id: trackingId,
        name: name.trim(),
        businessName: businessName.trim(),
        location: finalLocation,
        phone: phone.trim(),
        topic: skillTopic,
        preferredDate: finalDate
      });

      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // graceful fallback
      }
    }, 450);
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setName('');
    setBusinessName('');
    setPhone('');
    setNotes('');
    setIsCustomLocation(false);
    setCustomLocation('');
    onClose();
  };

  const somesaPhone = '256701445566';
  const whatsappUrl = submittedData 
    ? `https://wa.me/${somesaPhone}?text=Hi%20SOMESA,%20I%20just%20used%20Quick%20Schedule%20for%20a%20tutor%20(Ref:%20${submittedData.id})%20for%20${encodeURIComponent(submittedData.businessName)}%20in%20${encodeURIComponent(submittedData.location)}%20regarding%20${encodeURIComponent(submittedData.topic)}.`
    : '#';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#E8E3DA] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A2E24] text-white p-5 sm:p-6 relative flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[#FF6321] text-[11px] font-bold">
              <Zap className="w-3 h-3 fill-current" />
              <span>Quick Tutor Dispatch</span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
              {submittedData ? 'Dispatch Confirmed!' : 'Schedule On-Site Tutor'}
            </h2>
            <p className="text-xs text-white/80">
              {submittedData 
                ? 'Your local instructor has been notified'
                : 'Send a certified creator to train your staff right at your shop or workplace.'}
            </p>
          </div>

          <button
            id="close-quick-schedule-modal"
            onClick={handleResetAndClose}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {submittedData ? (
            /* Success State */
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-2xl bg-[#0A2E24] text-white mx-auto flex items-center justify-center shadow-lg ring-4 ring-emerald-500/10">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#0A2E24] bg-[#0A2E24]/10 px-3 py-1 rounded-full">
                  Tracking Ref: {submittedData.id}
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#121715] pt-2">
                  Request Saved to Dispatch Queue
                </h3>
                <p className="text-xs text-[#121715]/70 max-w-sm mx-auto">
                  Thank you, <strong>{submittedData.name}</strong>. A SOMESA instructor assigned to <strong>{submittedData.location}</strong> will contact you via WhatsApp / phone at <strong>{submittedData.phone}</strong>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F5F2ED] rounded-2xl p-4 text-left text-xs space-y-2 border border-[#E8E3DA]">
                <div className="flex justify-between py-1 border-b border-[#E8E3DA]/60">
                  <span className="text-[#121715]/60">Business / Shop:</span>
                  <span className="font-bold text-[#121715]">{submittedData.businessName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E3DA]/60">
                  <span className="text-[#121715]/60">Skill Topic:</span>
                  <span className="font-bold text-[#0A2E24]">{submittedData.topic}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E3DA]/60">
                  <span className="text-[#121715]/60">Location:</span>
                  <span className="font-bold text-[#121715]">{submittedData.location}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#121715]/60">Preferred Time:</span>
                  <span className="font-semibold text-[#121715]">{submittedData.preferredDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#FF6321]" />
                  <span>Chat with Dispatch Team on WhatsApp</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 px-4 rounded-2xl font-semibold text-xs text-[#121715]/70 hover:text-[#121715] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
                >
                  Done &amp; Continue Learning
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Preselected Topic Highlight */}
              <div className="bg-[#F5F2ED] rounded-2xl p-3.5 border border-[#E8E3DA]">
                <label className="block text-[11px] font-bold text-[#0A2E24] uppercase tracking-wider mb-1.5">
                  Selected Topic / Skill Category
                </label>
                <select
                  value={skillTopic}
                  onChange={(e) => setSkillTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                >
                  {skillOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#121715]/60">
                  <Volume2 className="w-3 h-3 text-[#FF6321]" />
                  <span>Taught in conversational Luganda &amp; English</span>
                </div>
              </div>

              {/* Requester & Shop Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1">
                    Your Name <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Namata"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1">
                    Shop or Business <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Masaka Fashion Hub"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1">
                  WhatsApp / Phone Number <span className="text-[#FF6321]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 700 000000 or 0772..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Location Picker with quick chips */}
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Shop Location / Town <span className="text-[#FF6321]">*</span>
                </label>
                
                {!isCustomLocation ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {popularLocations.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                            location === loc
                              ? 'bg-[#0A2E24] text-white font-bold shadow-xs'
                              : 'bg-[#F5F2ED] text-[#121715]/80 hover:bg-[#E8E3DA]'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCustomLocation(true)}
                      className="text-[11px] text-[#0A2E24] font-bold hover:underline cursor-pointer"
                    >
                      + Other town / street...
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      required
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="e.g. Kasana Town, Luweero or Mbarara High St"
                      className="w-full px-3 py-2 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomLocation(false)}
                      className="text-[11px] text-[#121715]/60 hover:underline cursor-pointer"
                    >
                      ← Back to common locations
                    </button>
                  </div>
                )}
              </div>

              {/* Preferred Time Window */}
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1">
                  Preferred Visit Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setPreferredDate(slot);
                        setCustomDate('');
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] text-left transition-colors cursor-pointer border ${
                        preferredDate === slot && !customDate
                          ? 'border-[#0A2E24] bg-[#0A2E24]/5 font-bold text-[#0A2E24]'
                          : 'border-[#E8E3DA] bg-white text-[#121715]/70 hover:bg-[#F5F2ED]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering with Dispatch...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-[#FF6321] fill-current" />
                      <span>Confirm &amp; Request Tutor</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#121715]/60 mt-2 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No upfront fee · Pay in cash or MoMo after session</span>
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
