import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquarePlus, 
  MapPin, 
  ShoppingBag, 
  TrendingUp, 
  Sparkles, 
  ThumbsUp, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Volume2 
} from 'lucide-react';
import { Course, CourseReview } from '../types';

interface CourseReviewsTabProps {
  course: Course;
  reviews: CourseReview[];
  onOpenReviewModal: () => void;
}

export const CourseReviewsTab: React.FC<CourseReviewsTabProps> = ({
  course,
  reviews,
  onOpenReviewModal
}) => {
  const [filter, setFilter] = useState<'all' | '5star' | 'luganda'>('all');
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const toggleUpvote = (id: string) => {
    setUpvotedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : course.rating.toFixed(1);

  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const lugandaCount = reviews.filter(r => Boolean(r.comment_luganda)).length;

  const filteredReviews = reviews.filter(r => {
    if (filter === '5star') return r.rating === 5;
    if (filter === 'luganda') return Boolean(r.comment_luganda);
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Overview & Rating Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DA]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E24] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Student Testimonials &amp; Practical Outcomes
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#121715]">
              Student Reviews &amp; Success Stories
            </h2>
            <p className="text-xs text-[#121715]/70 mt-1">
              See what entrepreneurs and creators are creating after learning {course.title}.
            </p>
          </div>

          <button
            id="open-leave-course-review-btn"
            onClick={onOpenReviewModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#FF6321]" />
            <span>Write a Course Review</span>
          </button>
        </div>

        {/* Aggregate Ratings Grid */}
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
              Course Score • {totalReviews} Student Reviews
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                99% Practical Application Rate
              </span>
            </div>
          </div>

          {/* Highlights (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A2E24]">
                <Volume2 className="w-4 h-4 text-[#FF6321]" />
                <span>Luganda Instruction</span>
              </div>
              <p className="text-[11px] text-[#121715]/75">
                Students praise the conversational Luganda dialect for making tech skills instantly actionable.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A2E24]">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Immediate ROI</span>
              </div>
              <p className="text-[11px] text-[#121715]/75">
                Over 85% of reviewing learners applied lessons to their businesses within 48 hours.
              </p>
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
            All Student Reviews ({reviews.length})
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
            onClick={() => setFilter('luganda')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === 'luganda'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-white text-[#121715]/70 hover:text-[#121715] border border-[#E8E3DA]'
            }`}
          >
            Luganda Notes ({lugandaCount})
          </button>
        </div>

        <span className="text-xs text-[#121715]/60 font-medium">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => {
            const hasUpvoted = !!upvotedIds[rev.id];
            const upvoteCount = (rev.upvotes || 0) + (hasUpvoted ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {rev.student_avatar ? (
                      <img
                        src={rev.student_avatar}
                        alt={rev.student_name}
                        className="w-11 h-11 rounded-2xl object-cover border border-[#E8E3DA]"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-[#0A2E24]/10 text-[#0A2E24] font-bold text-sm flex items-center justify-center">
                        {rev.student_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-display font-bold text-base text-[#121715]">
                          {rev.student_name}
                        </h4>
                        {rev.verified_learner && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Learner
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#121715]/70 flex items-center gap-1.5 flex-wrap">
                        {rev.student_role_or_business && (
                          <span className="font-semibold text-[#0A2E24] flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3 text-[#FF6321]" />
                            {rev.student_role_or_business}
                          </span>
                        )}
                        {rev.student_role_or_business && rev.student_location && <span>•</span>}
                        {rev.student_location && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#FF6321]" />
                            {rev.student_location}
                          </span>
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
                      {rev.created_at}
                    </span>
                  </div>
                </div>

                {/* Skill & Outcome Highlights */}
                {(rev.skill_applied || rev.outcome_highlight) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {rev.skill_applied && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-[#F5F2ED] text-[#0A2E24] border border-[#E8E3DA]">
                        <BookOpen className="w-3.5 h-3.5 text-[#FF6321]" />
                        <span>Skill: {rev.skill_applied}</span>
                      </span>
                    )}

                    {rev.outcome_highlight && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Outcome: {rev.outcome_highlight}</span>
                      </span>
                    )}
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#121715]/85 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>

                {/* Luganda Sub-card if available */}
                {rev.comment_luganda && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-[#121715] flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#FF6321] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0A2E24] block mb-0.5 text-[11px] uppercase tracking-wider">
                        Ebigambo by'Omuyizi (Luganda Note):
                      </span>
                      <p className="italic text-[#121715]/90">
                        "{rev.comment_luganda}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Footer with Upvote */}
                <div className="pt-2 border-t border-[#E8E3DA]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#121715]/50">
                    Was this review helpful?
                  </span>

                  <button
                    onClick={() => toggleUpvote(rev.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      hasUpvoted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                        : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA] border border-[#E8E3DA]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'text-emerald-700 fill-current' : 'text-neutral-500'}`} />
                    <span>Helpful ({upvoteCount})</span>
                  </button>
                </div>

              </div>
            );
          })
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

    </div>
  );
};
