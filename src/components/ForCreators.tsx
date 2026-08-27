import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Smartphone, Share2, Eye, ShieldCheck, UserPlus, Globe, Award } from 'lucide-react';
import { Creator } from '../types';

interface ForCreatorsProps {
  onStartOnboarding: () => void;
  onViewExamplePortfolio: () => void;
  sampleCreator?: Creator;
}

export const ForCreators: React.FC<ForCreatorsProps> = ({
  onStartOnboarding,
  onViewExamplePortfolio,
  sampleCreator
}) => {
  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-24">
      
      {/* Hero */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-[#F5F2ED] via-[#ECE6DC]/60 to-[#F5F2ED] border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-[#FF6321]" />
            <span>For Emerging African Digital Creators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#121715] tracking-tight max-w-3xl mx-auto leading-tight mb-6">
            Turn your skills into{' '}
            <span className="text-[#0A2E24] relative inline-block">
              opportunities.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#121715]/80 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Build a professional portfolio, showcase your work and make it easier for clients to discover you.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="for-creators-create-portfolio-btn"
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Create My Portfolio</span>
              <ArrowRight className="w-4 h-4 text-[#FF6321] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="for-creators-see-example-btn"
              onClick={onViewExamplePortfolio}
              className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] border border-[#D8D2C6] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>See an Example Portfolio</span>
            </button>
          </div>

          {/* Creator Brand Statement */}
          <p className="text-xs sm:text-sm text-[#121715]/60 mt-6">
            Something you'll be proud to put on your WhatsApp status, Instagram bio, and CV.
          </p>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#121715] tracking-tight mb-3">
            Why build your profile on SOMESA?
          </h2>
          <p className="text-sm sm:text-base text-[#121715]/70">
            Everything you need to present yourself professionally to real clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Benefit 1 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#0A2E24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715]">
              Build your digital identity
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
              Create a modern, clean web profile highlighting your unique style, bio, and practical tool proficiencies.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <Eye className="w-6 h-6 text-[#0A2E24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715]">
              Showcase real projects
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
              Publish rich case studies with client context, before/after media, tools used, and proven business results.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <Award className="w-6 h-6 text-[#0A2E24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715]">
              List your services &amp; rates
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
              Set clear expectations with transparent turnaround timelines and starting rates for video, photo, or design.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <Share2 className="w-6 h-6 text-[#0A2E24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715]">
              Share one professional link
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
              A clean custom link (<code className="text-[#0A2E24] font-semibold">somesa.africa/yourname</code>) ready for WhatsApp status, Instagram bio, and LinkedIn.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#0A2E24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715]">
              Get discovered by businesses
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
              Appear in regional discovery filters when businesses in Uganda, Kenya, and beyond search for your specific skills.
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8E3DA] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-[#0A2E24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715]">
              Receive direct project requests
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
              Clients submit structured briefs directly to your WhatsApp and phone without complicated middleman portals.
            </p>
          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="py-12 max-w-4xl mx-auto px-4 text-center">
        <div className="bg-[#0A2E24] text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to build your digital portfolio?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            It takes under 3 minutes to publish your first project and share your link.
          </p>
          <button
            onClick={onStartOnboarding}
            className="px-8 py-4 text-base font-semibold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] rounded-full shadow transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Building My Portfolio</span>
            <ArrowRight className="w-4 h-4 text-[#FF6321]" />
          </button>
        </div>
      </section>

    </div>
  );
};
