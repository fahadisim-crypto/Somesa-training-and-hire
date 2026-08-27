import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Play, 
  Pause,
  ExternalLink,
  Briefcase,
  Users
} from 'lucide-react';
import { HiringTestimonial, Creator } from '../types';
import { HIRING_TESTIMONIALS } from '../data/testimonialsData';

interface CustomerTestimonialsSliderProps {
  onSelectCreatorBySlug?: (slug: string) => void;
  onHireCreator?: (creator: Partial<Creator>) => void;
  onExploreTalent?: () => void;
}

export const CustomerTestimonialsSlider: React.FC<CustomerTestimonialsSliderProps> = ({
  onSelectCreatorBySlug,
  onHireCreator,
  onExploreTalent
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLuganda, setShowLuganda] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Agribusiness' | 'Retail' | 'Hospitality' | 'Fashion'>('All');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter testimonials by sector if requested
  const filteredTestimonials = HIRING_TESTIMONIALS.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Agribusiness') return item.tags.some(t => t.toLowerCase().includes('agri') || t.toLowerCase().includes('coffee'));
    if (activeFilter === 'Retail') return item.tags.some(t => t.toLowerCase().includes('retail') || t.toLowerCase().includes('packaging') || t.toLowerCase().includes('whatsapp'));
    if (activeFilter === 'Hospitality') return item.tags.some(t => t.toLowerCase().includes('hospitality') || t.toLowerCase().includes('tiktok') || t.toLowerCase().includes('community'));
    if (activeFilter === 'Fashion') return item.tags.some(t => t.toLowerCase().includes('fashion') || t.toLowerCase().includes('photography'));
    return true;
  });

  const activeList = filteredTestimonials.length > 0 ? filteredTestimonials : HIRING_TESTIMONIALS;
  const current = activeList[currentIndex % activeList.length] || HIRING_TESTIMONIALS[0];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && activeList.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % activeList.length);
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeList.length]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % activeList.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + activeList.length) % activeList.length);
  };

  return (
    <section 
      id="customer-testimonials-section" 
      aria-label="Client Testimonials and Talent Hiring Success Stories"
      className="py-16 sm:py-24 bg-[#FAF8F5] border-y border-[#E8E3DA] relative overflow-hidden"
    >
      {/* Decorative Brand Elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#0A2E24]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0A2E24]/10 text-[#0A2E24] border border-[#0A2E24]/15">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Verified Client Outcomes</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900">
                ★ 4.9 Average Rating
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#121715] tracking-tight leading-[1.15]">
              Real businesses hiring <br className="hidden sm:inline" />
              <span className="text-[#0A2E24] underline decoration-[#FF6321] decoration-wavy decoration-2 underline-offset-4">
                SOMESA creators
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#121715]/75 leading-relaxed font-normal">
              See how Ugandan retail stores, coffee cooperatives, cafés, and fashion brands transformed their digital sales with practical local creative talent.
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['All', 'Agribusiness', 'Retail', 'Hospitality', 'Fashion'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#0A2E24] text-white shadow-xs'
                    : 'bg-white text-[#121715]/70 hover:text-[#121715] hover:bg-[#E8E3DA] border border-[#E8E3DA]'
                }`}
              >
                {cat === 'All' ? 'All Stories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN TESTIMONIAL SLIDER CARD                                              */}
        {/* ========================================================================= */}
        <div 
          className="bg-white rounded-3xl sm:rounded-[32px] border border-[#E8E3DA] shadow-xl overflow-hidden transition-all relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Client Quote & Story (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                
                {/* Top Metabar */}
                <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-[#E8E3DA]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#0A2E24] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Client Hire
                    </span>
                  </div>

                  {current.quoteLuganda && (
                    <button
                      onClick={() => setShowLuganda(!showLuganda)}
                      className="text-xs font-bold text-[#0A2E24] hover:text-[#FF6321] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#F5F2ED] px-3 py-1 rounded-full border border-[#E8E3DA]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span>{showLuganda ? 'Read in English' : 'Soma mu Luganda'}</span>
                    </button>
                  )}
                </div>

                {/* Outcome Highlight Metric Banner */}
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-[#F5F2ED] border border-emerald-200/80">
                  <div className="w-8 h-8 rounded-xl bg-[#0A2E24] text-white flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <span className="font-display font-black text-sm text-[#0A2E24] block">
                      {current.outcomeMetric}
                    </span>
                    <span className="text-[11px] text-[#121715]/75 font-medium">
                      {current.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Main Client Quote */}
                <div className="relative">
                  <Quote className="w-10 h-10 text-[#FF6321]/20 absolute -top-4 -left-2 -z-0" />
                  <blockquote className="font-display text-lg sm:text-xl lg:text-2xl text-[#121715] font-semibold leading-relaxed relative z-10">
                    "{showLuganda && current.quoteLuganda ? current.quoteLuganda : current.quote}"
                  </blockquote>
                </div>

                {/* Project Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {current.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F5F2ED] text-[#121715]/70 border border-[#E8E3DA]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Client Profile Footer */}
              <div className="pt-6 border-t border-[#E8E3DA] flex items-center gap-4">
                <img
                  src={current.clientAvatar}
                  alt={current.clientName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                />
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#121715]">
                    {current.clientName}
                  </h4>
                  <p className="text-xs font-semibold text-[#0A2E24] flex items-center gap-1.5">
                    <span>{current.clientTitle}</span>
                    <span>•</span>
                    <span className="text-[#121715]/80">{current.clientCompany}</span>
                  </p>
                  <p className="text-[11px] text-[#121715]/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#FF6321]" />
                    <span>{current.clientLocation}</span>
                    <span>•</span>
                    <span>Hired in {current.completedDate}</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Talent Spotlight & Direct Actions (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0A2E24] to-[#0F3D30] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider uppercase text-emerald-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#FF6321]" />
                    <span>Talent Delivered By</span>
                  </span>
                  <span className="text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-full text-white/90 border border-white/15">
                    SOMESA Graduate
                  </span>
                </div>

                {/* Creator Card */}
                <div 
                  onClick={() => onSelectCreatorBySlug && onSelectCreatorBySlug(current.creatorSlug)}
                  className="bg-white/10 hover:bg-white/15 transition-all p-5 rounded-2xl border border-white/15 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={current.creatorAvatar}
                        alt={current.creatorName}
                        className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white/20 shadow-md group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0A2E24]" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                        <span>{current.creatorName}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      </h4>
                      <p className="text-xs font-medium text-emerald-200 mb-1">
                        {current.creatorRole}
                      </p>
                      <span className="text-[11px] text-white/70 block">
                        Service: {current.serviceProvided}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Specs Box */}
                <div className="space-y-2 bg-black/20 rounded-2xl p-4 border border-white/10 text-xs">
                  <div className="flex justify-between text-white/80 pb-2 border-b border-white/10">
                    <span className="text-white/60">Project Title:</span>
                    <span className="font-semibold text-white text-right max-w-[200px] truncate">{current.projectTitle}</span>
                  </div>
                  <div className="flex justify-between text-white/80 pb-2 border-b border-white/10">
                    <span className="text-white/60">Organization Type:</span>
                    <span className="font-semibold text-white">{current.clientCompanyType}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span className="text-white/60">Hire Verification:</span>
                    <span className="font-semibold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed via SOMESA
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  id="testimonial-hire-talent-btn"
                  onClick={() => {
                    if (onHireCreator) {
                      onHireCreator({
                        id: current.creatorId,
                        name: current.creatorName,
                        title: current.creatorRole,
                        slug: current.creatorSlug,
                        avatar: current.creatorAvatar
                      });
                    } else if (onSelectCreatorBySlug) {
                      onSelectCreatorBySlug(current.creatorSlug);
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-white text-[#0A2E24] hover:bg-emerald-50 hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Briefcase className="w-4 h-4 text-[#FF6321]" />
                  <span>Hire {current.creatorName.split(' ')[0]} For Your Business</span>
                </button>

                <button
                  onClick={() => onSelectCreatorBySlug && onSelectCreatorBySlug(current.creatorSlug)}
                  className="w-full py-2.5 px-4 rounded-full font-semibold text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Full Portfolio &amp; Reviews →</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLIDER CONTROLS & THUMBNAIL TRACKER                                       */}
        {/* ========================================================================= */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Slide Indicator Dots & Play/Pause */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
              className="w-8 h-8 rounded-full bg-white border border-[#E8E3DA] text-[#0A2E24] hover:bg-[#E8E3DA] transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <div className="flex items-center gap-1.5">
              {activeList.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#0A2E24]'
                      : 'w-2 bg-[#E8E3DA] hover:bg-[#0A2E24]/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <span className="text-xs text-[#121715]/60 font-semibold pl-2">
              Story {currentIndex + 1} of {activeList.length}
            </span>
          </div>

          {/* Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white border border-[#E8E3DA] text-[#0A2E24] hover:bg-[#0A2E24] hover:text-white hover:border-[#0A2E24] transition-all flex items-center justify-center cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white border border-[#E8E3DA] text-[#0A2E24] hover:bg-[#0A2E24] hover:text-white hover:border-[#0A2E24] transition-all flex items-center justify-center cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {onExploreTalent && (
              <button
                onClick={onExploreTalent}
                className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#E8E3DA] transition-colors cursor-pointer shadow-xs"
              >
                <Users className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Browse All Creators</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
