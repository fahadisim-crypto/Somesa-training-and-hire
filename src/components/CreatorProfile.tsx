import React, { useState, useEffect } from 'react';
import { 
  MapPin, CheckCircle2, ArrowLeft, Send, Share2, Copy, Check, MessageSquare, 
  Instagram, Smartphone, Globe, Briefcase, Award, Sparkles, ExternalLink, Calendar,
  Eye, Clock, Tag, Star, MessageSquarePlus
} from 'lucide-react';
import { Creator, ProjectCaseStudy, CreatorReview } from '../types';
import { INITIAL_CREATOR_REVIEWS } from '../data/testimonialsData';
import { CreatorReviewsTab } from './CreatorReviewsTab';
import { LeaveCreatorReviewModal } from './LeaveCreatorReviewModal';

interface CreatorProfileProps {
  creator: Creator;
  onBack: () => void;
  onHire: (creator: Creator) => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  backLabel?: string;
}

export const CreatorProfile: React.FC<CreatorProfileProps> = ({
  creator,
  onBack,
  onHire,
  onSelectProject,
  backLabel = 'Back'
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'work' | 'services' | 'experience' | 'reviews'>('work');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Persistent Reviews State for Creator
  const storageKey = `somesa_reviews_${creator.id}`;
  const [reviews, setReviews] = useState<CreatorReview[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_CREATOR_REVIEWS[creator.id] || [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (e) {
      // ignore
    }
  }, [reviews, storageKey]);

  const handleAddReview = (newReview: CreatorReview) => {
    setReviews(prev => [newReview, ...prev]);
    setActiveTab('reviews');
  };

  const shareUrl = `${window.location.origin}/creators/${creator.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out ${creator.name}'s creative portfolio on SOMESA: ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-24">
      
      {/* Top Breadcrumb / Back Bar */}
      <div className="bg-white border-b border-[#E8E3DA] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            id="creator-profile-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A2E24] hover:text-[#0F3D30] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F5F2ED] hover:bg-[#E8E3DA] border border-[#E8E3DA] text-[#121715] transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link copied!' : 'Copy profile link'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Creator Hero Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center justify-between">
            
            {/* Left: Avatar & Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover object-top border-4 border-[#F5F2ED] shadow-md"
                />
                {creator.available && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#121715] tracking-tight">
                    {creator.name}
                  </h1>

                  {creator.trainingBadge && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#0A2E24]/10 text-[#0A2E24] px-2.5 py-0.5 rounded-full border border-[#0A2E24]/15">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {creator.trainingBadge.label}
                    </span>
                  )}
                </div>

                <p className="text-lg font-semibold text-[#0A2E24] mb-2">
                  {creator.title}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#121715]/70">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF6321]" />
                    {creator.location}
                  </span>

                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {creator.available ? 'Available for work' : 'Busy on projects'}
                  </span>

                  {creator.metrics && (
                    <span className="hidden sm:inline text-[#121715]/40">•</span>
                  )}
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="hidden sm:inline-flex items-center gap-1 font-medium text-[#121715]/80 hover:text-[#0A2E24] cursor-pointer transition-colors"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : '5.0'}</span>
                    <span className="underline decoration-dotted decoration-[#0A2E24]/30">({reviews.length} client reviews)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Primary Hire Action Button & Leave Review */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5">
              <button
                id="profile-hire-primary-btn"
                onClick={() => onHire(creator)}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#FF6321]" />
                <span>Hire {creator.name.split(' ')[0]}</span>
              </button>

              <button
                id="profile-leave-review-header-btn"
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] border border-[#E8E3DA] rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Leave a Review</span>
              </button>
            </div>

          </div>

          {/* Quick tab switchers */}
          <div className="mt-8 pt-6 border-t border-[#E8E3DA] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              id="creator-tab-work"
              onClick={() => setActiveTab('work')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'work'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'bg-[#F5F2ED] text-[#121715]/80 hover:bg-[#E8E3DA]'
              }`}
            >
              My Work ({creator.projects.length})
            </button>

            <button
              id="creator-tab-services"
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'services'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'bg-[#F5F2ED] text-[#121715]/80 hover:bg-[#E8E3DA]'
              }`}
            >
              Services &amp; Rates ({creator.services.length})
            </button>

            <button
              id="creator-tab-experience"
              onClick={() => setActiveTab('experience')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'bg-[#F5F2ED] text-[#121715]/80 hover:bg-[#E8E3DA]'
              }`}
            >
              Experience &amp; Tools
            </button>

            <button
              id="creator-tab-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'bg-[#F5F2ED] text-[#121715]/80 hover:bg-[#E8E3DA]'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Reviews ({reviews.length})</span>
            </button>
          </div>

        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Area: Portfolio & Case Studies / Services / Experience / Reviews */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tab 4: Reviews Tab */}
            {activeTab === 'reviews' && (
              <CreatorReviewsTab
                creator={creator}
                reviews={reviews}
                onOpenReviewModal={() => setIsReviewModalOpen(true)}
              />
            )}
            
            {/* Tab 1: My Work (Portfolio Grid) */}
            {activeTab === 'work' && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-2xl text-[#121715]">
                    Portfolio Projects
                  </h2>
                  <span className="text-xs text-[#121715]/60 font-medium">
                    Showing real client deliverables
                  </span>
                </div>

                {creator.projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {creator.projects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => onSelectProject(project)}
                        className="group bg-white rounded-3xl overflow-hidden border border-[#E8E3DA] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0A2E24] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                              {project.category}
                            </div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-xs font-semibold text-white bg-black/60 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                Read Case Study
                              </span>
                            </div>
                          </div>

                          <div className="p-5">
                            {project.clientName && (
                              <p className="text-[11px] font-semibold text-[#FF6321] uppercase tracking-wider mb-1">
                                Client: {project.clientName}
                              </p>
                            )}
                            <h3 className="font-display font-bold text-base text-[#121715] group-hover:text-[#0A2E24] transition-colors mb-2">
                              {project.title}
                            </h3>
                            <p className="text-xs text-[#121715]/70 line-clamp-2 leading-relaxed mb-3">
                              {project.summary}
                            </p>

                            <div className="flex flex-wrap gap-1">
                              {project.tools.map((t, idx) => (
                                <span key={idx} className="text-[10px] bg-[#F5F2ED] text-[#121715]/70 px-2 py-0.5 rounded border border-[#E8E3DA]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="px-5 py-3 bg-[#F5F2ED] border-t border-[#E8E3DA] text-xs font-semibold text-[#0A2E24] flex items-center justify-between">
                          <span>View Full Project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 text-center border border-[#E8E3DA]">
                    <p className="text-sm text-[#121715]/70">New projects being added to portfolio shortly.</p>
                  </div>
                )}
              </section>
            )}

            {/* Tab 2: Services & Pricing */}
            {activeTab === 'services' && (
              <section className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display font-bold text-2xl text-[#121715]">
                    Services Offered
                  </h2>
                  <span className="text-xs text-[#121715]/60 font-medium">
                    Clear deliverables &amp; turnaround
                  </span>
                </div>

                <div className="space-y-4">
                  {creator.services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-lg">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#0A2E24]/10 text-[#0A2E24] px-2.5 py-0.5 rounded-full">
                          {srv.category}
                        </span>
                        <h3 className="font-display font-bold text-lg text-[#121715]">
                          {srv.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
                          {srv.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-[#121715]/60 pt-1">
                          {srv.typicalTurnaround && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#0A2E24]" />
                              Turnaround: {srv.typicalTurnaround}
                            </span>
                          )}
                          {srv.startingRate && (
                            <span className="flex items-center gap-1 font-semibold text-[#0A2E24]">
                              <Tag className="w-3.5 h-3.5" />
                              Starting from {srv.startingRate}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onHire(creator)}
                        className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shrink-0 cursor-pointer"
                      >
                        Request This
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tab 3: Experience & Background */}
            {activeTab === 'experience' && (
              <section className="space-y-6">
                <h2 className="font-display font-bold text-2xl text-[#121715]">
                  Experience &amp; Training
                </h2>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
                  {creator.experience.map((exp, idx) => (
                    <div key={idx} className="flex gap-4 pb-6 border-b border-[#E8E3DA] last:border-b-0 last:pb-0">
                      <div className="w-10 h-10 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-[#121715]">{exp.role}</h3>
                          <span className="text-xs font-semibold text-[#0A2E24] bg-[#0A2E24]/10 px-2 py-0.5 rounded-md">
                            {exp.year}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#121715]/80 mb-1">{exp.organization}</p>
                        {exp.description && (
                          <p className="text-xs text-[#121715]/70 leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Right: About, Skills, Tools, Let's work together */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* About Me Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#121715] mb-3">
                About Me
              </h3>
              <p className="text-xs sm:text-sm text-[#121715]/80 leading-relaxed">
                {creator.bio}
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#121715] mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {creator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-xl bg-[#F5F2ED] text-[#121715]/80 border border-[#E8E3DA]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools Mastered */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#121715] mb-3">
                Tools &amp; Tech
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {creator.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-xl bg-[#0A2E24]/5 text-[#0A2E24] border border-[#0A2E24]/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Let's Work Together Card */}
            <div className="bg-[#0A2E24] text-white rounded-3xl p-6 shadow-md space-y-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-1">
                  Let's work together
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Have an upcoming launch, brand campaign, or social project in mind?
                </p>
              </div>

              <button
                onClick={() => onHire(creator)}
                className="w-full py-3.5 px-4 text-sm font-semibold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] rounded-2xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#FF6321]" />
                <span>Request a project</span>
              </button>

              {/* Direct links */}
              {creator.socialLinks && (
                <div className="pt-3 border-t border-white/15 space-y-2 text-xs">
                  {creator.socialLinks.whatsapp && (
                    <div className="flex items-center justify-between text-white/80">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        WhatsApp:
                      </span>
                      <span className="font-mono text-white">{creator.socialLinks.whatsapp}</span>
                    </div>
                  )}
                  {creator.socialLinks.instagram && (
                    <div className="flex items-center justify-between text-white/80">
                      <span className="flex items-center gap-2">
                        <Instagram className="w-3.5 h-3.5 text-rose-300" />
                        Instagram:
                      </span>
                      <span className="text-white">{creator.socialLinks.instagram}</span>
                    </div>
                  )}
                  {creator.socialLinks.tiktok && (
                    <div className="flex items-center justify-between text-white/80">
                      <span className="flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-cyan-300" />
                        TikTok:
                      </span>
                      <span className="text-white">{creator.socialLinks.tiktok}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Leave Review Modal */}
      <LeaveCreatorReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        creator={creator}
        onSubmitReview={handleAddReview}
      />

    </div>
  );
};
