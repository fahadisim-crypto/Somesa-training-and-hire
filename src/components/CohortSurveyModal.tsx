import React, { useState } from 'react';
import { 
  X, CheckCircle2, ClipboardList, Send, Sparkles, Building2, Briefcase, 
  Clock, DollarSign, MessageSquare, ExternalLink, ArrowRight, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CohortSurveyResponse } from '../types';

interface CohortSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSurvey: (response: CohortSurveyResponse) => void;
  externalFormUrl?: string;
}

const INDUSTRY_OPTIONS = [
  'Agribusiness & Farming',
  'Retail, Boutique & Fashion',
  'Café, Restaurant & Hospitality',
  'Artisan Goods, Soaps & Crafts',
  'Tech, Fintech & IT Services',
  'Education & Non-Profit / NGO',
  'Healthcare & Wellness',
  'Real Estate & Construction',
  'Other Small Business'
];

const SKILL_OPTIONS = [
  'Short-Form Video (TikTok & Reels)',
  'Smartphone Product Photography',
  'Canva & Social Media Graphics',
  'Product Packaging & Label Design',
  'Bilingual Copywriting (Luganda + English)',
  'WhatsApp Business Catalogs & Marketing',
  'AI Product Staging & Editing',
  'Paid Social Ads Setup (Meta & TikTok)',
  'Branding & Logo Identity'
];

const TIMELINE_OPTIONS = [
  'Immediate (Next 1–2 weeks)',
  'Within the next 1–2 months',
  'Planning for next quarter (Q3/Q4)',
  'Just exploring / Researching talent'
];

const BUDGET_OPTIONS = [
  'Under UGX 200,000 / month',
  'UGX 200,000 – UGX 500,000 / month',
  'UGX 500,000 – UGX 1,500,000 / month',
  'UGX 1,500,000+ / month (Dedicated talent)',
  'Pay per project / One-off commission'
];

export const CohortSurveyModal: React.FC<CohortSurveyModalProps> = ({
  isOpen,
  onClose,
  onSubmitSurvey,
  externalFormUrl
}) => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([SKILL_OPTIONS[0], SKILL_OPTIONS[1]]);
  const [hiringTimeline, setHiringTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [monthlyBudget, setMonthlyBudget] = useState(BUDGET_OPTIONS[1]);
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      return;
    }

    setIsSubmitting(true);
    const newSurvey: CohortSurveyResponse = {
      id: `survey-${Date.now()}`,
      businessName: businessName.trim() || undefined,
      industry,
      skillsNeeded: selectedSkills,
      hiringTimeline,
      monthlyCreativeBudget: monthlyBudget,
      additionalFeedback: additionalFeedback.trim() || undefined,
      contactEmailOrPhone: contactInfo.trim() || undefined,
      createdAt: 'Just now'
    };

    setTimeout(() => {
      onSubmitSurvey(newSurvey);
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0A2E24', '#FF6321', '#10B981']
        });
      } catch {
        // ignore
      }
    }, 400);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setBusinessName('');
    setAdditionalFeedback('');
    setContactInfo('');
    onClose();
  };

  const hasValidExternalLink = externalFormUrl && 
    externalFormUrl !== '[INSERT_YOUR_GOOGLE_FORM_LINK_HERE]' &&
    externalFormUrl.startsWith('http');

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div 
        className="bg-[#F5F2ED] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#E8E3DA] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0A2E24] text-white p-5 sm:p-6 rounded-t-3xl z-10 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-[#FF6321]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                SOMESA Cohort Market Research
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Help Us Shape Next Cohort's Training
              </h2>
            </div>
          </div>

          <button
            id="close-survey-modal-btn"
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="bg-white/80 p-4 rounded-2xl border border-[#E8E3DA] text-xs text-[#121715]/80 space-y-1">
              <p className="font-semibold text-[#0A2E24]">
                🇺🇬 Building practical skills tailored to local business demand
              </p>
              <p className="text-[#121715]/70">
                Your input directly informs the curriculum of upcoming SOMESA youth cohorts in digital media, agribusiness storytelling, and craft marketing.
              </p>
            </div>

            {/* 1. Business Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Business / Organization Name</span>
                  <span className="text-[#121715]/40 font-normal text-[11px]">(optional)</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Masaka Coffee Roasters"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Your Industry</span>
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none cursor-pointer"
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Top Creative Skills Needed */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>What creative skills is your business looking to hire? *</span>
                </span>
                <span className="text-[11px] font-normal text-[#121715]/60">
                  {selectedSkills.length} selected
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const isChecked = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`p-2.5 rounded-xl text-xs text-left font-medium border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isChecked
                          ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                          : 'bg-white text-[#121715]/85 border-[#E8E3DA] hover:border-[#0A2E24]/30 hover:bg-emerald-50/30'
                      }`}
                    >
                      <span className="truncate">{skill}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Timeline & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>When do you plan to hire?</span>
                </label>
                <select
                  value={hiringTimeline}
                  onChange={(e) => setHiringTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none cursor-pointer"
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Estimated Creative Budget</span>
                </label>
                <select
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Specific Suggestions or Gaps */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>What specific challenge or bottleneck do you face with content creation?</span>
                <span className="text-[#121715]/40 font-normal text-[11px]">(optional)</span>
              </label>
              <textarea
                rows={2}
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                placeholder="e.g. Need creators who understand how to shoot natural products without studio lighting, or who can speak Luganda to farmers."
                className="w-full p-3 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
              />
            </div>

            {/* 5. Optional Contact */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your WhatsApp or Email <span className="text-[#121715]/40 font-normal">(if you'd like us to notify you when matching trainees graduate)</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="e.g. +256 700 000000 or business@domain.com"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-xl text-sm focus:outline-none"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-3 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-3">
              {hasValidExternalLink ? (
                <a
                  href={externalFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0A2E24] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open in Google Forms instead</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-[#121715]/50">
                  Takes less than 60 seconds
                </span>
              )}

              <button
                id="submit-cohort-survey-btn"
                type="submit"
                disabled={isSubmitting || selectedSkills.length === 0}
                className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] active:scale-98 rounded-full shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#FF6321]" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Survey Response'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Success Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#0A2E24] text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-display font-extrabold text-2xl text-[#121715]">
                Mwebale Nnyo! Thank you!
              </h3>
              <p className="text-sm text-[#121715]/80 leading-relaxed">
                Your input has been recorded and will guide the upcoming curriculum design. When talented trainees graduate in your requested categories, we'll feature them in the talent hub!
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 text-sm font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow transition-all cursor-pointer"
              >
                Back to SOMESA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
