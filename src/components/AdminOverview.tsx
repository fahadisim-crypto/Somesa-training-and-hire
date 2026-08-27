import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  MessageSquare, 
  Phone, 
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Eye,
  Check,
  XCircle,
  Video,
  Play,
  ClipboardList,
  Building2,
  DollarSign,
  Database,
  UploadCloud,
  Loader2
} from 'lucide-react';
import { Creator, HireRequest, ProjectCaseStudy, Course, TutorRequest, CohortSurveyResponse } from '../types';
import { isSupabaseConfigured, syncAllSampleDataToSupabase } from '../lib/supabase';

interface AdminOverviewProps {
  creators: Creator[];
  projects: ProjectCaseStudy[];
  requests: HireRequest[];
  courses: Course[];
  tutorRequests: TutorRequest[];
  surveyResponses?: CohortSurveyResponse[];
  onSelectCreator: (creator: Creator) => void;
  onSelectCourse: (course: Course) => void;
  onUpdateRequestStatus: (requestId: string, status: HireRequest['status']) => void;
  onUpdateTutorRequest: (requestId: string, status: TutorRequest['status'], assignedTutorId?: string, assignedTutorName?: string) => void;
  onUpdateCourseStatus: (courseId: string, status: Course['status']) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  creators,
  projects,
  requests,
  courses,
  tutorRequests,
  surveyResponses = [],
  onSelectCreator,
  onSelectCourse,
  onUpdateRequestStatus,
  onUpdateTutorRequest,
  onUpdateCourseStatus
}) => {
  const [activeTab, setActiveTab] = useState<'platform' | 'tutor-dispatch' | 'course-approval' | 'market-research'>('platform');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Contacted' | 'Completed'>('All');
  const [selectedCreatorFilter, setSelectedCreatorFilter] = useState<string>('All');
  const [selectedTutorStatusFilter, setSelectedTutorStatusFilter] = useState<'All' | 'New' | 'Tutor Assigned' | 'Completed' | 'Cancelled'>('All');
  const [previewingCourse, setPreviewingCourse] = useState<Course | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const handleSyncToSupabase = async () => {
    if (!isSupabaseConfigured) return;
    setIsSyncing(true);
    setSyncStatusMsg(null);
    try {
      const res = await syncAllSampleDataToSupabase(creators, requests, surveyResponses);
      if (res.success) {
        setSyncStatusMsg(`Successfully synced ${res.count} creators & projects to Supabase!`);
      } else {
        setSyncStatusMsg(`Sync error: ${res.error || 'Failed'}`);
      }
    } catch (e: any) {
      setSyncStatusMsg(`Error: ${e?.message || 'Sync failed'}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatusMsg(null), 5000);
    }
  };

  const totalCreators = creators.length;
  const availableCreators = creators.filter((c) => c.available).length;
  const somesaTrained = creators.filter((c) => c.trainingBadge?.type === 'somesa').length;
  const totalProjects = projects.length;
  const totalRequests = requests.length;
  const newTutorRequestsCount = tutorRequests.filter(t => t.status === 'New').length;
  const pendingCoursesCount = courses.filter(c => c.status === 'pending_review').length;
  const totalSurveyCount = surveyResponses.length;


  const filteredRequests = requests.filter((r) => {
    const statusMatch = selectedStatusFilter === 'All' || r.status === selectedStatusFilter;
    const creatorMatch = selectedCreatorFilter === 'All' || r.creatorId === selectedCreatorFilter;
    return statusMatch && creatorMatch;
  });

  const filteredTutorRequests = tutorRequests.filter((t) => {
    if (selectedTutorStatusFilter === 'All') return true;
    return t.status === selectedTutorStatusFilter;
  });

  // Top skills count
  const skillCountMap: Record<string, number> = {};
  creators.forEach((c) => {
    c.skills.forEach((s) => {
      skillCountMap[s] = (skillCountMap[s] || 0) + 1;
    });
  });
  const topSkills = Object.entries(skillCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Locations breakdown
  const locationCountMap: Record<string, number> = {};
  creators.forEach((c) => {
    const loc = c.location.split(',')[0].trim();
    locationCountMap[loc] = (locationCountMap[loc] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>SOMESA Operations &amp; Dispatch Hub</span>
              </div>
              
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                isSupabaseConfigured
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}>
                <Database className="w-3 h-3 text-[#FF6321]" />
                <span>{isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Storage Mode'}</span>
              </div>

              {isSupabaseConfigured && (
                <button
                  onClick={handleSyncToSupabase}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white hover:bg-[#0A2E24] text-[#0A2E24] hover:text-white border border-[#E8E3DA] transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  title="Push sample profiles & database records directly to your Supabase tables"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-[#FF6321]" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3 h-3 text-[#FF6321]" />
                      <span>Sync All To Supabase</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {syncStatusMsg && (
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl mb-2 inline-block animate-in fade-in-50">
                {syncStatusMsg}
              </div>
            )}

            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#121715] tracking-tight">
              Platform &amp; Academy Management
            </h1>
            <p className="text-xs sm:text-sm text-[#121715]/70">
              Manage talent directory, incoming client projects, in-person tutor dispatches, and Luganda video courses.
            </p>
          </div>

          {/* Top Admin Section Tabs */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E8E3DA] shadow-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('platform')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'platform'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'text-[#121715]/70 hover:text-[#0A2E24] hover:bg-[#F5F2ED]'
              }`}
            >
              Platform Overview
            </button>

            <button
              onClick={() => setActiveTab('tutor-dispatch')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'tutor-dispatch'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'text-[#121715]/70 hover:text-[#0A2E24] hover:bg-[#F5F2ED]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Tutor Dispatch Queue</span>
              {newTutorRequestsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('course-approval')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'course-approval'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'text-[#121715]/70 hover:text-[#0A2E24] hover:bg-[#F5F2ED]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Course Approval Queue</span>
              {pendingCoursesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#FF6321] text-white text-[10px]">
                  {pendingCoursesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('market-research')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'market-research'
                  ? 'bg-[#0A2E24] text-white shadow-xs'
                  : 'text-[#121715]/70 hover:text-[#0A2E24] hover:bg-[#F5F2ED]'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Cohort Survey Insights</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-[10px] font-bold">
                {totalSurveyCount}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: Platform Overview */}
        {activeTab === 'platform' && (
          <div className="space-y-8 animate-in fade-in-50 duration-200">
            {/* 4 Metric Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E3DA] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#121715]/60 uppercase tracking-wider">Total Creators</span>
                  <div className="w-8 h-8 rounded-xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#121715]">{totalCreators}</p>
                <p className="text-[11px] text-[#0A2E24] font-semibold mt-1">
                  {somesaTrained} SOMESA-trained verified
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E3DA] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#121715]/60 uppercase tracking-wider">Available Now</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#121715]">{availableCreators}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  {Math.round((availableCreators / totalCreators) * 100)}% network capacity ready
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E3DA] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#121715]/60 uppercase tracking-wider">Luganda Courses</span>
                  <div className="w-8 h-8 rounded-xl bg-[#0A2E24]/10 text-[#0A2E24] flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#121715]">{courses.length}</p>
                <p className="text-[11px] text-[#121715]/60 font-semibold mt-1">
                  {courses.filter(c => c.status === 'published').length} active in Academy
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E3DA] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#121715]/60 uppercase tracking-wider">Project Requests</span>
                  <div className="w-8 h-8 rounded-xl bg-[#FF6321]/15 text-[#FF6321] flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#121715]">{totalRequests}</p>
                <p className="text-[11px] text-[#FF6321] font-semibold mt-1">
                  Active client inquiries
                </p>
              </div>

            </div>

            {/* 2-Column Analytics: Top Skills & Locations Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Top Skills */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs space-y-4">
                <h3 className="font-display font-bold text-lg text-[#121715]">
                  Top Creator Skills
                </h3>
                <div className="space-y-2.5">
                  {topSkills.map(([skill, count], idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#121715]/80">{skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-36 h-2 rounded-full bg-[#F5F2ED] overflow-hidden border border-[#E8E3DA]">
                          <div
                            className="h-full bg-[#0A2E24] rounded-full"
                            style={{ width: `${(count / totalCreators) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold text-[#0A2E24] w-5 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs space-y-4">
                <h3 className="font-display font-bold text-lg text-[#121715]">
                  Talent Regional Distribution
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(locationCountMap).map(([loc, count], idx) => (
                    <div key={idx} className="bg-[#F5F2ED] p-3.5 rounded-2xl border border-[#E8E3DA] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FF6321]" />
                        <span className="text-xs font-semibold text-[#121715]">{loc}</span>
                      </div>
                      <span className="text-xs font-bold text-[#0A2E24] bg-white px-2 py-0.5 rounded-full border border-[#E8E3DA]">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recent Client Project Requests Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-xl text-[#121715]">
                      Recent Direct Project Requests
                    </h3>
                    <span className="text-xs font-bold bg-[#0A2E24] text-white px-2 py-0.5 rounded-full">
                      {filteredRequests.length}
                    </span>
                  </div>
                  <p className="text-xs text-[#121715]/60 mt-0.5">
                    Inquiries sent by businesses through the creator hire modal with deliverable &amp; timeline estimates.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Creator Filter Dropdown */}
                  <select
                    id="admin-creator-filter"
                    value={selectedCreatorFilter}
                    onChange={(e) => setSelectedCreatorFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5F2ED] border border-[#E8E3DA] text-[#121715] focus:outline-none focus:border-[#0A2E24] cursor-pointer"
                  >
                    <option value="All">All Creators ({creators.length})</option>
                    {creators.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.primaryCategory})
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1 overflow-x-auto">
                    {(['All', 'Pending', 'In Progress', 'Contacted', 'Completed'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedStatusFilter === st
                            ? 'bg-[#0A2E24] text-white'
                            : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-10 bg-[#F5F2ED]/60 rounded-2xl border border-dashed border-[#E8E3DA] space-y-2">
                    <Clock className="w-8 h-8 text-[#121715]/40 mx-auto" />
                    <p className="text-sm font-semibold text-[#121715]/70">No project requests match your current filters</p>
                    <button
                      onClick={() => {
                        setSelectedStatusFilter('All');
                        setSelectedCreatorFilter('All');
                      }}
                      className="text-xs font-bold text-[#0A2E24] hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredRequests.map((req) => {
                    const creatorObj = creators.find((c) => c.id === req.creatorId);
                    return (
                      <div
                        key={req.id}
                        className="bg-[#F5F2ED] p-5 rounded-2xl border border-[#E8E3DA] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-[#0A2E24]/20 transition-all"
                      >
                        <div className="space-y-2 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-[#121715]">{req.clientName}</span>
                            {req.organization && (
                              <span className="text-xs text-[#121715]/60">({req.organization})</span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0A2E24]/10 text-[#0A2E24] px-2 py-0.5 rounded-full">
                              {req.serviceNeeded}
                            </span>
                            <span className="text-xs text-[#121715]/40">•</span>
                            <span className="text-xs text-[#121715]/50">{req.createdAt}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-[#121715]/80 leading-relaxed font-editorial italic bg-white/60 p-2.5 rounded-xl border border-[#E8E3DA]/60">
                            «{req.projectDescription}»
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-[#121715]/70 pt-0.5">
                            <span className="flex items-center gap-1 font-bold text-[#0A2E24]">
                              Target Creator: {req.creatorName}
                            </span>
                            <span className="text-[#121715]/40">•</span>
                            <span>Start: <strong className="text-[#121715]">{req.timeline}</strong></span>
                            
                            {/* Prominent Timeline Estimate Badge */}
                            {req.timelineEstimate && (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#0A2E24] bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-md">
                                <Clock className="w-3 h-3 text-[#FF6321]" />
                                <span>Duration: {req.timelineEstimate}</span>
                              </span>
                            )}

                            {req.budget && (
                              <span className="font-medium text-[#121715]">Budget: <strong>{req.budget}</strong></span>
                            )}
                            <span className="flex items-center gap-1 font-medium">
                              <Phone className="w-3 h-3 text-[#FF6321]" />
                              {req.phone}
                            </span>
                            {req.email && (
                              <span className="text-[#121715]/60">({req.email})</span>
                            )}
                          </div>
                        </div>

                        {/* Status Dropdown & Actions */}
                        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end shrink-0">
                          <select
                            value={req.status}
                            onChange={(e) => onUpdateRequestStatus(req.id, e.target.value as any)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                              req.status === 'Pending'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : req.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : req.status === 'Contacted'
                                ? 'bg-purple-50 text-purple-800 border-purple-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>

                          {creatorObj && (
                            <button
                              onClick={() => onSelectCreator(creatorObj)}
                              className="px-3.5 py-1.5 text-xs font-semibold text-[#0A2E24] bg-white border border-[#E8E3DA] rounded-xl hover:bg-[#F5F2ED] transition-colors cursor-pointer whitespace-nowrap"
                            >
                              View Profile
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: Tutor Dispatch Queue */}
        {activeTab === 'tutor-dispatch' && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6321]/15 text-[#FF6321] text-xs font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>In-Person Shop Dispatches</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#121715]">
                    Tutor Dispatch Requests Queue
                  </h3>
                  <p className="text-xs text-[#121715]/60">
                    Incoming in-person training bookings from local businesses requiring instructor assignment.
                  </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(['All', 'New', 'Tutor Assigned', 'Completed', 'Cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedTutorStatusFilter(st)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedTutorStatusFilter === st
                          ? 'bg-[#0A2E24] text-white'
                          : 'bg-[#F5F2ED] text-[#121715]/70 hover:bg-[#E8E3DA]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredTutorRequests.length === 0 ? (
                  <p className="text-xs text-[#121715]/60 text-center py-8">
                    No tutor dispatch requests in this category.
                  </p>
                ) : (
                  filteredTutorRequests.map((tr) => (
                    <div
                      key={tr.id}
                      className="bg-[#F5F2ED] p-5 rounded-2xl border border-[#E8E3DA] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold text-[#121715]">
                            {tr.business_name || tr.requester_name}
                          </span>
                          <span className="text-xs text-[#121715]/60">
                            (Contact: {tr.requester_name})
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A2E24] text-white">
                            {tr.skill_topic}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#121715]/75">
                          <span className="flex items-center gap-1 font-semibold text-[#0A2E24]">
                            <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                            {tr.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-[#121715]/60" />
                            {tr.phone}
                          </span>
                          {tr.preferred_date && (
                            <span>Target Date: {tr.preferred_date}</span>
                          )}
                        </div>

                        {tr.notes && (
                          <p className="text-xs text-[#121715]/80 bg-white p-3 rounded-xl border border-[#E8E3DA]">
                            <strong>Client Notes:</strong> {tr.notes}
                          </p>
                        )}
                      </div>

                      {/* Tutor Assignment Controls */}
                      <div className="bg-white p-4 rounded-2xl border border-[#E8E3DA] space-y-3 w-full lg:w-72 shrink-0">
                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase font-bold text-[#121715]/60">
                            Assign Designated Tutor
                          </label>
                          <select
                            value={tr.assigned_tutor_id || ''}
                            onChange={(e) => {
                              const found = creators.find(c => c.id === e.target.value);
                              onUpdateTutorRequest(
                                tr.id, 
                                found ? 'Tutor Assigned' : tr.status, 
                                found?.id, 
                                found?.name
                              );
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#F5F2ED] border border-[#E8E3DA] rounded-xl text-xs focus:outline-none"
                          >
                            <option value="">-- Unassigned --</option>
                            {creators.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.location.split(',')[0]})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase font-bold text-[#121715]/60">
                            Dispatch Status
                          </label>
                          <select
                            value={tr.status}
                            onChange={(e) => onUpdateTutorRequest(tr.id, e.target.value as any, tr.assigned_tutor_id, tr.assigned_tutor_name)}
                            className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                              tr.status === 'New'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : tr.status === 'Tutor Assigned'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : tr.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Tutor Assigned">Tutor Assigned</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: Course Approval Queue */}
        {activeTab === 'course-approval' && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs font-bold mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span>Curriculum &amp; Video Quality</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#121715]">
                    Creator Course Approval Queue
                  </h3>
                  <p className="text-xs text-[#121715]/60">
                    Review user-submitted Luganda tutorials from the «Teach on SOMESA» creator portal.
                  </p>
                </div>
              </div>

              {/* Courses Table */}
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#F5F2ED] p-5 rounded-2xl border border-[#E8E3DA] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-24 h-16 rounded-xl object-cover border border-[#E8E3DA] shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-base text-[#121715]">
                            {course.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-[#0A2E24] border border-[#E8E3DA]">
                            {course.category}
                          </span>
                        </div>

                        <p className="text-xs font-editorial italic text-[#0A2E24]">
                          «{course.title_luganda}»
                        </p>

                        <div className="flex items-center gap-3 text-xs text-[#121715]/60">
                          <span>Instructor: <strong>{course.instructor_name}</strong></span>
                          <span>•</span>
                          <span>{course.lessons.length} lessons ({course.duration_minutes}m)</span>
                          <span>•</span>
                          <span>UGX {course.price_ugx.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Toggle & Preview */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#0A2E24] bg-white hover:bg-[#E8E3DA] border border-[#E8E3DA] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-[#FF6321] fill-current" />
                        <span>Preview Course</span>
                      </button>

                      <select
                        value={course.status}
                        onChange={(e) => onUpdateCourseStatus(course.id, e.target.value as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                          course.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : course.status === 'pending_review'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: Cohort Market Research Survey Insights */}
        {activeTab === 'market-research' && (
          <div className="space-y-8 animate-in fade-in-50 duration-200">
            {/* Header & Quick Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#121715] flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-[#FF6321]" />
                    <span>Business Survey Feedback for Next Cohort</span>
                  </h3>
                  <p className="text-xs text-[#121715]/60 mt-1">
                    Direct feedback from local businesses on what creative skills and services they struggle to find and want to hire.
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-[#0A2E24] text-white text-xs font-bold shrink-0">
                  {surveyResponses.length} Responses Captured
                </div>
              </div>

              {/* Aggregated Quick Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E8E3DA]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A2E24] block mb-1">
                    Primary Demand Areas
                  </span>
                  <p className="text-xs text-[#121715]/80 leading-relaxed font-medium">
                    Short-Form Video &amp; Reels, Product Photography, and Bilingual Copywriting
                  </p>
                </div>

                <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E8E3DA]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A2E24] block mb-1">
                    Target Hiring Window
                  </span>
                  <p className="text-xs text-[#121715]/80 leading-relaxed font-medium">
                    70%+ plan to commission or recruit within 1–2 months
                  </p>
                </div>

                <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E8E3DA]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A2E24] block mb-1">
                    Budget Benchmark
                  </span>
                  <p className="text-xs text-[#121715]/80 leading-relaxed font-medium">
                    UGX 200k – 1.5M / month depending on deliverable volume
                  </p>
                </div>
              </div>

              {/* Submissions List */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121715]/70">
                  All Submitted Responses
                </h4>

                {surveyResponses.length === 0 ? (
                  <div className="text-center py-10 bg-[#F5F2ED]/60 rounded-2xl border border-dashed border-[#E8E3DA]">
                    <ClipboardList className="w-8 h-8 text-[#121715]/40 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#121715]/70">No survey responses submitted yet.</p>
                  </div>
                ) : (
                  surveyResponses.map((res) => (
                    <div
                      key={res.id}
                      className="bg-[#F5F2ED] p-5 sm:p-6 rounded-2xl border border-[#E8E3DA] space-y-3 hover:border-[#0A2E24]/30 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#121715]">
                            {res.businessName || 'Anonymous Business'}
                          </span>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#0A2E24]/10 text-[#0A2E24]">
                            {res.industry}
                          </span>
                        </div>
                        <span className="text-xs text-[#121715]/50">{res.createdAt}</span>
                      </div>

                      {/* Skills tags */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#121715]/70 uppercase tracking-wider block">
                          Skills &amp; Deliverables Desired:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {res.skillsNeeded.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs font-semibold bg-white text-[#0A2E24] px-2.5 py-1 rounded-lg border border-[#E8E3DA]"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Timeline & Budget & Contact */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#121715]/75 pt-1">
                        <span>Timeline: <strong>{res.hiringTimeline}</strong></span>
                        {res.monthlyCreativeBudget && (
                          <>
                            <span>•</span>
                            <span>Budget: <strong>{res.monthlyCreativeBudget}</strong></span>
                          </>
                        )}
                        {res.contactEmailOrPhone && (
                          <>
                            <span>•</span>
                            <span className="text-[#0A2E24] font-semibold flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#FF6321]" />
                              {res.contactEmailOrPhone}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Additional feedback note */}
                      {res.additionalFeedback && (
                        <p className="text-xs sm:text-sm text-[#121715]/80 bg-white/70 p-3 rounded-xl border border-[#E8E3DA]/60 italic font-editorial">
                          «{res.additionalFeedback}»
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
