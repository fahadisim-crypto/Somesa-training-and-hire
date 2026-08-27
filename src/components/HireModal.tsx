import React, { useState } from 'react';
import { X, CheckCircle2, Send, Clock, Sparkles, Phone, Mail, Building, User, ArrowRight, MessageSquare, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Creator, HireRequest } from '../types';

interface HireModalProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (request: Omit<HireRequest, 'id' | 'createdAt' | 'status'>) => void;
  onContinueBrowsing: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({
  creator,
  isOpen,
  onClose,
  onSubmitRequest,
  onContinueBrowsing,
}) => {
  const [clientName, setClientName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(creator?.primaryCategory || 'Video');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState<'As soon as possible' | 'This week' | 'This month' | 'Flexible'>('This week');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default service when creator changes
  React.useEffect(() => {
    if (creator) {
      setServiceNeeded(creator.primaryCategory);
      setIsSubmitted(false);
    }
  }, [creator]);

  if (!isOpen || !creator) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim() || !projectDescription.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitRequest({
        creatorId: creator.id,
        creatorName: creator.name,
        clientName: clientName.trim(),
        organization: organization.trim() || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        serviceNeeded,
        projectDescription: projectDescription.trim(),
        budget: budget.trim() || undefined,
        timeline,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger subtle celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B', '#38BDF8'],
          ticks: 200,
          gravity: 1.1,
          scalar: 0.9,
          disableForReducedMotion: true,
        });
        
        // Gentle secondary burst for delightful feedback
        setTimeout(() => {
          confetti({
            particleCount: 30,
            angle: 60,
            spread: 50,
            origin: { x: 0.35, y: 0.6 },
            colors: ['#0A2E24', '#FF6321', '#10B981'],
            gravity: 1.2,
            scalar: 0.8,
            disableForReducedMotion: true,
          });
          confetti({
            particleCount: 30,
            angle: 120,
            spread: 50,
            origin: { x: 0.65, y: 0.6 },
            colors: ['#0A2E24', '#FF6321', '#F59E0B'],
            gravity: 1.2,
            scalar: 0.8,
            disableForReducedMotion: true,
          });
        }, 150);
      } catch (e) {
        // graceful fallback if canvas is restricted
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setClientName('');
    setOrganization('');
    setPhone('');
    setEmail('');
    setProjectDescription('');
    setBudget('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-xl bg-[#F5F2ED] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E3DA] max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-[#E8E3DA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-semibold text-[#0A2E24] uppercase tracking-wider">
                Direct Project Request
              </p>
              <p className="font-display font-bold text-sm text-[#121715]">
                {creator.name} ({creator.location})
              </p>
            </div>
          </div>

          <button
            id="close-hire-modal-btn"
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#121715]/60 hover:text-[#121715] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          
          {!isSubmitted ? (
            /* Request Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <h2 className="font-display font-extrabold text-2xl text-[#121715] tracking-tight mb-1">
                  Tell {creator.name.split(' ')[0]} what you need
                </h2>
                <p className="text-xs sm:text-sm text-[#121715]/70 leading-relaxed">
                  Share a brief outline of your project. {creator.name.split(' ')[0]} will review your requirements and reach out directly.
                </p>
              </div>

              {/* Client Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1.5">
                    Your Name <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Sarah Nalubega"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1.5">
                    Business / Organisation
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Masaka Organics (Optional)"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Phone number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#FF6321]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+256 700 000000"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1.5">
                    Email Address <span className="text-[#121715]/40 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* What do you need? (Dropdown) */}
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  What do you need? <span className="text-[#FF6321]">*</span>
                </label>
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Video">Video (Reels, TikTok, Product clips, Editing)</option>
                  <option value="Photography">Photography (Products, Portraits, Events)</option>
                  <option value="Graphic Design">Design (Posters, Packaging, Flyers, Banners)</option>
                  <option value="Social Media">Social Media (Content creation &amp; Management)</option>
                  <option value="E-commerce">E-commerce (WhatsApp Store, Product Catalog)</option>
                  <option value="Branding">Branding (Logos, Visual identity, Color palette)</option>
                  <option value="Other">Other Creative Request</option>
                </select>
              </div>

              {/* Project Description (Large text box) */}
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Project Description <span className="text-[#FF6321]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your goal, deliverables needed, or any ideas you already have..."
                  className="w-full p-3.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none leading-relaxed"
                />
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1.5">
                    Budget Estimate <span className="text-[#121715]/40 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. UGX 200,000 or $50"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1.5">
                    Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-hire-request-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] disabled:opacity-50 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#FF6321]" />
                      <span>Send Project Request</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#121715]/50 mt-2">
                  Free to submit · No platform booking fees
                </p>
              </div>

            </form>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-3xl bg-[#0A2E24] text-white mx-auto flex items-center justify-center shadow-xl ring-8 ring-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="absolute -top-1 -right-1 bg-[#FF6321] text-white p-1 rounded-full shadow">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Request Transmitted Successfully</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121715] mb-2">
                  Request sent to {creator.name.split(' ')[0]}!
                </h3>
                <p className="text-sm sm:text-base text-[#121715]/80 font-medium max-w-md mx-auto leading-relaxed">
                  «{creator.name} has received your project request and will reach out via WhatsApp / phone to confirm details.»
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E3DA] text-left max-w-md mx-auto text-xs space-y-2 text-[#121715]/85 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-2">
                  <span className="text-[#121715]/60 font-medium">Deliverable</span>
                  <span className="font-bold text-[#0A2E24]">{serviceNeeded}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-2">
                  <span className="text-[#121715]/60 font-medium">Timeline</span>
                  <span className="font-semibold text-[#121715]">{timeline}</span>
                </div>
                {budget && (
                  <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-2">
                    <span className="text-[#121715]/60 font-medium">Budget Est.</span>
                    <span className="font-semibold text-[#121715]">{budget}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[#121715]/60 font-medium">Contact Details</span>
                  <span className="font-semibold text-[#121715]">{phone} ({clientName})</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  id="continue-browsing-btn"
                  onClick={() => {
                    handleResetAndClose();
                    onContinueBrowsing();
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue browsing creators</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6321]" />
                </button>

                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#121715]/70 hover:text-[#121715] rounded-full transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
