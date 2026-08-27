import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  User, 
  MapPin, 
  Send, 
  Sparkles, 
  BookOpen, 
  TrendingUp, 
  ShoppingBag,
  Award 
} from 'lucide-react';
import { Course, CourseReview } from '../types';
import confetti from 'canvas-confetti';

interface LeaveCourseReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onSubmitReview: (review: CourseReview) => void;
}

export const LeaveCourseReviewModal: React.FC<LeaveCourseReviewModalProps> = ({
  isOpen,
  onClose,
  course,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const [studentName, setStudentName] = useState('');
  const [studentBusiness, setStudentBusiness] = useState('');
  const [studentLocation, setStudentLocation] = useState('Kyotera, Uganda');
  const [skillApplied, setSkillApplied] = useState('');
  const [outcomeHighlight, setOutcomeHighlight] = useState('');
  const [comment, setComment] = useState('');
  const [commentLuganda, setCommentLuganda] = useState('');
  const [isVerifiedLearner, setIsVerifiedLearner] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!comment.trim() || comment.length < 15) {
      setErrorMessage('Please provide a short review of what you learned (at least 15 characters).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const newReview: CourseReview = {
      id: `c-rev-${course.id}-${Date.now()}`,
      course_id: course.id,
      student_name: studentName.trim(),
      student_role_or_business: studentBusiness.trim() || undefined,
      student_location: studentLocation.trim() || 'Uganda',
      rating,
      comment: comment.trim(),
      comment_luganda: commentLuganda.trim() || undefined,
      skill_applied: skillApplied.trim() || undefined,
      outcome_highlight: outcomeHighlight.trim() || undefined,
      created_at: new Date().toISOString().split('T')[0],
      verified_learner: isVerifiedLearner,
      upvotes: 1
    };

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onSubmitReview(newReview);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5: return '5.0 — Highly Recommended & Practical';
      case 4: return '4.0 — Very Good Course';
      case 3: return '3.0 — Helpful Knowledge';
      case 2: return '2.0 — Needs Improvement';
      default: return '1.0 — Difficult to Follow';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E3DA] overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0A2E24] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <BookOpen className="w-6 h-6 text-[#FF6321]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                Student Course Feedback
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Review: {course.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Star Rating Picker */}
          <div className="bg-[#F5F2ED] rounded-2xl p-5 border border-[#E8E3DA] text-center space-y-2">
            <label className="text-xs font-bold text-[#121715] uppercase tracking-wider block">
              How would you rate this course?
            </label>
            
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      (hoverRating !== null ? hoverRating >= star : rating >= star)
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-neutral-300'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-[#0A2E24] inline-block">
              {getRatingLabel(hoverRating || rating)}
            </span>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your Name <span className="text-[#FF6321]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Grace Namukasa"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your Business or Trade (Optional)
              </label>
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentBusiness}
                  onChange={(e) => setStudentBusiness(e.target.value)}
                  placeholder="e.g. Kyotera Fashion Boutique"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Your Town / Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentLocation}
                  onChange={(e) => setStudentLocation(e.target.value)}
                  placeholder="e.g. Masaka / Kyotera / Kampala"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                Key Skill You Applied (Optional)
              </label>
              <input
                type="text"
                value={skillApplied}
                onChange={(e) => setSkillApplied(e.target.value)}
                placeholder="e.g. Adding split cuts and price badges in CapCut"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
              />
            </div>
          </div>

          {/* Outcome Result */}
          <div>
            <label className="block text-xs font-bold text-[#121715] mb-1.5">
              Result or Outcome in Your Work (Optional)
            </label>
            <div className="relative">
              <TrendingUp className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={outcomeHighlight}
                onChange={(e) => setOutcomeHighlight(e.target.value)}
                placeholder="e.g. Created 5 promo videos &amp; received 3 WhatsApp inquiries on the same day"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
              />
            </div>
          </div>

          {/* Main Review */}
          <div>
            <label className="block text-xs font-bold text-[#121715] mb-1.5">
              Your Review &amp; Experience <span className="text-[#FF6321]">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What was most helpful about this course? How did the Luganda instruction help your understanding?"
              className="w-full p-3.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium leading-relaxed focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
            />
          </div>

          {/* Luganda Note / Translation (Optional) */}
          <div>
            <label className="block text-xs font-bold text-[#121715] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Ondowooza ki mu Luganda? (Optional Luganda note)</span>
            </label>
            <input
              type="text"
              value={commentLuganda}
              onChange={(e) => setCommentLuganda(e.target.value)}
              placeholder="e.g. Okusomesa mu Luganda kwannyambye nnyo okutegeera..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs font-medium focus:ring-2 focus:ring-[#0A2E24] focus:outline-none"
            />
          </div>

          {/* Verified Learner Toggle */}
          <label className="flex items-start gap-3 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isVerifiedLearner}
              onChange={(e) => setIsVerifiedLearner(e.target.checked)}
              className="mt-0.5 rounded text-[#0A2E24] focus:ring-[#0A2E24]"
            />
            <div className="text-xs">
              <span className="font-bold text-[#0A2E24] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified SOMESA Learner
              </span>
              <p className="text-[#121715]/70 text-[11px] mt-0.5">
                Confirming you studied lessons or downloaded resources from this course.
              </p>
            </div>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E8E3DA]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#121715]/70 hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              id="submit-course-review-btn"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>{isSubmitting ? 'Submitting...' : 'Post Student Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
