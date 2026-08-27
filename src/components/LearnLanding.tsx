import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Play, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Video, 
  Send, 
  ArrowRight,
  GraduationCap,
  Volume2,
  Tv,
  Zap,
  Palette,
  MessageSquare,
  Camera,
  TrendingUp,
  ShoppingBag,
  Check,
  Headphones
} from 'lucide-react';
import { Course, CourseCategory, Creator, TutorRequest } from '../types';
import { QuickScheduleModal } from './QuickScheduleModal';
import { LugandaAudioPreview } from './LugandaAudioPreview';
import { FreeLearningVault } from './FreeLearningVault';
import { CourseAudioSamplePlayer } from './CourseAudioSamplePlayer';

interface LearnLandingProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onRequestTutor?: () => void;
  onRequestTutorClick?: () => void;
  onTeachOnSomesa?: () => void;
  onTeachClick?: () => void;
  onOpenSubscriptionPlans?: () => void;
  onOpenPricing?: () => void;
  onSelectCreatorBySlug?: (slug: string) => void;
  onSubmitTutorRequest?: (req: Omit<TutorRequest, 'id' | 'created_at' | 'status'>) => void;
}

export const LearnLanding: React.FC<LearnLandingProps> = ({
  courses,
  onSelectCourse,
  onRequestTutor,
  onRequestTutorClick,
  onTeachOnSomesa,
  onTeachClick,
  onOpenSubscriptionPlans,
  onOpenPricing,
  onSelectCreatorBySlug,
  onSubmitTutorRequest
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlayingCourseId, setActivePlayingCourseId] = useState<string | null>(null);
  
  // Quick Schedule Modal state
  const [isQuickScheduleOpen, setIsQuickScheduleOpen] = useState(false);
  const [quickScheduleTopic, setQuickScheduleTopic] = useState('CapCut Video & Reels (Product Videos)');

  // Handlers for both prop variations
  const handleRequestTutor = onRequestTutor || onRequestTutorClick || (() => {});
  const handleTeach = onTeachOnSomesa || onTeachClick || (() => {});
  const handlePricing = onOpenSubscriptionPlans || onOpenPricing || (() => {});

  const handleOpenQuickSchedule = (topic: string) => {
    setQuickScheduleTopic(topic);
    setIsQuickScheduleOpen(true);
  };

  const handleScheduleSubmit = (reqData: Omit<TutorRequest, 'id' | 'created_at' | 'status'>) => {
    if (onSubmitTutorRequest) {
      onSubmitTutorRequest(reqData);
    }
  };

  const categories: { label: string; value: CourseCategory }[] = [
    { label: 'All Courses', value: 'All' },
    { label: 'Free Starter Kit', value: 'Free Starter Kit' },
    { label: 'CapCut Video', value: 'CapCut Video' },
    { label: 'Canva Design', value: 'Canva Design' },
    { label: 'WhatsApp Catalogues', value: 'WhatsApp Business' },
    { label: 'Smartphone Photography', value: 'Smartphone Photography' },
    { label: 'TikTok for Business', value: 'TikTok Strategy' },
    { label: 'E-commerce & MoMo', value: 'E-commerce' },
    { label: 'Soap & Candle Crafts', value: 'Artisan Crafts & Soaps' },
    { label: 'Coffee & Farm Agri', value: 'Agribusiness & Farm Management' },
    { label: 'AI & Digital Tools', value: 'AI & Digital Tools' }
  ];

  // Category Overview Cards metadata for the Quick Schedule showcase
  const categoryOverviews: {
    title: string;
    titleLuganda: string;
    category: CourseCategory;
    icon: React.ElementType;
    color: string;
    description: string;
    outcomes: string[];
    tutorTopic: string;
    dispatchBadge: string;
    popularIn: string;
  }[] = [
    {
      title: 'CapCut Video & Reels',
      titleLuganda: 'Okukwata & Okuseŋŋaanya Vidiyo ku Simu',
      category: 'CapCut Video',
      icon: Video,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Master mobile video editing to create high-converting product videos, TikToks, and Reels with Luganda voiceovers.',
      outcomes: [
        'Shoot dynamic product showcase clips',
        'Add Luganda voiceovers, subtitles & trending beats',
        'Create before-and-after customer transformations'
      ],
      tutorTopic: 'CapCut Video & Reels (Product Videos)',
      dispatchBadge: '⚡ 24h On-Site Dispatch Available',
      popularIn: 'Boutiques, Salons, Cafés & Auto Shops'
    },
    {
      title: 'Canva Graphics & Posters',
      titleLuganda: 'Ebifanyi by’Amaduuka n’Ebiwandiiko by’Emiwendo',
      category: 'Canva Design',
      icon: Palette,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Design professional price lists, promotional flyers, and social media flyers tailored to Ugandan retail.',
      outcomes: [
        'Custom shop price lists & discount cards',
        'Branded social media flyers with logo',
        'Print-ready window stickers & banner files'
      ],
      tutorTopic: 'Canva Graphics & Shop Posters',
      dispatchBadge: '⚡ Tutor sets up templates on your phone',
      popularIn: 'Supermarkets, Bakeries & Hardware Stores'
    },
    {
      title: 'WhatsApp Business & Catalogues',
      titleLuganda: 'Okutegeka Ebyamaguzi byo ku WhatsApp',
      category: 'WhatsApp Business',
      icon: MessageSquare,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Turn your WhatsApp into a 24/7 automated storefront with complete product catalogues and quick-reply tools.',
      outcomes: [
        'Upload 50+ shop items with prices & photos',
        'Set up automated greetings & out-of-hours replies',
        'Label orders by payment & delivery status'
      ],
      tutorTopic: 'WhatsApp Business Setup & Catalogues',
      dispatchBadge: '⚡ Complete shop cataloging in 1 session',
      popularIn: 'Wholesalers, Pharmacies & Fashion Retailers'
    },
    {
      title: 'Smartphone Product Photography',
      titleLuganda: 'Okukuba Ebifanyi Eby’omulembe ku Simu',
      category: 'Smartphone Photography',
      icon: Camera,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Capture sharp, vibrant product pictures using natural daylight and low-cost reflector tricks on your existing phone.',
      outcomes: [
        'Master daylight & window-lighting techniques',
        'Clean flat-lays for clothes, shoes & jewelry',
        'One-tap photo enhancement on mobile'
      ],
      tutorTopic: 'Smartphone Product Photography & Lighting',
      dispatchBadge: '⚡ Hands-on photo session in your shop',
      popularIn: 'Shoe Shops, Crafts, Tailors & Restaurants'
    },
    {
      title: 'TikTok Strategy for Local Shops',
      titleLuganda: 'Okugaziya Amaduuka ku TikTok',
      category: 'TikTok Strategy',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Engage local buyers with relatable Luganda storytelling, behind-the-scenes shop moments, and viral sounds.',
      outcomes: [
        'Film high-hook 15-second local trend videos',
        'Convert views into direct WhatsApp orders',
        'Utilize Kampala & Greater Masaka geotagging'
      ],
      tutorTopic: 'TikTok Marketing for Local Shops & Cafés',
      dispatchBadge: '⚡ Live filming rehearsal with instructor',
      popularIn: 'Youth Brands, Accessories & Events'
    },
    {
      title: 'Artisan Crafts & Soap Making',
      titleLuganda: 'Okukola Sabbuuni w’Emikono n’Emisanvu gy’Ebika',
      category: 'Artisan Crafts & Soaps',
      icon: Zap,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Practical cold-process soap formulation, herbal shampoo bars, and scented soy candles for boutique shops.',
      outcomes: [
        'Formulate natural herbal soaps with shea butter',
        'Hand-pour scented soy candles with clean wicks',
        'Package and label products for boutique retail'
      ],
      tutorTopic: 'Artisan Soap & Candle Workshop (On-Site)',
      dispatchBadge: '⚡ Tutor brings raw molds & oils to your location',
      popularIn: 'Women Groups, Salons, Spa & Lodges'
    },
    {
      title: 'Coffee Aggregation & Farm Ledger',
      titleLuganda: 'Okukunganya Emwanyi n’Okukebera Obubisi',
      category: 'Agribusiness & Farm Management',
      icon: ShoppingBag,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Quality grading, cherry float testing, moisture meter calibration, and smallholder farm delivery accounting.',
      outcomes: [
        'Moisture meter testing for 12% export grade',
        'Manage raised drying beds & solar tarps',
        'Digital farmer ledger & MoMo payout logs'
      ],
      tutorTopic: 'Harvest Quality Audit & Moisture Certification',
      dispatchBadge: '⚡ On-farm moisture verification visit',
      popularIn: 'Cooperatives, Outgrowers & Coffee Mills'
    },
    {
      title: 'AI Staging & Digital Automation',
      titleLuganda: 'Okukozesa AI Okukola Ebifanyi n’Okuddamu Abaguzi',
      category: 'AI & Digital Tools',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Use generative AI to place product photos into luxury scenes and set up automated bilingual customer chat flows.',
      outcomes: [
        'Generate AI studio backdrops for phone photos',
        'Create Canva Magic Studio promo posters',
        'Bilingual Luganda-English auto-reply templates'
      ],
      tutorTopic: 'AI Product Photo Staging Pack (10 Scenes)',
      dispatchBadge: '⚡ AI setup session directly on your phone',
      popularIn: 'Retail Boutiques, Artisans & Content Creators'
    },
    {
      title: 'E-commerce & Mobile Money Payments',
      titleLuganda: 'Okutunda ku Mutimbagano n’Okufuna MoMo',
      category: 'E-commerce',
      icon: ShoppingBag,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Streamline customer checkout with MTN MoMo, Airtel Money merchant codes, and structured digital order tracking.',
      outcomes: [
        'Generate instant payment links for clients',
        'Automate SMS and WhatsApp order receipts',
        'Prevent payment fraud & reconcile daily sales'
      ],
      tutorTopic: 'E-commerce & Mobile Money Payment Flow',
      dispatchBadge: '⚡ Payment integration during tutor visit',
      popularIn: 'Growing Distributors & Retail Chains'
    }
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (c.status !== 'published') return false;

      const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.title_luganda.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor_name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [courses, selectedCategory, searchQuery]);

  const scrollToCourses = () => {
    const el = document.getElementById('luganda-courses-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromOverview = (cat: CourseCategory) => {
    setSelectedCategory(cat);
    scrollToCourses();
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs font-semibold">
                <Volume2 className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Luganda-First Digital Academy</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A2E24]/40" />
                <span className="text-[#0A2E24]/80">Soma mu Luganda</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#121715] tracking-tight leading-[1.08]">
                Learn practical digital skills in <span className="text-[#0A2E24] underline decoration-[#FF6321] decoration-wavy decoration-2">Luganda</span>.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#121715]/80 font-normal leading-relaxed max-w-2xl">
                Master CapCut, Canva, WhatsApp Business, and smartphone photography with step-by-step video lessons taught by certified local creators in Greater Masaka, Kampala, and across Uganda.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="hero-explore-courses-btn"
                  onClick={scrollToCourses}
                  className="px-8 py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#FF6321]" />
                  <span>Explore Luganda Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-request-tutor-btn"
                  onClick={onRequestTutorClick}
                  className="px-7 py-4 text-base font-semibold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#E8E3DA] rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#FF6321]" />
                  <span>Request an In-Person Tutor for My Shop</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#121715]/75 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Single Course from UGX 5,000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>All-Access Pass (UGX 20k/mo)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>100% Smartphone Friendly</span>
                </div>
              </div>

            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xl space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#0A2E24] text-white flex items-center justify-center shadow">
                      <GraduationCap className="w-5 h-5 text-[#FF6321]" />
                    </div>
                    <div>
                      <p className="font-display font-extrabold text-sm text-[#121715]">SOMESA Academy</p>
                      <p className="text-[11px] text-[#121715]/60">Soma (Learn) &amp; Somesa (Teach)</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-200">
                    Live Video Player
                  </span>
                </div>

                {/* Video Mock Preview Card */}
                <div 
                  onClick={() => onSelectCourse(courses[0])}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-video bg-[#0A2E24]/10 border border-[#E8E3DA]"
                >
                  <img 
                    src={courses[0]?.thumbnail_url || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"} 
                    alt="Featured Lesson"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-[#FF6321] text-white text-[10px] font-bold tracking-wider uppercase mb-1 inline-block">
                          Luganda Audio
                        </span>
                        <p className="font-display font-bold text-sm text-white drop-shadow">
                          {courses[0]?.title}
                        </p>
                        <p className="text-[11px] text-white/80 font-editorial italic">
                          {courses[0]?.title_luganda}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white text-[#0A2E24] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dispatch Callout Box inside Card */}
                <div className="bg-[#F5F2ED] rounded-2xl p-4 border border-[#E8E3DA] flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#0A2E24]">Prefer hands-on training?</p>
                    <p className="text-[11px] text-[#121715]/70">We dispatch a certified tutor straight to your shop.</p>
                  </div>
                  <button
                    onClick={onRequestTutorClick}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors cursor-pointer shrink-0"
                  >
                    Send Tutor
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Trust Badge Banner */}
      <section className="bg-[#0A2E24] text-white py-5 px-4 sm:px-6 lg:px-8 border-y border-[#0A2E24]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF6321]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide">
              <strong>Soma (Learn) &amp; Somesa (Teach)</strong> — Practical digital skills tailored for Ugandan businesses and creators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTeach}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#FF6321]" />
              <span>Teach on SOMESA</span>
            </button>

            <button
              onClick={handlePricing}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-[#0A2E24] bg-[#F5F2ED] hover:bg-white transition-colors cursor-pointer"
            >
              View Pass Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Luganda Voiceover Audio Sample Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <LugandaAudioPreview 
          onSelectSampleCourse={(category) => {
            const mappedCat = category as CourseCategory;
            setSelectedCategory(mappedCat);
            scrollToCourses();
          }}
          onRequestTutor={handleRequestTutor}
        />
      </section>

      {/* Free Starter Learning Packs Vault for Member Accounts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <FreeLearningVault
          onSelectCourseCategory={(category) => {
            setSelectedCategory(category as CourseCategory);
            scrollToCourses();
          }}
          onRequestTutor={handleRequestTutor}
        />
      </section>

      {/* Interactive Category Overview & Quick Schedule Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
              <span>Skills Category Overview · Ebitundu by'Okusoma</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#121715] tracking-tight">
              Choose a Skill · Learn Online or Book an On-Site Tutor
            </h2>
            <p className="text-xs sm:text-sm text-[#121715]/70 max-w-2xl">
              Watch self-paced lessons in Luganda or use <strong>Quick Schedule</strong> to dispatch a certified creator to your shop for hands-on coaching.
            </p>
          </div>

          <button
            onClick={() => handleOpenQuickSchedule('CapCut Video & Reels (Product Videos)')}
            className="self-start md:self-auto px-5 py-2.5 rounded-full text-xs font-bold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#E8E3DA] shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>General Tutor Booking</span>
          </button>
        </div>

        {/* 6 Category Overview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryOverviews.map((catItem) => {
            const Icon = catItem.icon;
            const catCourseCount = courses.filter(c => c.category === catItem.category && c.status === 'published').length;

            return (
              <div 
                key={catItem.title}
                className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative group"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Dispatch Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${catItem.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[#0A2E24]/5 text-[#0A2E24] text-[10px] font-bold tracking-tight border border-[#0A2E24]/10">
                      {catItem.dispatchBadge}
                    </span>
                  </div>

                  {/* Title & Luganda Subtitle */}
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg sm:text-[19px] text-[#121715] group-hover:text-[#0A2E24] transition-colors leading-snug tracking-tight">
                      {catItem.title}
                    </h3>
                    <p className="font-editorial italic text-xs sm:text-[13px] text-[#0A2E24]/90 font-normal leading-normal">
                      «{catItem.titleLuganda}»
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#121715]/75 leading-relaxed">
                    {catItem.description}
                  </p>

                  {/* Outcomes Checklist */}
                  <div className="bg-[#F5F2ED] rounded-2xl p-3.5 space-y-2 border border-[#E8E3DA]/80">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0A2E24]">
                      Key In-Person &amp; Video Takeaways:
                    </p>
                    <ul className="space-y-1.5 text-[11px] text-[#121715]/80">
                      {catItem.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[10px] text-[#121715]/50 font-medium">
                    Best suited for: <span className="text-[#121715]/80 font-semibold">{catItem.popularIn}</span>
                  </p>

                </div>

                {/* Card Dual Actions */}
                <div className="pt-2 border-t border-[#E8E3DA] space-y-2">
                  
                  {/* Quick Schedule Button */}
                  <button
                    onClick={() => handleOpenQuickSchedule(catItem.tutorTopic)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
                    <span>Quick Schedule Tutor for This</span>
                  </button>

                  {/* Watch Video Lessons Filter Button */}
                  <button
                    onClick={() => handleSelectCategoryFromOverview(catItem.category)}
                    className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-[#121715]/80 hover:text-[#0A2E24] hover:bg-[#F5F2ED] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-[#0A2E24] fill-current" />
                    <span>Watch {catCourseCount} Video Lesson{catCourseCount !== 1 ? 's' : ''} →</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Main Course Discovery Section */}
      <section id="luganda-courses-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full">
              <Tv className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Video Library · Eby’okusoma</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#121715] tracking-tight">
              Luganda Video Academy
            </h2>
            <p className="text-xs sm:text-sm text-[#121715]/70 max-w-xl">
              Micro-lessons designed for fast implementation. Watch on your phone, follow along, and start seeing customer results today.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121715]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, e.g. CapCut, Canva..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E3DA] focus:border-[#0A2E24] rounded-2xl text-sm focus:outline-none placeholder-[#121715]/40 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#121715]/40 hover:text-[#121715]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filters Pills and Quick Schedule Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    id={`cat-filter-${cat.value.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A2E24] text-white shadow-sm ring-1 ring-[#0A2E24]'
                        : 'bg-white text-[#121715]/80 border border-[#E8E3DA] hover:bg-[#E8E3DA] hover:text-[#0A2E24]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* In-filter direct dispatch toggle */}
            <button
              id="cat-bar-quick-schedule-btn"
              onClick={() => {
                const matchedTopic = categoryOverviews.find(c => c.category === selectedCategory)?.tutorTopic || 'CapCut Video & Reels (Product Videos)';
                handleOpenQuickSchedule(matchedTopic);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#FF6321]/10 hover:bg-[#FF6321]/20 border border-[#FF6321]/30 text-[#0A2E24] text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
              <span>Quick Schedule Tutor for {selectedCategory === 'All' ? 'This' : selectedCategory}</span>
            </button>
          </div>

          {/* Quick Schedule Call-to-Action Bar */}
          <div 
            id="category-quick-schedule-cta-bar"
            className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#0A2E24]/15 shadow-sm hover:border-[#0A2E24]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#0A2E24] text-[#FF6321] flex items-center justify-center shrink-0 shadow-md">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF6321] bg-[#FF6321]/10 px-2 py-0.5 rounded-md">
                    ⚡ On-Site Tutor Dispatch
                  </span>
                  <span className="text-[11px] text-[#121715]/50 font-medium">
                    Kyotera · Masaka · Kampala · Greater Buganda
                  </span>
                </div>
                <h4 className="font-display font-extrabold text-sm sm:text-base text-[#121715]">
                  Prefer hands-on training for <span className="text-[#0A2E24] underline decoration-[#FF6321] decoration-2 underline-offset-2">{selectedCategory === 'All' ? 'your shop or business' : `«${selectedCategory}»`}</span>?
                </h4>
                <p className="text-xs text-[#121715]/70">
                  A certified instructor will visit your shop with step-by-step guidance tailored directly to your products and phone.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0">
              <button
                id="quick-schedule-action-bar-btn"
                onClick={() => {
                  const matchedTopic = categoryOverviews.find(c => c.category === selectedCategory)?.tutorTopic || 'CapCut Video & Reels (Product Videos)';
                  handleOpenQuickSchedule(matchedTopic);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                <Zap className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
                <span>Quick Schedule Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="full-form-action-bar-btn"
                onClick={handleRequestTutor}
                className="hidden sm:inline-flex px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#121715]/70 hover:text-[#0A2E24] hover:bg-[#F5F2ED] border border-[#E8E3DA] transition-colors cursor-pointer"
                title="Open detailed booking form"
              >
                Full Form
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E3DA] space-y-4">
            <BookOpen className="w-12 h-12 text-[#121715]/30 mx-auto" />
            <h3 className="font-display font-bold text-xl text-[#121715]">No courses found</h3>
            <p className="text-xs sm:text-sm text-[#121715]/60 max-w-md mx-auto">
              We couldn't find any courses matching your filter. Try clearing the search or choosing another topic category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => {
              const freePreviewCount = course.lessons.filter(l => l.is_free_preview).length;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8E3DA] shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Thumbnail */}
                  <div 
                    onClick={() => onSelectCourse(course)}
                    className="relative aspect-video overflow-hidden cursor-pointer bg-[#0A2E24]/5"
                  >
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#0A2E24]/90 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                        <Volume2 className="w-3 h-3 text-[#FF6321]" />
                        <span>Luganda Audio</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0A2E24] text-[11px] font-bold shadow-sm">
                        {course.category}
                      </span>
                    </div>

                    {/* Free Preview Pill */}
                    {freePreviewCount > 0 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wide shadow-sm">
                          Free Preview Available
                        </span>
                      </div>
                    )}

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration_minutes}m</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    
                    <div className="space-y-3">
                      {/* Rating & Level metadata */}
                      <div className="flex items-center justify-between text-xs text-[#121715]/60 pb-0.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{course.rating.toFixed(1)}</span>
                          </span>
                          <span className="text-[#121715]/25">·</span>
                          <span className="text-[#121715]/60 text-[11px] font-medium">{course.total_students} learners</span>
                        </div>
                        <span className="font-semibold text-[11px] text-[#0A2E24] bg-[#0A2E24]/5 px-2.5 py-0.5 rounded-full border border-[#0A2E24]/10">
                          {course.level}
                        </span>
                      </div>

                      {/* English Title & Luganda Subtitle */}
                      <div className="space-y-1.5">
                        <h3 
                          onClick={() => onSelectCourse(course)}
                          className="font-display font-bold text-base sm:text-lg text-[#121715] group-hover:text-[#0A2E24] cursor-pointer transition-colors leading-snug tracking-tight"
                        >
                          {course.title}
                        </h3>

                        <p className="font-editorial italic text-xs sm:text-[13px] text-[#0A2E24]/90 font-normal line-clamp-1 leading-normal">
                          «{course.title_luganda}»
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#121715]/70 line-clamp-2 leading-relaxed pt-0.5">
                        {course.description}
                      </p>

                      {/* Interactive Luganda Voice Audio Sample Player on Card */}
                      <div className="pt-1">
                        <CourseAudioSamplePlayer
                          course={course}
                          activePlayingCourseId={activePlayingCourseId}
                          onSetActivePlayingCourseId={setActivePlayingCourseId}
                        />
                      </div>
                    </div>

                    {/* Instructor Info & CTA */}
                    <div className="pt-4 border-t border-[#E8E3DA] space-y-3.5">
                      
                      <div className="flex items-center justify-between">
                        <div 
                          onClick={() => {
                            if (course.instructor_slug && onSelectCreatorBySlug) {
                              onSelectCreatorBySlug(course.instructor_slug);
                            }
                          }}
                          className="flex items-center gap-2.5 cursor-pointer group/inst"
                        >
                          <img
                            src={course.instructor_avatar}
                            alt={course.instructor_name}
                            className="w-8 h-8 rounded-full object-cover border border-[#E8E3DA]"
                          />
                          <div className="text-left">
                            <p className="text-xs font-semibold text-[#121715] group-hover/inst:text-[#0A2E24] transition-colors leading-tight">
                              {course.instructor_name}
                            </p>
                            <p className="text-[10px] text-[#121715]/50 mt-0.5">
                              {course.instructor_location || 'Uganda'}
                            </p>
                          </div>
                        </div>

                        {/* Price Badge */}
                        <div className="text-right">
                          <p className="text-xs font-bold text-[#0A2E24]">
                            UGX {course.price_ugx.toLocaleString()}
                          </p>
                          <p className="text-[9px] text-[#121715]/50 font-medium">
                            Or All-Access Pass
                          </p>
                        </div>
                      </div>

                      {/* Course Card Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const audioSection = document.getElementById('luganda-audio-preview-section');
                            if (audioSection) {
                              audioSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="px-3 py-2.5 rounded-xl font-bold text-xs text-[#0A2E24] bg-[#0A2E24]/5 hover:bg-[#0A2E24]/10 border border-[#0A2E24]/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                          title="Listen to Luganda audio voiceover sample"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#FF6321]" />
                          <span className="hidden sm:inline">Audio</span>
                        </button>

                        <button
                          onClick={() => onSelectCourse(course)}
                          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
                          <span>Start Learning →</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* In-Person Dispatch Feature Section ("Send a Tutor to My Shop") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-[#0A2E24] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>On-Site Workshop Service</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                Send a Certified Tutor to My Shop
              </h2>

              <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                Need personalized, 1-on-1 coaching for you or your shop staff? We dispatch trained female digital specialists to your location in Masaka, Kyotera, Kampala, Rakai, and surrounding districts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-white/90">
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                  <p className="font-bold text-[#FF6321] mb-0.5">1. Hands-On Practice</p>
                  <p className="text-white/70">Work on your actual products, inventory &amp; phone.</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                  <p className="font-bold text-[#FF6321] mb-0.5">2. Flexible Scheduling</p>
                  <p className="text-white/70">Choose morning or evening sessions when business is quiet.</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                  <p className="font-bold text-[#FF6321] mb-0.5">3. Local Luganda</p>
                  <p className="text-white/70">Explained clearly without confusing technical jargon.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
              <button
                id="dispatch-banner-quick-btn"
                onClick={() => handleOpenQuickSchedule('CapCut Video & Reels (Product Videos)')}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-[#0A2E24] bg-white hover:bg-[#F5F2ED] rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#FF6321] fill-current" />
                <span>⚡ Quick Schedule Tutor</span>
              </button>

              <button
                id="dispatch-banner-cta-btn"
                onClick={handleRequestTutor}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Full Tutor Request Form</span>
              </button>
              <p className="text-[11px] text-white/60 text-center lg:text-right">
                Fast confirmation via WhatsApp call/chat
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Subscription Pricing Summary Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#0A2E24] tracking-wider bg-[#0A2E24]/10 px-2.5 py-0.5 rounded-full">
              Flexible Pricing
            </span>
            <h3 className="font-display font-extrabold text-2xl text-[#121715]">
              Choose Single Course or All-Access Pass
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/70">
              Pay per course (UGX 5,000) or unlock every Luganda tutorial for UGX 20,000/month with Mobile Money.
            </p>
          </div>

          <button
            onClick={handlePricing}
            className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#0A2E24] bg-[#F5F2ED] hover:bg-[#E8E3DA] border border-[#E8E3DA] rounded-full transition-colors shrink-0 cursor-pointer"
          >
            Compare Pass Plans &amp; MoMo Rates
          </button>
        </div>
      </section>

      {/* Quick Schedule Modal */}
      <QuickScheduleModal
        isOpen={isQuickScheduleOpen}
        onClose={() => setIsQuickScheduleOpen(false)}
        initialTopic={quickScheduleTopic}
        onSubmitRequest={handleScheduleSubmit}
      />

    </div>
  );
};
