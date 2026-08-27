import React from 'react';
import { ClipboardList, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface CohortSurveyBannerProps {
  onOpenSurvey?: () => void;
  formUrl?: string;
  className?: string;
}

export const CohortSurveyBanner: React.FC<CohortSurveyBannerProps> = ({
  onOpenSurvey,
  formUrl,
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onOpenSurvey) {
      e.preventDefault();
      onOpenSurvey();
    } else if (formUrl && formUrl.startsWith('http')) {
      // allow default link behavior
    } else {
      e.preventDefault();
    }
  };

  return (
    <section 
      id="somesa-cohort-survey-banner"
      aria-label="Market Research Survey"
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2E24] via-[#0F3D30] to-[#0A2E24] text-white p-6 sm:p-8 lg:p-10 border border-emerald-800/50 shadow-xl ${className}`}
    >
      {/* Subtle Background Aesthetic Patterns */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Content Area */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-emerald-300 border border-white/15">
              <ClipboardList className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>SOMESA Market Research</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-200 border border-emerald-500/20">
              <Clock className="w-3 h-3 text-[#FF6321]" />
              <span>1 Min Quick Survey</span>
            </span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
            Help us shape the next SOMESA cohort
          </h3>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            Tell us what skills or industries your organization is looking to hire.
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="w-full sm:w-auto shrink-0 pt-2 lg:pt-0">
          <button
            id="take-survey-google-form-btn"
            type="button"
            onClick={handleClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-[#0A2E24] bg-white hover:bg-emerald-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md group"
          >
            <ClipboardList className="w-4 h-4 text-[#FF6321]" />
            <span>Take 1-Minute Survey</span>
            <ArrowRight className="w-4 h-4 text-[#0A2E24] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

