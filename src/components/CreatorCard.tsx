import React, { useState } from 'react';
import { MapPin, CheckCircle2, ArrowUpRight, Sparkles, Send, Info } from 'lucide-react';
import { Creator } from '../types';

interface CreatorCardProps {
  creator: Creator;
  onSelect: (creator: Creator) => void;
  onHire: (creator: Creator) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  onSelect,
  onHire
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      id={`creator-card-${creator.slug}`}
      className="group relative bg-white rounded-2xl p-5 border border-[#E8E3DA] shadow-xs hover:shadow-md hover:border-[#D6CFC4] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Avatar + Availability + Subtle Verification */}
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div 
            onClick={() => onSelect(creator)}
            className="relative cursor-pointer"
          >
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-white shadow-xs group-hover:scale-102 transition-transform"
            />
            {creator.available && (
              <span 
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" 
                title="Available for new client projects"
              />
            )}
          </div>

          {/* Verification badge with subtle tooltip */}
          {creator.trainingBadge && (
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#0A2E24]/8 text-[#0A2E24] border border-[#0A2E24]/15 hover:bg-[#0A2E24]/15 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2E24]" />
                <span>{creator.trainingBadge.label}</span>
                <Info className="w-3 h-3 opacity-60 ml-0.5" />
              </button>

              {showTooltip && (
                <div className="absolute right-0 top-full mt-2 w-56 p-2.5 bg-[#121715] text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug animate-in fade-in zoom-in-95 duration-150">
                  <p className="font-semibold text-emerald-400 mb-0.5">Verified Training</p>
                  <p className="text-white/80">{creator.trainingBadge.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Creator Name & Title */}
        <div 
          onClick={() => onSelect(creator)}
          className="cursor-pointer"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display font-bold text-lg text-[#121715] group-hover:text-[#0A2E24] transition-colors leading-snug">
              {creator.name}
            </h3>
          </div>

          <p className="text-sm font-semibold text-[#0A2E24]/90 mb-1.5">
            {creator.title}
          </p>

          <p className="flex items-center gap-1.5 text-xs text-[#121715]/60 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>{creator.location}</span>
          </p>

          {/* Short quote / Bio snippet */}
          {creator.shortBio && (
            <p className="text-xs text-[#121715]/75 line-clamp-2 leading-relaxed mb-4">
              «{creator.shortBio}»
            </p>
          )}

          {/* Skills Chips (3-4 items) */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {creator.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F5F2ED] text-[#121715]/80 border border-[#E8E3DA] group-hover:border-[#D6CFC4] transition-colors"
              >
                {skill}
              </span>
            ))}
            {creator.skills.length > 4 && (
              <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-[#F5F2ED] text-[#121715]/50">
                +{creator.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions: View Portfolio + Hire */}
      <div className="pt-4 border-t border-[#E8E3DA] grid grid-cols-2 gap-2">
        <button
          id={`view-portfolio-${creator.slug}`}
          onClick={() => onSelect(creator)}
          className="w-full py-2.5 px-3 text-xs font-semibold text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] border border-[#E8E3DA] hover:border-[#D6CFC4] rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View Portfolio</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          id={`hire-btn-${creator.slug}`}
          onClick={() => onHire(creator)}
          className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3 h-3 text-[#FF6321]" />
          <span>Hire</span>
        </button>
      </div>

    </div>
  );
};
