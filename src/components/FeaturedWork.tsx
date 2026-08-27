import React from 'react';
import { ArrowRight, Eye, ExternalLink } from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface FeaturedWorkProps {
  projects: ProjectCaseStudy[];
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  projects,
  onSelectProject
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F2ED] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full mb-3">
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121715] tracking-tight">
              Work worth seeing
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#121715]/70 max-w-md">
            Real commercial campaigns, product labels, photography, and TikTok series delivered for African businesses.
          </p>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              id={`featured-work-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8E3DA] shadow-xs hover:shadow-lg hover:border-[#D6CFC4] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* 16:9 Aspect ratio cover image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View Case Study
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-3.5 left-3.5 text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#0A2E24] px-2.5 py-1 rounded-full shadow-xs">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  
                  {/* Creator Byline */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <img
                      src={project.creatorAvatar}
                      alt={project.creatorName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-[#121715]/75">
                      {project.creatorName} · {project.creatorLocation}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display font-bold text-lg text-[#121715] group-hover:text-[#0A2E24] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#121715]/70 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Tools / Skills Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F5F2ED] text-[#121715]/70 border border-[#E8E3DA]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom footer bar */}
              <div className="px-5 sm:px-6 py-3.5 bg-[#F5F2ED]/60 border-t border-[#E8E3DA] flex items-center justify-between text-xs font-semibold text-[#0A2E24] group-hover:text-[#FF6321] transition-colors">
                <span>Explore Project Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
