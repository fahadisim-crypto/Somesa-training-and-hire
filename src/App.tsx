/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CreatorDiscovery } from './components/CreatorDiscovery';
import { FeaturedCreator } from './components/FeaturedCreator';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedWork } from './components/FeaturedWork';
import { CreatorProfile } from './components/CreatorProfile';
import { ProjectModal } from './components/ProjectModal';
import { HireModal } from './components/HireModal';
import { ForBusinesses } from './components/ForBusinesses';
import { ForCreators } from './components/ForCreators';
import { CreatorOnboarding } from './components/CreatorOnboarding';
import { AdminOverview } from './components/AdminOverview';
import { LearnLanding } from './components/LearnLanding';
import { CourseDetail } from './components/CourseDetail';
import { TutorRequestView } from './components/TutorRequestView';
import { TeachOnSomesa } from './components/TeachOnSomesa';
import { SubscriptionModal } from './components/SubscriptionModal';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { AIPortfolioVideoStudio } from './components/AIPortfolioVideoStudio';
import { Footer } from './components/Footer';
import { BottomMobileNav } from './components/BottomMobileNav';
import { 
  INITIAL_CREATORS, 
  INITIAL_PROJECTS, 
  INITIAL_REQUESTS,
  INITIAL_COURSES,
  INITIAL_TUTOR_REQUESTS
} from './data/mockData';
import { 
  Creator, 
  ProjectCaseStudy, 
  HireRequest, 
  ActiveView, 
  CategoryType,
  Course,
  TutorRequest
} from './types';

export default function App() {
  // Global Data State
  const [creators, setCreators] = useState<Creator[]>(() => {
    const saved = localStorage.getItem('somesa_creators');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_CREATORS;
  });

  const [projects, setProjects] = useState<ProjectCaseStudy[]>(() => {
    const saved = localStorage.getItem('somesa_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PROJECTS;
  });

  const [requests, setRequests] = useState<HireRequest[]>(() => {
    const saved = localStorage.getItem('somesa_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_REQUESTS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('somesa_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_COURSES;
  });

  const [tutorRequests, setTutorRequests] = useState<TutorRequest[]>(() => {
    const saved = localStorage.getItem('somesa_tutor_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_TUTOR_REQUESTS;
  });

  // User subscription / enrollment state
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('somesa_enrolled_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [hasAllAccessPass, setHasAllAccessPass] = useState<boolean>(() => {
    const saved = localStorage.getItem('somesa_has_all_access');
    return saved === 'true';
  });

  // Navigation & Modal State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hireModalCreator, setHireModalCreator] = useState<Creator | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryType>('All');

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('somesa_creators', JSON.stringify(creators));
  }, [creators]);

  useEffect(() => {
    localStorage.setItem('somesa_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('somesa_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('somesa_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('somesa_tutor_requests', JSON.stringify(tutorRequests));
  }, [tutorRequests]);

  useEffect(() => {
    localStorage.setItem('somesa_enrolled_courses', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem('somesa_has_all_access', hasAllAccessPass ? 'true' : 'false');
  }, [hasAllAccessPass]);

  // Featured Creator: Aisha Namukasa
  const aishaCreator = creators.find((c) => c.slug === 'aisha-namukasa') || creators[0];

  // Navigation handlers
  const handleSelectCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setActiveView('creator-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCreatorBySlug = (slug: string) => {
    const target = creators.find((c) => c.slug === slug);
    if (target) {
      handleSelectCreator(target);
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveView('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourseBySlug = (slug: string) => {
    const target = courses.find((c) => c.slug === slug);
    if (target) {
      handleSelectCourse(target);
    }
  };

  const handleSelectProject = (project: ProjectCaseStudy) => {
    setSelectedProject(project);
  };

  const handleOpenHire = (creator: Creator) => {
    setHireModalCreator(creator);
    setIsHireModalOpen(true);
  };

  const handleHireFromProject = (creatorId: string) => {
    const targetCreator = creators.find((c) => c.id === creatorId) || creators[0];
    setSelectedProject(null);
    handleOpenHire(targetCreator);
  };

  const handleViewCreatorProfileFromProject = (creatorId: string) => {
    const targetCreator = creators.find((c) => c.id === creatorId) || creators[0];
    setSelectedProject(null);
    handleSelectCreator(targetCreator);
  };

  const handleSubmitHireRequest = (requestData: Omit<HireRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: HireRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      createdAt: 'Just now',
      status: 'Pending'
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleSubmitTutorRequest = (reqData: Omit<TutorRequest, 'id' | 'created_at' | 'status'>) => {
    const newTutorReq: TutorRequest = {
      ...reqData,
      id: `tr-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'New'
    };
    setTutorRequests((prev) => [newTutorReq, ...prev]);
  };

  const handlePublishNewCreator = (newCreator: Creator) => {
    setCreators((prev) => [newCreator, ...prev]);
    if (newCreator.projects.length > 0) {
      setProjects((prev) => [...newCreator.projects, ...prev]);
    }
  };

  const handleSubmitNewCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleEnrollInCourse = (planType: 'single_course' | 'all_access_pass') => {
    if (planType === 'all_access_pass') {
      setHasAllAccessPass(true);
    } else if (selectedCourse) {
      setEnrolledCourseIds((prev) => Array.from(new Set([...prev, selectedCourse.id])));
    }
  };

  const handleSelectCategoryFromServices = (category: CategoryType) => {
    setSelectedCategoryFilter(category);
    setActiveView('creators');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateRequestStatus = (requestId: string, status: HireRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const handleUpdateTutorRequest = (
    requestId: string, 
    status: TutorRequest['status'], 
    assignedTutorId?: string, 
    assignedTutorName?: string
  ) => {
    setTutorRequests((prev) =>
      prev.map((tr) => (tr.id === requestId ? { 
        ...tr, 
        status, 
        assigned_tutor_id: assignedTutorId !== undefined ? assignedTutorId : tr.assigned_tutor_id,
        assigned_tutor_name: assignedTutorName !== undefined ? assignedTutorName : tr.assigned_tutor_name 
      } : tr))
    );
  };

  const handleUpdateCourseStatus = (courseId: string, status: Course['status']) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status } : c))
    );
  };

  const scrollToDiscovery = () => {
    if (activeView !== 'home' && activeView !== 'creators') {
      setActiveView('creators');
    }
    setTimeout(() => {
      const el = document.getElementById('discovery-section') || document.getElementById('talent-search-input');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      const searchInput = document.getElementById('talent-search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#121715] flex flex-col font-body selection:bg-[#0A2E24] selection:text-[#F5F2ED]">
      
      {/* Top Header Navigation */}
      <Navigation
        activeView={activeView}
        setActiveView={setActiveView}
        onSearchClick={scrollToDiscovery}
        onOpenHireGeneral={() => handleOpenHire(aishaCreator)}
        requestsCount={
          requests.filter((r) => r.status === 'Pending').length + 
          tutorRequests.filter((t) => t.status === 'New').length
        }
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* 1. HOMEPAGE VIEW */}
        {activeView === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onFindTalent={scrollToDiscovery}
              onJoinCreator={() => {
                setActiveView('for-creators');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCreator={handleSelectCreator}
              featuredCreator={aishaCreator}
            />

            {/* Creator Discovery / Meet the talent */}
            <CreatorDiscovery
              creators={creators}
              onSelectCreator={handleSelectCreator}
              onHireCreator={handleOpenHire}
              initialCategory={selectedCategoryFilter}
            />

            {/* Featured Creator Spotlight (Aisha Namukasa) */}
            <FeaturedCreator
              creator={aishaCreator}
              onSelectCreator={handleSelectCreator}
              onHireCreator={handleOpenHire}
            />

            {/* Real Transformation Before & After Comparison Gallery */}
            <BeforeAfterGallery
              onFindCreator={scrollToDiscovery}
              onRequestTutor={() => {
                setActiveView('tutor-request');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCreatorByName={(name) => {
                const found = creators.find(c => c.name.toLowerCase().includes(name.toLowerCase()));
                if (found) {
                  handleSelectCreator(found);
                } else {
                  scrollToDiscovery();
                }
              }}
            />

            {/* Services Section ("What can you get done?") */}
            <ServicesSection
              onSelectCategory={handleSelectCategoryFromServices}
            />

            {/* How It Works (3 Steps) */}
            <HowItWorks
              onFindCreator={scrollToDiscovery}
            />

            {/* Featured Work Portfolio Gallery */}
            <FeaturedWork
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          </div>
        )}

        {/* 2. CREATORS DIRECTORY VIEW */}
        {activeView === 'creators' && (
          <div className="pt-6">
            <CreatorDiscovery
              creators={creators}
              onSelectCreator={handleSelectCreator}
              onHireCreator={handleOpenHire}
              initialCategory={selectedCategoryFilter}
            />
          </div>
        )}

        {/* 3. DEDICATED CREATOR PROFILE VIEW */}
        {activeView === 'creator-profile' && selectedCreator && (
          <CreatorProfile
            creator={selectedCreator}
            onBack={() => setActiveView('creators')}
            onHire={handleOpenHire}
            onSelectProject={handleSelectProject}
          />
        )}

        {/* 4. LEARN (SOMA) HUB / LUGANDA VIDEO ACADEMY */}
        {activeView === 'learn' && (
          <LearnLanding
            courses={courses.filter(c => c.status === 'published')}
            onSelectCourse={handleSelectCourse}
            onRequestTutor={() => {
              setActiveView('tutor-request');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTeachOnSomesa={() => {
              setActiveView('teach');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSubscriptionPlans={() => setIsSubscriptionModalOpen(true)}
            onSelectCreatorBySlug={handleSelectCreatorBySlug}
            onSubmitTutorRequest={handleSubmitTutorRequest}
          />
        )}

        {/* 5. COURSE DETAIL & LESSON PLAYER VIEW */}
        {activeView === 'course-detail' && selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onBack={() => setActiveView('learn')}
            onSelectCreatorBySlug={handleSelectCreatorBySlug}
            onRequestTutor={() => {
              setActiveView('tutor-request');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
            hasAllAccessPass={hasAllAccessPass}
            onEnroll={handleEnrollInCourse}
          />
        )}

        {/* 6. TUTOR DISPATCH / "SEND A TUTOR TO MY SHOP" */}
        {activeView === 'tutor-request' && (
          <TutorRequestView
            onSubmitRequest={handleSubmitTutorRequest}
            onExploreCourses={() => {
              setActiveView('learn');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => setActiveView('learn')}
          />
        )}

        {/* 7. TEACH ON SOMESA CREATOR PORTAL */}
        {activeView === 'teach' && (
          <TeachOnSomesa
            creators={creators}
            onSubmitCourse={handleSubmitNewCourse}
            onBack={() => setActiveView('learn')}
            onExploreCourses={() => {
              setActiveView('learn');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 8. SERVICES DIRECTORY VIEW */}
        {activeView === 'services' && (
          <div className="pt-4">
            <ServicesSection
              onSelectCategory={handleSelectCategoryFromServices}
            />
            {/* Direct creators below for chosen category */}
            <CreatorDiscovery
              creators={creators}
              onSelectCreator={handleSelectCreator}
              onHireCreator={handleOpenHire}
              initialCategory={selectedCategoryFilter}
            />
          </div>
        )}

        {/* 9. HOW IT WORKS VIEW */}
        {activeView === 'how-it-works' && (
          <div className="pt-8">
            <HowItWorks
              onFindCreator={() => {
                setActiveView('creators');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <FeaturedWork
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          </div>
        )}

        {/* 10. FOR BUSINESSES LANDING VIEW */}
        {activeView === 'for-businesses' && (
          <ForBusinesses
            onFindTalent={() => {
              setActiveView('creators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectServiceCategory={handleSelectCategoryFromServices}
          />
        )}

        {/* 11. FOR CREATORS LANDING VIEW */}
        {activeView === 'for-creators' && (
          <ForCreators
            onStartOnboarding={() => {
              setActiveView('onboarding');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewExamplePortfolio={() => handleSelectCreator(aishaCreator)}
            sampleCreator={aishaCreator}
          />
        )}

        {/* 12. CREATOR ONBOARDING & PORTFOLIO BUILDER WIZARD */}
        {activeView === 'onboarding' && (
          <CreatorOnboarding
            onPublishSuccess={handlePublishNewCreator}
            onCancel={() => setActiveView('home')}
            onViewCreatedProfile={(newCreator) => {
              setSelectedCreator(newCreator);
              setActiveView('creator-profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 13. PLATFORM & ADMIN OVERVIEW DASHBOARD */}
        {activeView === 'admin-stats' && (
          <AdminOverview
            creators={creators}
            projects={projects}
            requests={requests}
            courses={courses}
            tutorRequests={tutorRequests}
            onSelectCreator={handleSelectCreator}
            onSelectCourse={handleSelectCourse}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onUpdateTutorRequest={handleUpdateTutorRequest}
            onUpdateCourseStatus={handleUpdateCourseStatus}
          />
        )}

        {/* 14. AI PORTFOLIO & VIDEO SUBTITLE STUDIO */}
        {activeView === 'ai-studio' && (
          <AIPortfolioVideoStudio
            onAddCreator={handlePublishNewCreator}
            onNavigateView={(view) => {
              setActiveView(view as ActiveView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Case Study / Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onHireCreator={handleHireFromProject}
        onViewCreatorProfile={handleViewCreatorProfileFromProject}
      />

      {/* Hire / Commission Modal */}
      <HireModal
        creator={hireModalCreator}
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        onSubmitRequest={handleSubmitHireRequest}
        onContinueBrowsing={() => {
          setIsHireModalOpen(false);
          setActiveView('creators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Subscription & Pricing Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSelectPlan={handleEnrollInCourse}
        onRequestTutor={() => {
          setIsSubscriptionModalOpen(false);
          setActiveView('tutor-request');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasAllAccessPass={hasAllAccessPass}
      />

      {/* Bottom Mobile Tab Bar */}
      <BottomMobileNav
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Footer */}
      <Footer
        setActiveView={setActiveView}
        onJoinCreator={() => {
          setActiveView('for-creators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFindTalent={() => {
          setActiveView('creators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
