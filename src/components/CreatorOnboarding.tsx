import React, { useState } from 'react';
import { 
  User, CheckCircle2, ArrowRight, ArrowLeft, Upload, Sparkles, Share2, 
  Copy, Check, MapPin, Briefcase, Plus, Trash2, Smartphone, Instagram, 
  MessageSquare, Layers, Eye, Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Creator, CategoryType, ProjectCaseStudy, CreatorService } from '../types';
import { saveCreatorToSupabase, isSupabaseConfigured } from '../lib/supabase';

interface CreatorOnboardingProps {
  onPublishSuccess: (newCreator: Creator) => void;
  onCancel: () => void;
  onViewCreatedProfile: (creator: Creator) => void;
  onViewExamplePortfolio?: () => void;
}

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
];

const SAMPLE_PROJECT_COVERS = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80'
];

const PRESET_SKILLS = [
  'Video Production', 'Smartphone Photography', 'CapCut Pro', 'Canva Pro',
  'Cold-Process Soap Making', 'Soy Candle Pouring', 'Natural Essential Oils',
  'Coffee Cherry Aggregation', 'Moisture Meter Testing', 'Farm Ledger Bookkeeping',
  'AI Product Staging', 'Canva Magic Studio', 'Bilingual AI Copywriting',
  'Branding & Logos', 'Packaging Design', 'TikTok Growth', 'Reels Strategy',
  'WhatsApp Catalogs', 'Lightroom Mobile', 'Product Styling', 'Food Photography'
];

export const CreatorOnboarding: React.FC<CreatorOnboardingProps> = ({
  onPublishSuccess,
  onCancel,
  onViewCreatedProfile,
  onViewExamplePortfolio
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Profile
  const [name, setName] = useState('Brenda Namubiru');
  const [title, setTitle] = useState('Digital Content & Video Creator');
  const [location, setLocation] = useState('Masaka, Uganda');
  const [avatar, setAvatar] = useState(SAMPLE_AVATARS[0]);
  const [shortBio, setShortBio] = useState('I help local retail shops and cafes tell authentic visual stories through crisp mobile video and photography.');
  const [whatsapp, setWhatsapp] = useState('+256 704 556677');
  const [instagram, setInstagram] = useState('@brenda.creates');
  const [tiktok, setTiktok] = useState('@brendanamubiru');
  const [available, setAvailable] = useState(true);

  // Step 2: Skills & Services
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Video Production', 'CapCut Pro', 'Canva Pro', 'Smartphone Photography'
  ]);
  const [primaryCategory, setPrimaryCategory] = useState<CategoryType>('Video');
  const [serviceName, setServiceName] = useState('Short-Form Video & Reels Package');
  const [serviceDesc, setServiceDesc] = useState('3-5 edited vertical video reels with sound effects, dynamic text, and captions.');
  const [serviceRate, setServiceRate] = useState('UGX 150,000 / $40');
  const [serviceTurnaround, setServiceTurnaround] = useState('2–3 days');

  // Step 3: Work / Project
  const [projectTitle, setProjectTitle] = useState('Local Roots Café TikTok Series');
  const [clientName, setClientName] = useState('Local Roots Café');
  const [projectCategory, setProjectCategory] = useState<CategoryType>('Video');
  const [projectCover, setProjectCover] = useState(SAMPLE_PROJECT_COVERS[0]);
  const [projectSummary, setProjectSummary] = useState('Produced 4 high-energy behind-the-scenes barista reels showcasing signature brews and brunch dishes.');
  const [projectOutcome, setProjectOutcome] = useState('Drove over 15,000 local views on TikTok and generated 25+ new customer table bookings.');
  const [toolsUsed, setToolsUsed] = useState('CapCut, Canva, iPhone 13');

  // Published Result
  const [publishedCreator, setPublishedCreator] = useState<Creator | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAiAutoFill = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/portfolio-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: name || 'Ugandan Artisan Creator',
          tradeCategory: primaryCategory,
          location: location || 'Uganda',
          experienceYears: '2',
          targetAudience: 'Local Ugandan businesses, boutique shops, and direct buyers'
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        const d = data.data;
        if (d.tagline) setTitle(d.tagline);
        if (d.bioEnglish) setShortBio(d.bioEnglish);
        if (d.suggestedSkills && d.suggestedSkills.length > 0) {
          setSelectedSkills(d.suggestedSkills.slice(0, 5));
        }
        if (d.recommendedServices && d.recommendedServices[0]) {
          const s = d.recommendedServices[0];
          setServiceName(s.name);
          setServiceDesc(s.description);
          setServiceRate(s.startingRate);
          setServiceTurnaround(s.typicalTurnaround);
        }
        if (d.suggestedProjects && d.suggestedProjects[0]) {
          const p = d.suggestedProjects[0];
          setProjectTitle(p.title);
          setClientName(p.clientName);
          setProjectSummary(p.summary);
          setProjectOutcome(p.outcome);
          if (p.tools) setToolsUsed(p.tools.join(', '));
        }
      }
    } catch (e) {
      console.error('AI Auto fill error:', e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handlePublish = () => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProjectId = `proj-${Date.now()}`;
    const newCreatorId = `creator-${Date.now()}`;

    const newProject: ProjectCaseStudy = {
      id: newProjectId,
      creatorId: newCreatorId,
      creatorName: name,
      creatorAvatar: avatar,
      creatorLocation: location,
      creatorRole: title,
      title: projectTitle,
      clientName: clientName || undefined,
      category: projectCategory,
      coverImage: projectCover,
      summary: projectSummary,
      whatIDid: [
        'Content planning and storyboarding',
        'Mobile cinematography and lighting setup',
        'Video editing with pacing, text hooks, and sound sync in CapCut',
        'Deliverable package preparation for social channels'
      ],
      tools: toolsUsed.split(',').map((t) => t.trim()).filter(Boolean),
      outcome: projectOutcome,
      featured: true,
      year: '2026'
    };

    const newService: CreatorService = {
      name: serviceName,
      description: serviceDesc,
      typicalTurnaround: serviceTurnaround,
      startingRate: serviceRate,
      category: primaryCategory
    };

    const newCreator: Creator = {
      id: newCreatorId,
      slug,
      name,
      title,
      location,
      country: 'Uganda',
      avatar,
      bio: shortBio,
      shortBio,
      available,
      trainingBadge: {
        type: 'somesa',
        label: 'SOMESA-trained',
        description: 'Verified participant in digital media & creative production track.',
        year: '2026'
      },
      skills: selectedSkills.length > 0 ? selectedSkills : ['Video Production', 'Canva Pro'],
      primaryCategory,
      services: [newService],
      projects: [newProject],
      experience: [
        {
          role: 'Digital Creator Fellow',
          organization: 'SOMESA Digital Skills Programme',
          year: '2026',
          description: 'Completed practical mobile content creation and client project workflows.'
        }
      ],
      tools: toolsUsed.split(',').map((t) => t.trim()).filter(Boolean),
      socialLinks: {
        whatsapp,
        instagram,
        tiktok
      },
      metrics: {
        completedProjects: 1,
        satisfiedClients: 1,
        rating: 5.0
      },
      featured: false
    };

    setPublishedCreator(newCreator);
    onPublishSuccess(newCreator);
    // Directly persist to Supabase
    saveCreatorToSupabase(newCreator);
    setStep(4);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A2E24', '#FF6321', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCopyLink = () => {
    if (!publishedCreator) return;
    const url = `${window.location.origin}/creators/${publishedCreator.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!publishedCreator) return;
    const url = `${window.location.origin}/creators/${publishedCreator.slug}`;
    const text = encodeURIComponent(`I just published my official creative portfolio on SOMESA! Check out my work and services: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#121715]/60 hover:text-[#121715] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel &amp; return to explore</span>
          </button>

          <div className="flex items-center gap-2">
            {onViewExamplePortfolio && (
              <button
                type="button"
                onClick={onViewExamplePortfolio}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#E8E3DA] px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>See Sample Portfolio</span>
              </button>
            )}

            <span className="text-xs font-bold text-[#0A2E24] bg-[#0A2E24]/10 px-3 py-1 rounded-full">
              Portfolio Builder
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] shadow-xs mb-8">
          <div className="grid grid-cols-4 gap-2 text-center">
            
            <div className={`space-y-1 ${step >= 1 ? 'text-[#0A2E24]' : 'text-[#121715]/40'}`}>
              <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-[#0A2E24]' : 'bg-[#E8E3DA]'}`} />
              <p className="text-[11px] font-bold">1. Profile</p>
            </div>

            <div className={`space-y-1 ${step >= 2 ? 'text-[#0A2E24]' : 'text-[#121715]/40'}`}>
              <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-[#0A2E24]' : 'bg-[#E8E3DA]'}`} />
              <p className="text-[11px] font-bold">2. Skills</p>
            </div>

            <div className={`space-y-1 ${step >= 3 ? 'text-[#0A2E24]' : 'text-[#121715]/40'}`}>
              <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-[#0A2E24]' : 'bg-[#E8E3DA]'}`} />
              <p className="text-[11px] font-bold">3. First Work</p>
            </div>

            <div className={`space-y-1 ${step >= 4 ? 'text-[#0A2E24]' : 'text-[#121715]/40'}`}>
              <div className={`h-1.5 rounded-full ${step >= 4 ? 'bg-[#0A2E24]' : 'bg-[#E8E3DA]'}`} />
              <p className="text-[11px] font-bold">4. Publish</p>
            </div>

          </div>
        </div>

        {/* Step 1: Profile Information */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121715] tracking-tight mb-1">
                  Step 1: Your Creator Identity
                </h2>
                <p className="text-xs sm:text-sm text-[#121715]/70 leading-relaxed">
                  Tell clients who you are and where you are based.
                </p>
              </div>

              {/* AI Auto-generate Profile Action */}
              <button
                id="onboarding-ai-autofill-btn"
                type="button"
                onClick={handleAiAutoFill}
                disabled={isAiGenerating}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0A2E24] to-[#124B3C] text-white text-xs font-bold hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                <Sparkles className={`w-4 h-4 text-[#FF6321] ${isAiGenerating ? 'animate-spin' : ''}`} />
                <span>{isAiGenerating ? 'Generating with AI...' : 'Auto-Fill with Somesa AI'}</span>
              </button>
            </div>

            {/* Profile Avatar Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#121715]">
                Choose Profile Photo
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {SAMPLE_AVATARS.map((avUrl, idx) => (
                  <img
                    key={idx}
                    src={avUrl}
                    alt={`Avatar option ${idx + 1}`}
                    onClick={() => setAvatar(avUrl)}
                    className={`w-14 h-14 rounded-2xl object-cover cursor-pointer transition-all ${
                      avatar === avUrl ? 'ring-4 ring-[#0A2E24] scale-105 shadow-md' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Name & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Full Name <span className="text-[#FF6321]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Brenda Namubiru"
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Professional Title <span className="text-[#FF6321]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Digital Content & Video Creator"
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Location & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Location (Town, Country) <span className="text-[#FF6321]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kyotera, Uganda"
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Availability Status
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={available}
                      onChange={(e) => setAvailable(e.target.checked)}
                      className="w-4 h-4 accent-[#0A2E24]"
                    />
                    <span className="text-xs font-medium text-[#121715]">
                      🟢 Open for new client projects right now
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                About Me (1–2 sentences)
              </label>
              <textarea
                rows={3}
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                placeholder="What kind of projects do you love doing for small businesses?"
                className="w-full p-3.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-2xl text-sm focus:outline-none leading-relaxed"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#121715] mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+256 700 000000"
                  className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E8E3DA] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#121715] mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E8E3DA] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#121715] mb-1">
                  TikTok Handle
                </label>
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E8E3DA] rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Step 1 Next Button */}
            <div className="pt-4 border-t border-[#E8E3DA] flex justify-end">
              <button
                id="onboarding-step1-next"
                onClick={() => setStep(2)}
                disabled={!name.trim() || !title.trim()}
                className="px-8 py-3.5 text-sm font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] disabled:opacity-50 rounded-full shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Skills</span>
                <ArrowRight className="w-4 h-4 text-[#FF6321]" />
              </button>
            </div>

          </div>
        )}

        {/* Step 2: Skills & Services */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121715] tracking-tight mb-1">
                Step 2: Skills &amp; Services
              </h2>
              <p className="text-xs sm:text-sm text-[#121715]/70 leading-relaxed">
                Select your tool proficiencies and describe a key service package you offer.
              </p>
            </div>

            {/* Primary Category */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-2">
                Primary Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Video', 'Photography', 'Graphic Design', 'Social Media', 'Marketing', 'E-commerce', 'Branding', 'Artisan Crafts & Soaps', 'Agribusiness & Farm Management', 'AI Tools & Automation'] as CategoryType[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPrimaryCategory(cat)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      primaryCategory === cat
                        ? 'bg-[#0A2E24] text-white border-[#0A2E24]'
                        : 'bg-[#F5F2ED] text-[#121715]/80 border-[#E8E3DA] hover:bg-[#E8E3DA]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Skills Chips */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-2">
                Select Your Skills (Click to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_SKILLS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A2E24] text-white border-[#0A2E24]'
                          : 'bg-[#F5F2ED] text-[#121715]/80 border-[#E8E3DA] hover:bg-[#E8E3DA]'
                      }`}
                    >
                      {skill} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Service Package */}
            <div className="bg-[#F5F2ED] p-5 rounded-2xl border border-[#E8E3DA] space-y-4">
              <h3 className="font-display font-bold text-sm text-[#0A2E24] uppercase tracking-wider">
                Feature a Service Package
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. Short-Form Video & Reels Package"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1">
                  What's included in this package?
                </label>
                <input
                  type="text"
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  placeholder="e.g. 3 edited vertical videos, music sync, subtitles"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1">
                    Starting Rate
                  </label>
                  <input
                    type="text"
                    value={serviceRate}
                    onChange={(e) => setServiceRate(e.target.value)}
                    placeholder="e.g. UGX 150,000 / $40"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121715] mb-1">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={serviceTurnaround}
                    onChange={(e) => setServiceTurnaround(e.target.value)}
                    placeholder="e.g. 2–3 days"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DA] rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 text-xs font-semibold text-[#121715]/70 hover:text-[#121715] cursor-pointer"
              >
                Back to Profile
              </button>

              <button
                id="onboarding-step2-next"
                onClick={() => setStep(3)}
                className="px-8 py-3.5 text-sm font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to First Work</span>
                <ArrowRight className="w-4 h-4 text-[#FF6321]" />
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Add First Work Project */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121715] tracking-tight mb-1">
                Step 3: Add Your First Project
              </h2>
              <p className="text-xs sm:text-sm text-[#121715]/70 leading-relaxed">
                Show clients real proof of your work and the tools you used.
              </p>
            </div>

            {/* Choose Cover Media */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#121715]">
                Select Project Cover Image
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SAMPLE_PROJECT_COVERS.map((coverUrl, idx) => (
                  <img
                    key={idx}
                    src={coverUrl}
                    alt={`Cover option ${idx + 1}`}
                    onClick={() => setProjectCover(coverUrl)}
                    className={`w-full h-16 rounded-xl object-cover cursor-pointer transition-all ${
                      projectCover === coverUrl ? 'ring-4 ring-[#0A2E24] scale-105 shadow-md' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project Title & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Project Title <span className="text-[#FF6321]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Local Coffee Brand Reels Campaign"
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Client or Business Name <span className="text-[#121715]/40 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Mulondo Coffee Co."
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Project Summary */}
            <div>
              <label className="block text-xs font-bold text-[#121715] mb-1.5">
                The Project Description <span className="text-[#FF6321]">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
                placeholder="What did you create and how did it help the business?"
                className="w-full p-3.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-2xl text-sm focus:outline-none leading-relaxed"
              />
            </div>

            {/* Tools used & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Tools Used (comma separated)
                </label>
                <input
                  type="text"
                  value={toolsUsed}
                  onChange={(e) => setToolsUsed(e.target.value)}
                  placeholder="CapCut, Canva, Smartphone Camera"
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1.5">
                  Result / Outcome
                </label>
                <input
                  type="text"
                  value={projectOutcome}
                  onChange={(e) => setProjectOutcome(e.target.value)}
                  placeholder="e.g. Delivered 12 social assets driving 35% more orders"
                  className="w-full px-3.5 py-2.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-xs font-semibold text-[#121715]/70 hover:text-[#121715] cursor-pointer"
              >
                Back to Skills
              </button>

              <button
                id="onboarding-publish-btn"
                onClick={handlePublish}
                disabled={!projectTitle.trim() || !projectSummary.trim()}
                className="px-8 py-4 text-base font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FF6321]" />
                <span>Publish Portfolio</span>
              </button>
            </div>

          </div>
        )}

        {/* Step 4: Published Celebration */}
        {step === 4 && publishedCreator && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E3DA] shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            
            <div className="w-20 h-20 rounded-3xl bg-[#0A2E24] text-white mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#121715] tracking-tight mb-2">
                Your portfolio is ready!
              </h2>
              <p className="text-base text-[#121715]/80 max-w-md mx-auto">
                Congratulations {publishedCreator.name.split(' ')[0]}! Your professional creator profile and first case study are now live on SOMESA.
              </p>
            </div>

            {/* Shareable Link Box */}
            <div className="bg-[#F5F2ED] rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] max-w-md mx-auto flex items-center justify-between gap-3">
              <div className="text-left truncate">
                <p className="text-[10px] uppercase font-bold text-[#0A2E24] tracking-wider">
                  Your Public Profile URL
                </p>
                <p className="font-mono text-sm font-semibold text-[#121715] truncate">
                  somesa.africa/{publishedCreator.slug}
                </p>
              </div>

              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E8E3DA] hover:bg-[#E8E3DA] text-[#0A2E24] flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Supabase / Live status badge */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0A2E24] bg-[#0A2E24]/5 py-2 px-4 rounded-full max-w-md mx-auto border border-[#0A2E24]/10">
              <Database className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>
                {isSupabaseConfigured 
                  ? 'Saved & Synced to Live Supabase Database' 
                  : 'Published to SOMESA Talent Directory'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="view-my-new-portfolio-btn"
                onClick={() => onViewCreatedProfile(publishedCreator)}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-full shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#FF6321]" />
                <span>View my portfolio</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>Share on WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
