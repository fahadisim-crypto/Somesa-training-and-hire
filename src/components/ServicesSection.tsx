import React from 'react';
import { ArrowRight, Video, Camera, Palette, Smartphone, ShoppingBag, Sparkles } from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';
import { CategoryType } from '../types';

interface ServicesSectionProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectCategory
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F2ED] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full mb-3">
              <span>Service Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121715] tracking-tight">
              What can you get done?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#121715]/70 max-w-md">
            Directly commission emerging creators for practical digital deliverables designed to grow local businesses.
          </p>
        </div>

        {/* Large Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => onSelectCategory(service.category)}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-xs hover:shadow-md hover:border-[#0A2E24]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header Icon + Emoji */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] group-hover:bg-[#0A2E24]/10 group-hover:border-[#0A2E24]/20 transition-colors flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#0A2E24] bg-[#0A2E24]/5 px-3 py-1 rounded-full">
                    {service.creatorCount} Creators
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121715] group-hover:text-[#0A2E24] transition-colors mb-2">
                  {service.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm font-semibold text-[#121715]/80 leading-relaxed mb-3">
                  {service.tagline}
                </p>

                {/* Detailed snippet */}
                <p className="text-xs text-[#121715]/60 leading-relaxed mb-6">
                  {service.details}
                </p>

                {/* Popular deliverables pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.popularFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F5F2ED] text-[#121715]/70 border border-[#E8E3DA]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Explore talent */}
              <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-sm font-semibold text-[#0A2E24] group-hover:text-[#FF6321] transition-colors">
                <span>Explore talent</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
