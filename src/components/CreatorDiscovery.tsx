import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, CheckCircle2, RefreshCw, X, Sparkles } from 'lucide-react';
import { Creator, CategoryType, FilterState } from '../types';
import { CATEGORIES, LOCATIONS_LIST } from '../data/mockData';
import { CreatorCard } from './CreatorCard';

interface CreatorDiscoveryProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  onHireCreator: (creator: Creator) => void;
  initialCategory?: CategoryType;
}

export const CreatorDiscovery: React.FC<CreatorDiscoveryProps> = ({
  creators,
  onSelectCreator,
  onHireCreator,
  initialCategory = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlySomesaTrained, setOnlySomesaTrained] = useState(false);

  // Sync if initialCategory prop changes from external navigation
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      // Search query matching name, skills, title, location, tools, services
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = creator.name.toLowerCase().includes(q);
        const matchesTitle = creator.title.toLowerCase().includes(q);
        const matchesLocation = creator.location.toLowerCase().includes(q);
        const matchesSkills = creator.skills.some((s) => s.toLowerCase().includes(q));
        const matchesTools = creator.tools.some((t) => t.toLowerCase().includes(q));
        const matchesServices = creator.services.some((srv) => srv.name.toLowerCase().includes(q) || srv.description.toLowerCase().includes(q));
        
        if (!matchesName && !matchesTitle && !matchesLocation && !matchesSkills && !matchesTools && !matchesServices) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All') {
        const matchesCategory = 
          creator.primaryCategory === selectedCategory ||
          creator.services.some((s) => s.category === selectedCategory) ||
          creator.skills.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));
        if (!matchesCategory) return false;
      }

      // Location filter
      if (selectedLocation !== 'All Locations') {
        if (!creator.location.toLowerCase().includes(selectedLocation.split(',')[0].toLowerCase())) {
          return false;
        }
      }

      // Availability filter
      if (onlyAvailable && !creator.available) {
        return false;
      }

      // SOMESA-trained filter
      if (onlySomesaTrained && (!creator.trainingBadge || creator.trainingBadge.type !== 'somesa')) {
        return false;
      }

      return true;
    });
  }, [creators, searchQuery, selectedCategory, selectedLocation, onlyAvailable, onlySomesaTrained]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All Locations');
    setOnlyAvailable(false);
    setOnlySomesaTrained(false);
  };

  return (
    <section id="discovery-section" className="py-12 sm:py-16 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E24] uppercase tracking-wider bg-[#0A2E24]/10 px-3 py-1 rounded-full mb-3">
            <span>Talent Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121715] tracking-tight mb-2">
            Meet the talent
          </h2>
          <p className="text-base sm:text-lg text-[#121715]/70 font-normal">
            Real people. Real skills. Real work.
          </p>
        </div>

        {/* Search & Filter Bar Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E8E3DA] shadow-sm mb-8 space-y-4">
          
          {/* Top Search Input & Location Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Main Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A2E24]/70" />
              <input
                id="talent-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creators, skills or services (e.g. CapCut, Canva, TikTok, Packaging, Coffee)..."
                className="w-full pl-12 pr-10 py-3.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-2xl text-sm text-[#121715] placeholder-[#121715]/40 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#121715]/40 hover:text-[#121715] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location selector */}
            <div className="md:col-span-4 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6321]" />
              <select
                id="location-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 bg-[#F5F2ED] border border-[#E8E3DA] focus:border-[#0A2E24] focus:bg-white rounded-2xl text-sm font-medium text-[#121715] focus:outline-none appearance-none cursor-pointer transition-all"
              >
                {LOCATIONS_LIST.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#121715]/50">
                ▼
              </div>
            </div>

          </div>

          {/* Category Chips Scroll */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0A2E24] text-white shadow-xs'
                    : 'bg-[#F5F2ED] text-[#121715]/80 hover:bg-[#E8E3DA] border border-[#E8E3DA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filters: Availability & SOMESA-trained */}
          <div className="pt-3 border-t border-[#E8E3DA] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0A2E24] accent-[#0A2E24] focus:ring-0 cursor-pointer"
                />
                <span className="font-medium text-[#121715]/80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Available for work now
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlySomesaTrained}
                  onChange={(e) => setOnlySomesaTrained(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0A2E24] accent-[#0A2E24] focus:ring-0 cursor-pointer"
                />
                <span className="font-medium text-[#121715]/80 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2E24]" />
                  SOMESA-trained verified
                </span>
              </label>
            </div>

            {/* Results count & reset */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[#121715]/60 font-medium">
                Showing <strong>{filteredCreators.length}</strong> {filteredCreators.length === 1 ? 'creator' : 'creators'}
              </span>

              {(searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All Locations' || onlyAvailable || onlySomesaTrained) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[#0A2E24] hover:underline font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Creator Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onSelect={onSelectCreator}
                onHire={onHireCreator}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E3DA] max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F2ED] text-[#0A2E24] mx-auto flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#121715] mb-1">
              No creators found
            </h3>
            <p className="text-xs sm:text-sm text-[#121715]/60 mb-6">
              We couldn't find anyone matching your current filters. Try changing your keywords or resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0A2E24] rounded-full hover:bg-[#0F3D30] transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
