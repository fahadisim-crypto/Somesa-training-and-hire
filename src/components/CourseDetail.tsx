import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  Star, 
  Volume2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  User, 
  BookOpen, 
  Share2, 
  Check, 
  Smartphone, 
  CreditCard, 
  PhoneCall, 
  Tv, 
  Award, 
  RotateCcw,
  FileDown,
  FileText,
  Image as ImageIcon,
  Layers,
  Eye,
  Printer,
  Copy,
  Search,
  Download,
  FolderArchive,
  ExternalLink,
  Info,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { Course, Lesson, Creator, CourseResource } from '../types';
import confetti from 'canvas-confetti';
import { CourseQnATab } from './CourseQnATab';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onSelectCreatorBySlug: (slug: string) => void;
  onRequestTutor: () => void;
  isEnrolled: boolean;
  onEnroll: (planType: 'single_course' | 'all_access_pass') => void;
  hasAllAccessPass: boolean;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  onBack,
  onSelectCreatorBySlug,
  onRequestTutor,
  isEnrolled,
  onEnroll,
  hasAllAccessPass
}) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mtn' | 'airtel'>('mtn');
  const [phoneForMoMo, setPhoneForMoMo] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Course Navigation Tab State
  const [activeDetailTab, setActiveDetailTab] = useState<'all' | 'notes' | 'resources' | 'qna'>('all');

  // Course Resources UI State
  const [resourceFilter, setResourceFilter] = useState<'all' | 'pdf' | 'image' | 'template' | 'lesson'>('all');
  const [resourceSearch, setResourceSearch] = useState('');
  const [previewingResource, setPreviewingResource] = useState<CourseResource | null>(null);
  const [downloadToast, setDownloadToast] = useState<{ message: string; filename: string } | null>(null);
  const [copiedPreviewIndex, setCopiedPreviewIndex] = useState<number | null>(null);

  // Persistent Downloaded Resources Tracker per Course
  const downloadsStorageKey = `somesa_downloads_${course.id}`;
  const [downloadedResourceIds, setDownloadedResourceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(downloadsStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(downloadsStorageKey, JSON.stringify(downloadedResourceIds));
    } catch (e) {
      // ignore
    }
  }, [downloadedResourceIds, downloadsStorageKey]);

  // Persistent Completed Lessons Tracker per Course
  const storageKey = `somesa_progress_${course.id}`;
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
      return [];
    } catch {
      return [];
    }
  });

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedLessonIds));
    } catch (e) {
      // ignore storage errors
    }
  }, [completedLessonIds, storageKey]);

  const totalLessons = course.lessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCourseComplete = totalLessons > 0 && completedCount === totalLessons;

  const currentLesson: Lesson = course.lessons[selectedLessonIndex] || course.lessons[0];
  const isLessonLocked = !isEnrolled && !hasAllAccessPass && !currentLesson?.is_free_preview;
  const isCurrentLessonCompleted = completedLessonIds.includes(currentLesson?.id);

  // Standardize Course Resources
  const allCourseResources: CourseResource[] = course.resources && course.resources.length > 0
    ? course.resources
    : [
        {
          id: `res-${course.id}-1`,
          title: `${course.title} - Quick Reference Cheatsheet`,
          title_luganda: `Ekiwandiiko Ekifunze: ${course.title_luganda || course.title}`,
          description: 'Printable 2-page PDF summary with step-by-step shortcuts, guidelines, and Luganda terminology.',
          type: 'pdf',
          file_size: '1.4 MB PDF',
          download_url: `/assets/resources/${course.slug}-cheatsheet.pdf`,
          preview_image_url: course.thumbnail_url,
          lesson_id: course.lessons[0]?.id,
          lesson_title: course.lessons[0]?.title,
          tags: [course.category, 'Cheatsheet', 'Printable', 'Luganda/English'],
          content_preview: [
            'Step 1: Set up proper lighting and frame your product at eye-level.',
            'Step 2: Follow the 3-second hook formula to capture customer attention.',
            'Step 3: Add clear UGX price badges and Mobile Money instructions.',
            'Step 4: Export with optimal compression for WhatsApp & TikTok.'
          ]
        },
        {
          id: `res-${course.id}-2`,
          title: `${course.category} Practice Asset & Sticker Pack`,
          title_luganda: `Ebifaananyi n'Ebikozesebwa mu Kusoma (PNG Pack)`,
          description: 'Set of high-resolution transparent PNG badges, mockups, and layout templates for practicing lessons.',
          type: 'image',
          file_size: '3.2 MB ZIP',
          download_url: `/assets/resources/${course.slug}-assets.zip`,
          preview_image_url: course.thumbnail_url,
          lesson_id: course.lessons[1]?.id || course.lessons[0]?.id,
          lesson_title: course.lessons[1]?.title || course.lessons[0]?.title,
          tags: ['Asset Pack', 'PNG', 'High-Res', 'Templates'],
          content_preview: [
            'Transparent PNG badges & overlay stickers',
            'Sample high-clarity product photography files',
            'Layout guides formatted for 9:16 and 1:1 mobile screens'
          ]
        }
      ];

  // Resources linked to currently active lesson
  const currentLessonResources = allCourseResources.filter(
    (res) => res.lesson_id === currentLesson?.id || res.lesson_title === currentLesson?.title
  );

  // Filtered resources for the full resources section
  const filteredResources = allCourseResources.filter((res) => {
    if (resourceFilter === 'pdf' && res.type !== 'pdf' && res.type !== 'guide') return false;
    if (resourceFilter === 'image' && res.type !== 'image') return false;
    if (resourceFilter === 'template' && res.type !== 'template') return false;
    if (resourceFilter === 'lesson' && res.lesson_id !== currentLesson?.id && res.lesson_title !== currentLesson?.title) return false;

    if (resourceSearch.trim()) {
      const q = resourceSearch.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchLuganda = res.title_luganda?.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchTag = res.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchLuganda && !matchDesc && !matchTag) return false;
    }

    return true;
  });

  const handleDownloadResource = (resource: CourseResource, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Generate real downloadable Blob text file for cheatsheets/resources
    try {
      const content = `SOMESA SKILLS ACADEMY - COURSE RESOURCE
Course: ${course.title} (${course.title_luganda || ''})
Instructor: ${course.instructor_name} (${course.instructor_location || 'Uganda'})
Resource: ${resource.title}
Luganda: ${resource.title_luganda || 'N/A'}
Type: ${resource.type.toUpperCase()} | Size: ${resource.file_size}
Associated Lesson: ${resource.lesson_title || 'General Course Asset'}

==================================================
RESOURCE DESCRIPTION:
${resource.description}

KEY CHEATSHEET TAKEAWAYS & PRACTICAL STEPS:
${(resource.content_preview || ['Follow the lesson video instructions step by step.']).map((step, i) => `${i + 1}. ${step}`).join('\n')}

==================================================
Printed & Prepared by SOMESA Digital Vocational Platform
Masaka & Kyotera, Uganda
Contact: info@somesa.ug
`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cleanFileName = resource.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const ext = resource.type === 'pdf' ? 'txt' : resource.type === 'image' ? 'txt' : 'txt';
      link.download = `${cleanFileName}-somesa-cheatsheet.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Track download in state & localStorage
      setDownloadedResourceIds((prev) => Array.from(new Set([...prev, resource.id])));

      // Show toast notification
      setDownloadToast({
        message: `Downloaded "${resource.title}" (${resource.file_size})`,
        filename: `${cleanFileName}.${ext}`
      });
      setTimeout(() => setDownloadToast(null), 4000);

      // Trigger celebratory confetti
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0A2E24', '#FF6321', '#10B981']
      });
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const handleCopyContentPreview = (text: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPreviewIndex(index);
      setTimeout(() => setCopiedPreviewIndex(null), 2000);
    }
  };

  const toggleLessonCompletion = (lessonId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setCompletedLessonIds((prev) => {
      const isAlreadyDone = prev.includes(lessonId);
      let updated: string[];
      if (isAlreadyDone) {
        updated = prev.filter((id) => id !== lessonId);
      } else {
        updated = [...prev, lessonId];
        
        // Trigger celebratory confetti on completion or milestone
        if (updated.length === totalLessons) {
          try {
            confetti({
              particleCount: 80,
              spread: 90,
              origin: { y: 0.6 },
              colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
            });
          } catch {
            // fallback
          }
        }
      }
      return updated;
    });
  };

  const handleLessonSelect = (index: number) => {
    const targetLesson = course.lessons[index];
    if (!isEnrolled && !hasAllAccessPass && !targetLesson.is_free_preview) {
      setShowEnrollModal(true);
      return;
    }
    setSelectedLessonIndex(index);
    setIsPlaying(true);
  };

  const handleSimulatePayment = (plan: 'single_course' | 'all_access_pass') => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowEnrollModal(false);
      onEnroll(plan);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // fallback
      }
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset your lesson progress for this course?')) {
      setCompletedLessonIds([]);
    }
  };

  const scrollToResources = () => {
    const el = document.getElementById('course-resources-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24 animate-in fade-in duration-300">
      
      {/* Download Success Toast Notification */}
      {downloadToast && (
        <div 
          id="course-resource-download-toast"
          className="fixed top-20 right-4 sm:right-8 z-50 bg-[#0A2E24] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#0A2E24] flex items-center gap-3 animate-in slide-in-from-top-4 duration-200 max-w-md"
        >
          <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white stroke-3" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">
              {downloadToast.message}
            </p>
            <p className="text-[10px] text-emerald-300">
              Ready for offline viewing &amp; printouts
            </p>
          </div>
          <button
            onClick={() => setDownloadToast(null)}
            className="text-white/60 hover:text-white text-xs font-bold px-1.5 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header & Breadcrumbs */}
      <div className="border-b border-[#E8E3DA] bg-white sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <button
            id="course-detail-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0A2E24] hover:text-[#FF6321] transition-colors cursor-pointer py-1 px-2.5 rounded-full hover:bg-[#F5F2ED]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academy</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={scrollToResources}
              className="px-3 py-1.5 rounded-full bg-[#F5F2ED] hover:bg-[#E8E3DA] text-[#0A2E24] text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#E8E3DA] transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-[#FF6321]" />
              <span className="hidden sm:inline">Resources &amp; Cheatsheets</span>
              <span className="bg-[#0A2E24] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {allCourseResources.length}
              </span>
            </button>

            <button
              id="course-detail-share-btn"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#121715]/70 hover:text-[#121715] bg-[#F5F2ED] hover:bg-[#E8E3DA] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {!isEnrolled && !hasAllAccessPass && (
              <button
                id="course-header-enroll-btn"
                onClick={() => setShowEnrollModal(true)}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Enroll (UGX {course.price_ugx.toLocaleString()})</span>
              </button>
            )}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Course Title Banner & Metadata */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] font-bold text-xs uppercase tracking-wider">
                  {course.category}
                </span>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-amber-800/60 font-normal">({course.total_students} students)</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-[#F5F2ED] text-[#121715]/70 font-semibold text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration_minutes} Mins Total</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-xs flex items-center gap-1 border border-emerald-200">
                  <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{allCourseResources.length} Cheatsheets &amp; Assets Included</span>
                </span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-4xl text-[#121715] tracking-tight leading-tight">
                {course.title}
              </h1>

              {course.title_luganda && (
                <p className="text-sm sm:text-base font-semibold text-[#0A2E24] flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#0A2E24]/10 text-[11px] font-bold uppercase">Luganda</span>
                  <span>«{course.title_luganda}»</span>
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#121715]/75 leading-relaxed">
                {course.description}
              </p>

              {/* Course Progress Tracker Bar Component */}
              <div 
                id="course-progress-tracker-bar"
                className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] space-y-2.5 max-w-3xl"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isCourseComplete ? 'bg-emerald-600 text-white' : 'bg-[#0A2E24] text-[#FF6321]'}`}>
                      {isCourseComplete ? <Award className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#121715]">
                        {isCourseComplete ? 'Course Completed! 🎉' : 'Your Learning Progress'}
                      </h4>
                      <p className="text-[11px] text-[#121715]/60">
                        {completedCount} of {totalLessons} lessons finished ({progressPercentage}%)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0A2E24] bg-white px-2.5 py-1 rounded-full border border-[#E8E3DA] shadow-2xs">
                      {progressPercentage}%
                    </span>
                    {completedCount > 0 && (
                      <button
                        onClick={handleResetProgress}
                        title="Reset progress"
                        className="text-[10px] text-[#121715]/40 hover:text-[#121715] flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span className="hidden sm:inline">Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Visual Progress Bar Track */}
                <div className="w-full h-2.5 bg-[#E8E3DA] rounded-full overflow-hidden relative shadow-inner">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      isCourseComplete
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                        : 'bg-gradient-to-r from-[#0A2E24] via-[#0A2E24] to-[#FF6321]'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                {isCourseComplete ? (
                  <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Great job! You have completed all Luganda lessons in this practical course.</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#121715]/60 flex items-center gap-1.5">
                    <span>💡 Tap the circle next to each lesson or use the checkbox below to mark lessons as completed.</span>
                  </p>
                )}
              </div>

            </div>

            {/* Instructor Box & Quick Access */}
            <div className="lg:w-80 bg-[#F5F2ED] rounded-2xl p-5 border border-[#E8E3DA] space-y-4 shrink-0">
              <p className="text-[11px] uppercase tracking-wider font-bold text-[#0A2E24]/70">
                Taught by Local Creator
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={course.instructor_avatar}
                  alt={course.instructor_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-[#121715]">
                    {course.instructor_name}
                  </h4>
                  <p className="text-xs text-[#121715]/70">
                    {course.instructor_title}
                  </p>
                  <p className="text-[10px] text-[#0A2E24] font-medium mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF6321]" />
                    <span>{course.instructor_location || 'Uganda'}</span>
                  </p>
                </div>
              </div>

              {course.instructor_slug && (
                <button
                  onClick={() => onSelectCreatorBySlug(course.instructor_slug!)}
                  className="w-full py-2 px-3 text-xs font-semibold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#D6CFC4] rounded-xl transition-colors text-center cursor-pointer"
                >
                  View Creator Portfolio →
                </button>
              )}

              {/* Price & Pass summary */}
              <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#121715]/60 text-[10px] block">Single Pass</span>
                  <span className="font-extrabold text-[#0A2E24] text-sm">UGX {course.price_ugx.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#121715]/60 text-[10px] block">All-Access Pass</span>
                  <span className="font-bold text-[#121715] text-xs">UGX 20,000 / mo</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Video Player & Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Screen (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl relative aspect-video flex items-center justify-center border border-[#E8E3DA]">
              {isLessonLocked ? (
                /* Locked State Screen */
                <div className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#FF6321] ring-4 ring-[#FF6321]/20">
                    <Lock className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-[#FF6321] text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                      Lesson Locked
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {currentLesson?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mt-1">
                      Unlock this lesson and the entire course for UGX {course.price_ugx.toLocaleString()}, or get the All-Access Pass.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="px-8 py-3.5 rounded-full text-sm font-bold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Unlock className="w-4 h-4 text-[#FF6321]" />
                    <span>Unlock Course Now</span>
                  </button>
                </div>
              ) : (
                /* Interactive Video Player */
                <div className="w-full h-full relative group">
                  <video
                    key={currentLesson?.video_url}
                    src={currentLesson?.video_url}
                    controls
                    autoPlay={isPlaying}
                    playsInline
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Language Audio Watermark Overlay */}
                  <div className="absolute top-4 right-4 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span>Audio: Luganda</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Main Interactive Course Navigation Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E3DA] overflow-x-auto scrollbar-none shadow-xs">
              <button
                id="course-tab-btn-all"
                onClick={() => setActiveDetailTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeDetailTab === 'all'
                    ? 'bg-[#0A2E24] text-white shadow-xs'
                    : 'text-[#121715]/70 hover:text-[#121715] hover:bg-[#F5F2ED]'
                }`}
              >
                All Course Views
              </button>

              <button
                id="course-tab-btn-notes"
                onClick={() => setActiveDetailTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeDetailTab === 'notes'
                    ? 'bg-[#0A2E24] text-white shadow-xs'
                    : 'text-[#121715]/70 hover:text-[#121715] hover:bg-[#F5F2ED]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Lesson Notes &amp; Highlights</span>
              </button>

              <button
                id="course-tab-btn-resources"
                onClick={() => setActiveDetailTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeDetailTab === 'resources'
                    ? 'bg-[#0A2E24] text-white shadow-xs'
                    : 'text-[#121715]/70 hover:text-[#121715] hover:bg-[#F5F2ED]'
                }`}
              >
                <FileDown className="w-3.5 h-3.5 text-emerald-500" />
                <span>Resources &amp; Downloads ({allCourseResources.length})</span>
              </button>

              <button
                id="course-tab-btn-qna"
                onClick={() => setActiveDetailTab('qna')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeDetailTab === 'qna'
                    ? 'bg-[#0A2E24] text-white shadow-xs'
                    : 'text-[#121715]/70 hover:text-[#121715] hover:bg-[#F5F2ED]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Instructor Q&amp;A</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${activeDetailTab === 'qna' ? 'bg-[#FF6321] text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                  Live Q&amp;A
                </span>
              </button>
            </div>

            {/* Currently Playing Lesson Bar & Info */}
            {(activeDetailTab === 'all' || activeDetailTab === 'notes') && (
            <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E3DA] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A2E24] mb-1">
                    <Tv className="w-4 h-4 text-[#FF6321]" />
                    <span>Now Playing: Lesson {selectedLessonIndex + 1} of {course.lessons.length}</span>
                    {currentLesson?.is_free_preview && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Free Preview
                      </span>
                    )}
                  </div>
                  <h2 className="font-display font-extrabold text-xl text-[#121715]">
                    {currentLesson?.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Toggle Completion for current lesson */}
                  <button
                    id="mark-current-lesson-complete-btn"
                    onClick={() => toggleLessonCompletion(currentLesson.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrentLessonCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#F5F2ED] text-[#0A2E24] hover:bg-[#E8E3DA] border border-[#E8E3DA]'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentLessonCompleted ? 'text-white' : 'text-emerald-600'}`} />
                    <span>{isCurrentLessonCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
                  </button>

                  <span className="text-xs text-[#121715]/60 bg-[#F5F2ED] px-3 py-1.5 rounded-full font-medium">
                    {currentLesson?.duration_minutes} Mins
                  </span>
                </div>
              </div>

              {/* Lesson Summary & Notes */}
              {currentLesson?.summary && (
                <div className="space-y-1.5">
                  <h4 className="text-xs uppercase font-bold text-[#121715]/50 tracking-wider">
                    Lesson Summary &amp; Luganda Notes
                  </h4>
                  <p className="text-xs sm:text-sm text-[#121715]/85 leading-relaxed bg-[#F5F2ED] p-3.5 rounded-2xl border border-[#E8E3DA]/80">
                    {currentLesson.summary}
                  </p>
                </div>
              )}

              {/* Attached Lesson Downloads Notification Bar */}
              {currentLessonResources.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <FileDown className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-950">
                          {currentLessonResources.length} Download{currentLessonResources.length > 1 ? 's' : ''} Attached to this Lesson
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 text-[9px] font-extrabold uppercase">
                          Offline Cheatsheet
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        {currentLessonResources.map(r => r.title).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => setPreviewingResource(currentLessonResources[0])}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownloadResource(currentLessonResources[0])}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download ({currentLessonResources[0].file_size})</span>
                    </button>
                  </div>
                </div>
              )}

              {/* What you'll learn highlights */}
              {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs uppercase font-bold text-[#121715]/50 tracking-wider">
                    Key Takeaways in this Course
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#121715]/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* ========================================================================= */}
            {/* COURSE RESOURCES & DOWNLOADS SECTION                                     */}
            {/* ========================================================================= */}
            {(activeDetailTab === 'all' || activeDetailTab === 'resources') && (
            <div 
              id="course-resources-section" 
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6 scroll-mt-20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FF6321]/15 text-[#FF6321] flex items-center justify-center">
                      <FileDown className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF6321]">
                      Course Learning Materials
                    </span>
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#121715] mt-1">
                    Course Resources &amp; Downloads
                  </h2>
                  <p className="text-xs sm:text-sm text-[#121715]/70">
                    Ebikozesebwa n’Obupapula bw’Okusoma: Download printable PDF cheatsheets, image assets, and practical scripts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0A2E24] bg-[#F5F2ED] px-3 py-1.5 rounded-full border border-[#E8E3DA]">
                    {allCourseResources.length} Total Files
                  </span>
                </div>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => setResourceFilter('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        resourceFilter === 'all'
                          ? 'bg-[#0A2E24] text-white shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                      }`}
                    >
                      All Resources ({allCourseResources.length})
                    </button>

                    <button
                      onClick={() => setResourceFilter('pdf')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        resourceFilter === 'pdf'
                          ? 'bg-[#0A2E24] text-white shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-500" />
                      <span>PDF Cheatsheets</span>
                    </button>

                    <button
                      onClick={() => setResourceFilter('image')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        resourceFilter === 'image'
                          ? 'bg-[#0A2E24] text-white shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
                      <span>Image &amp; Asset Packs</span>
                    </button>

                    <button
                      onClick={() => setResourceFilter('template')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        resourceFilter === 'template'
                          ? 'bg-[#0A2E24] text-white shadow-xs'
                          : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      <span>Templates &amp; Ledgers</span>
                    </button>

                    <button
                      onClick={() => setResourceFilter('lesson')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        resourceFilter === 'lesson'
                          ? 'bg-[#FF6321] text-white shadow-xs'
                          : 'bg-[#FF6321]/10 text-[#FF6321] hover:bg-[#FF6321]/20'
                      }`}
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>Current Lesson ({currentLessonResources.length})</span>
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-[#121715]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search resources..."
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#F5F2ED] border border-[#E8E3DA] text-xs focus:outline-none focus:border-[#0A2E24]"
                    />
                    {resourceSearch && (
                      <button
                        onClick={() => setResourceSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#121715]/40 hover:text-[#121715]"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Resources Cards Grid */}
              {filteredResources.length === 0 ? (
                <div className="p-8 text-center bg-[#F5F2ED] rounded-2xl border border-dashed border-[#E8E3DA] space-y-2">
                  <FileDown className="w-8 h-8 text-[#121715]/30 mx-auto" />
                  <p className="text-sm font-bold text-[#121715]">No resources matching your filter</p>
                  <p className="text-xs text-[#121715]/60">Try selecting "All Resources" or clearing your search term.</p>
                  <button
                    onClick={() => { setResourceFilter('all'); setResourceSearch(''); }}
                    className="mt-2 px-4 py-1.5 rounded-full bg-[#0A2E24] text-white text-xs font-bold cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredResources.map((resource) => {
                    const isDownloaded = downloadedResourceIds.includes(resource.id);
                    const isLinkedToCurrent = resource.lesson_id === currentLesson?.id || resource.lesson_title === currentLesson?.title;

                    return (
                      <div
                        key={resource.id}
                        id={`resource-card-${resource.id}`}
                        className={`bg-[#F5F2ED]/70 rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md flex flex-col justify-between gap-4 group ${
                          isLinkedToCurrent 
                            ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-500/20' 
                            : 'border-[#E8E3DA] hover:border-[#0A2E24]/30'
                        }`}
                      >
                        <div className="space-y-3">
                          
                          {/* Card Header & Badges */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                                resource.type === 'pdf' 
                                  ? 'bg-rose-100 text-rose-800' 
                                  : resource.type === 'image' 
                                  ? 'bg-sky-100 text-sky-800' 
                                  : resource.type === 'template' 
                                  ? 'bg-amber-100 text-amber-900' 
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {resource.type === 'pdf' ? <FileText className="w-3 h-3" /> :
                                 resource.type === 'image' ? <ImageIcon className="w-3 h-3" /> :
                                 resource.type === 'template' ? <Layers className="w-3 h-3" /> :
                                 <FileDown className="w-3 h-3" />}
                                <span>{resource.type.toUpperCase()} CHEATSHEET</span>
                              </span>

                              <span className="text-[10px] font-semibold text-[#121715]/60 bg-white px-2 py-0.5 rounded border border-[#E8E3DA]">
                                {resource.file_size}
                              </span>

                              {isDownloaded && (
                                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>Downloaded</span>
                                </span>
                              )}
                            </div>

                            {isLinkedToCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold shrink-0">
                                Active Lesson
                              </span>
                            )}
                          </div>

                          {/* Titles */}
                          <div>
                            <h3 className="font-display font-bold text-base text-[#121715] leading-snug group-hover:text-[#0A2E24] transition-colors">
                              {resource.title}
                            </h3>
                            {resource.title_luganda && (
                              <p className="text-xs text-[#0A2E24] font-medium mt-0.5">
                                {resource.title_luganda}
                              </p>
                            )}
                          </div>

                          <p className="text-xs text-[#121715]/75 leading-relaxed line-clamp-2">
                            {resource.description}
                          </p>

                          {/* Associated Lesson Tag */}
                          {resource.lesson_title && (
                            <div className="flex items-center gap-1.5 text-[11px] text-[#0A2E24] bg-white px-2.5 py-1 rounded-lg border border-[#E8E3DA]/80">
                              <Tv className="w-3 h-3 text-[#FF6321] shrink-0" />
                              <span className="font-medium truncate">
                                {resource.lesson_title}
                              </span>
                            </div>
                          )}

                          {/* Preview snippet bullet points */}
                          {resource.content_preview && resource.content_preview.length > 0 && (
                            <div className="bg-white/80 p-2.5 rounded-xl border border-[#E8E3DA]/60 space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#121715]/50">
                                Cheatsheet Highlights
                              </p>
                              {resource.content_preview.slice(0, 2).map((item, i) => (
                                <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#121715]/80">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span className="line-clamp-1">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>

                        {/* Card Action Buttons */}
                        <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewingResource(resource)}
                            className="px-3 py-2 rounded-xl bg-white hover:bg-[#E8E3DA] text-[#0A2E24] text-xs font-bold border border-[#D6CFC4] transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#0A2E24]" />
                            <span>Quick Preview</span>
                          </button>

                          <button
                            type="button"
                            id={`download-btn-${resource.id}`}
                            onClick={(e) => handleDownloadResource(resource, e)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                              isDownloaded
                                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                : 'bg-[#0A2E24] text-white hover:bg-[#124B3C]'
                            }`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{isDownloaded ? 'Download Again' : 'Download File'}</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Help / Print Note */}
              <div className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] flex items-start gap-3 text-xs text-[#121715]/75">
                <Info className="w-4 h-4 text-[#0A2E24] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0A2E24]">How to use these resources:</span>
                  <p className="mt-0.5 leading-relaxed">
                    All cheatsheets are prepared with readable typography for mobile screen viewing and standard A4 printouts. You can laminate them for your workshop desk or save them on WhatsApp for quick customer reply shortcuts.
                  </p>
                </div>
              </div>

            </div>
            )}

            {/* ========================================================================= */}
            {/* INSTRUCTOR Q&A & COMMUNITY DISCUSSIONS SECTION                           */}
            {/* ========================================================================= */}
            {(activeDetailTab === 'all' || activeDetailTab === 'qna') && (
              <div id="course-qna-section" className="scroll-mt-20">
                <CourseQnATab
                  course={course}
                  currentLesson={currentLesson}
                  isEnrolled={isEnrolled}
                  hasAllAccessPass={hasAllAccessPass}
                  onOpenEnrollModal={() => setShowEnrollModal(true)}
                />
              </div>
            )}

            {/* In-Course Tutor Help CTA Card */}
            <div className="bg-[#0A2E24] rounded-3xl p-6 sm:p-8 text-white border border-[#0A2E24] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF6321] text-white text-[10px] font-bold uppercase tracking-wider">
                  In-Person Dispatch Available
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  Need someone to walk you through this in person?
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                  Get a certified SOMESA instructor dispatched straight to your shop or office in Masaka, Kyotera, or Kampala to practice together.
                </p>
              </div>

              <button
                id="course-request-tutor-btn"
                onClick={onRequestTutor}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] rounded-full transition-all shrink-0 cursor-pointer shadow flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#FF6321]" />
                <span>Request 1-on-1 Tutor</span>
              </button>
            </div>

          </div>

          {/* Playlist Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-3">
                <div>
                  <h3 className="font-display font-extrabold text-base text-[#121715]">
                    Course Lessons
                  </h3>
                  <p className="text-[11px] text-[#121715]/60">
                    {completedCount}/{totalLessons} completed ({progressPercentage}%)
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#0A2E24] bg-[#0A2E24]/10 px-2 py-0.5 rounded-full">
                    Luganda
                  </span>
                </div>
              </div>

              {/* Mini progress bar inside sidebar */}
              <div className="w-full bg-[#F5F2ED] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Playlist Items */}
              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => {
                  const isSelected = idx === selectedLessonIndex;
                  const isLocked = !isEnrolled && !hasAllAccessPass && !lesson.is_free_preview;
                  const isDone = completedLessonIds.includes(lesson.id);

                  // Count resources attached to this lesson
                  const lessonResCount = allCourseResources.filter(
                    r => r.lesson_id === lesson.id || r.lesson_title === lesson.title
                  ).length;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonSelect(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-start justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                          : isLocked
                          ? 'bg-[#F5F2ED]/60 text-[#121715]/60 border-[#E8E3DA] hover:bg-[#F5F2ED]'
                          : 'bg-[#F5F2ED] text-[#121715] border-[#E8E3DA] hover:bg-[#E8E3DA]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox / Number badge */}
                        <button
                          type="button"
                          onClick={(e) => toggleLessonCompletion(lesson.id, e)}
                          title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 cursor-pointer transition-transform hover:scale-110 ${
                            isDone
                              ? isSelected ? 'bg-emerald-400 text-[#0A2E24]' : 'bg-emerald-600 text-white'
                              : isSelected 
                              ? 'bg-[#FF6321] text-white' 
                              : isLocked 
                              ? 'bg-[#121715]/10 text-[#121715]/50' 
                              : 'bg-[#0A2E24]/10 text-[#0A2E24]'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-3" /> : idx + 1}
                        </button>

                        <div>
                          <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-white' : 'text-[#121715]'}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-[#121715]/50'}`}>
                              {lesson.duration_minutes} mins
                            </span>
                            {lesson.is_free_preview && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                Free Preview
                              </span>
                            )}
                            {lessonResCount > 0 && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                <FileDown className="w-2.5 h-2.5" />
                                <span>{lessonResCount} Download{lessonResCount > 1 ? 's' : ''}</span>
                              </span>
                            )}
                            {isDone && (
                              <span className={`text-[9px] font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                Completed ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 pt-0.5 flex items-center gap-1.5">
                        {isLocked ? (
                          <Lock className="w-4 h-4 text-[#121715]/40" />
                        ) : isSelected ? (
                          <Play className="w-4 h-4 text-[#FF6321] fill-current" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isEnrolled && !hasAllAccessPass && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span>Unlock Full Course (UGX {course.price_ugx.toLocaleString()})</span>
                  </button>
                </div>
              )}

            </div>

            {/* Quick Download All Cheatsheets Box */}
            <div className="bg-white rounded-3xl p-5 border border-[#E8E3DA] text-xs space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#0A2E24] font-bold">
                <FileDown className="w-4 h-4 text-[#FF6321]" />
                <span>All {allCourseResources.length} Cheatsheets &amp; Assets</span>
              </div>
              <p className="text-[#121715]/75 leading-relaxed">
                Save the course summary sheets directly on your phone for quick reference while filming, editing, or chatting with customers.
              </p>
              <button
                onClick={scrollToResources}
                className="w-full py-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#E8E3DA] text-[#0A2E24] font-bold text-xs border border-[#E8E3DA] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Browse All Downloads ↓</span>
              </button>
            </div>

            {/* Language & Audio Details Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E8E3DA] text-xs space-y-3">
              <div className="flex items-center gap-2 text-[#0A2E24] font-bold">
                <Volume2 className="w-4 h-4 text-[#FF6321]" />
                <span>Luganda Language Guarantee</span>
              </div>
              <p className="text-[#121715]/75 leading-relaxed">
                All video audio is spoken in natural, conversational Luganda with standard English digital terms explained simply (e.g. <em>crop</em>, <em>transition</em>, <em>catalog</em>, <em>status</em>).
              </p>
            </div>

            {/* Quick Instructor Q&A Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E8E3DA] text-xs space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#0A2E24] font-bold">
                <MessageSquare className="w-4 h-4 text-[#FF6321]" />
                <span>Ask {course.instructor_name}</span>
              </div>
              <p className="text-[#121715]/75 leading-relaxed">
                Stuck on a lesson or want tailored advice for your shop? Post in the Q&amp;A tab for direct answers.
              </p>
              <button
                onClick={() => {
                  setActiveDetailTab('qna');
                  const qnaEl = document.getElementById('course-qna-section');
                  if (qnaEl) qnaEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Open Q&amp;A Discussion →</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE RESOURCE PREVIEW MODAL                                        */}
      {/* ========================================================================= */}
      {previewingResource && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E3DA] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E8E3DA] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    previewingResource.type === 'pdf' ? 'bg-rose-100 text-rose-800' :
                    previewingResource.type === 'image' ? 'bg-sky-100 text-sky-800' :
                    previewingResource.type === 'template' ? 'bg-amber-100 text-amber-900' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {previewingResource.type.toUpperCase()} CHEATSHEET
                  </span>
                  <span className="text-[10px] text-[#121715]/60 bg-[#F5F2ED] px-2 py-0.5 rounded font-semibold border border-[#E8E3DA]">
                    {previewingResource.file_size}
                  </span>
                  {downloadedResourceIds.includes(previewingResource.id) && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Downloaded on your device</span>
                    </span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#121715]">
                  {previewingResource.title}
                </h3>
                {previewingResource.title_luganda && (
                  <p className="text-xs sm:text-sm font-semibold text-[#0A2E24] mt-0.5">
                    {previewingResource.title_luganda}
                  </p>
                )}
              </div>

              <button
                onClick={() => setPreviewingResource(null)}
                className="w-8 h-8 rounded-full bg-[#F5F2ED] text-[#121715]/60 hover:text-[#121715] flex items-center justify-center text-sm font-bold cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Visual Mockup & Content */}
            <div className="space-y-4">
              
              {/* Visual Preview Image Card */}
              {previewingResource.preview_image_url && (
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#0A2E24] border border-[#E8E3DA]">
                  <img
                    src={previewingResource.preview_image_url}
                    alt={previewingResource.title}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321]">
                      Somesa Academy Digital Cheat Card
                    </span>
                    <p className="text-sm font-bold truncate">
                      {previewingResource.title}
                    </p>
                    <p className="text-[11px] text-white/70">
                      Prepared for {course.title}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="p-3.5 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] space-y-1">
                <p className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider">
                  Summary &amp; Practical Use:
                </p>
                <p className="text-xs text-[#121715]/80 leading-relaxed">
                  {previewingResource.description}
                </p>
              </div>

              {/* Step-by-Step Cheatsheet Preview */}
              {previewingResource.content_preview && previewingResource.content_preview.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#121715]/60">
                      Cheatsheet Steps &amp; Key Instructions
                    </h4>
                    <span className="text-[10px] text-[#121715]/50">
                      Tap copy to grab script
                    </span>
                  </div>

                  <div className="space-y-2">
                    {previewingResource.content_preview.map((step, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 rounded-xl bg-white border border-[#E8E3DA] hover:border-[#0A2E24]/30 transition-colors flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-2.5 text-xs text-[#121715]/85">
                          <span className="w-5 h-5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyContentPreview(step, idx)}
                          title="Copy step to clipboard"
                          className="px-2 py-1 rounded-lg text-[10px] font-bold text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPreviewIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attached Lesson info */}
              {previewingResource.lesson_title && (
                <div className="flex items-center gap-2 text-xs text-[#0A2E24] bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <Tv className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Linked to: <strong>{previewingResource.lesson_title}</strong>
                  </span>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E8E3DA]">
              <div className="text-[11px] text-[#121715]/60 flex items-center gap-1.5 self-start sm:self-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Compatible with phone viewers &amp; A4 printing</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadResource(previewingResource);
                    setPreviewingResource(null);
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#0A2E24] hover:bg-[#124B3C] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Now ({previewingResource.file_size})</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Instant MoMo Enrollment Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E8E3DA] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6321]">
                  Instant Access
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#121715]">
                  Enroll &amp; Start Learning
                </h3>
              </div>

              <button
                onClick={() => setShowEnrollModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F2ED] text-[#121715]/60 hover:text-[#121715] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Choice of Plans */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border-2 border-[#0A2E24] bg-[#0A2E24]/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold text-sm text-[#0A2E24]">Single Course Pass</p>
                    <span className="px-2 py-0.5 rounded bg-[#0A2E24] text-white text-[9px] font-bold">
                      Lifetime
                    </span>
                  </div>
                  <p className="text-xs text-[#121715]/70 mt-0.5">
                    Unlock all {course.lessons.length} lessons &amp; resources for «{course.title}»
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-base text-[#0A2E24]">UGX {course.price_ugx.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#E8E3DA] bg-white hover:bg-[#F5F2ED] transition-colors flex items-center justify-between cursor-pointer">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold text-sm text-[#121715]">All-Access Monthly Pass</p>
                    <span className="px-2 py-0.5 rounded bg-[#FF6321] text-white text-[9px] font-bold">
                      Best Value
                    </span>
                  </div>
                  <p className="text-xs text-[#121715]/70 mt-0.5">
                    Unlock EVERY Luganda course + tutor dispatch discounts
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-[#121715]">UGX 20,000<span className="text-[10px] font-normal text-[#121715]/60">/mo</span></p>
                </div>
              </div>
            </div>

            {/* Simulated Mobile Money Input */}
            <div className="space-y-3 pt-2 border-t border-[#E8E3DA]">
              <label className="block text-xs font-bold text-[#121715]">
                Select Mobile Money Network
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('mtn')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'mtn'
                      ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                      : 'bg-white text-[#121715]/70 border-[#E8E3DA]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>MTN MoMo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('airtel')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'airtel'
                      ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-[#121715]/70 border-[#E8E3DA]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Airtel Money</span>
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#121715]/70 mb-1">
                  Mobile Money Phone Number (Uganda)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0772 123456 or 0701 123456"
                  value={phoneForMoMo}
                  onChange={(e) => setPhoneForMoMo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-sm focus:outline-none focus:border-[#0A2E24]"
                />
              </div>
            </div>

            {/* Submit / Simulate Button */}
            <div className="pt-2 space-y-2">
              <button
                disabled={isProcessingPayment}
                onClick={() => handleSimulatePayment('single_course')}
                className="w-full py-3.5 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessingPayment ? (
                  <span>Prompting MoMo PIN on Phone...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-[#FF6321]" />
                    <span>Pay UGX {course.price_ugx.toLocaleString()} &amp; Unlock</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-[#121715]/50">
                🔒 Instant sandbox activation — unlocks lessons &amp; downloads immediately.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
