import React from 'react';
import { Compass, Users, BookOpen, MapPin, BarChart3, PlusCircle } from 'lucide-react';
import { ActiveView } from '../types';

interface BottomMobileNavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  activeView,
  setActiveView,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-lg border-t border-[#E8E3DA] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* 1. Explore */}
        <button
          id="tab-discover"
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'home' ? 'text-[#0A2E24]' : 'text-[#121715]/60 hover:text-[#0A2E24]'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeView === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-1 font-medium ${activeView === 'home' ? 'font-bold text-[#0A2E24]' : ''}`}>
            Explore
          </span>
        </button>

        {/* 2. Creators (Next to Explore) */}
        <button
          id="tab-creators"
          onClick={() => {
            setActiveView('creators');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'creators' || activeView === 'creator-profile' ? 'text-[#0A2E24]' : 'text-[#121715]/60 hover:text-[#0A2E24]'
          }`}
        >
          <Users className={`w-5 h-5 ${activeView === 'creators' || activeView === 'creator-profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-1 font-medium ${activeView === 'creators' || activeView === 'creator-profile' ? 'font-bold text-[#0A2E24]' : ''}`}>
            Creators
          </span>
        </button>

        {/* 3. Center Highlight: Soma (Luganda Academy) */}
        <button
          id="tab-learn"
          onClick={() => {
            setActiveView('learn');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1 px-1 -mt-3 cursor-pointer group"
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform ${
            activeView === 'learn' || activeView === 'course-detail' 
              ? 'bg-[#0A2E24] text-[#FF6321] ring-2 ring-[#FF6321]/40' 
              : 'bg-[#0A2E24] text-white'
          }`}>
            <BookOpen className="w-5 h-5 text-[#FF6321]" />
          </div>
          <span className={`text-[10px] mt-0.5 font-bold ${
            activeView === 'learn' || activeView === 'course-detail' ? 'text-[#FF6321]' : 'text-[#0A2E24]'
          }`}>
            Soma
          </span>
        </button>

        {/* 4. Tutor (Second last to Hub) */}
        <button
          id="tab-send-tutor"
          onClick={() => {
            setActiveView('tutor-request');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'tutor-request' ? 'text-[#0A2E24]' : 'text-[#121715]/60 hover:text-[#0A2E24]'
          }`}
        >
          <MapPin className={`w-5 h-5 ${activeView === 'tutor-request' ? 'stroke-[2.5] text-[#FF6321]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-1 font-medium ${activeView === 'tutor-request' ? 'font-bold text-[#0A2E24]' : ''}`}>
            Tutor
          </span>
        </button>

        {/* 5. Hub (Last) */}
        <button
          id="tab-admin"
          onClick={() => {
            setActiveView('admin-stats');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'admin-stats' ? 'text-[#0A2E24]' : 'text-[#121715]/60 hover:text-[#0A2E24]'
          }`}
        >
          <BarChart3 className={`w-5 h-5 ${activeView === 'admin-stats' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-1 font-medium ${activeView === 'admin-stats' ? 'font-bold text-[#0A2E24]' : ''}`}>
            Hub
          </span>
        </button>
      </div>
    </div>
  );
};
