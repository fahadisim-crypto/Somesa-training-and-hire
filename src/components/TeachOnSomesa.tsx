import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Video, 
  User, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  ShieldCheck,
  Upload,
  Globe
} from 'lucide-react';
import { Course, CourseCategory, Creator, Lesson } from '../types';
import confetti from 'canvas-confetti';

interface TeachOnSomesaProps {
  creators: Creator[];
  onSubmitCourse: (course: Course) => void;
  onBack: () => void;
  onExploreCourses: () => void;
}

export const TeachOnSomesa: React.FC<TeachOnSomesaProps> = ({
  creators,
  onSubmitCourse,
  onBack,
  onExploreCourses
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Course Info
  const [title, setTitle] = useState('');
  const [titleLuganda, setTitleLuganda] = useState('');
  const [category, setCategory] = useState<CourseCategory>('CapCut Video');
  const [description, setDescription] = useState('');
  const [priceUgx, setPriceUgx] = useState<number>(5000);
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80');

  // Step 2: Lessons
  const [lessons, setLessons] = useState<{
    title: string;
    durationMinutes: number;
    videoUrl: string;
    isFreePreview: boolean;
    summary: string;
  }[]>([
    {
      title: 'Lesson 1: Introduction & Tools Setup',
      durationMinutes: 8,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      isFreePreview: true,
      summary: 'Enteekateeka n’engeri y’okutandika mu Luganda.'
    },
    {
      title: 'Lesson 2: Core Editing & Production Steps',
      durationMinutes: 12,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      isFreePreview: false,
      summary: 'Okukwata ebintu eby’enkizo n’enkyukakyuka.'
    }
  ]);

  // Step 3: Instructor Details
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(creators[0]?.id || '');
  const [customInstructorName, setCustomInstructorName] = useState('');
  const [customInstructorTitle, setCustomInstructorTitle] = useState('');
  const [isCustomInstructor, setIsCustomInstructor] = useState(false);

  // Submitted state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddLesson = () => {
    setLessons([
      ...lessons,
      {
        title: `Lesson ${lessons.length + 1}: `,
        durationMinutes: 10,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        isFreePreview: false,
        summary: ''
      }
    ]);
  };

  const handleRemoveLesson = (index: number) => {
    if (lessons.length <= 1) return;
    setLessons(lessons.filter((_, idx) => idx !== index));
  };

  const handleUpdateLesson = (index: number, field: string, value: any) => {
    const updated = [...lessons];
    updated[index] = { ...updated[index], [field]: value };
    setLessons(updated);
  };

  const handleSubmit = () => {
    const selectedCreator = creators.find(c => c.id === selectedCreatorId);

    const instructor_id = isCustomInstructor ? `inst-${Date.now()}` : (selectedCreator?.id || 'creator-aisha');
    const instructor_name = isCustomInstructor ? (customInstructorName || 'Local Creator') : (selectedCreator?.name || 'Local Creator');
    const instructor_avatar = isCustomInstructor ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' : (selectedCreator?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    const instructor_title = isCustomInstructor ? (customInstructorTitle || 'Digital Creator') : (selectedCreator?.title || 'Digital Creator');
    const instructor_slug = isCustomInstructor ? undefined : selectedCreator?.slug;
    const instructor_location = isCustomInstructor ? 'Uganda' : selectedCreator?.location;

    const totalDuration = lessons.reduce((acc, curr) => acc + Number(curr.durationMinutes || 0), 0);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `course-${Date.now()}`;

    const formattedLessons: Lesson[] = lessons.map((l, idx) => ({
      id: `les-${Date.now()}-${idx}`,
      course_id: `course-${Date.now()}`,
      title: l.title,
      duration_minutes: Number(l.durationMinutes) || 5,
      video_url: l.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      order_index: idx + 1,
      is_free_preview: l.isFreePreview,
      summary: l.summary
    }));

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      created_at: new Date().toISOString(),
      instructor_id,
      instructor_name,
      instructor_avatar,
      instructor_title,
      instructor_slug,
      instructor_location,
      title,
      title_luganda: titleLuganda,
      slug,
      description,
      category: category as any,
      thumbnail_url: thumbnailUrl,
      price_ugx: priceUgx,
      is_all_access: true,
      duration_minutes: totalDuration || 30,
      level,
      language: 'Luganda (with simple English terms)',
      status: 'pending_review', // Saved for admin approval
      rating: 5.0,
      total_students: 0,
      lessons: formattedLessons,
      whatYouWillLearn: [
        'Practical step-by-step mobile techniques',
        'Direct local language explanations',
        'Real Ugandan shop case studies'
      ]
    };

    onSubmitCourse(newCourse);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isSubmitted ? (
          /* Submission Success */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E3DA] shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-300">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-3xl bg-[#0A2E24] text-white mx-auto flex items-center justify-center shadow-xl ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="absolute -top-1 -right-1 bg-[#FF6321] text-white p-1.5 rounded-full shadow">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Course Submitted · Pending Admin Review</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#121715]">
                «{title}» is in the queue!
              </h2>
              <p className="text-xs sm:text-sm text-[#121715]/75 max-w-md mx-auto leading-relaxed">
                Our curriculum team will review your video lessons for audio clarity and Luganda quality. Once approved, it will be published to the SOMESA Video Academy.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors cursor-pointer shadow-xs"
              >
                Browse Luganda Courses
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Teach on SOMESA · Creator Academy</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#121715] tracking-tight">
                Turn your digital skills into recurring income.
              </h1>
              <p className="text-sm sm:text-base text-[#121715]/80 max-w-2xl mx-auto leading-relaxed">
                Create short, practical tutorials in Luganda and earn from student enrollments and subscription revenue.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
              {[
                { step: 1, label: '1. Course Info' },
                { step: 2, label: '2. Lessons' },
                { step: 3, label: '3. Instructor' },
                { step: 4, label: '4. Review' }
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step as any)}
                  className={`py-2.5 px-2 rounded-xl transition-all border ${
                    currentStep === s.step
                      ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                      : currentStep > s.step
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white text-[#121715]/60 border-[#E8E3DA]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Form Steps Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-xl space-y-6">
              
              {/* STEP 1: Course Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in-50 duration-200">
                  <div className="border-b border-[#E8E3DA] pb-3">
                    <h3 className="font-display font-bold text-xl text-[#121715]">
                      Step 1: Course Basic Information
                    </h3>
                    <p className="text-xs text-[#121715]/60">
                      Enter the English and Luganda titles and category.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#121715]">
                        Course Title (English) <span className="text-[#FF6321]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Making Product Videos on CapCut"
                        className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#121715]">
                        Course Subtitle in Luganda <span className="text-[#FF6321]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={titleLuganda}
                        onChange={(e) => setTitleLuganda(e.target.value)}
                        placeholder="e.g. Okukola Vidiyo z'Ebyagula ku CapCut"
                        className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none font-editorial italic"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#121715]">
                          Category <span className="text-[#FF6321]">*</span>
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none cursor-pointer"
                        >
                          <option value="CapCut Video">CapCut Video</option>
                          <option value="Canva Design">Canva Design</option>
                          <option value="WhatsApp Business">WhatsApp Business</option>
                          <option value="Smartphone Photography">Smartphone Photography</option>
                          <option value="TikTok Strategy">TikTok Strategy</option>
                          <option value="E-commerce">E-commerce</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#121715]">
                          Target Price (UGX)
                        </label>
                        <input
                          type="number"
                          value={priceUgx}
                          onChange={(e) => setPriceUgx(Number(e.target.value))}
                          step="1000"
                          className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#121715]">
                        Course Description <span className="text-[#FF6321]">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Explain what local shop owners and learners will be able to do after finishing this course..."
                        className="w-full p-4 bg-[#F5F2ED]/50 border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={!title || !description}
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>Continue to Lessons</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Lessons */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#121715]">
                        Step 2: Video Lessons
                      </h3>
                      <p className="text-xs text-[#121715]/60">
                        Add lesson titles, video URLs, and mark at least one free preview.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddLesson}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#0A2E24] bg-[#0A2E24]/10 hover:bg-[#0A2E24]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Lesson</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {lessons.map((lesson, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E8E3DA] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0A2E24] bg-white px-2.5 py-0.5 rounded-md border border-[#E8E3DA]">
                            Lesson #{idx + 1}
                          </span>
                          {lessons.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(idx)}
                              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2 space-y-1">
                            <label className="block text-[11px] font-bold text-[#121715]/80">
                              Lesson Title
                            </label>
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => handleUpdateLesson(idx, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#E8E3DA] rounded-xl text-xs focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-[#121715]/80">
                              Duration (Mins)
                            </label>
                            <input
                              type="number"
                              value={lesson.durationMinutes}
                              onChange={(e) => handleUpdateLesson(idx, 'durationMinutes', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#E8E3DA] rounded-xl text-xs focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-[#121715]/80">
                            Video MP4 URL or Embed (YouTube / Vimeo / Supabase MP4)
                          </label>
                          <input
                            type="url"
                            value={lesson.videoUrl}
                            onChange={(e) => handleUpdateLesson(idx, 'videoUrl', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-2 bg-white border border-[#E8E3DA] rounded-xl text-xs focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-4 pt-1">
                          <label className="flex items-center gap-2 text-xs font-semibold text-[#121715] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={lesson.isFreePreview}
                              onChange={(e) => handleUpdateLesson(idx, 'isFreePreview', e.target.checked)}
                              className="rounded border-[#E8E3DA] text-[#0A2E24] focus:ring-0"
                            />
                            <span>Make this lesson a Free Preview</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 rounded-full text-xs font-bold text-[#121715]/70 hover:text-[#121715] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Instructor</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Instructor Selection */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in-50 duration-200">
                  <div className="border-b border-[#E8E3DA] pb-3">
                    <h3 className="font-display font-bold text-xl text-[#121715]">
                      Step 3: Instructor Details
                    </h3>
                    <p className="text-xs text-[#121715]/60">
                      Link this course to your existing SOMESA creator profile or create a new instructor profile.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                        <input
                          type="radio"
                          name="instructor_type"
                          checked={!isCustomInstructor}
                          onChange={() => setIsCustomInstructor(false)}
                        />
                        <span>Link to Existing Creator Profile</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                        <input
                          type="radio"
                          name="instructor_type"
                          checked={isCustomInstructor}
                          onChange={() => setIsCustomInstructor(true)}
                        />
                        <span>Enter New Instructor Name</span>
                      </label>
                    </div>

                    {!isCustomInstructor ? (
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#121715]">
                          Select Creator Profile
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {creators.map((c) => (
                            <div
                              key={c.id}
                              onClick={() => setSelectedCreatorId(c.id)}
                              className={`p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                                selectedCreatorId === c.id
                                  ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-xs'
                                  : 'bg-[#F5F2ED] text-[#121715] border-[#E8E3DA] hover:bg-[#E8E3DA]'
                              }`}
                            >
                              <img
                                src={c.avatar}
                                alt={c.name}
                                className="w-10 h-10 rounded-full object-cover border"
                              />
                              <div>
                                <p className="text-xs font-bold">{c.name}</p>
                                <p className={`text-[10px] ${selectedCreatorId === c.id ? 'text-white/80' : 'text-[#121715]/60'}`}>
                                  {c.title}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-[#121715]">
                            Instructor Name
                          </label>
                          <input
                            type="text"
                            value={customInstructorName}
                            onChange={(e) => setCustomInstructorName(e.target.value)}
                            placeholder="e.g. Florence Nabakooza"
                            className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] rounded-2xl text-sm focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-[#121715]">
                            Professional Title / Bio
                          </label>
                          <input
                            type="text"
                            value={customInstructorTitle}
                            onChange={(e) => setCustomInstructorTitle(e.target.value)}
                            placeholder="e.g. Mobile Filmmaker & CapCut Educator"
                            className="w-full px-4 py-3 bg-[#F5F2ED]/50 border border-[#E8E3DA] rounded-2xl text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-full text-xs font-bold text-[#121715]/70 hover:text-[#121715] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Review &amp; Submit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in-50 duration-200">
                  <div className="border-b border-[#E8E3DA] pb-3">
                    <h3 className="font-display font-bold text-xl text-[#121715]">
                      Step 4: Final Review &amp; Submit
                    </h3>
                    <p className="text-xs text-[#121715]/60">
                      Confirm your course details before sending to the editorial review team.
                    </p>
                  </div>

                  <div className="bg-[#F5F2ED] rounded-2xl p-5 border border-[#E8E3DA] space-y-4 text-xs">
                    <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                      <span className="text-[#121715]/60">Title:</span>
                      <span className="font-bold text-[#0A2E24]">{title}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                      <span className="text-[#121715]/60">Luganda Subtitle:</span>
                      <span className="font-editorial italic font-medium">{titleLuganda}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                      <span className="text-[#121715]/60">Category:</span>
                      <span className="font-semibold">{category}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                      <span className="text-[#121715]/60">Price:</span>
                      <span className="font-bold text-[#0A2E24]">UGX {priceUgx.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#121715]/60">Lessons:</span>
                      <span className="font-semibold">{lessons.length} video lessons</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 rounded-full text-xs font-bold text-[#121715]/70 hover:text-[#121715] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-8 py-4 rounded-full font-bold text-sm text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#FF6321]" />
                      <span>Submit Course for Review</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
