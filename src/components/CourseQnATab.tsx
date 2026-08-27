import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  HelpCircle, 
  Send, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  Search, 
  Plus, 
  Filter, 
  User, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Award,
  Globe,
  BookOpen,
  ArrowRight,
  Unlock,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course, CourseQuestion, CourseAnswer, Lesson } from '../types';

interface CourseQnATabProps {
  course: Course;
  currentLesson: Lesson | null;
  isEnrolled: boolean;
  hasAllAccessPass: boolean;
  onOpenEnrollModal: () => void;
}

const getInitialDefaultQuestions = (course: Course): CourseQuestion[] => {
  if (course.category === 'CapCut Video') {
    return [
      {
        id: `qa-${course.id}-1`,
        course_id: course.id,
        student_name: 'Kato Ronald',
        student_location: 'Masaka (Kato Electronics)',
        title: 'How do I add Luganda price tags without paying for CapCut Pro?',
        content: 'When I export my video, does CapCut charge me for text styles? I want to write "Ebbeeyi: UGX 45,000" clearly across my speaker reels.',
        content_luganda: 'Engeri y’okuteekako ebiwandiiko eby’ebbeeyi mu Luganda nga tokozezza CapCut Pro.',
        lesson_id: course.lessons[3]?.id || 'les-cap-4',
        lesson_title: course.lessons[3]?.title || 'Lesson 4: Adding Price Badges, WhatsApp CTA & Exporting',
        created_at: 'Yesterday',
        upvotes: 14,
        is_resolved: true,
        tags: ['CapCut Free', 'Price Badges', 'Luganda Text'],
        answers: [
          {
            id: `ans-${course.id}-1`,
            question_id: `qa-${course.id}-1`,
            author_name: course.instructor_name,
            author_avatar: course.instructor_avatar,
            author_title: `${course.instructor_title} · Verified Instructor`,
            is_instructor: true,
            content: 'Oli otya Kato! No, CapCut standard text is 100% free! You can use fonts like "Bebas Neue" or "Montserrat", add a dark outline (Stroke), and write in Luganda. You can also download the transparent PNG MoMo & Price badges from the "Resources & Downloads" tab right above!',
            created_at: '1 day ago',
            upvotes: 12
          }
        ]
      },
      {
        id: `qa-${course.id}-2`,
        course_id: course.id,
        student_name: 'Nabirye Sarah',
        student_location: 'Kyotera Boutiques',
        title: 'Can I shoot product videos under fluorescent shop light at night?',
        content: 'My shop doesn’t get much morning sun. Will my dresses look clear if I use normal room bulbs, or is there a low-cost lighting trick?',
        content_luganda: 'Ettaala ki eya bulijjo gye nsobola okukozesa nga sikozesezza ttaala ya bbeeyi?',
        lesson_id: course.lessons[0]?.id || 'les-cap-1',
        lesson_title: course.lessons[0]?.title || 'Lesson 1: Setting Up Your Smartphone Light & Angles',
        created_at: '3 days ago',
        upvotes: 9,
        is_resolved: true,
        tags: ['Lighting', 'Shop Filming', 'Daylight Trick'],
        answers: [
          {
            id: `ans-${course.id}-2`,
            question_id: `qa-${course.id}-2`,
            author_name: course.instructor_name,
            author_avatar: course.instructor_avatar,
            author_title: `${course.instructor_title} · Verified Instructor`,
            is_instructor: true,
            content: 'Yellow fluorescent bulbs cause green/yellow flicker on phone sensors. The best trick: buy a single 15W "Daylight Cool White" LED bulb (around UGX 8,000) and place a white sheet of paper in front as a diffuser. It gives soft, studio-quality lighting!',
            created_at: '2 days ago',
            upvotes: 8
          }
        ]
      },
      {
        id: `qa-${course.id}-3`,
        course_id: course.id,
        student_name: 'Ssekandi Paul',
        student_location: 'Kampala',
        title: 'What export resolution is best so WhatsApp status doesn’t compress and blur my video?',
        content: 'Whenever I upload to WhatsApp status, the quality drops heavily. What settings should I change in CapCut before saving?',
        lesson_id: course.lessons[3]?.id || 'les-cap-4',
        lesson_title: course.lessons[3]?.title || 'Lesson 4: Adding Price Badges, WhatsApp CTA & Exporting',
        created_at: '5 days ago',
        upvotes: 18,
        is_resolved: false,
        tags: ['WhatsApp Status', 'Export Settings', 'Compression'],
        answers: [
          {
            id: `ans-${course.id}-3`,
            question_id: `qa-${course.id}-3`,
            author_name: course.instructor_name,
            author_avatar: course.instructor_avatar,
            author_title: `${course.instructor_title} · Verified Instructor`,
            is_instructor: true,
            content: 'Export at 1080p, 30fps, and select "Standard / Recommended" code rate (not High). WhatsApp compresses files larger than 16MB aggressively. Keeping your video under 25 seconds at 1080p preserves crystal clear text.',
            created_at: '4 days ago',
            upvotes: 15
          }
        ]
      }
    ];
  }

  if (course.category === 'Canva Design') {
    return [
      {
        id: `qa-${course.id}-1`,
        course_id: course.id,
        student_name: 'Mugerwa Denis',
        student_location: 'Masaka (Denis Printing & Tech)',
        title: 'Which paper size should I select in Canva for printing flyers in Masaka town?',
        content: 'I want to print 200 copies at a local printing shop in Masaka. Should I choose A4, A5, or custom flyer dimensions in Canva?',
        content_luganda: 'Obupapula bw’ebipande bwe nina okulonda nga ngenda kukuba e Masaka.',
        lesson_id: course.lessons[1]?.id || 'les-can-2',
        lesson_title: course.lessons[1]?.title || 'Lesson 2: Designing Modern Shop Price Flyers',
        created_at: '2 days ago',
        upvotes: 11,
        is_resolved: true,
        tags: ['Flyer Size', 'Printing', 'Masaka Printers'],
        answers: [
          {
            id: `ans-${course.id}-1`,
            question_id: `qa-${course.id}-1`,
            author_name: course.instructor_name,
            author_avatar: course.instructor_avatar,
            author_title: `${course.instructor_title} · Verified Instructor`,
            is_instructor: true,
            content: 'Select "Flyer (Portrait) 210 x 297 mm" (A4) or A5 (148 x 210 mm). When exporting, always download as "PDF Print" with "Crop marks and bleed" checked so the local printer cuts the edges cleanly without white lines.',
            created_at: '1 day ago',
            upvotes: 9
          }
        ]
      },
      {
        id: `qa-${course.id}-2`,
        course_id: course.id,
        student_name: 'Nakato Christine',
        student_location: 'Kyotera Cakes',
        title: 'How do I remove the background of my cake pictures without Canva Pro?',
        content: 'Is there a free way inside Canva or a companion mobile tool to remove background from cake shots?',
        lesson_id: course.lessons[2]?.id || 'les-can-3',
        lesson_title: course.lessons[2]?.title || 'Lesson 3: Product Label & Sticker Layouts',
        created_at: '4 days ago',
        upvotes: 8,
        is_resolved: true,
        tags: ['Background Removal', 'Canva Free', 'Product Photos'],
        answers: [
          {
            id: `ans-${course.id}-2`,
            question_id: `qa-${course.id}-2`,
            author_name: course.instructor_name,
            author_avatar: course.instructor_avatar,
            author_title: `${course.instructor_title} · Verified Instructor`,
            is_instructor: true,
            content: 'You can use the free web tool "erase.bg" or "remove.bg" on your phone browser, save the transparent PNG, and then import it directly into your Canva template!',
            created_at: '3 days ago',
            upvotes: 7
          }
        ]
      }
    ];
  }

  // Default general questions for other courses
  return [
    {
      id: `qa-${course.id}-1`,
      course_id: course.id,
      student_name: 'Mukasa Joseph',
      student_location: 'Kalisizo Agribusiness',
      title: `How quickly can I apply these practical steps to my business?`,
      content: `I run a busy enterprise and want to know how to structure my time across the ${course.lessons.length} lessons in this course.`,
      content_luganda: 'Engeri y’okutegeka obudde okusoma n’okussa mu nkola amangu.',
      lesson_id: course.lessons[0]?.id || 'les-1',
      lesson_title: course.lessons[0]?.title || 'Lesson 1: Introduction & Fundamentals',
      created_at: '2 days ago',
      upvotes: 7,
      is_resolved: true,
      tags: ['Implementation', 'Study Plan', 'Time Management'],
      answers: [
        {
          id: `ans-${course.id}-1`,
          question_id: `qa-${course.id}-1`,
          author_name: course.instructor_name,
          author_avatar: course.instructor_avatar,
          author_title: `${course.instructor_title} · Verified Instructor`,
          is_instructor: true,
          content: 'Each lesson is under 12 minutes! I recommend watching one lesson, immediately practicing the step on your smartphone or shop products, and downloading the cheatsheet in the Resources tab before moving to the next lesson.',
          created_at: '1 day ago',
          upvotes: 6
        }
      ]
    },
    {
      id: `qa-${course.id}-2`,
      course_id: course.id,
      student_name: 'Namaganda Joan',
      student_location: 'Greater Masaka',
      title: 'Can I ask questions in Luganda if I get stuck on a lesson?',
      content: 'I feel more comfortable typing my technical questions in Luganda. Will instructors understand and reply?',
      lesson_id: course.lessons[0]?.id || 'les-1',
      lesson_title: course.lessons[0]?.title || 'Lesson 1: Introduction & Fundamentals',
      created_at: '4 days ago',
      upvotes: 12,
      is_resolved: true,
      tags: ['Luganda Support', 'Instructor Q&A'],
      answers: [
        {
          id: `ans-${course.id}-2`,
          question_id: `qa-${course.id}-2`,
          author_name: course.instructor_name,
          author_avatar: course.instructor_avatar,
          author_title: `${course.instructor_title} · Verified Instructor`,
          is_instructor: true,
          content: 'Yee ssebo/nnyabo! All SOMESA instructors are fluent in Luganda and English. Feel free to ask in Luganda or mix terms as needed. We answer within 24 hours!',
          created_at: '3 days ago',
          upvotes: 11
        }
      ]
    }
  ];
};

export const CourseQnATab: React.FC<CourseQnATabProps> = ({
  course,
  currentLesson,
  isEnrolled,
  hasAllAccessPass,
  onOpenEnrollModal
}) => {
  const storageKey = `somesa_qa_questions_${course.id}`;

  const [questions, setQuestions] = useState<CourseQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return getInitialDefaultQuestions(course);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'instructor' | 'lesson' | 'unresolved'>('all');
  const [showAskModal, setShowAskModal] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // New Question Form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newLugandaContent, setNewLugandaContent] = useState('');
  const [newStudentName, setNewStudentName] = useState('Learner');
  const [newStudentLocation, setNewStudentLocation] = useState('Uganda');
  const [newLessonId, setNewLessonId] = useState<string>(currentLesson?.id || course.lessons[0]?.id || '');
  const [newTags, setNewTags] = useState('');

  // Reply Form state (per question)
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [replyAsInstructor, setReplyAsInstructor] = useState(false);

  // Toast confirmation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage whenever questions change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(questions));
    } catch {
      // ignore
    }
  }, [questions, storageKey]);

  // Set default active question expanded if only 1 or 2
  useEffect(() => {
    if (questions.length > 0 && !expandedQuestionId) {
      setExpandedQuestionId(questions[0].id);
    }
  }, [questions, expandedQuestionId]);

  const canParticipate = isEnrolled || hasAllAccessPass;

  // Filtered Questions
  const filteredQuestions = questions.filter((q) => {
    if (filterType === 'instructor' && !q.answers.some(a => a.is_instructor)) return false;
    if (filterType === 'lesson' && currentLesson && q.lesson_id !== currentLesson.id && q.lesson_title !== currentLesson.title) return false;
    if (filterType === 'unresolved' && q.is_resolved) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(query);
      const matchContent = q.content.toLowerCase().includes(query);
      const matchLuganda = q.content_luganda?.toLowerCase().includes(query);
      const matchStudent = q.student_name.toLowerCase().includes(query);
      const matchTags = q.tags?.some(t => t.toLowerCase().includes(query));
      const matchAnswer = q.answers.some(a => a.content.toLowerCase().includes(query));
      if (!matchTitle && !matchContent && !matchLuganda && !matchStudent && !matchTags && !matchAnswer) {
        return false;
      }
    }

    return true;
  });

  const handleUpvoteQuestion = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return { ...q, upvotes: q.upvotes + 1 };
        }
        return q;
      })
    );
  };

  const handleUpvoteAnswer = (questionId: string, answerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) => (a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a))
          };
        }
        return q;
      })
    );
  };

  const handleToggleResolved = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return { ...q, is_resolved: !q.is_resolved };
        }
        return q;
      })
    );
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const matchedLesson = course.lessons.find((l) => l.id === newLessonId) || currentLesson || course.lessons[0];

    const newQuestionObj: CourseQuestion = {
      id: `qa-${course.id}-${Date.now()}`,
      course_id: course.id,
      student_name: newStudentName.trim() || 'Enrolled Student',
      student_location: newStudentLocation.trim() || 'Masaka, Uganda',
      title: newTitle.trim(),
      content: newContent.trim(),
      content_luganda: newLugandaContent.trim() || undefined,
      lesson_id: matchedLesson.id,
      lesson_title: matchedLesson.title,
      created_at: 'Just now',
      upvotes: 1,
      is_resolved: false,
      tags: newTags ? newTags.split(',').map((t) => t.trim()).filter(Boolean) : ['General Q&A'],
      answers: []
    };

    setQuestions((prev) => [newQuestionObj, ...prev]);
    setShowAskModal(false);
    setExpandedQuestionId(newQuestionObj.id);

    // Reset inputs
    setNewTitle('');
    setNewContent('');
    setNewLugandaContent('');
    setNewTags('');

    setToastMessage('Your question has been posted! Instructor will be notified.');
    setTimeout(() => setToastMessage(null), 4000);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#0A2E24', '#FF6321', '#10B981']
    });
  };

  const handlePostAnswer = (questionId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = (replyTextMap[questionId] || '').trim();
    if (!text) return;

    const isInstructorReply = replyAsInstructor;

    const newAnswer: CourseAnswer = {
      id: `ans-${questionId}-${Date.now()}`,
      question_id: questionId,
      author_name: isInstructorReply ? course.instructor_name : newStudentName || 'Enrolled Student',
      author_avatar: isInstructorReply ? course.instructor_avatar : undefined,
      author_title: isInstructorReply
        ? `${course.instructor_title} · Verified Instructor`
        : 'SOMESA Student',
      is_instructor: isInstructorReply,
      content: text,
      created_at: 'Just now',
      upvotes: isInstructorReply ? 5 : 1
    };

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            is_resolved: isInstructorReply ? true : q.is_resolved,
            answers: [...q.answers, newAnswer]
          };
        }
        return q;
      })
    );

    setReplyTextMap((prev) => ({ ...prev, [questionId]: '' }));
    setToastMessage(isInstructorReply ? 'Instructor reply posted!' : 'Your response has been added to the discussion!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div 
      id="course-qna-tab-root"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A2E24] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500/30 animate-in slide-in-from-bottom-4 duration-300">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold">{toastMessage}</p>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E24]">
              Instructor Q&amp;A · Ebibuuzo n'Ebyokuddamu
            </span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#121715] mt-1">
            Course Q&amp;A &amp; Instructor Support
          </h2>
          <p className="text-xs sm:text-sm text-[#121715]/70">
            Ask specific questions in Luganda or English and get direct feedback from <strong>{course.instructor_name}</strong> and fellow Ugandan creators.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {canParticipate ? (
            <button
              id="ask-new-question-btn"
              onClick={() => setShowAskModal(true)}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Ask a Question</span>
            </button>
          ) : (
            <button
              onClick={onOpenEnrollModal}
              className="px-4 py-2 rounded-full text-xs font-bold text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] border border-[#E8E3DA] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Enroll to Post Questions</span>
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
            }`}
          >
            All Questions ({questions.length})
          </button>

          <button
            onClick={() => setFilterType('instructor')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'instructor'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Answered by Instructor ({questions.filter(q => q.answers.some(a => a.is_instructor)).length})</span>
          </button>

          {currentLesson && (
            <button
              onClick={() => setFilterType('lesson')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterType === 'lesson'
                  ? 'bg-[#FF6321] text-white shadow-xs'
                  : 'bg-[#FF6321]/10 text-[#FF6321] hover:bg-[#FF6321]/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Current Lesson Only</span>
            </button>
          )}

          <button
            onClick={() => setFilterType('unresolved')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'unresolved'
                ? 'bg-[#0A2E24] text-white shadow-xs'
                : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Open Questions</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-[#121715]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#F5F2ED] border border-[#E8E3DA] text-xs focus:outline-none focus:border-[#0A2E24]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#121715]/40 hover:text-[#121715]"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* Instructor Notice Callout */}
      <div className="bg-[#0A2E24]/5 border border-[#0A2E24]/10 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <img
            src={course.instructor_avatar}
            alt={course.instructor_name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-[#0A2E24]">{course.instructor_name}</h4>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase">
                Active Instructor
              </span>
            </div>
            <p className="text-[11px] text-[#121715]/70">
              Typical response time: Under 24 hours · Luganda &amp; English support guaranteed.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-semibold text-[#0A2E24] flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#FF6321]" />
          <span>Luganda Audio &amp; Text Accepted</span>
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="p-10 text-center bg-[#F5F2ED] rounded-2xl border border-dashed border-[#E8E3DA] space-y-3">
          <MessageSquare className="w-10 h-10 text-[#121715]/30 mx-auto" />
          <h3 className="text-sm font-bold text-[#121715]">No questions found matching your filter</h3>
          <p className="text-xs text-[#121715]/60 max-w-sm mx-auto">
            Be the first to ask a question for this lesson! Our instructors respond with tailored video timestamps and tips.
          </p>
          {canParticipate && (
            <button
              onClick={() => setShowAskModal(true)}
              className="mt-2 px-4 py-2 rounded-full bg-[#0A2E24] text-white text-xs font-bold cursor-pointer"
            >
              Ask the Instructor
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            const instructorAnswer = q.answers.find((a) => a.is_instructor);

            return (
              <div
                key={q.id}
                id={`qa-question-card-${q.id}`}
                className={`bg-[#F5F2ED]/60 rounded-2xl border transition-all ${
                  isExpanded ? 'border-[#0A2E24]/30 shadow-xs' : 'border-[#E8E3DA] hover:border-[#0A2E24]/20'
                } overflow-hidden`}
              >
                {/* Question Summary Header */}
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3 select-none"
                >
                  <div className="flex items-start gap-3 flex-1">
                    
                    {/* Upvote Box */}
                    <button
                      type="button"
                      onClick={(e) => handleUpvoteQuestion(q.id, e)}
                      title="Upvote this question"
                      className="flex flex-col items-center justify-center min-w-[38px] p-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-[#E8E3DA] text-[#0A2E24] transition-colors cursor-pointer shrink-0 shadow-2xs group/up"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 group-hover/up:scale-110 transition-transform" />
                      <span className="text-[11px] font-black">{q.upvotes}</span>
                    </button>

                    <div className="space-y-1.5 flex-1">
                      
                      {/* Badges row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {q.lesson_title && (
                          <span className="px-2 py-0.5 rounded bg-white text-[#0A2E24] text-[10px] font-bold border border-[#E8E3DA] flex items-center gap-1">
                            <BookOpen className="w-2.5 h-2.5 text-[#FF6321]" />
                            <span className="truncate max-w-[200px]">{q.lesson_title}</span>
                          </span>
                        )}

                        {q.is_resolved ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Resolved by Instructor</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Open Discussion
                          </span>
                        )}

                        <span className="text-[10px] text-[#121715]/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{q.created_at}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-[#121715] leading-snug">
                        {q.title}
                      </h3>

                      {/* Content preview if collapsed */}
                      {!isExpanded && (
                        <p className="text-xs text-[#121715]/70 line-clamp-1">
                          {q.content}
                        </p>
                      )}

                      {/* Subtitle / Student info */}
                      <div className="flex items-center gap-2 text-[11px] text-[#121715]/60 pt-0.5">
                        <span className="font-semibold text-[#121715]">{q.student_name}</span>
                        {q.student_location && (
                          <span>· {q.student_location}</span>
                        )}
                        <span>· {q.answers.length} {q.answers.length === 1 ? 'Answer' : 'Answers'}</span>
                      </div>

                    </div>
                  </div>

                  <div className="shrink-0 pt-1 flex items-center gap-2">
                    {instructorAnswer && (
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Instructor Replied</span>
                      </span>
                    )}
                    <button className="p-1 rounded-lg text-[#121715]/40 hover:text-[#121715] transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details & Answers */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-[#E8E3DA] space-y-4 bg-white/70">
                    
                    {/* Full Question Body */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E8E3DA] space-y-2">
                      <p className="text-xs sm:text-sm text-[#121715]/85 leading-relaxed">
                        {q.content}
                      </p>

                      {q.content_luganda && (
                        <div className="pt-2 border-t border-[#F5F2ED] text-xs">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                            Luganda Note / Ebigambo eby’Essomo:
                          </span>
                          <p className="font-editorial italic text-[#0A2E24] leading-relaxed">
                            «{q.content_luganda}»
                          </p>
                        </div>
                      )}

                      {/* Question Tags */}
                      {q.tags && q.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-2">
                          {q.tags.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-medium bg-[#F5F2ED] text-[#121715]/60 px-2 py-0.5 rounded-md">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action buttons: Resolve Toggle */}
                      <div className="flex items-center justify-between pt-2 text-[11px] text-[#121715]/60 border-t border-[#F5F2ED]">
                        <button
                          type="button"
                          onClick={(e) => handleToggleResolved(q.id, e)}
                          className="text-[#0A2E24] hover:text-[#FF6321] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{q.is_resolved ? 'Mark as Unresolved' : 'Mark as Resolved ✓'}</span>
                        </button>

                        <span>Question ID: #{q.id.split('-').pop()}</span>
                      </div>
                    </div>

                    {/* Answers Thread */}
                    <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-[#0A2E24]/15">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2E24] flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{q.answers.length} {q.answers.length === 1 ? 'Response' : 'Responses'}</span>
                      </h4>

                      {q.answers.length === 0 ? (
                        <div className="p-4 rounded-xl bg-[#F5F2ED] text-xs text-[#121715]/60 italic">
                          No replies yet. Be the first to answer or check back shortly for the instructor's reply.
                        </div>
                      ) : (
                        q.answers.map((ans) => (
                          <div
                            key={ans.id}
                            id={`qa-answer-${ans.id}`}
                            className={`p-4 rounded-2xl border ${
                              ans.is_instructor
                                ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-500/20'
                                : 'bg-white border-[#E8E3DA]'
                            } space-y-2.5`}
                          >
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2.5">
                                {ans.author_avatar ? (
                                  <img
                                    src={ans.author_avatar}
                                    alt={ans.author_name}
                                    className="w-7 h-7 rounded-full object-cover border border-emerald-300"
                                  />
                                ) : (
                                  <div className="w-7 h-7 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center text-xs font-bold">
                                    <User className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-[#121715]">{ans.author_name}</span>
                                    {ans.is_instructor && (
                                      <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-extrabold uppercase flex items-center gap-0.5">
                                        <ShieldCheck className="w-2.5 h-2.5" />
                                        <span>Verified Instructor</span>
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-[#121715]/60">{ans.author_title}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-[10px] text-[#121715]/50">
                                <span>{ans.created_at}</span>
                                <button
                                  type="button"
                                  onClick={(e) => handleUpvoteAnswer(q.id, ans.id, e)}
                                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#E8E3DA] text-[#0A2E24] hover:bg-emerald-50 cursor-pointer font-bold transition-colors"
                                  title="Mark answer as helpful"
                                >
                                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                                  <span>{ans.upvotes}</span>
                                </button>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-[#121715]/85 leading-relaxed pl-1">
                              {ans.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Post an Answer Form */}
                    {canParticipate ? (
                      <form onSubmit={(e) => handlePostAnswer(q.id, e)} className="pt-2 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-[11px] font-bold text-[#0A2E24]">
                            Post a Reply or Clarification:
                          </label>

                          {/* Fast instructor toggle */}
                          <label className="flex items-center gap-1.5 text-[11px] text-[#0A2E24] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={replyAsInstructor}
                              onChange={(e) => setReplyAsInstructor(e.target.checked)}
                              className="rounded accent-[#0A2E24]"
                            />
                            <span className="font-semibold">Reply as Instructor ({course.instructor_name})</span>
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <textarea
                            rows={2}
                            value={replyTextMap[q.id] || ''}
                            onChange={(e) =>
                              setReplyTextMap((prev) => ({ ...prev, [q.id]: e.target.value }))
                            }
                            placeholder={`Reply to ${q.student_name}'s question...`}
                            className="flex-1 p-3 rounded-2xl bg-white border border-[#E8E3DA] text-xs focus:outline-none focus:border-[#0A2E24]"
                          />

                          <button
                            type="submit"
                            disabled={!(replyTextMap[q.id] || '').trim()}
                            className="px-4 py-3 rounded-2xl bg-[#0A2E24] hover:bg-[#0F3D30] disabled:opacity-40 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5 text-[#FF6321]" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-3 rounded-xl bg-[#F5F2ED] text-center text-xs text-[#121715]/70 flex items-center justify-between gap-3">
                        <span>Enroll in this course to join the discussion and post replies.</span>
                        <button
                          onClick={onOpenEnrollModal}
                          className="px-3 py-1 rounded-full bg-[#0A2E24] text-white text-xs font-bold cursor-pointer shrink-0"
                        >
                          Enroll (UGX {course.price_ugx.toLocaleString()})
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ASK A QUESTION MODAL                                                      */}
      {/* ========================================================================= */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E8E3DA] shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 my-8">
            
            <div className="flex items-start justify-between gap-4 border-b border-[#E8E3DA] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#0A2E24] text-[#FF6321] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-[#121715]">
                    Ask Course Instructor
                  </h3>
                </div>
                <p className="text-xs text-[#121715]/70 mt-1">
                  Post a question for <strong>{course.instructor_name}</strong> on <em>{course.title}</em>.
                </p>
              </div>

              <button
                onClick={() => setShowAskModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F2ED] hover:bg-[#E8E3DA] flex items-center justify-center text-xs font-bold text-[#121715] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              
              {/* Question Title */}
              <div className="space-y-1">
                <label className="font-bold text-[#121715]">Question Title / Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How do I make Luganda price text glow without CapCut Pro?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F5F2ED] border border-[#E8E3DA] text-xs focus:outline-none focus:border-[#0A2E24]"
                />
              </div>

              {/* Lesson Dropdown */}
              <div className="space-y-1">
                <label className="font-bold text-[#121715]">Associated Lesson</label>
                <select
                  value={newLessonId}
                  onChange={(e) => setNewLessonId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E8E3DA] text-xs focus:outline-none focus:border-[#0A2E24]"
                >
                  {course.lessons.map((les, idx) => (
                    <option key={les.id} value={les.id}>
                      Lesson {idx + 1}: {les.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detailed Description */}
              <div className="space-y-1">
                <label className="font-bold text-[#121715]">Question Details &amp; Context *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain what phone you are using, what you tried, and where you got stuck..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F5F2ED] border border-[#E8E3DA] text-xs focus:outline-none focus:border-[#0A2E24]"
                />
              </div>

              {/* Luganda Translation / Words (Optional) */}
              <div className="space-y-1">
                <label className="font-bold text-[#0A2E24] flex items-center gap-1">
                  <span>Luganda Note or Audio Transcript (Optional)</span>
                  <span className="text-[10px] text-[#121715]/50 font-normal">«Ebibuuzo mu Luganda»</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Obubaka bwange obw’Ebbeeyi bulabika bubi..."
                  value={newLugandaContent}
                  onChange={(e) => setNewLugandaContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* User details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#121715]">Your Name</label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E8E3DA] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#121715]">Location / Shop Name</label>
                  <input
                    type="text"
                    value={newStudentLocation}
                    onChange={(e) => setNewStudentLocation(e.target.value)}
                    placeholder="e.g. Masaka Nyendo"
                    className="w-full p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E8E3DA] text-xs"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="font-bold text-[#121715]">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. CapCut, Lighting, MoMo, Export"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E8E3DA] text-xs"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#E8E3DA] text-[#121715] font-semibold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Submit Question</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
