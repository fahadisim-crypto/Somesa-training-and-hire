import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, MapPin, Video, Award, Star } from 'lucide-react';
import { Creator } from '../types';

interface FeaturedCreatorProps {
  creator: Creator;
  onSelectCreator: (creator: Creator) => void;
  onHireCreator: (creator: Creator) => void;
}

export const FeaturedCreator: React.FC<FeaturedCreatorProps> = ({
  creator,
  onSelectCreator,
  onHireCreator
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Container Card */}
        <div className="relative rounded-3xl bg-[#0A2E24] text-white overflow-hidden shadow-2xl border border-white/10">
          
          {/* Subtle decorative background patterns */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6321]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12 relative z-10">
            
            {/* Left: Large Portrait with modern editorial framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/5] bg-neutral-800">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                        {creator.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/90 text-white px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white text-[#121715] p-3 rounded-2xl shadow-xl border border-[#E8E3DA] hidden sm:flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E24] text-white flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Featured Creator</p>
                    <p className="text-[10px] text-[#121715]/60">SOMESA Spotlight</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Story & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wide uppercase border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Creator Spotlight</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                  Meet {creator.name.split(' ')[0]}
                </h2>
                <p className="text-lg sm:text-xl font-medium text-emerald-200">
                  {creator.title}
                </p>
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-white/90 italic font-editorial leading-relaxed border-l-2 border-[#FF6321] pl-4 my-4">
                «{creator.shortBio || creator.bio}»
              </blockquote>

              {/* Verified Capabilities Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Video production</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Smartphone photography</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Social media content</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CapCut &amp; Canva editing</span>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 border-y border-white/15">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">6</p>
                  <p className="text-xs text-white/70 font-medium">Delivered Projects</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">12</p>
                  <p className="text-xs text-white/70 font-medium">Direct Clients</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-base sm:text-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Available
                  </div>
                  <p className="text-xs text-white/70 font-medium">Ready for work</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  id="featured-view-portfolio-btn"
                  onClick={() => onSelectCreator(creator)}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#0A2E24] bg-[#F5F2ED] hover:bg-white active:scale-98 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View {creator.name.split(' ')[0]}'s Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6321]" />
                </button>

                <button
                  id="featured-hire-btn"
                  onClick={() => onHireCreator(creator)}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-[#FF6321] hover:bg-[#E55416] active:scale-98 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Hire {creator.name.split(' ')[0]} Directly</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
