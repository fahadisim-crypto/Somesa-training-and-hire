import React from 'react';
import { 
  ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Video, Camera, Palette, 
  Smartphone, ShoppingBag, Send, Users, Building2, TrendingUp
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';

interface ForBusinessesProps {
  onFindTalent: () => void;
  onSelectServiceCategory: (category: any) => void;
}

export const ForBusinesses: React.FC<ForBusinessesProps> = ({
  onFindTalent,
  onSelectServiceCategory,
}) => {
  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-24">
      
      {/* Hero */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-[#F5F2ED] via-[#ECE6DC]/60 to-[#F5F2ED] border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs sm:text-sm font-semibold mb-6">
            <Building2 className="w-4 h-4 text-[#FF6321]" />
            <span>For Businesses, Organizations &amp; Brands</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#121715] tracking-tight max-w-3xl mx-auto leading-tight mb-6">
            Your next digital project could{' '}
            <span className="text-[#0A2E24] relative inline-block">
              start here.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#121715]/80 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Connect directly with skilled, energetic African creators trained in practical content creation, branding, photography, video, social media, and e-commerce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onFindTalent}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Find Talent</span>
              <ArrowRight className="w-4 h-4 text-[#FF6321] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Value Props Strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3DA] shadow-xs">
              <p className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider mb-1">Local Native</p>
              <p className="text-xs text-[#121715]/75 leading-relaxed">Creators who truly understand your local market and cultural nuances.</p>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3DA] shadow-xs">
              <p className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider mb-1">Practical Skills</p>
              <p className="text-xs text-[#121715]/75 leading-relaxed">Trained on mobile workflows, CapCut, Canva, and social commerce.</p>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3DA] shadow-xs">
              <p className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider mb-1">Fast Turnaround</p>
              <p className="text-xs text-[#121715]/75 leading-relaxed">Agile delivery within 24 to 72 hours for social posts and reels.</p>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3DA] shadow-xs">
              <p className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider mb-1">Direct Commission</p>
              <p className="text-xs text-[#121715]/75 leading-relaxed">Work directly with creators without hidden agency middlemen.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4-Step Hiring Process for Businesses */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#121715] tracking-tight mb-3">
            How businesses hire on SOMESA
          </h2>
          <p className="text-sm sm:text-base text-[#121715]/70">
            A transparent 4-step path to getting your creative deliverables done.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-display font-black text-2xl text-[#0A2E24]/30 mb-4 block">01</span>
              <h3 className="font-display font-bold text-lg text-[#121715] mb-2">
                1. Tell us what you need
              </h3>
              <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
                Identify your deliverable: short-form video, packaging design, photography, or social media management.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#0A2E24]">
              Clear deliverables
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-display font-black text-2xl text-[#0A2E24]/30 mb-4 block">02</span>
              <h3 className="font-display font-bold text-lg text-[#121715] mb-2">
                2. Discover relevant creators
              </h3>
              <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
                Filter creators by skill, location, and verified training badges to match your project needs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#0A2E24]">
              Curated African talent
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-display font-black text-2xl text-[#0A2E24]/30 mb-4 block">03</span>
              <h3 className="font-display font-bold text-lg text-[#121715] mb-2">
                3. Choose someone whose work fits
              </h3>
              <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
                Browse detailed case studies, previous commercial results, tool proficiency, and turnaround times.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#0A2E24]">
              Transparent portfolios
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-display font-black text-2xl text-[#0A2E24]/30 mb-4 block">04</span>
              <h3 className="font-display font-bold text-lg text-[#121715] mb-2">
                4. Send a project request
              </h3>
              <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
                Submit your project details directly. Connect via WhatsApp or phone call to finalize timeline and delivery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#0A2E24]">
              Direct communication
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid for Businesses */}
      <section className="py-12 bg-white border-y border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121715] tracking-tight mb-2">
              Services businesses commission
            </h2>
            <p className="text-xs sm:text-sm text-[#121715]/70">
              Select a service below to view verified creators specializing in that area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SERVICES_LIST.map((srv) => (
              <button
                key={srv.id}
                onClick={() => onSelectServiceCategory(srv.category)}
                className="bg-[#F5F2ED] p-5 rounded-2xl border border-[#E8E3DA] hover:border-[#0A2E24] hover:bg-white transition-all text-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>
                <p className="font-bold text-sm text-[#121715] group-hover:text-[#0A2E24]">
                  {srv.name}
                </p>
                <p className="text-[10px] text-[#121715]/60 mt-1">
                  {srv.creatorCount} creators
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <div className="bg-[#0A2E24] text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to find the right creator for your project?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Browse our curated roster of emerging Ugandan and African creators.
          </p>
          <button
            onClick={onFindTalent}
            className="px-8 py-4 text-base font-semibold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] rounded-full shadow transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Browse Creators Directory</span>
            <ArrowRight className="w-4 h-4 text-[#FF6321]" />
          </button>
        </div>
      </section>

    </div>
  );
};
