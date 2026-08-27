import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  UserPlus, 
  Briefcase, 
  Compass, 
  ShieldCheck, 
  BarChart3, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  MapPin,
  Volume2,
  User,
  LogIn,
  LogOut,
  Smartphone
} from 'lucide-react';
import { ActiveView, StudentUser } from '../types';

interface NavigationProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onSearchClick: () => void;
  onOpenHireGeneral: () => void;
  savedCount?: number;
  requestsCount?: number;
  currentUser?: StudentUser | null;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeView,
  setActiveView,
  onSearchClick,
  requestsCount = 3,
  currentUser,
  onOpenAuthModal,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/90 backdrop-blur-md border-b border-[#E8E3DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Positioning */}
          <div className="flex items-center gap-6">
            <button 
              id="nav-logo-btn"
              onClick={() => handleNav('home')}
              className="flex items-baseline gap-2.5 text-left group cursor-pointer"
            >
              <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#0A2E24] group-hover:opacity-90 transition-opacity">
                SOMESA
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase text-[#0A2E24]/70 bg-[#0A2E24]/10 px-2.5 py-0.5 rounded-full">
                Talent &amp; Academy
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-2">
              <button
                id="nav-link-discover"
                onClick={() => handleNav('home')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  activeView === 'home' 
                    ? 'text-[#0A2E24] bg-[#0A2E24]/10 font-semibold' 
                    : 'text-[#121715]/80 hover:text-[#0A2E24] hover:bg-[#E8E3DA]'
                }`}
              >
                Discover
              </button>

              <button
                id="nav-link-creators"
                onClick={() => handleNav('creators')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  activeView === 'creators' 
                    ? 'text-[#0A2E24] bg-[#0A2E24]/10 font-semibold' 
                    : 'text-[#121715]/80 hover:text-[#0A2E24] hover:bg-[#E8E3DA]'
                }`}
              >
                Creators
              </button>

              <button
                id="nav-link-ai-studio"
                onClick={() => handleNav('ai-studio')}
                className={`px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'ai-studio'
                    ? 'text-white bg-[#FF6321] shadow-xs' 
                    : 'text-[#0A2E24] bg-[#FF6321]/15 hover:bg-[#FF6321]/25 border border-[#FF6321]/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6321] group-hover:animate-spin" />
                <span>AI Studio & Captions</span>
                <span className="px-1.5 py-0.2 rounded bg-[#0A2E24] text-white text-[9px] font-bold">
                  Bilingual
                </span>
              </button>

              <button
                id="nav-link-learn"
                onClick={() => handleNav('learn')}
                className={`px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'learn' || activeView === 'course-detail'
                    ? 'text-white bg-[#0A2E24] shadow-xs' 
                    : 'text-[#0A2E24] bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-600/30'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Learn (Soma)</span>
                <span className="px-1.5 py-0.2 rounded bg-[#FF6321] text-white text-[9px] font-bold">
                  Luganda
                </span>
              </button>

              <button
                id="nav-link-tutor"
                onClick={() => handleNav('tutor-request')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
                  activeView === 'tutor-request' 
                    ? 'text-[#0A2E24] bg-[#0A2E24]/10 font-semibold' 
                    : 'text-[#121715]/80 hover:text-[#0A2E24] hover:bg-[#E8E3DA]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Send a Tutor</span>
              </button>

              <button
                id="nav-link-services"
                onClick={() => handleNav('services')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  activeView === 'services' 
                    ? 'text-[#0A2E24] bg-[#0A2E24]/10 font-semibold' 
                    : 'text-[#121715]/80 hover:text-[#0A2E24] hover:bg-[#E8E3DA]'
                }`}
              >
                Services
              </button>

              <button
                id="nav-link-for-businesses"
                onClick={() => handleNav('for-businesses')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  activeView === 'for-businesses' 
                    ? 'text-[#0A2E24] bg-[#0A2E24]/10 font-semibold' 
                    : 'text-[#121715]/80 hover:text-[#0A2E24] hover:bg-[#E8E3DA]'
                }`}
              >
                For Businesses
              </button>
            </nav>
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Quick search button */}
            <button
              id="desktop-search-trigger"
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#121715]/70 hover:text-[#0A2E24] bg-[#E8E3DA]/60 hover:bg-[#E8E3DA] rounded-full transition-colors border border-transparent hover:border-[#D6CFC4] cursor-pointer"
              title="Search creators or skills"
            >
              <Search className="w-3.5 h-3.5 text-[#0A2E24]" />
              <span className="text-xs">Search...</span>
            </button>

            {/* Teach on SOMESA */}
            <button
              id="nav-teach-btn"
              onClick={() => handleNav('teach')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full border transition-colors cursor-pointer ${
                activeView === 'teach'
                  ? 'bg-[#0A2E24] text-white border-[#0A2E24]'
                  : 'bg-white text-[#0A2E24] border-[#D6CFC4] hover:bg-[#E8E3DA]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Teach</span>
            </button>

            {/* Admin Hub */}
            <button
              id="nav-admin-stats-btn"
              onClick={() => handleNav('admin-stats')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full border transition-colors cursor-pointer ${
                activeView === 'admin-stats'
                  ? 'bg-[#0A2E24] text-white border-[#0A2E24]'
                  : 'bg-white text-[#0A2E24] border-[#D6CFC4] hover:bg-[#E8E3DA]'
              }`}
              title="Platform overview & dispatch hub"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Admin Hub</span>
              {requestsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-pulse" />
              )}
            </button>

            {/* User Profile / Student Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="nav-user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0A2E24] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-5 h-5 rounded-full object-cover border border-emerald-300"
                    />
                  ) : (
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8E3DA] p-2 z-50 animate-in fade-in-50 zoom-in-95">
                    <div className="p-2.5 border-b border-[#E8E3DA]">
                      <p className="text-xs font-bold text-[#121715] truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-[#121715]/60 truncate">
                        {currentUser.phone || currentUser.email || 'SOMESA Student'}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-[10px] font-bold uppercase">
                        {currentUser.auth_type === 'phone_pin' ? 'Phone & PIN Auth' : 'Verified Google'}
                      </span>
                    </div>

                    <div className="pt-1 space-y-0.5">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNav('onboarding');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-[#0A2E24] hover:bg-[#F5F2ED] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                        <span>Edit Creator Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNav('learn');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-[#0A2E24] hover:bg-[#F5F2ED] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#0A2E24]" />
                        <span>My Enrolled Courses</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onSignOut) onSignOut();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer pt-1 border-t border-[#E8E3DA]/60 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-student-signin-btn"
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0A2E24] hover:text-white bg-white hover:bg-[#0A2E24] border border-[#D6CFC4] hover:border-[#0A2E24] rounded-full transition-all cursor-pointer shadow-2xs"
                title="Sign in with Google or Student PIN"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Student Sign In</span>
              </button>
            )}

            {/* Find Talent */}
            <button
              id="nav-find-talent-btn"
              onClick={() => handleNav('creators')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0A2E24] hover:bg-[#0F3D30] active:bg-[#06211A] rounded-full shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Find Talent</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
            </button>
          </div>

          {/* Mobile Right Controls: Search + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-search-btn"
              onClick={onSearchClick}
              className="p-2.5 text-[#0A2E24] bg-[#E8E3DA] hover:bg-[#DCD5C9] rounded-full transition-colors cursor-pointer"
              aria-label="Search creators"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#0A2E24] bg-white border border-[#E8E3DA] rounded-full hover:bg-[#F5F2ED] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E3DA] bg-[#F5F2ED] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          
          {/* Section 1: Core Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-widest text-[#121715]/40 uppercase mb-1">
              Explore Platform
            </p>
            
            <button
              id="mobile-nav-home"
              onClick={() => handleNav('home')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'home' 
                  ? 'bg-white text-[#0A2E24] font-bold shadow-xs border border-[#0A2E24]/15' 
                  : 'text-[#121715]/80 hover:bg-white/60 hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeView === 'home' ? 'bg-[#0A2E24] text-white' : 'bg-[#0A2E24]/5 text-[#0A2E24]'}`}>
                  <Compass className="w-4 h-4" />
                </div>
                <span>Discover Home</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#121715]/30" />
            </button>

            <button
              id="mobile-nav-creators"
              onClick={() => handleNav('creators')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'creators' 
                  ? 'bg-white text-[#0A2E24] font-bold shadow-xs border border-[#0A2E24]/15' 
                  : 'text-[#121715]/80 hover:bg-white/60 hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeView === 'creators' ? 'bg-[#0A2E24] text-white' : 'bg-[#0A2E24]/5 text-[#0A2E24]'}`}>
                  <Sparkles className="w-4 h-4 text-[#FF6321]" />
                </div>
                <span>Creators Directory</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#121715]/30" />
            </button>

            <button
              id="mobile-nav-services"
              onClick={() => handleNav('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'services' 
                  ? 'bg-white text-[#0A2E24] font-bold shadow-xs border border-[#0A2E24]/15' 
                  : 'text-[#121715]/80 hover:bg-white/60 hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeView === 'services' ? 'bg-[#0A2E24] text-white' : 'bg-[#0A2E24]/5 text-[#0A2E24]'}`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <span>Creative Services</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#121715]/30" />
            </button>
          </div>

          {/* Section 2: AI Studio, Luganda Academy & On-Site Tutors */}
          <div className="bg-white/70 rounded-2xl p-2.5 border border-[#E8E3DA] space-y-1">
            <p className="px-2 pt-1 text-[10px] font-bold tracking-widest text-[#0A2E24] uppercase">
              AI Tools, Soma &amp; On-Site Training
            </p>

            <button
              id="mobile-nav-ai-studio"
              onClick={() => handleNav('ai-studio')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'ai-studio'
                  ? 'bg-[#FF6321] text-white font-semibold shadow-xs' 
                  : 'text-[#121715] hover:bg-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className={`w-4 h-4 ${activeView === 'ai-studio' ? 'text-white' : 'text-[#FF6321]'}`} />
                <span className="font-medium">AI Studio &amp; Captions</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                activeView === 'ai-studio' ? 'bg-white/20 text-white' : 'bg-[#FF6321]/15 text-[#FF6321]'
              }`}>
                Bilingual
              </span>
            </button>

            <button
              id="mobile-nav-learn"
              onClick={() => handleNav('learn')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'learn' || activeView === 'course-detail'
                  ? 'bg-[#0A2E24] text-white font-semibold shadow-xs' 
                  : 'text-[#121715] hover:bg-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className={`w-4 h-4 ${activeView === 'learn' ? 'text-[#FF6321]' : 'text-[#0A2E24]'}`} />
                <span className="font-medium">Luganda Academy</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                activeView === 'learn' ? 'bg-white/20 text-white' : 'bg-[#FF6321]/15 text-[#FF6321]'
              }`}>
                Luganda
              </span>
            </button>

            <button
              id="mobile-nav-tutor-request"
              onClick={() => handleNav('tutor-request')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'tutor-request' 
                  ? 'bg-[#0A2E24] text-white font-semibold shadow-xs' 
                  : 'text-[#121715] hover:bg-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className={`w-4 h-4 ${activeView === 'tutor-request' ? 'text-[#FF6321]' : 'text-[#0A2E24]'}`} />
                <span className="font-medium">Send Tutor to Shop</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                activeView === 'tutor-request' ? 'bg-white/20 text-white' : 'bg-emerald-600/10 text-emerald-800'
              }`}>
                On-Site
              </span>
            </button>

            <button
              id="mobile-nav-teach"
              onClick={() => handleNav('teach')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'teach' 
                  ? 'bg-[#0A2E24] text-white font-semibold shadow-xs' 
                  : 'text-[#121715]/80 hover:bg-white hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#0A2E24]" />
                <span className="font-medium">Teach on SOMESA</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#121715]/30" />
            </button>
          </div>

          {/* Section 3: Platform Info & Admin */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-widest text-[#121715]/40 uppercase mb-1">
              Platform &amp; Tools
            </p>

            <button
              id="mobile-nav-for-businesses"
              onClick={() => handleNav('for-businesses')}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'for-businesses' 
                  ? 'bg-white text-[#0A2E24] font-bold shadow-xs border border-[#0A2E24]/15' 
                  : 'text-[#121715]/75 hover:bg-white/60 hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-[#0A2E24]/70" />
                <span>For Businesses &amp; Retail</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#121715]/30" />
            </button>

            <button
              id="mobile-nav-how-it-works"
              onClick={() => handleNav('how-it-works')}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'how-it-works' 
                  ? 'bg-white text-[#0A2E24] font-bold shadow-xs border border-[#0A2E24]/15' 
                  : 'text-[#121715]/75 hover:bg-white/60 hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#0A2E24]/70" />
                <span>How Verification Works</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#121715]/30" />
            </button>

            <button
              id="mobile-nav-admin-stats"
              onClick={() => handleNav('admin-stats')}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                activeView === 'admin-stats' 
                  ? 'bg-white text-[#0A2E24] font-bold shadow-xs border border-[#0A2E24]/15' 
                  : 'text-[#121715]/75 hover:bg-white/60 hover:text-[#0A2E24]'
              }`}
            >
              <span className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-[#0A2E24]/70" />
                <span>Dispatch Hub &amp; Admin</span>
              </span>
              {requestsCount > 0 && (
                <span className="bg-[#FF6321] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {requestsCount} new
                </span>
              )}
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 border-t border-[#E8E3DA] space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0A2E24]" />
                  <div>
                    <p className="text-xs font-bold text-[#121715]">{currentUser.name}</p>
                    <p className="text-[10px] text-[#121715]/60">{currentUser.phone || currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onSignOut) onSignOut();
                  }}
                  className="text-xs text-rose-700 font-bold hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal();
                }}
                className="w-full py-2.5 px-3 text-center text-xs font-bold text-[#0A2E24] bg-[#FF6321]/15 hover:bg-[#FF6321]/25 border border-[#FF6321]/30 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Student Sign In (Phone PIN / Google)</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                id="mobile-nav-find-talent"
                onClick={() => handleNav('creators')}
                className="py-3 px-3 text-center text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Find Talent</span>
              </button>

              <button
                id="mobile-nav-join-creator"
                onClick={() => handleNav('for-creators')}
                className="py-3 px-3 text-center text-xs font-semibold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#D6CFC4] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join as Creator</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
