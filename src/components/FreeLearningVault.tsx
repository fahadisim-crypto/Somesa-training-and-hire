import React, { useState } from 'react';
import { 
  Gift, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Unlock, 
  BookOpen, 
  Clock, 
  Video, 
  Layers, 
  Volume2, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import { FreeLearningPack } from '../types';
import { INITIAL_FREE_LEARNING_PACKS } from '../data/freeLearningPacks';

interface FreeLearningVaultProps {
  onSelectCourseCategory?: (category: string) => void;
  onRequestTutor?: () => void;
}

export const FreeLearningVault: React.FC<FreeLearningVaultProps> = ({
  onSelectCourseCategory,
  onRequestTutor
}) => {
  const [packs, setPacks] = useState<FreeLearningPack[]>(INITIAL_FREE_LEARNING_PACKS);
  const [selectedPack, setSelectedPack] = useState<FreeLearningPack>(INITIAL_FREE_LEARNING_PACKS[0]);
  const [activeVideoModal, setActiveVideoModal] = useState<FreeLearningPack | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [completedPackIds, setCompletedPackIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('somesa_completed_free_packs');
    return saved ? JSON.parse(saved) : [];
  });

  const categories = [
    { label: 'All Free Packs (6)', value: 'All' },
    { label: 'Starter Kit', value: 'Free Starter Kit' },
    { label: 'Artisan Crafts & Soaps', value: 'Artisan Crafts & Soaps' },
    { label: 'Coffee & Farm Agri', value: 'Agribusiness & Farm Management' },
    { label: 'AI & Digital Tools', value: 'AI & Digital Tools' }
  ];

  const filteredPacks = filterCategory === 'All' 
    ? packs 
    : packs.filter(p => p.category === filterCategory);

  const toggleComplete = (packId: string) => {
    let updated: string[];
    if (completedPackIds.includes(packId)) {
      updated = completedPackIds.filter(id => id !== packId);
    } else {
      updated = [...completedPackIds, packId];
    }
    setCompletedPackIds(updated);
    localStorage.setItem('somesa_completed_free_packs', JSON.stringify(updated));
  };

  const totalLessons = packs.reduce((acc, p) => acc + p.lessonsCount, 0);
  const totalMinutes = packs.reduce((acc, p) => acc + p.durationMinutes, 0);
  const progressPct = Math.round((completedPackIds.length / packs.length) * 100);

  return (
    <div 
      id="free-learning-vault-section"
      className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xl space-y-8 relative overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E8E3DA] pb-8 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Gift className="w-3.5 h-3.5 text-emerald-700" />
            <span>Free Student Account Perks · Eby’Obwereere</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121715] tracking-tight">
            Free Starter Training Library for Every Member.
          </h3>
          <p className="text-xs sm:text-sm text-[#121715]/70 max-w-2xl leading-relaxed">
            Every student account unlocks immediate access to practical video starter packs across digital storytelling, physical craftsmanship, and agribusiness skills — with full Luganda voiceovers.
          </p>
        </div>

        {/* Member Progress Metric Card */}
        <div className="bg-[#F5F2ED] p-4 sm:p-5 rounded-2xl border border-[#E8E3DA] flex flex-col sm:flex-row items-center gap-4 shrink-0 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#0A2E24] text-white flex flex-col items-center justify-center shrink-0 shadow-inner">
            <span className="font-display font-black text-lg text-emerald-400">{completedPackIds.length}/{packs.length}</span>
            <span className="text-[9px] uppercase font-bold text-white/70">Packs</span>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#0A2E24]">Starter Progress: {progressPct}%</span>
              <span className="text-[10px] bg-emerald-600/15 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                100% Free
              </span>
            </div>
            <div className="w-48 h-2 bg-[#E8E3DA] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-[#FF6321] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[11px] text-[#121715]/60 font-medium">
              {totalLessons} lessons ({totalMinutes} mins) unlocked inside your profile
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilterCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterCategory === cat.value
                ? 'bg-[#0A2E24] text-white shadow-md'
                : 'bg-[#F5F2ED] text-[#121715]/75 hover:bg-[#E8E3DA] hover:text-[#0A2E24]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: 6 Free Starter Packs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPacks.map((pack) => {
          const isCompleted = completedPackIds.includes(pack.id);
          const isSelected = selectedPack.id === pack.id;

          return (
            <div
              key={pack.id}
              onClick={() => setSelectedPack(pack)}
              className={`rounded-3xl border-2 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md ${
                isSelected
                  ? 'border-[#0A2E24] ring-2 ring-[#0A2E24]/20'
                  : 'border-[#E8E3DA] hover:border-[#0A2E24]/30'
              }`}
            >
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                <img
                  src={pack.thumbnailUrl}
                  alt={pack.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Free Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                  <Unlock className="w-3 h-3" />
                  <span>Free Instant Access</span>
                </div>

                {/* Duration & Lessons Count */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-[#FF6321]" />
                    {pack.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <Video className="w-3 h-3 text-emerald-400" />
                    {pack.lessonsCount} lessons
                  </span>
                </div>

                {/* Play Button Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoModal(pack);
                  }}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#FF6321] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  title="Watch Free Lesson"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
              </div>

              {/* Pack Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#FF6321] uppercase tracking-wider">
                      {pack.category}
                    </span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-base text-[#121715] group-hover:text-[#0A2E24] transition-colors leading-snug">
                    {pack.title}
                  </h4>

                  <p className="text-xs text-[#0A2E24] font-semibold italic">
                    «{pack.titleLuganda}»
                  </p>

                  <p className="text-xs text-[#121715]/70 line-clamp-2 leading-relaxed">
                    {pack.description}
                  </p>
                </div>

                {/* Instructor Snippet */}
                <div className="pt-3 border-t border-[#E8E3DA]/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={pack.instructorAvatar} 
                      alt={pack.instructorName} 
                      className="w-8 h-8 rounded-full object-cover border border-[#E8E3DA]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[11px]">
                      <p className="font-bold text-[#121715] leading-tight">{pack.instructorName}</p>
                      <p className="text-[#121715]/60 text-[10px] truncate max-w-[140px]">{pack.instructorRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(pack.id);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold' 
                        : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                    }`}
                    title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-700' : 'text-[#121715]/40'}`} />
                  </button>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="bg-[#F5F2ED]/70 px-5 py-3 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0A2E24] flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-[#FF6321]" /> Luganda Audio Included
                </span>
                <button
                  onClick={() => setActiveVideoModal(pack)}
                  className="font-bold text-[#FF6321] hover:text-[#E5571B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Watch Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Free Lesson Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8E3DA] space-y-0">
            {/* Modal Top Bar */}
            <div className="bg-[#0A2E24] text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Free Member Lesson · {activeVideoModal.category}
                  </span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white">
                    {activeVideoModal.title}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <video
                src={activeVideoModal.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support video playback.
              </video>
            </div>

            {/* Lesson Details & Takeaways */}
            <div className="p-5 sm:p-6 space-y-4 bg-white">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#0A2E24] italic">
                  Luganda: «{activeVideoModal.descriptionLuganda}»
                </p>
                <p className="text-xs sm:text-sm text-[#121715]/80">
                  {activeVideoModal.description}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-[#F5F2ED] rounded-2xl p-4 border border-[#E8E3DA] space-y-2">
                <h5 className="font-display font-bold text-xs text-[#0A2E24] uppercase tracking-wider">
                  Key Skills Taught in this Free Pack:
                </h5>
                <ul className="space-y-1.5 text-xs text-[#121715]/80">
                  {activeVideoModal.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    toggleComplete(activeVideoModal.id);
                    setActiveVideoModal(null);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-xs text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {completedPackIds.includes(activeVideoModal.id) 
                      ? 'Marked as Completed ✓' 
                      : 'Complete Free Lesson'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveVideoModal(null);
                    if (onRequestTutor) onRequestTutor();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full font-bold text-xs text-[#0A2E24] bg-white border border-[#0A2E24]/20 hover:bg-[#F5F2ED] transition-colors cursor-pointer"
                >
                  Book 1-on-1 On-Site Tutor for this Topic →
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Future Learning Packs Teaser Banner */}
      <div className="bg-[#0A2E24] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Continuous Curriculum Expansion</span>
          </div>
          <h4 className="font-display font-black text-xl sm:text-2xl text-white">
            More Free Packs Added Monthly.
          </h4>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            We are actively filming new free modules with local women leaders covering <em>Scented Candle Curing</em>, <em>Greenhouse Tomato Care</em>, <em>Export Packaging Standards</em>, and <em>AI Image Prompts for Shop Banners</em>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onSelectCourseCategory && onSelectCourseCategory('All')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FF6321] hover:bg-[#E5571B] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore All 30+ Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
