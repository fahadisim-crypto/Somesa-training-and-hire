import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Video, 
  Subtitles, 
  Edit3, 
  Check, 
  Copy, 
  Download, 
  Play, 
  Pause, 
  RefreshCw, 
  Volume2, 
  Briefcase, 
  Send, 
  Plus, 
  Trash2, 
  Eye, 
  UploadCloud, 
  HelpCircle, 
  Languages, 
  CheckCircle2, 
  MessageSquare, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { 
  CategoryType, 
  Creator, 
  VideoCaptionCue, 
  VideoAnalysisResult, 
  AIPortfolioGenerationResult 
} from '../types';

interface AIPortfolioVideoStudioProps {
  onAddCreator?: (creator: Creator) => void;
  onNavigateView?: (view: string) => void;
}

const PRESET_DEMO_VIDEOS = [
  {
    id: 'demo-soap',
    title: 'Handmade Cold-Process Herbal Soap Pouring',
    category: 'Artisan Crafts & Soaps' as CategoryType,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1607006314644-88574620f49c?auto=format&fit=crop&w=800&q=80',
    description: 'Demonstrating organic shea butter formulation, essential oil blending, and mold curing in Kyotera.',
    duration: 30
  },
  {
    id: 'demo-coffee',
    title: 'Masaka Coffee Cherries Float & Moisture Audit',
    category: 'Agribusiness & Farm Management' as CategoryType,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    description: 'Raised drying bed quality management and digital moisture meter testing for 12.5% export lot.',
    duration: 30
  },
  {
    id: 'demo-product',
    title: 'Boutique Handbag Natural Window Lighting Showcase',
    category: 'Video' as CategoryType,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Using 45-degree morning sunlight and DIY white reflector board to highlight leather stitching.',
    duration: 25
  },
  {
    id: 'demo-ai',
    title: 'AI Product Photo Staging & Background Magic',
    category: 'AI Tools & Automation' as CategoryType,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Placing phone product photos into photorealistic African luxury spa backgrounds using AI.',
    duration: 28
  }
];

export const AIPortfolioVideoStudio: React.FC<AIPortfolioVideoStudioProps> = ({
  onAddCreator,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<'video-captions' | 'portfolio-builder' | 'ai-prompts' | 'copilot'>('video-captions');

  // Video Captions State
  const [selectedDemoVideo, setSelectedDemoVideo] = useState(PRESET_DEMO_VIDEOS[0]);
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [videoTitleInput, setVideoTitleInput] = useState(PRESET_DEMO_VIDEOS[0].title);
  const [videoCategoryInput, setVideoCategoryInput] = useState<CategoryType>(PRESET_DEMO_VIDEOS[0].category);
  const [videoNotesInput, setVideoNotesInput] = useState('');
  const [isAnalyzingVideo, setIsAnalyzingVideo] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VideoAnalysisResult | null>(null);
  
  // Video Player Subtitles Overlay State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitleMode, setSubtitleMode] = useState<'both' | 'english' | 'luganda' | 'off'>('both');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Portfolio Builder State
  const [creatorName, setCreatorName] = useState('Nalwanga Zulaika');
  const [creatorCategory, setCreatorCategory] = useState<CategoryType>('Artisan Crafts & Soaps');
  const [creatorLocation, setCreatorLocation] = useState('Kyotera, Uganda');
  const [experienceYears, setExperienceYears] = useState('3');
  const [targetAudience, setTargetAudience] = useState('Boutique lodges, organic gift shops, and bridal hampers');
  const [isGeneratingPortfolio, setIsGeneratingPortfolio] = useState(false);
  const [portfolioResult, setPortfolioResult] = useState<AIPortfolioGenerationResult | null>(null);
  const [appliedToProfileSuccess, setAppliedToProfileSuccess] = useState(false);

  // Copilot Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: "Oli otya! I'm your **Somesa AI Creative Copilot**. I can help you draft high-converting video captions in English & Luganda, calculate your service pricing in UGX, or polish your portfolio case studies. How can I support your trade today?"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Run initial video analysis on mount or demo change
  useEffect(() => {
    handleAnalyzeVideo(selectedDemoVideo.title, selectedDemoVideo.category, selectedDemoVideo.description, selectedDemoVideo.duration);
  }, [selectedDemoVideo]);

  const handleAnalyzeVideo = async (title: string, category: CategoryType, description?: string, duration?: number) => {
    setIsAnalyzingVideo(true);
    try {
      const response = await fetch('/api/ai/analyze-video-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoTitle: title,
          tradeCategory: category,
          videoDescription: description || videoNotesInput,
          durationSeconds: duration || 30,
          userNotes: videoNotesInput
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setAnalysisResult(resData.data);
      }
    } catch (err) {
      console.error('Error analyzing video captions:', err);
    } finally {
      setIsAnalyzingVideo(false);
    }
  };

  const handleUpdateCueText = (cueId: string, lang: 'english' | 'luganda', newText: string) => {
    if (!analysisResult) return;
    const updatedCues = analysisResult.cues.map(cue => {
      if (cue.id === cueId) {
        return lang === 'english' ? { ...cue, englishText: newText } : { ...cue, lugandaText: newText };
      }
      return cue;
    });
    setAnalysisResult({ ...analysisResult, cues: updatedCues });
  };

  const handleAddCue = () => {
    if (!analysisResult) return;
    const lastCue = analysisResult.cues[analysisResult.cues.length - 1];
    const newStart = lastCue ? lastCue.endSeconds : 0;
    const newEnd = newStart + 5;
    const formatTime = (sec: number) => `00:${sec < 10 ? '0' : ''}${sec}`;

    const newCue: VideoCaptionCue = {
      id: `cue-${Date.now()}`,
      startTime: formatTime(newStart),
      endTime: formatTime(newEnd),
      startSeconds: newStart,
      endSeconds: newEnd,
      englishText: 'Add your English sentence here...',
      lugandaText: 'Wandiika ebigambo byo mu Luganda wano...'
    };

    setAnalysisResult({
      ...analysisResult,
      cues: [...analysisResult.cues, newCue]
    });
  };

  const handleDeleteCue = (cueId: string) => {
    if (!analysisResult) return;
    setAnalysisResult({
      ...analysisResult,
      cues: analysisResult.cues.filter(c => c.id !== cueId)
    });
  };

  const handleGeneratePortfolio = async () => {
    setIsGeneratingPortfolio(true);
    setAppliedToProfileSuccess(false);
    try {
      const response = await fetch('/api/ai/portfolio-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName,
          tradeCategory: creatorCategory,
          location: creatorLocation,
          experienceYears,
          targetAudience
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setPortfolioResult(resData.data);
      }
    } catch (err) {
      console.error('Error generating portfolio:', err);
    } finally {
      setIsGeneratingPortfolio(false);
    }
  };

  const handleApplyToCreatorDirectory = () => {
    if (!portfolioResult || !onAddCreator) return;

    const newCreator: Creator = {
      id: `creator-ai-${Date.now()}`,
      slug: creatorName.toLowerCase().replace(/\s+/g, '-'),
      name: creatorName,
      title: portfolioResult.tagline || `${creatorCategory} Specialist`,
      location: creatorLocation,
      country: 'Uganda',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: portfolioResult.bioEnglish,
      shortBio: portfolioResult.tagline,
      available: true,
      trainingBadge: {
        type: 'somesa',
        label: 'SOMESA-trained',
        description: 'Certified via SOMESA AI Portfolio & Trade Verification.',
        year: '2026'
      },
      skills: portfolioResult.suggestedSkills || ['Crafting', 'Video', 'Marketing'],
      primaryCategory: creatorCategory,
      services: portfolioResult.recommendedServices || [],
      projects: (portfolioResult.suggestedProjects || []).map((p, idx) => ({
        id: `proj-ai-${idx}-${Date.now()}`,
        creatorId: `creator-ai-${Date.now()}`,
        creatorName,
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        creatorLocation,
        creatorRole: creatorCategory,
        title: p.title,
        clientName: p.clientName,
        category: creatorCategory,
        coverImage: 'https://images.unsplash.com/photo-1607006314644-88574620f49c?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [],
        summary: p.summary,
        whatIDid: p.whatIDid,
        tools: p.tools,
        outcome: p.outcome,
        featured: true,
        year: '2026'
      })),
      experience: [
        {
          role: 'Lead Trade Practitioner',
          organization: `${creatorName} Studio`,
          year: '2024–2026',
          description: `Delivered professional ${creatorCategory} solutions for clients across ${creatorLocation}.`
        }
      ],
      tools: ['Smartphone Pro', 'Canva', 'WhatsApp Business'],
      metrics: {
        completedProjects: 5,
        satisfiedClients: 8,
        rating: 5.0
      },
      featured: true
    };

    onAddCreator(newCreator);
    setAppliedToProfileSuccess(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();
      if (data.reply) {
        setChatMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      }
    } catch (err) {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: "Oli otya! For instant guidance, check out our recommended rate card: Product Reels UGX 60,000–90,000; Soap Workshops UGX 200,000; Coffee Audits UGX 180,000." 
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Video time update listener for synchronized subtitle overlay
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Find active cue card based on current video timestamp
  const currentActiveCue = analysisResult?.cues.find(
    c => currentTime >= c.startSeconds && currentTime <= c.endSeconds
  );

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Export SRT file
  const downloadSRT = () => {
    if (!analysisResult) return;
    let srtContent = '';
    analysisResult.cues.forEach((cue, index) => {
      srtContent += `${index + 1}\n`;
      srtContent += `00:${cue.startTime},000 --> 00:${cue.endTime},000\n`;
      srtContent += `${cue.englishText}\n`;
      srtContent += `[LG] ${cue.lugandaText}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(analysisResult.title || 'somesa-captions').toLowerCase().replace(/\s+/g, '-')}.srt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="ai-portfolio-video-studio" className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-br from-[#0A2E24] via-[#0F3D30] to-[#164E3F] text-white rounded-3xl p-6 sm:p-10 border border-[#0A2E24] shadow-2xl relative overflow-hidden">
          {/* Decorative glowing background orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF6321]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6321] animate-pulse" />
                <span>SOMESA AI Creative Studio · Powered by Gemini 3.7</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                AI Video Subtitling & Bilingual Portfolio Studio.
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Upload your trade and product videos to generate synchronised, editable English and natural Luganda captions. Build comprehensive artisan and creator portfolios in seconds.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                  LG
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Bilingual Luganda Engine</p>
                  <p className="text-[11px] text-white/60">Culturally accurate phrasing & MoMo CTAs</p>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FF6321]/20 text-[#FF6321] flex items-center justify-center font-bold text-xs">
                  SRT
                </div>
                <div>
                  <p className="text-xs font-bold text-white">CapCut Ready Export</p>
                  <p className="text-[11px] text-white/60">Export instant .SRT subtitle files</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tab Pills */}
          <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10 mt-8">
            <button
              onClick={() => setActiveTab('video-captions')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'video-captions'
                  ? 'bg-[#FF6321] text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Caption & Subtitle Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio-builder')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'portfolio-builder'
                  ? 'bg-[#FF6321] text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>AI Portfolio & Bio Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-prompts')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'ai-prompts'
                  ? 'bg-[#FF6321] text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Product Staging Prompts</span>
            </button>

            <button
              onClick={() => setActiveTab('copilot')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'copilot'
                  ? 'bg-[#FF6321] text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Somesa AI Copilot Chat</span>
            </button>
          </div>
        </div>

        {/* TAB 1: VIDEO CAPTIONS & SUBTITLE EDITOR */}
        {activeTab === 'video-captions' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Step 1: Video Selector / Input */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#121715]">
                    1. Choose or Upload a Video to Subtitle
                  </h3>
                  <p className="text-xs sm:text-sm text-[#121715]/70">
                    Select one of our trade demonstrations or paste your own product video link.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0A2E24] bg-emerald-100 px-3 py-1 rounded-full">
                    {isAnalyzingVideo ? '⚡ Gemini AI Subtitling in progress...' : 'Ready for Analysis'}
                  </span>
                </div>
              </div>

              {/* Preset Demo Videos Carousel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRESET_DEMO_VIDEOS.map((demo) => {
                  const isSelected = selectedDemoVideo.id === demo.id;
                  return (
                    <div
                      key={demo.id}
                      onClick={() => {
                        setSelectedDemoVideo(demo);
                        setVideoTitleInput(demo.title);
                        setVideoCategoryInput(demo.category);
                      }}
                      className={`rounded-2xl border-2 p-3 transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#FF6321] bg-[#FFF8F5] shadow-md ring-2 ring-[#FF6321]/20'
                          : 'border-[#E8E3DA] hover:border-[#0A2E24]/40 bg-white'
                      }`}
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-stone-100">
                        <img 
                          src={demo.thumbnail} 
                          alt={demo.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                            isSelected ? 'bg-[#FF6321] text-white' : 'bg-white/80 text-[#0A2E24]'
                          }`}>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {demo.duration}s
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-[#FF6321]">
                          {demo.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#121715] leading-snug line-clamp-2">
                          {demo.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Details Accordion / Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#121715]">Video Title / Headline</label>
                  <input
                    type="text"
                    value={videoTitleInput}
                    onChange={(e) => setVideoTitleInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                    placeholder="e.g. Handmade Lemongrass Soap Batch"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#121715]">Trade Category</label>
                  <select
                    value={videoCategoryInput}
                    onChange={(e) => setVideoCategoryInput(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#121715] focus:outline-none focus:border-[#0A2E24] bg-white"
                  >
                    <option value="Artisan Crafts & Soaps">Artisan Crafts & Soaps</option>
                    <option value="Agribusiness & Farm Management">Agribusiness & Farm Management</option>
                    <option value="AI Tools & Automation">AI Tools & Automation</option>
                    <option value="Video">Video</option>
                    <option value="Photography">Photography</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => handleAnalyzeVideo(videoTitleInput, videoCategoryInput, selectedDemoVideo.description, selectedDemoVideo.duration)}
                    disabled={isAnalyzingVideo}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isAnalyzingVideo ? 'animate-spin' : ''}`} />
                    <span>{isAnalyzingVideo ? 'Re-analyzing with AI...' : 'Re-generate Subtitles'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Live Synchronised Dual-Language Player & Subtitle Editor */}
            {analysisResult && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Interactive Video Player with Live Subtitle Overlay */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E3DA] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-[#FF6321]" />
                        <h4 className="font-display font-bold text-sm text-[#121715]">
                          Live Dual-Language Preview
                        </h4>
                      </div>

                      {/* Subtitle language switcher */}
                      <div className="flex items-center gap-1 bg-[#F5F2ED] p-1 rounded-xl text-[10px] font-bold">
                        <button
                          onClick={() => setSubtitleMode('both')}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            subtitleMode === 'both' ? 'bg-[#0A2E24] text-white' : 'text-[#121715]/70'
                          }`}
                        >
                          Dual
                        </button>
                        <button
                          onClick={() => setSubtitleMode('english')}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            subtitleMode === 'english' ? 'bg-[#0A2E24] text-white' : 'text-[#121715]/70'
                          }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => setSubtitleMode('luganda')}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            subtitleMode === 'luganda' ? 'bg-[#0A2E24] text-white' : 'text-[#121715]/70'
                          }`}
                        >
                          LG
                        </button>
                        <button
                          onClick={() => setSubtitleMode('off')}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            subtitleMode === 'off' ? 'bg-[#0A2E24] text-white' : 'text-[#121715]/70'
                          }`}
                        >
                          Off
                        </button>
                      </div>
                    </div>

                    {/* Video Player Container */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                      <video
                        ref={videoRef}
                        src={selectedDemoVideo.url}
                        onTimeUpdate={handleTimeUpdate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        controls
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support video playback.
                      </video>

                      {/* LIVE SUBTITLE OVERLAY */}
                      {subtitleMode !== 'off' && currentActiveCue && (
                        <div className="absolute bottom-12 left-4 right-4 flex flex-col items-center justify-center text-center pointer-events-none transition-all duration-150">
                          <div className="bg-black/85 backdrop-blur-md text-white rounded-xl px-3.5 py-2 max-w-sm border border-white/20 shadow-2xl space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
                            {(subtitleMode === 'both' || subtitleMode === 'english') && (
                              <p className="text-xs sm:text-sm font-bold text-yellow-300 leading-snug drop-shadow-md">
                                {currentActiveCue.englishText}
                              </p>
                            )}
                            {(subtitleMode === 'both' || subtitleMode === 'luganda') && (
                              <p className="text-[11px] sm:text-xs font-semibold text-emerald-300 italic leading-snug drop-shadow-md">
                                «{currentActiveCue.lugandaText}»
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Active Cue Time Indicator */}
                    <div className="bg-[#F5F2ED] p-3 rounded-xl flex items-center justify-between text-xs text-[#121715]/80">
                      <span className="font-mono font-bold text-[#0A2E24]">
                        ⏱ Time: {Math.floor(currentTime)}s / {selectedDemoVideo.duration}s
                      </span>
                      <span className="font-medium text-[11px] text-[#FF6321]">
                        {currentActiveCue ? `Active: ${currentActiveCue.startTime} - ${currentActiveCue.endTime}` : 'No active cue'}
                      </span>
                    </div>

                    {/* AI Video Health & Quality Badges */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider">
                          Hook Score
                        </span>
                        <p className="font-display font-black text-lg text-emerald-900">
                          {analysisResult.hookRating}/10
                        </p>
                        <p className="text-[10px] text-emerald-800/80">High 3-second retention</p>
                      </div>

                      <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider">
                          Lighting Audit
                        </span>
                        <p className="font-bold text-xs text-amber-900 truncate">
                          {analysisResult.lightingScore}
                        </p>
                        <p className="text-[10px] text-amber-800/80">Natural daylight rating</p>
                      </div>
                    </div>

                    {/* Export / Download Subtitle Buttons */}
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={downloadSRT}
                        className="w-full py-2.5 rounded-xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Export .SRT Subtitle File (CapCut & Premiere)</span>
                      </button>

                      <button
                        onClick={() => {
                          const fullCopy = analysisResult.cues
                            .map(c => `[${c.startTime} - ${c.endTime}]\nEN: ${c.englishText}\nLG: ${c.lugandaText}\n`)
                            .join('\n');
                          copyToClipboard(fullCopy, 'all_captions');
                        }}
                        className="w-full py-2.5 rounded-xl bg-white border border-[#0A2E24]/20 hover:bg-[#F5F2ED] text-[#0A2E24] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {copiedKey === 'all_captions' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Captions Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy All Bilingual Captions</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right Column: Editable Subtitle Timetable & Caption Cues */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-sm space-y-6">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                          <Edit3 className="w-3.5 h-3.5 text-[#FF6321]" />
                          <span>Interactive Subtitle Cue Editor</span>
                        </div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#121715]">
                          Edit English & Luganda Captions
                        </h3>
                        <p className="text-xs text-[#121715]/70">
                          Click any sentence below to edit words, fix pronunciation, or adapt local Luganda dialects.
                        </p>
                      </div>

                      <button
                        onClick={handleAddCue}
                        className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Subtitle Cue</span>
                      </button>
                    </div>

                    {/* Subtitle Cue List */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                      {analysisResult.cues.map((cue, index) => {
                        const isCurrentlyPlaying = currentTime >= cue.startSeconds && currentTime <= cue.endSeconds;

                        return (
                          <div
                            key={cue.id}
                            className={`rounded-2xl p-4 border transition-all space-y-3 ${
                              isCurrentlyPlaying
                                ? 'border-[#FF6321] bg-[#FFF8F5] ring-2 ring-[#FF6321]/20 shadow-sm'
                                : 'border-[#E8E3DA] bg-[#FDFBF7] hover:border-[#0A2E24]/30'
                            }`}
                          >
                            {/* Cue Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#0A2E24] text-white text-[10px] font-black flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <span className="font-mono text-xs font-bold text-[#0A2E24] bg-white px-2 py-0.5 rounded-md border border-[#E8E3DA]">
                                  {cue.startTime} ➔ {cue.endTime}
                                </span>
                                {isCurrentlyPlaying && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#FF6321] animate-pulse">
                                    ● Playing in video
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => handleDeleteCue(cue.id)}
                                className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete this cue"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* English Subtitle Input */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-bold text-[#121715]/70">
                                <span>English Subtitle</span>
                                <span className="text-[10px] text-[#121715]/40">Editable</span>
                              </div>
                              <input
                                type="text"
                                value={cue.englishText}
                                onChange={(e) => handleUpdateCueText(cue.id, 'english', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E3DA] text-xs font-semibold text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                              />
                            </div>

                            {/* Luganda Subtitle Input */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800">
                                <span className="flex items-center gap-1">
                                  <Languages className="w-3 h-3 text-[#FF6321]" />
                                  <span>Luganda Translation (Oluganda)</span>
                                </span>
                                <span className="text-[10px] text-emerald-700/60">Editable</span>
                              </div>
                              <input
                                type="text"
                                value={cue.lugandaText}
                                onChange={(e) => handleUpdateCueText(cue.id, 'luganda', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-950 focus:outline-none focus:border-emerald-600 italic"
                              />
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Ready-to-Post Social Caption & Hashtags Generator */}
                    <div className="bg-[#F5F2ED] rounded-2xl p-5 border border-[#E8E3DA] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider">
                          Ready-to-Post Social Caption (WhatsApp / TikTok)
                        </span>
                        <button
                          onClick={() => {
                            const postCopy = `${analysisResult.title}\n\n${analysisResult.summary}\n«${analysisResult.summaryLuganda}»\n\nCall to Action:\n${analysisResult.callToActionEnglish}\n${analysisResult.callToActionLuganda}\n\n${analysisResult.suggestedHashtags.join(' ')}`;
                            copyToClipboard(postCopy, 'social_post');
                          }}
                          className="text-xs font-bold text-[#FF6321] hover:text-[#E5571B] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'social_post' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Post</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-white rounded-xl p-3.5 border border-[#E8E3DA] text-xs text-[#121715]/80 space-y-2">
                        <p className="font-bold text-[#121715]">{analysisResult.title}</p>
                        <p className="italic text-[#0A2E24]">«{analysisResult.summaryLuganda}»</p>
                        <p className="text-emerald-700 font-semibold">{analysisResult.callToActionEnglish}</p>
                        <p className="text-[11px] text-[#FF6321] font-medium">
                          {analysisResult.suggestedHashtags.join(' ')}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: AI PORTFOLIO & BIO BUILDER */}
        {activeTab === 'portfolio-builder' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-sm space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[#FF6321] text-xs font-bold uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Instant Artisan & Creator Portfolio Wizard</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121715] tracking-tight">
                    Generate Your Professional Portfolio Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-[#121715]/70 max-w-2xl leading-relaxed">
                    Enter your trade, location, and target audience. Somesa AI will build structured bios in English & Luganda, tiered service packages with realistic UGX pricing, and case study drafts.
                  </p>
                </div>

                <button
                  onClick={handleGeneratePortfolio}
                  disabled={isGeneratingPortfolio}
                  className="px-6 py-3 rounded-full bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <Sparkles className={`w-4 h-4 text-[#FF6321] ${isGeneratingPortfolio ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingPortfolio ? 'Crafting Portfolio...' : '✨ Generate with Somesa AI'}</span>
                </button>
              </div>

              {/* Form Input Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#121715]">Full Name / Studio Brand</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                    placeholder="e.g. Harriet Namatovu"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#121715]">Trade / Discipline</label>
                  <select
                    value={creatorCategory}
                    onChange={(e) => setCreatorCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold text-[#121715] focus:outline-none focus:border-[#0A2E24] bg-white"
                  >
                    <option value="Artisan Crafts & Soaps">Artisan Crafts & Soaps</option>
                    <option value="Agribusiness & Farm Management">Agribusiness & Farm Management</option>
                    <option value="AI Tools & Automation">AI Tools & Automation</option>
                    <option value="Video">Video Production</option>
                    <option value="Photography">Commercial Photography</option>
                    <option value="Graphic Design">Graphic Design & Posters</option>
                    <option value="E-commerce">E-commerce & WhatsApp</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#121715]">Location in Uganda</label>
                  <input
                    type="text"
                    value={creatorLocation}
                    onChange={(e) => setCreatorLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                    placeholder="e.g. Masaka, Uganda"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#121715]">Years of Experience</label>
                  <input
                    type="text"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                    placeholder="e.g. 3 years"
                  />
                </div>
              </div>

              {/* Target Audience Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#121715]">Target Clients & Core Strengths</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                  placeholder="e.g. Retail boutiques, bridal gift boxes, lodges, and on-site training workshops"
                />
              </div>

              {/* AI Generated Portfolio Output */}
              {portfolioResult && (
                <div className="pt-6 border-t border-[#E8E3DA] space-y-8 animate-in fade-in duration-300">
                  
                  {/* Top Notification / Apply Action */}
                  <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-emerald-950">
                          Portfolio Profile Successfully Generated!
                        </h4>
                        <p className="text-xs text-emerald-800">
                          You can copy these bios or apply directly to your SOMESA Creator profile.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleApplyToCreatorDirectory}
                      disabled={appliedToProfileSuccess}
                      className="px-5 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-75 shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      <span>{appliedToProfileSuccess ? '✓ Profile Added to Directory!' : 'Publish to Creator Directory'}</span>
                    </button>
                  </div>

                  {/* Dual Bios: English & Luganda */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#E8E3DA] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider">
                          English Professional Bio
                        </span>
                        <button
                          onClick={() => copyToClipboard(portfolioResult.bioEnglish, 'bio_en')}
                          className="text-xs text-[#FF6321] hover:text-[#E5571B] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'bio_en' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'bio_en' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-[#121715]/80 leading-relaxed font-medium">
                        {portfolioResult.bioEnglish}
                      </p>
                    </div>

                    <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                          <Languages className="w-3.5 h-3.5 text-[#FF6321]" />
                          <span>Luganda Professional Bio</span>
                        </span>
                        <button
                          onClick={() => copyToClipboard(portfolioResult.bioLuganda, 'bio_lg')}
                          className="text-xs text-[#FF6321] hover:text-[#E5571B] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'bio_lg' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'bio_lg' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium italic">
                        «{portfolioResult.bioLuganda}»
                      </p>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#121715] uppercase tracking-wider">
                      Suggested Trade Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {portfolioResult.suggestedSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full bg-[#F5F2ED] text-[#0A2E24] border border-[#E8E3DA] text-xs font-bold flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Service Packages */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#121715] uppercase tracking-wider">
                      Recommended Service Offerings & Realistic Pricing (UGX)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioResult.recommendedServices.map((service, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E8E3DA] shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-display font-bold text-sm text-[#121715]">{service.name}</h5>
                            <span className="text-xs font-extrabold text-[#0A2E24] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                              {service.startingRate}
                            </span>
                          </div>
                          <p className="text-xs text-[#121715]/70">{service.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-[#E8E3DA] text-[11px] text-[#121715]/60 font-medium">
                            <span>Turnaround: {service.typicalTurnaround}</span>
                            <span className="text-[#FF6321] font-bold">{service.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Case Study */}
                  {portfolioResult.suggestedProjects?.[0] && (
                    <div className="bg-[#F5F2ED] rounded-2xl p-6 border border-[#E8E3DA] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0A2E24] uppercase tracking-wider">
                          Sample Client Case Study Draft
                        </span>
                        <span className="text-xs font-semibold text-[#121715]/60">Client: {portfolioResult.suggestedProjects[0].clientName}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#121715]">
                        {portfolioResult.suggestedProjects[0].title}
                      </h4>
                      <p className="text-xs text-[#121715]/80">
                        {portfolioResult.suggestedProjects[0].summary}
                      </p>
                      <div className="bg-white rounded-xl p-3 border border-[#E8E3DA] text-xs font-semibold text-emerald-900">
                        🎯 Outcome: {portfolioResult.suggestedProjects[0].outcome}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 3: AI PRODUCT STAGING PROMPTS */}
        {activeTab === 'ai-prompts' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#FF6321] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Visual Staging Prompt Library</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121715] tracking-tight">
                  Prompts for Midjourney, Canva Magic & AI Image Generators
                </h3>
                <p className="text-xs sm:text-sm text-[#121715]/70 max-w-2xl leading-relaxed">
                  Tailored prompts crafted for East African products — cold-process soaps, soy candle jars, coffee bags, handwoven baskets, and boutique cosmetics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    title: 'Herbal Soap & Botanical Spa Staging',
                    category: 'Artisan Crafts & Soaps',
                    prompt: 'Handmade rustic herbal soap bars with dried botanical petals resting on a clean wooden tray, warm natural African morning sunlight, minimalist boutique spa background, photorealistic 8k, soft shadows',
                    tools: 'Midjourney v6 / Canva AI / Photoroom'
                  },
                  {
                    title: 'Scented Soy Candle in Amber Glass',
                    category: 'Artisan Crafts & Soaps',
                    prompt: 'Scented soy candle in an amber glass jar with kraft paper label, flickering soft flame, surrounded by raw coffee beans and dried lemongrass, cozy boutique aesthetic, warm golden hour tones',
                    tools: 'Canva Magic Studio / Midjourney'
                  },
                  {
                    title: 'Specialty Coffee Beans & Jute Sacks',
                    category: 'Agribusiness & Farm Management',
                    prompt: 'Vibrant red ripe coffee cherries and roasted dark beans spread neatly next to a traditional jute sack, African raised drying bed farm background, warm sunlight, photorealistic depth of field',
                    tools: 'Midjourney / DALL-E 3'
                  },
                  {
                    title: 'Leather Handbag & African Print Fabric',
                    category: 'E-commerce & Fashion',
                    prompt: 'High quality tan leather handbag resting on an artisanal wooden table next to folded kitenge fabric, bright natural studio window lighting, commercial product advertising style',
                    tools: 'Canva Magic Studio / Photoroom'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#E8E3DA] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-[#FF6321]">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#121715]/50 font-mono">
                          {item.tools}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#121715]">{item.title}</h4>
                      <div className="bg-white p-3 rounded-xl border border-[#E8E3DA] text-xs text-[#121715]/80 font-mono leading-relaxed select-all">
                        {item.prompt}
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(item.prompt, `prompt_${idx}`)}
                      className="w-full py-2 rounded-xl bg-white border border-[#0A2E24]/20 hover:bg-[#F5F2ED] text-[#0A2E24] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === `prompt_${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied Prompt!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy AI Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SOMESA AI COPILOT CHAT */}
        {activeTab === 'copilot' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-sm space-y-6 max-w-4xl mx-auto">
              
              <div className="border-b border-[#E8E3DA] pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A2E24] text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#FF6321]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#121715]">
                      Somesa AI Creative Copilot
                    </h3>
                    <p className="text-xs text-[#121715]/60">
                      Ask anything about Ugandan rates, Luganda translations, lighting hacks, or soap formulations.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Online
                </span>
              </div>

              {/* Chat Message History */}
              <div className="space-y-4 min-h-[320px] max-h-[460px] overflow-y-auto pr-2">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0A2E24] text-white rounded-tr-xs'
                          : 'bg-[#F5F2ED] text-[#121715] border border-[#E8E3DA] rounded-tl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#F5F2ED] text-[#121715] rounded-2xl p-3 border border-[#E8E3DA] text-xs flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF6321]" />
                      <span>Somesa AI is thinking in Luganda & English...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E8E3DA]">
                {[
                  'What should I charge for 3 product TikToks in Kampala?',
                  'Translate: "Pay with MTN MoMo when placing your order"',
                  'How to make cold-process soap lather more gently?',
                  'How to test coffee moisture with a digital meter?'
                ].map((promptText, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(promptText);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#F5F2ED] hover:bg-[#E8E3DA] text-[11px] font-semibold text-[#121715]/80 transition-colors cursor-pointer"
                  >
                    {promptText}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Somesa AI a question in English or Luganda..."
                  className="flex-1 px-4 py-3 rounded-2xl border border-[#E8E3DA] text-xs sm:text-sm font-medium text-[#121715] focus:outline-none focus:border-[#0A2E24]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="px-5 py-3 rounded-2xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#FF6321]" />
                  <span>Send</span>
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
