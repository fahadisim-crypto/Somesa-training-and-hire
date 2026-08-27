import React from 'react';
import { X, CheckCircle2, ArrowRight, MapPin, Send, ExternalLink, Wrench, Sparkles, Trophy } from 'lucide-react';
import { ProjectCaseStudy, Creator } from '../types';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onHireCreator: (creatorId: string) => void;
  onViewCreatorProfile?: (creatorId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onHireCreator,
  onViewCreatorProfile
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#F5F2ED] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E3DA] max-h-[92vh] flex flex-col">
        
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E3DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#0A2E24]/10 text-[#0A2E24] px-3 py-1 rounded-full">
              {project.category} Case Study
            </span>
            {project.clientName && (
              <span className="text-xs font-medium text-[#121715]/60 hidden sm:inline">
                Client: {project.clientName}
              </span>
            )}
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#121715]/60 hover:text-[#121715] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Media */}
          <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/9] bg-neutral-900">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Title & Creator Attribution Bar */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#121715] tracking-tight">
              {project.title}
            </h2>

            {/* Creator Attribution Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={project.creatorAvatar}
                  alt={project.creatorName}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-bold text-sm text-[#121715]">{project.creatorName}</p>
                  <p className="text-xs font-semibold text-[#0A2E24]">{project.creatorRole}</p>
                  <p className="text-[11px] text-[#121715]/60 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF6321]" />
                    {project.creatorLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onViewCreatorProfile && (
                  <button
                    onClick={() => {
                      onClose();
                      onViewCreatorProfile(project.creatorId);
                    }}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] rounded-xl border border-[#E8E3DA] transition-colors cursor-pointer"
                  >
                    View Full Profile
                  </button>
                )}

                <button
                  onClick={() => onHireCreator(project.creatorId)}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Hire {project.creatorName.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>

          {/* The Project Overview */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] space-y-3">
            <h3 className="font-display font-bold text-lg text-[#121715]">
              The Project
            </h3>
            <p className="text-sm sm:text-base text-[#121715]/80 font-editorial italic leading-relaxed">
              «{project.summary}»
            </p>
          </div>

          {/* 2-Column Details: What I Did & Tools Used */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* What I did */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] space-y-4">
              <h3 className="font-display font-bold text-base text-[#121715] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What I Did</span>
              </h3>
              <ul className="space-y-2.5">
                {project.whatIDid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#121715]/80 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A2E24] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] space-y-4">
              <h3 className="font-display font-bold text-base text-[#121715] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#0A2E24]" />
                <span>Tools &amp; Hardware</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#0A2E24]/5 text-[#0A2E24] border border-[#0A2E24]/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Outcome & Impact */}
          <div className="bg-[#0A2E24] text-white rounded-2xl p-6 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-[#FF6321]" />
              <span>Project Outcome &amp; Value</span>
            </div>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
              «{project.outcome}»
            </p>
          </div>

          {/* Additional Gallery images if available */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-[#121715] uppercase tracking-wider">
                Project Gallery
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {project.galleryImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${project.title} asset ${idx + 1}`}
                    className="w-full h-44 object-cover rounded-2xl border border-[#E8E3DA]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Card */}
          <div className="p-6 bg-white rounded-2xl border border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-base text-[#121715]">
                Want similar results for your business?
              </h4>
              <p className="text-xs text-[#121715]/60">
                Work directly with {project.creatorName} on your next release or campaign.
              </p>
            </div>

            <button
              onClick={() => onHireCreator(project.creatorId)}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Hire {project.creatorName.split(' ')[0]} for a similar project</span>
              <ArrowRight className="w-4 h-4 text-[#FF6321]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
