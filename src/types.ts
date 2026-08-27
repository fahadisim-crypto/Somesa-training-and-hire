export type CategoryType = 
  | 'All'
  | 'Video'
  | 'Photography'
  | 'Graphic Design'
  | 'Social Media'
  | 'Marketing'
  | 'E-commerce'
  | 'Branding'
  | 'Artisan Crafts & Soaps'
  | 'Agribusiness & Farm Management'
  | 'AI Tools & Automation';

export type CourseCategory = 
  | 'All'
  | 'CapCut Video'
  | 'Canva Design'
  | 'WhatsApp Business'
  | 'Smartphone Photography'
  | 'TikTok Strategy'
  | 'E-commerce'
  | 'Free Starter Kit'
  | 'Artisan Crafts & Soaps'
  | 'Agribusiness & Farm Management'
  | 'AI & Digital Tools';

export interface FreeLearningPack {
  id: string;
  title: string;
  titleLuganda: string;
  category: string;
  badge: string;
  durationMinutes: number;
  lessonsCount: number;
  thumbnailUrl: string;
  instructorName: string;
  instructorRole: string;
  instructorAvatar: string;
  description: string;
  descriptionLuganda: string;
  keyTakeaways: string[];
  toolsCovered: string[];
  videoUrl: string;
  isUnlockedDefault: boolean;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  duration_minutes: number;
  video_url: string;
  order_index: number;
  is_free_preview: boolean;
  summary?: string;
  resources?: string[];
}

export interface CourseResource {
  id: string;
  title: string;
  title_luganda?: string;
  description: string;
  type: 'pdf' | 'image' | 'template' | 'zip' | 'guide';
  file_size: string;
  download_url: string;
  preview_image_url?: string;
  lesson_id?: string;
  lesson_title?: string;
  tags?: string[];
  content_preview?: string[];
}

export interface CourseAnswer {
  id: string;
  question_id: string;
  author_id?: string;
  author_name: string;
  author_avatar?: string;
  author_title?: string;
  is_instructor?: boolean;
  content: string;
  created_at: string;
  upvotes: number;
}

export interface CourseQuestion {
  id: string;
  course_id: string;
  student_name: string;
  student_avatar?: string;
  student_location?: string;
  title: string;
  content: string;
  content_luganda?: string;
  lesson_id?: string;
  lesson_title?: string;
  created_at: string;
  upvotes: number;
  is_resolved: boolean;
  tags?: string[];
  answers: CourseAnswer[];
}

export interface Course {
  id: string;
  created_at: string;
  instructor_id: string;
  instructor_name: string;
  instructor_avatar: string;
  instructor_title: string;
  instructor_slug?: string;
  instructor_location?: string;
  title: string;
  title_luganda: string;
  slug: string;
  description: string;
  category: 'CapCut Video' | 'Canva Design' | 'WhatsApp Business' | 'Smartphone Photography' | 'TikTok Strategy' | 'E-commerce';
  thumbnail_url: string;
  price_ugx: number;
  is_all_access: boolean;
  duration_minutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  status: 'draft' | 'pending_review' | 'published';
  rating: number;
  total_students: number;
  lessons: Lesson[];
  featured?: boolean;
  whatYouWillLearn?: string[];
  requirements?: string[];
  resources?: CourseResource[];
  questions?: CourseQuestion[];
  reviews?: CourseReview[];
  audio_sample_url?: string;
  audio_sample_duration_seconds?: number;
  audio_sample_transcript_luganda?: string;
  audio_sample_transcript_english?: string;
}

export interface TutorRequest {
  id: string;
  created_at: string;
  requester_name: string;
  business_name?: string;
  phone: string;
  location: string;
  skill_topic: string;
  preferred_date?: string;
  notes?: string;
  assigned_tutor_id?: string;
  assigned_tutor_name?: string;
  status: 'New' | 'Tutor Assigned' | 'Completed' | 'Cancelled';
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  plan_type: 'single_course' | 'all_access_pass';
}

export interface ProjectCaseStudy {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorLocation: string;
  creatorRole: string;
  title: string;
  clientName?: string;
  category: CategoryType;
  coverImage: string;
  galleryImages?: string[];
  summary: string;
  whatIDid: string[];
  tools: string[];
  outcome: string;
  featured?: boolean;
  year?: string;
}

export interface CreatorService {
  name: string;
  description: string;
  typicalTurnaround?: string;
  startingRate?: string;
  category: CategoryType;
}

export interface CreatorExperience {
  role: string;
  organization: string;
  year: string;
  description?: string;
}

export interface Creator {
  id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  country: string;
  avatar: string;
  bio: string;
  shortBio?: string;
  available: boolean;
  trainingBadge?: {
    type: 'somesa' | 'partner' | 'verified';
    label: string;
    description: string;
    year?: string;
  };
  skills: string[];
  primaryCategory: CategoryType;
  services: CreatorService[];
  projects: ProjectCaseStudy[];
  experience: CreatorExperience[];
  tools: string[];
  socialLinks?: {
    whatsapp?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    portfolio?: string;
  };
  metrics?: {
    completedProjects: number;
    satisfiedClients: number;
    rating?: number;
  };
  reviews?: CreatorReview[];
  featured?: boolean;
}

export interface CreatorReview {
  id: string;
  creatorId: string;
  clientName: string;
  clientOrganization?: string;
  clientRole?: string;
  clientAvatar?: string;
  clientLocation?: string;
  rating: number;
  ratingBreakdown?: {
    communication: number;
    quality: number;
    deliverySpeed: number;
  };
  serviceHired: string;
  comment: string;
  projectOutcome?: string;
  createdAt: string;
  verifiedHire: boolean;
}

export interface CourseReview {
  id: string;
  course_id: string;
  student_name: string;
  student_avatar?: string;
  student_role_or_business?: string;
  student_location?: string;
  rating: number;
  comment: string;
  comment_luganda?: string;
  skill_applied?: string;
  outcome_highlight?: string;
  created_at: string;
  verified_learner: boolean;
  upvotes?: number;
}

export interface HiringTestimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientCompanyType: string;
  clientLocation: string;
  clientAvatar: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  creatorAvatar: string;
  creatorSlug: string;
  serviceProvided: string;
  projectTitle: string;
  quote: string;
  quoteLuganda?: string;
  outcomeMetric: string;
  metricLabel: string;
  rating: number;
  completedDate: string;
  tags: string[];
  verifiedHire: boolean;
}

export interface HireRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  clientName: string;
  organization?: string;
  phone: string;
  email?: string;
  serviceNeeded: string;
  projectDescription: string;
  budget?: string;
  timeline: 'As soon as possible' | 'This week' | 'This month' | 'Flexible';
  timelineEstimate?: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'In Progress' | 'Completed';
}

export interface FilterState {
  searchQuery: string;
  category: CategoryType;
  location: string;
  onlyAvailable: boolean;
  onlySomesaTrained: boolean;
}

export interface VideoCaptionCue {
  id: string;
  startTime: string;
  endTime: string;
  startSeconds: number;
  endSeconds: number;
  englishText: string;
  lugandaText: string;
}

export interface VideoAnalysisResult {
  title: string;
  summary: string;
  summaryLuganda: string;
  hookRating: number;
  lightingScore: string;
  soundClarity: string;
  suggestedHashtags: string[];
  callToActionEnglish: string;
  callToActionLuganda: string;
  whatsappStatusSnippet: string;
  cues: VideoCaptionCue[];
}

export interface AIPortfolioGenerationResult {
  tagline: string;
  bioEnglish: string;
  bioLuganda: string;
  suggestedSkills: string[];
  recommendedServices: {
    name: string;
    description: string;
    typicalTurnaround: string;
    startingRate: string;
    category: CategoryType;
  }[];
  suggestedProjects: {
    title: string;
    clientName: string;
    summary: string;
    whatIDid: string[];
    tools: string[];
    outcome: string;
    category: CategoryType;
  }[];
  aiImagePrompts: string[];
  pitchMessageEnglish: string;
  pitchMessageLuganda: string;
}

export interface CohortSurveyResponse {
  id: string;
  businessName?: string;
  industry: string;
  skillsNeeded: string[];
  hiringTimeline: string;
  monthlyCreativeBudget?: string;
  additionalFeedback?: string;
  contactEmailOrPhone?: string;
  createdAt: string;
}

export interface StudentUser {
  id: string;
  auth_type: 'google' | 'magic_link' | 'phone_pin';
  email?: string;
  phone?: string;
  name: string;
  avatar?: string;
  role: 'student' | 'creator' | 'business' | 'admin';
  company_name?: string;
  creator_slug?: string;
  pin_hash?: string;
  created_at: string;
}

export type ActiveView = 
  | 'home'
  | 'creators'
  | 'creator-profile'
  | 'services'
  | 'how-it-works'
  | 'for-businesses'
  | 'for-creators'
  | 'onboarding'
  | 'admin-stats'
  | 'learn'
  | 'course-detail'
  | 'tutor-request'
  | 'teach'
  | 'pricing'
  | 'ai-studio';



