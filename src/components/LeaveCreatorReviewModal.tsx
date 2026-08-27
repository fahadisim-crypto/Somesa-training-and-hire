import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  Building2, 
  User, 
  MapPin, 
  Send, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { Creator, CreatorReview } from '../types';
import confetti from 'canvas-confetti';

interface LeaveCreatorReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: Creator;
  onSubmitReview: (review: CreatorReview) => void;
}

export const LeaveCreatorReviewModal: React.FC<LeaveCreatorReviewModalProps> = ({
  isOpen,
  onClose,
  creator,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [communicationRating, setCommunicationRating] = useState<number>(5);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [speedRating, setSpeedRating] = useState<number>(5);

  const [clientName, setClientName] = useState('');
  const [clientOrganization, setClientOrganization] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [clientLocation, setClientLocation] = useState('Kampala, Uganda');
  const [serviceHired, setServiceHired] = useState(creator.services[0]?.name || 'Creative Production');
  const [customService, setCustomService] = useState('');
  const [projectOutcome, setProjectOutcome] = useState('');
  const [comment, setComment] = useState('');
  const [isVerifiedHire, setIsVerifiedHire] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMessage('Please enter your full name or business representative name.');
      return;
    }
    if (!comment.trim() || comment.length < 15) {
      setErrorMessage('Please provide a short review (at least 15 characters).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const newReview: CreatorReview = {
      id: `rev-${creator.id}-${Date.now()}`,
      creatorId: creator.id,
      clientName: clientName.trim(),
      clientOrganization: clientOrganization.trim() || undefined,
      clientRole: clientRole.trim() || undefined,
      clientLocation: clientLocation.trim() || 'Uganda',
      rating,
      ratingBreakdown: {
        communication: communicationRating,
        quality: qualityRating,
        deliverySpeed: speedRating
      },
      serviceHired: serviceHired === 'Other / Custom' ? (customService.trim() || 'Custom Project') : serviceHired,
      comment: comment.trim(),
      projectOutcome: projectOutcome.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      verifiedHire: isVerifiedHire
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onSubmitReview(newReview);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5: return 'Outstanding (5.0 / 5.0)';
      case 4: return 'Very Good (4.0 / 5.0)';
      case 3: return 'Good / Satisfactory (3.0 / 5.0)';
      case 2: return 'Fair (2.0 / 5.0)';
      default: return 'Needs Improvement (1.0 / 5.0)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E3DA] overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0A2E24] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white/30 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  Client Review &amp; Recommendation
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Review {creator.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Review Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* 1. Overall Star Rating */}
          <div className="bg-[#F5F2ED] rounded-2xl p-5 border border-[#E8E3DA] text-center space-y-2">
            <label className="text-xs font-bold text-[#121715] uppercase tracking-wider block">
              Overall Experience Rating
            </label>
            
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      (hoverRating !== null ? hoverRating >= star : rating >= star)
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-neutral-300'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-[#0A2E24] inline-block">
              {getRatingLabel(hoverRating || rating)}
            </span>
          </div>

          {/* 2. Rating Breakdown Sub-criteria */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-white rounded-xl border border-[#E8E3DA] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#121715]/70 block">Communication</span>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button 
                    type="button" 
                    key={s} 
                    onClick={() => setCommunicationRating(s)}
                    className="text-amber-400 text-xs cursor-pointer"
                  >
                    ★
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-bold text-[#0A2E24]">{communicationRating}.0 / 5.0</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8E3DA] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#121715]/70 block">Work Quality</span>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button 
                    type="button" 
                    key={s} 
                    onClick={() => setQualityRating(s)}
                    className="text-amber-400 text-xs cursor-pointer"
                  >
                    ★
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-bold text-[#0A2E24]">{qualityRating}.0 / 5.0</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8E3DA] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#121715]/70 block">Turnaround Speed</span>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button 
                    type="button" 
                    key={s} 
                    onClick={() => setSpeedRating(s)}
                    className="text-amber-400 text-xs cursor-pointer"
                  >
                    ★
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-bold text-[#0A2E24]">{speedRating}.0 / 5.0</span>
            </div>
          </div>

          {/* 3. Client & Organization Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your Name <span className="text-[#FF6321]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Ronald Mulondo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Company or Business Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={clientOrganization}
                  onChange={(e) => setClientOrganization(e.target.value)}
                  placeholder="e.g. Coffee Mulondo Co."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your Role / Title
              </label>
              <input
                type="text"
                value={clientRole}
                onChange={(e) => setClientRole(e.target.value)}
                placeholder="e.g. Founder &amp; Managing Director"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={clientLocation}
                  onChange={(e) => setClientLocation(e.target.value)}
                  placeholder="e.g. Kyotera / Masaka"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Service Hired & Outcome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Service Hired
              </label>
              <select
                value={serviceHired}
                onChange={(e) => setServiceHired(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
              >
                {creator.services.map((srv, idx) => (
                  <option key={idx} value={srv.name}>{srv.name}</option>
                ))}
                <option value="Other / Custom">Other / Custom Deliverables</option>
              </select>

              {serviceHired === 'Other / Custom' && (
                <input
                  type="text"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  placeholder="Specify service..."
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-[#E8E3DA] text-xs"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Key Result or Outcome (Optional)
              </label>
              <div className="relative">
                <TrendingUp className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectOutcome}
                  onChange={(e) => setProjectOutcome(e.target.value)}
                  placeholder="e.g. +35% WhatsApp orders in 2 weeks"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 5. Detailed Testimonial / Comment */}
          <div>
            <label className="block text-xs font-bold text-[#121715] mb-1.5">
              Your Review &amp; Recommendation <span className="text-[#FF6321]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share what it was like collaborating with ${creator.name}. How did the final deliverable impact your business or campaign?`}
              className="w-full p-3.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium leading-relaxed focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
            />
            <span className="text-[10px] text-[#121715]/50">
              Minimum 15 characters. Genuine feedback builds platform trust.
            </span>
          </div>

          {/* 6. Verified Hire Checkbox */}
          <label className="flex items-start gap-3 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isVerifiedHire}
              onChange={(e) => setIsVerifiedHire(e.target.checked)}
              className="mt-0.5 rounded text-[#0A2E24] focus:ring-[#0A2E24]"
            />
            <div className="text-xs">
              <span className="font-bold text-[#0A2E24] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Client Engagement
              </span>
              <p className="text-[#121715]/70 text-[11px] mt-0.5">
                Confirming you hired or worked with {creator.name} directly or through SOMESA.
              </p>
            </div>
          </label>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E8E3DA]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#121715]/70 hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              id="submit-creator-review-btn"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>{isSubmitting ? 'Publishing Review...' : 'Publish Client Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
