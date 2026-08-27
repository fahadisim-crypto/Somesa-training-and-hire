import React from 'react';
import { Search, Eye, Send, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onFindCreator: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onFindCreator }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#EDE8DF]/60 border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121715] tracking-tight mb-4">
            Find talent in three steps
          </h2>
          <p className="text-sm sm:text-base text-[#121715]/70 leading-relaxed">
            No complex bidding wars or confusing platform fees. Direct, human connection with rising African creators.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          
          {/* Step 01 */}
          <div className="relative bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#0A2E24]/30 tracking-tight">
                  01
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/8 text-[#0A2E24] flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl text-[#121715] mb-2">
                Discover
              </h3>
              <p className="text-sm text-[#121715]/75 leading-relaxed">
                Search creators by skill, service or location. Filter by availability and verified SOMESA training.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-center gap-2 text-xs font-semibold text-[#0A2E24]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Explore curated portfolios</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="relative bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#0A2E24]/30 tracking-tight">
                  02
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/8 text-[#0A2E24] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl text-[#121715] mb-2">
                See their work
              </h3>
              <p className="text-sm text-[#121715]/75 leading-relaxed">
                Explore real projects and understand what each creator can do. Read case studies with client outcomes.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-center gap-2 text-xs font-semibold text-[#0A2E24]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Real deliverables &amp; tools</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="relative bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#0A2E24]/30 tracking-tight">
                  03
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/8 text-[#0A2E24] flex items-center justify-center">
                  <Send className="w-5 h-5 text-[#FF6321]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl text-[#121715] mb-2">
                Hire
              </h3>
              <p className="text-sm text-[#121715]/75 leading-relaxed">
                Send a simple project request directly to the creator. Align on your budget, timeline, and deliverables.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-center gap-2 text-xs font-semibold text-[#0A2E24]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Direct WhatsApp &amp; phone link</span>
            </div>
          </div>

        </div>

        {/* Central Action Button */}
        <div className="text-center">
          <button
            id="how-it-works-find-creator-btn"
            onClick={onFindCreator}
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Find a creator</span>
            <ArrowRight className="w-4 h-4 text-[#FF6321] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
