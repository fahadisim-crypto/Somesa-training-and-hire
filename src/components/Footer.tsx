import React from 'react';
import { Sparkles, ShieldCheck, Heart, ArrowUpRight, Globe, Send, UserPlus, BookOpen, MapPin, GraduationCap } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  onJoinCreator: () => void;
  onFindTalent: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveView,
  onJoinCreator,
  onFindTalent
}) => {
  return (
    <footer className="bg-[#0A2E24] text-[#F5F2ED] pt-16 pb-24 lg:pb-16 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display font-extrabold text-3xl tracking-tight text-white">
                SOMESA
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full">
                Talent &amp; Academy
              </span>
            </div>

            <p className="font-display font-bold text-lg text-emerald-200">
              Soma &amp; Somesa · Skills. Work. Opportunity.
            </p>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Discover emerging digital talent, master practical skills in Luganda, and request in-person tutor dispatch for your shop or business.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>A <strong>SOMESA</strong> platform connecting skills with opportunity.</span>
            </div>
          </div>

          {/* Col 2: Soma & Somesa (Learning & Tutors) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Soma (Luganda Academy)</span>
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveView('learn');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Luganda Video Courses</span>
                  <span className="text-[9px] bg-[#FF6321] text-white px-1.5 py-0.2 rounded font-bold">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('tutor-request');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Send a Tutor to My Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('teach');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Teach on SOMESA (Creator Authoring)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Businesses & Talent */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Talent &amp; Services
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveView('creators');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Discover Creators
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Services &amp; Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('for-businesses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  For Businesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('admin-stats');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Operations Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: African Presence & Expansion */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              African Footprint
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Launching with young women in Masaka &amp; Kyotera, Uganda, and scaling across Kampala, Jinja, Gulu, and East Africa.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15">
                🇺🇬 Uganda (Live)
              </span>
              <span className="text-[11px] bg-white/5 text-white/60 px-2.5 py-1 rounded-full border border-white/10">
                🇰🇪 Kenya (Upcoming)
              </span>
              <span className="text-[11px] bg-white/5 text-white/60 px-2.5 py-1 rounded-full border border-white/10">
                🇷🇼 Rwanda
              </span>
              <span className="text-[11px] bg-white/5 text-white/60 px-2.5 py-1 rounded-full border border-white/10">
                🇹🇿 Tanzania
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 SOMESA. Soma &amp; Somesa · Skills. Work. Opportunity. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for African digital creators and forward-thinking local businesses.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
