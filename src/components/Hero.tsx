import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Play, Users, Briefcase } from 'lucide-react';
import { Creator } from '../types';

interface HeroProps {
  onFindTalent: () => void;
  onJoinCreator: () => void;
  onSelectCreator: (creator: Creator) => void;
  featuredCreator?: Creator;
}

export const Hero: React.FC<HeroProps> = ({
  onFindTalent,
  onJoinCreator,
  onSelectCreator,
  featuredCreator,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#F5F2ED] via-[#ECE6DC]/60 to-[#F5F2ED]">
      
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0A2E24]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-[#FF6321]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24]/10 border border-[#0A2E24]/15 text-[#0A2E24] text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping" />
              <span>Skills. Work. Opportunity.</span>
              <span className="text-[#0A2E24]/40 font-normal">|</span>
              <span className="text-[#0A2E24]/80 font-medium">Uganda &amp; East Africa</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#121715] tracking-tight leading-[1.12]">
              Find the people who can bring your{' '}
              <span className="text-[#0A2E24] italic relative inline-block font-editorial">
                next idea to life.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF6321]/60 fill-none stroke-current stroke-[3]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 12" />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#121715]/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover emerging digital talent in Uganda and across Africa — from video creators and designers to photographers, marketers and e-commerce specialists.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-find-talent-btn"
                onClick={onFindTalent}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] active:scale-[0.99] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Find Talent</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FF6321]" />
              </button>

              <button
                id="hero-join-creator-btn"
                onClick={onJoinCreator}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#D6CFC4] rounded-full shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join as a Creator</span>
              </button>
            </div>

            {/* Trust Statement */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm text-[#121715]/70">
              <ShieldCheck className="w-4 h-4 text-[#0A2E24]" />
              <span>A <strong>SOMESA</strong> platform connecting verified skills with direct market opportunity.</span>
            </div>

            {/* Quick stats banner for credibility */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 border-t border-[#E8E3DA]">
              <div className="text-left">
                <p className="text-2xl font-bold text-[#0A2E24]">100%</p>
                <p className="text-xs text-[#121715]/70 font-medium">Direct Creator Hire</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-[#0A2E24]">24-48h</p>
                <p className="text-xs text-[#121715]/70 font-medium">Average Response</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-[#0A2E24]">Zero</p>
                <p className="text-xs text-[#121715]/70 font-medium">Intermediary Fees</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Editorial Collage of Real African Creators */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Composition Container */}
              <div className="p-3 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8E3DA] shadow-xl space-y-3.5">
                
                {/* Clean Top Status Bar */}
                <div className="flex items-center justify-between px-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A2E24] text-white text-xs font-semibold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open for Client Requests</span>
                  </div>
                  
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0A2E24] bg-[#0A2E24]/10 px-2.5 py-1 rounded-full border border-[#0A2E24]/15">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2E24]" />
                    <span>SOMESA Verified</span>
                  </div>
                </div>

                {/* Grid of Creators and Work */}
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                  
                  {/* Creator card 1: Aisha with smartphone & video tag */}
                  <div 
                    className="relative group rounded-2xl overflow-hidden shadow-sm bg-neutral-900 cursor-pointer"
                    onClick={() => featuredCreator && onSelectCreator(featuredCreator)}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                      alt="Aisha Namukasa - Digital Content Creator"
                      className="w-full h-44 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-[#FF6321] px-2 py-0.5 rounded-full w-max mb-1">
                        <Play className="w-2.5 h-2.5 fill-current" /> Video &amp; Reels
                      </span>
                      <p className="font-bold text-sm leading-tight">Aisha N.</p>
                      <p className="text-[11px] text-white/80">Kyotera, Uganda</p>
                    </div>
                  </div>

                  {/* Creator card 2: Design & Branding Work */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-sm bg-neutral-900">
                    <img
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80"
                      alt="Mariam Nakanwagi - Graphic & Brand Designer"
                      className="w-full h-44 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-[#0A2E24] px-2 py-0.5 rounded-full w-max mb-1">
                        🎨 Brand Design
                      </span>
                      <p className="font-bold text-sm leading-tight">Mariam N.</p>
                      <p className="text-[11px] text-white/80">Masaka, Uganda</p>
                    </div>
                  </div>

                  {/* Bottom Row Wide Showcase */}
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-sm bg-neutral-900">
                    <img
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                      alt="Real client project: Specialty Coffee Branding"
                      className="w-full h-30 sm:h-34 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end justify-between p-3 text-white">
                      <div>
                        <p className="text-[10px] font-semibold text-[#F5F2ED]/80 uppercase tracking-wider">Client Project</p>
                        <p className="font-bold text-sm">Coffee Mulondo Campaign</p>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#F5F2ED] bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6321]" />
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Clean Bottom Trust Footer */}
                <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#121715]/75">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0A2E24]" />
                    <span className="font-medium text-[11px] sm:text-xs">Assessed practical skills &amp; portfolios</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0A2E24] bg-[#0A2E24]/5 px-2 py-0.5 rounded-full">
                    Direct Hire
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
