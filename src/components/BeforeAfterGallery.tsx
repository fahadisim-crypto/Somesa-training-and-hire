import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  TrendingUp, 
  ShoppingBag, 
  Eye, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { Creator } from '../types';

interface TransformationItem {
  id: string;
  category: string;
  businessName: string;
  location: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  creatorName: string;
  creatorRole: string;
  creatorAvatar: string;
  creatorLocation: string;
  toolsUsed: string[];
  beforeImage: string;
  beforeLabel: string;
  beforeFlaw: string;
  afterImage: string;
  afterLabel: string;
  afterHighlight: string;
}

interface BeforeAfterGalleryProps {
  onFindCreator?: () => void;
  onRequestTutor?: () => void;
  onSelectCreatorByName?: (name: string) => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  onFindCreator,
  onRequestTutor,
  onSelectCreatorByName
}) => {
  const transformations: TransformationItem[] = [
    {
      id: 'trans-1',
      category: 'Product Photography & Canva Poster',
      businessName: 'Nabatanzi Boutique & Bags',
      location: 'Kyotera Main Street',
      title: 'Dull Shop Snap ➔ High-Converting WhatsApp Status Flyer',
      summary: 'Turned a dark smartphone photo taken on a shop stool into a crisp, branded price poster with direct WhatsApp ordering.',
      metric: '+140%',
      metricLabel: 'Weekend order inquiries',
      creatorName: 'Aisha Namukasa',
      creatorRole: 'CapCut Video & Canva Specialist',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      creatorLocation: 'Kyotera, Uganda',
      toolsUsed: ['Canva Mobile', 'Smartphone Lighting', 'WhatsApp Business'],
      beforeImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=60',
      beforeLabel: 'Before (Raw Phone Camera)',
      beforeFlaw: 'Dim lighting, cluttered shop background, no price or contact info',
      afterImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',
      afterLabel: 'After (SOMESA Design)',
      afterHighlight: 'Studio-grade natural lighting, clean price tag in UGX, branded order badge'
    },
    {
      id: 'trans-2',
      category: 'Café & Restaurant Menu Branding',
      businessName: 'Masaka Coffee & Bakehouse',
      location: 'Elgin Street, Masaka',
      title: 'Scratched Paper Menu ➔ Viral Instagram & WhatsApp Menu Story',
      summary: 'Redesigned their entire morning breakfast promo into a mouth-watering visual card optimized for mobile screens.',
      metric: '3.2x',
      metricLabel: 'More breakfast combos sold',
      creatorName: 'Mariam Nakanwagi',
      creatorRole: 'Brand Designer & Illustrator',
      creatorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
      creatorLocation: 'Masaka, Uganda',
      toolsUsed: ['Canva Pro', 'Food Photography', 'Luganda Copywriting'],
      beforeImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=60',
      beforeLabel: 'Before (Paper Snapshot)',
      beforeFlaw: 'Hard-to-read handwritten pricing, blurry coffee photo',
      afterImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80',
      afterLabel: 'After (SOMESA Design)',
      afterHighlight: 'Crisp typography, appetizing warm palette, clear MoMo payment icon'
    },
    {
      id: 'trans-3',
      category: 'Smartphone Footwear & Leather Showcase',
      businessName: 'Kalisizo Crafts & Leather',
      location: 'Kalisizo Town, Rakai',
      title: 'Floor Snapshot ➔ Clean E-Commerce Showcase',
      summary: 'Taught the artisan how to use daylight diffusion and a simple cardboard backdrop to make handmade shoes look premium.',
      metric: 'UGX 850k',
      metricLabel: 'New revenue in 10 days',
      creatorName: 'Aisha Namukasa',
      creatorRole: 'Product Visuals Trainer',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      creatorLocation: 'Kyotera, Uganda',
      toolsUsed: ['CapCut', 'Daylight Reflector', 'Catalog Indexing'],
      beforeImage: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=60',
      beforeLabel: 'Before (Floor Photo)',
      beforeFlaw: 'Harsh shadows, tile reflections, looked like casual resale',
      afterImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
      afterLabel: 'After (SOMESA Training)',
      afterHighlight: 'Crisp texture focus, elegant clean backdrop, bespoke craft tag'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const current = transformations[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % transformations.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <section 
      id="before-after-transformations" 
      className="py-16 sm:py-24 bg-[#F5F2ED] border-t border-b border-[#E8E3DA] relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A2E24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24] text-white text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Real Transformations · Ekyukyuuka z'Amaduuka</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#121715] tracking-tight">
              See the direct difference SOMESA skills make for local shops.
            </h2>
            <p className="text-sm sm:text-base text-[#121715]/75 leading-relaxed">
              Drag the interactive slider below to see how our trained creators turn ordinary smartphone photos into high-converting sales assets.
            </p>
          </div>

          {/* Navigation Controls & View Toggle */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex bg-white rounded-full p-1 border border-[#E8E3DA] shadow-2xs text-xs font-bold">
              <button
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                  viewMode === 'slider'
                    ? 'bg-[#0A2E24] text-white shadow-2xs'
                    : 'text-[#121715]/70 hover:text-[#121715]'
                }`}
              >
                Split Slider
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-[#0A2E24] text-white shadow-2xs'
                    : 'text-[#121715]/70 hover:text-[#121715]'
                }`}
              >
                Side by Side
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous case study"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#0A2E24] hover:text-white text-[#121715] border border-[#E8E3DA] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next case study"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#0A2E24] hover:text-white text-[#121715] border border-[#E8E3DA] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Pills for quick selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {transformations.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs scale-102'
                    : 'bg-white text-[#121715]/70 border-[#E8E3DA] hover:border-[#0A2E24]/40 hover:text-[#121715]'
                }`}
              >
                <span>{item.businessName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F5F2ED] text-[#121715]/60'}`}>
                  {item.metric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Visual Stage (Col 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#E8E3DA] shadow-xl">
              
              {viewMode === 'slider' ? (
                /* Interactive Split Slider Mode */
                <div 
                  className="relative w-full h-80 sm:h-96 md:h-108 rounded-2xl overflow-hidden select-none touch-none bg-neutral-900 cursor-ew-resize group"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }}
                  onTouchMove={(e) => {
                    if (!e.touches[0]) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }}
                >
                  {/* AFTER Image (Full Background) */}
                  <img
                    src={current.afterImage}
                    alt={current.afterLabel}
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  />
                  <div className="absolute top-4 right-4 z-10 bg-[#0A2E24]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border border-white/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AFTER: {current.afterLabel}</span>
                  </div>

                  {/* BEFORE Image (Clipped overlay) */}
                  <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={current.beforeImage}
                      alt={current.beforeLabel}
                      className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        minWidth: '100%',
                        filter: 'grayscale(25%) contrast(90%)'
                      }}
                    />
                    <div className="absolute top-4 left-4 z-10 bg-neutral-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border border-white/20">
                      BEFORE: {current.beforeLabel}
                    </div>
                  </div>

                  {/* Vertical Divider Line & Drag Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#0A2E24] text-white border-2 border-white shadow-xl flex items-center justify-center -translate-x-1/2 group-hover:scale-110 transition-transform">
                      <div className="flex items-center gap-0.5 text-xs font-black">
                        <span>◀</span>
                        <span>▶</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Helper Bar */}
                  <div className="absolute bottom-3 inset-x-3 bg-black/65 backdrop-blur-md rounded-xl p-2.5 text-white flex items-center justify-between text-[11px] z-10">
                    <span className="font-medium text-white/80">👈 Slide to compare transformation 👉</span>
                    <span className="font-bold text-[#FF6321]">{sliderPosition.toFixed(0)}% Split</span>
                  </div>
                </div>
              ) : (
                /* Side by Side Mode */
                <div className="grid grid-cols-2 gap-3 h-80 sm:h-96">
                  {/* Before */}
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-900">
                    <img
                      src={current.beforeImage}
                      alt={current.beforeLabel}
                      className="w-full h-full object-cover grayscale-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">Before</span>
                      <p className="text-xs font-semibold leading-tight">{current.beforeFlaw}</p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border-2 border-[#0A2E24]">
                    <img
                      src={current.afterImage}
                      alt={current.afterLabel}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E24]/90 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">After SOMESA</span>
                      <p className="text-xs font-semibold leading-tight">{current.afterHighlight}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Flaw vs Highlight detail tags */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-rose-950">
                  <p className="font-bold text-[11px] text-rose-800 uppercase tracking-wider mb-1">Common Problem:</p>
                  <p className="leading-snug">{current.beforeFlaw}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-950">
                  <p className="font-bold text-[11px] text-emerald-800 uppercase tracking-wider mb-1">SOMESA Difference:</p>
                  <p className="leading-snug">{current.afterHighlight}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Details & Commercial Impact (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business & Category */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A2E24]">
                <span className="bg-[#0A2E24]/10 px-2.5 py-0.5 rounded-full">{current.category}</span>
                <span>•</span>
                <span className="text-[#121715]/60">{current.location}</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121715] leading-tight">
                {current.title}
              </h3>
              <p className="text-sm text-[#121715]/75 leading-relaxed">
                {current.summary}
              </p>
            </div>

            {/* Impact Metric Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#121715]/60 uppercase tracking-wider">Business Impact</p>
                <p className="text-xs text-[#121715]/80 mt-0.5 font-medium">{current.metricLabel}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-black text-3xl text-[#0A2E24] leading-none">
                  {current.metric}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                  <TrendingUp className="w-3 h-3" /> Verified Result
                </span>
              </div>
            </div>

            {/* Creator Attribution */}
            <div className="p-4 rounded-2xl bg-[#0A2E24]/5 border border-[#0A2E24]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={current.creatorAvatar}
                  alt={current.creatorName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <p className="text-xs font-bold text-[#121715]">{current.creatorName}</p>
                  <p className="text-[11px] text-[#0A2E24] font-medium">{current.creatorRole}</p>
                  <p className="text-[10px] text-[#121715]/50">{current.creatorLocation}</p>
                </div>
              </div>

              <button
                onClick={() => onSelectCreatorByName && onSelectCreatorByName(current.creatorName)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#0A2E24] hover:text-white text-xs font-bold text-[#0A2E24] border border-[#E8E3DA] transition-colors cursor-pointer shadow-2xs"
              >
                Hire Talent
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onRequestTutor}
                className="flex-1 py-3.5 px-5 rounded-2xl font-bold text-xs text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#FF6321]" />
                <span>Get This Result For My Shop</span>
              </button>

              <button
                onClick={onFindCreator}
                className="py-3.5 px-5 rounded-2xl font-bold text-xs text-[#0A2E24] bg-white hover:bg-[#F5F2ED] border border-[#E8E3DA] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Browse Creators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
