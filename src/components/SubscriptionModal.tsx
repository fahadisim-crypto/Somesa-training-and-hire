import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  MapPin, 
  Volume2, 
  BookOpen, 
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'single_course' | 'all_access_pass') => void;
  onRequestTutor: () => void;
  hasAllAccessPass: boolean;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
  onRequestTutor,
  hasAllAccessPass
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'all_access'>('all_access');
  const [network, setNetwork] = useState<'mtn' | 'airtel'>('mtn');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onSelectPlan(selectedPlan === 'all_access' ? 'all_access_pass' : 'single_course');

      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // fallback
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E3DA] shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#0A2E24] tracking-wider bg-[#0A2E24]/10 px-2.5 py-0.5 rounded-full">
              Transparent Local Pricing
            </span>
            <h2 className="font-display font-black text-2xl text-[#121715]">
              Soma &amp; Somesa Pass Plans
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F2ED] text-[#121715]/60 hover:text-[#121715] flex items-center justify-center text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[#121715]">
              Pass Activated Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 max-w-md mx-auto">
              You now have unlimited access to every course in the Luganda Video Academy.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30]"
            >
              Start Learning Now →
            </button>
          </div>
        ) : (
          <>
            {/* Tier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Single Course Pass */}
              <div 
                onClick={() => setSelectedPlan('single')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  selectedPlan === 'single'
                    ? 'border-[#0A2E24] bg-[#0A2E24]/5 shadow-sm'
                    : 'border-[#E8E3DA] bg-white hover:bg-[#F5F2ED]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#121715]">Single Course Pass</span>
                    <span className="text-[10px] bg-[#E8E3DA] px-2 py-0.5 rounded font-semibold text-[#121715]">
                      One-off
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#0A2E24]">
                    UGX 5,000
                  </p>
                  <p className="text-[11px] text-[#121715]/70">
                    Perfect if you only need to master one specific tool (e.g. CapCut or WhatsApp Business).
                  </p>

                  <ul className="space-y-1.5 pt-2 text-[11px] text-[#121715]/80">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Lifetime access to 1 chosen course</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Direct instructor Q&amp;A comment section</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Downloadable lesson cheat-sheets</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <div className={`w-4 h-4 rounded-full border-2 mx-auto flex items-center justify-center ${
                    selectedPlan === 'single' ? 'border-[#0A2E24] bg-[#0A2E24]' : 'border-[#D6CFC4]'
                  }`}>
                    {selectedPlan === 'single' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

              {/* All-Access Monthly Pass */}
              <div 
                onClick={() => setSelectedPlan('all_access')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-4 ${
                  selectedPlan === 'all_access'
                    ? 'border-[#FF6321] bg-[#FF6321]/5 shadow-md'
                    : 'border-[#E8E3DA] bg-white hover:bg-[#F5F2ED]'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-[#FF6321] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                  Most Popular
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#121715]">All-Access Pass</span>
                    <span className="text-[10px] bg-[#FF6321]/15 text-[#FF6321] px-2 py-0.5 rounded font-bold">
                      Monthly
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#0A2E24]">
                    UGX 20,000 <span className="text-xs font-normal text-[#121715]/60">/ month</span>
                  </p>
                  <p className="text-[11px] text-[#121715]/70">
                    Unlimited access to ALL current and future Luganda video tutorials + tutor discounts.
                  </p>

                  <ul className="space-y-1.5 pt-2 text-[11px] text-[#121715]/80">
                    <li className="flex items-center gap-1.5 font-semibold text-[#0A2E24]">
                      <Check className="w-3.5 h-3.5 text-[#FF6321] shrink-0" />
                      <span>Unlimited access to EVERY course</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#FF6321] shrink-0" />
                      <span>20% off In-Person Tutor Dispatches</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#FF6321] shrink-0" />
                      <span>Priority WhatsApp Support</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <div className={`w-4 h-4 rounded-full border-2 mx-auto flex items-center justify-center ${
                    selectedPlan === 'all_access' ? 'border-[#FF6321] bg-[#FF6321]' : 'border-[#D6CFC4]'
                  }`}>
                    {selectedPlan === 'all_access' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

            </div>

            {/* In-Person Tutor Dispatch Option Box */}
            <div className="bg-[#F5F2ED] rounded-2xl p-4 border border-[#E8E3DA] flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-[#0A2E24] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Looking for In-Person Shop Training?</span>
                </p>
                <p className="text-[#121715]/70 text-[11px]">
                  Dispatch a certified female tutor to your shop or office for hands-on sessions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestTutor();
                }}
                className="px-3 py-1.5 rounded-xl font-bold text-xs bg-white text-[#0A2E24] hover:bg-[#E8E3DA] border border-[#D6CFC4] transition-colors shrink-0 cursor-pointer"
              >
                Send Tutor →
              </button>
            </div>

            {/* Mobile Money Payment Inputs */}
            <div className="space-y-3 pt-2 border-t border-[#E8E3DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#121715]">
                  Pay with Mobile Money (MTN / Airtel)
                </label>
                <span className="text-[10px] text-[#121715]/60">Instant Activation</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNetwork('mtn')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    network === 'mtn'
                      ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                      : 'bg-white text-[#121715]/70 border-[#E8E3DA]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>MTN MoMo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNetwork('airtel')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    network === 'airtel'
                      ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-[#121715]/70 border-[#E8E3DA]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Airtel Money</span>
                </button>
              </div>

              <input
                type="tel"
                placeholder="Phone number, e.g. 0772 123456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-sm focus:outline-none focus:border-[#0A2E24]"
              />

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="w-full py-3.5 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Processing MoMo Transaction...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-[#FF6321]" />
                    <span>
                      Pay {selectedPlan === 'all_access' ? 'UGX 20,000/mo' : 'UGX 5,000'} &amp; Activate
                    </span>
                  </>
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
