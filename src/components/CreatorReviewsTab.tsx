import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquarePlus, 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ThumbsUp, 
  Filter,
  Briefcase
} from 'lucide-react';
import { Creator, CreatorReview } from '../types';

interface CreatorReviewsTabProps {
  creator: Creator;
  reviews: CreatorReview[];
  onOpenReviewModal: () => void;
}

export const CreatorReviewsTab: React.FC<CreatorReviewsTabProps> = ({
  creator,
  reviews,
  onOpenReviewModal
}) => {
  const [filter, setFilter] = useState<'all' | '5star' | 'verified'>('all');

  // Compute aggregated scores
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fourStarCount = reviews.filter(r => r.rating === 4).length;
  const threeStarCount = reviews.filter(r => r.rating === 3).length;

  const avgCommunication = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (r.ratingBreakdown?.communication || r.rating), 0) / totalReviews).toFixed(1)
    : '5.0';

  const avgQuality = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (r.ratingBreakdown?.quality || r.rating), 0) / totalReviews).toFixed(1)
    : '5.0';

  const avgSpeed = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (r.ratingBreakdown?.deliverySpeed || r.rating), 0) / totalReviews).toFixed(1)
    : '4.9';

  const filteredReviews = reviews.filter(r => {
    if (filter === '5star') return r.rating === 5;
    if (filter === 'verified') return r.verifiedHire;
    return true;
  });

  return (
    <section className="space-y-6">
      
      {/* Header & Overall Ratings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DA]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E24] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Client Feedback &amp; Ratings
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#121715]">
              Reviews for {creator.name}
            </h2>
          </div>

          <button
            id="open-leave-creator-review-btn"
            onClick={onOpenReviewModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#FF6321]" />
            <span>Leave a Client Review</span>
          </button>
        </div>

        {/* Rating Summary Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Big Score (4 cols) */}
          <div className="md:col-span-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E3DA] text-center space-y-2">
            <span className="font-display font-black text-5xl text-[#0A2E24] tracking-tight block">
              {averageRating}
            </span>
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs font-semibold text-[#121715]/70">
              Based on {totalReviews} verified client reviews
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                100% Recommend Rate
              </span>
            </div>
          </div>

          {/* Sub Criteria Scores (8 cols) */}
          <div className="md:col-span-8 space-y-3.5">
            
            {/* Communication */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#121715] mb-1">
                <span>Clear Communication &amp; Responsiveness</span>
                <span className="text-[#0A2E24] font-bold">{avgCommunication} / 5.0</span>
              </div>
              <div className="w-full bg-[#E8E3DA] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0A2E24] h-full rounded-full transition-all" 
                  style={{ width: `${(parseFloat(avgCommunication) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Quality of Work */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#121715] mb-1">
                <span>Deliverable Quality &amp; Creativity</span>
                <span className="text-[#0A2E24] font-bold">{avgQuality} / 5.0</span>
              </div>
              <div className="w-full bg-[#E8E3DA] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0A2E24] h-full rounded-full transition-all" 
                  style={{ width: `${(parseFloat(avgQuality) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Delivery Speed */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#121715] mb-1">
                <span>Turnaround &amp; On-Time Delivery</span>
                <span className="text-[#0A2E24] font-bold">{avgSpeed} / 5.0</span>
              </div>
              <div className="w-full bg-[#E8E3DA] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0A2E24] h-full rounded-full transition-all" 
                  style={{ width: `${(parseFloat(avgSpeed) / 5) * 100}%` }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-white text-[#121715]/70 hover:text-[#121715] border border-[#E8E3DA]'
            }`}
          >
            All Reviews ({reviews.length})
          </button>

          <button
            onClick={() => setFilter('5star')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === '5star'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-white text-[#121715]/70 hover:text-[#121715] border border-[#E8E3DA]'
            }`}
          >
            5-Star Reviews ({fiveStarCount})
          </button>

          <button
            onClick={() => setFilter('verified')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === 'verified'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-white text-[#121715]/70 hover:text-[#121715] border border-[#E8E3DA]'
            }`}
          >
            Verified Hires Only
          </button>
        </div>

        <span className="text-xs text-[#121715]/60 font-medium">
          Showing {filteredReviews.length} of {reviews.length} client stories
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-xs space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Review Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {rev.clientAvatar ? (
                    <img
                      src={rev.clientAvatar}
                      alt={rev.clientName}
                      className="w-11 h-11 rounded-2xl object-cover border border-[#E8E3DA]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] font-bold text-sm flex items-center justify-center">
                      {rev.clientName.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-display font-bold text-base text-[#121715]">
                        {rev.clientName}
                      </h4>
                      {rev.verifiedHire && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Client Hire
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#121715]/70 flex items-center gap-1.5 flex-wrap">
                      {rev.clientRole && <span>{rev.clientRole}</span>}
                      {rev.clientRole && rev.clientOrganization && <span>•</span>}
                      {rev.clientOrganization && <span className="font-semibold text-[#0A2E24]">{rev.clientOrganization}</span>}
                      {rev.clientLocation && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#FF6321]" />
                            {rev.clientLocation}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-neutral-200'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#121715]/50 font-medium">
                    {rev.createdAt}
                  </span>
                </div>
              </div>

              {/* Service Hired & Outcome Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-[#F5F2ED] text-[#0A2E24] border border-[#E8E3DA]">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Hired for: {rev.serviceHired}</span>
                </span>

                {rev.projectOutcome && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Result: {rev.projectOutcome}</span>
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#121715]/85 leading-relaxed font-normal">
                "{rev.comment}"
              </p>

              {/* Rating Breakdown Badges */}
              {rev.ratingBreakdown && (
                <div className="pt-2 border-t border-[#E8E3DA]/60 flex flex-wrap gap-4 text-[11px] text-[#121715]/60">
                  <span>Communication: <strong className="text-[#0A2E24]">{rev.ratingBreakdown.communication}.0★</strong></span>
                  <span>Quality: <strong className="text-[#0A2E24]">{rev.ratingBreakdown.quality}.0★</strong></span>
                  <span>Speed: <strong className="text-[#0A2E24]">{rev.ratingBreakdown.deliverySpeed}.0★</strong></span>
                </div>
              )}

            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E8E3DA] space-y-3">
            <p className="text-sm font-semibold text-[#121715]">No reviews matching the selected filter.</p>
            <button
              onClick={() => setFilter('all')}
              className="text-xs text-[#0A2E24] font-bold underline"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>

    </section>
  );
};
