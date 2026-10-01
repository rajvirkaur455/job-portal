import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  LayoutList, 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  Building2, 
  DollarSign, 
  Briefcase,
  Check
} from 'lucide-react';
import { useJob } from '../context/JobContext';
import JobCard from '../components/JobCard';

export default function JobsExplorer({ onSelectJob, onApplyJob }) {
  const { jobs, savedJobIds } = useJob();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search States
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('loc') || '');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExpLevels, setSelectedExpLevels] = useState([]);
  const [selectedRemoteTypes, setSelectedRemoteTypes] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [showSavedOnly, setShowSavedOnly] = useState(searchParams.get('saved') === 'true');
  
  // Sort & Layout
  const [sortBy, setSortBy] = useState('match'); // 'match', 'salary', 'recent'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'split'
  const [activeSelectedJob, setActiveSelectedJob] = useState(jobs[0] || null);

  const categories = ['All', 'Engineering', 'Design', 'Data & AI', 'Product', 'DevOps / Infrastructure'];
  const expLevels = ['Mid-Level', 'Senior', 'Lead'];
  const remoteOptions = ['Remote', 'Hybrid', 'On-site'];

  useEffect(() => {
    if (searchParams.get('q')) setQuery(searchParams.get('q'));
    if (searchParams.get('loc')) setLocationQuery(searchParams.get('loc'));
    if (searchParams.get('saved') === 'true') setShowSavedOnly(true);
  }, [searchParams]);

  const toggleExpLevel = (level) => {
    if (selectedExpLevels.includes(level)) {
      setSelectedExpLevels(selectedExpLevels.filter(l => l !== level));
    } else {
      setSelectedExpLevels([...selectedExpLevels, level]);
    }
  };

  const toggleRemoteType = (type) => {
    if (selectedRemoteTypes.includes(type)) {
      setSelectedRemoteTypes(selectedRemoteTypes.filter(t => t !== type));
    } else {
      setSelectedRemoteTypes([...selectedRemoteTypes, type]);
    }
  };

  const resetFilters = () => {
    setQuery('');
    setLocationQuery('');
    setSelectedCategory('All');
    setSelectedExpLevels([]);
    setSelectedRemoteTypes([]);
    setMinSalary(0);
    setMinMatchScore(0);
    setShowSavedOnly(false);
    setSearchParams({});
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    // Query Match
    const matchesQuery = query === '' ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(query.toLowerCase()));

    // Location Match
    const matchesLoc = locationQuery === '' ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
      job.remoteType.toLowerCase().includes(locationQuery.toLowerCase());

    // Category Match
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;

    // Exp level match
    const matchesExp = selectedExpLevels.length === 0 || selectedExpLevels.includes(job.experienceLevel);

    // Remote match
    const matchesRemote = selectedRemoteTypes.length === 0 || selectedRemoteTypes.includes(job.remoteType);

    // Salary match
    const matchesSal = (job.minSalary || 0) >= minSalary;

    // AI match
    const matchesAI = (job.aiMatchScore || 0) >= minMatchScore;

    // Saved match
    const matchesSaved = !showSavedOnly || savedJobIds.includes(job.id);

    return matchesQuery && matchesLoc && matchesCat && matchesExp && matchesRemote && matchesSal && matchesAI && matchesSaved;
  });

  // Sort Logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'match') return (b.aiMatchScore || 0) - (a.aiMatchScore || 0);
    if (sortBy === 'salary') return (b.minSalary || 0) - (a.minSalary || 0);
    return 0; // Default order
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* Top Search & Filter Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          
          {/* Keyword Search */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-2xl border border-slate-800 w-full focus-within:border-indigo-500 transition-colors">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by job title, company, or tech stack (React, Python)..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Location Search */}
          <div className="w-full lg:w-72 flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-2xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
            <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="City or 'Remote'"
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Reset Action */}
          <button
            onClick={resetFilters}
            className="p-3 rounded-2xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold shrink-0"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Category Pills & Quick Filter Bar */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-800/80 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 font-semibold transition-all ${
                showSavedOnly
                  ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedJobIds.length})</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid & Filters Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Filter Roles
              </h3>
              <span className="text-xs text-slate-400 font-mono">{sortedJobs.length} found</span>
            </div>

            {/* Experience Level */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Experience Level</label>
              {expLevels.map((lvl) => (
                <label key={lvl} className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedExpLevels.includes(lvl)}
                    onChange={() => toggleExpLevel(lvl)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{lvl}</span>
                </label>
              ))}
            </div>

            {/* Remote Work Preference */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Work Location</label>
              {remoteOptions.map((type) => (
                <label key={type} className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedRemoteTypes.includes(type)}
                    onChange={() => toggleRemoteType(type)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            {/* Minimum Salary Slider */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-400 font-mono">Min Salary</label>
                <span className="text-indigo-400 font-bold font-mono">${minSalary > 0 ? `${minSalary / 1000}k` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* AI Match Score Slider */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> AI Match
                </label>
                <span className="text-amber-400 font-bold font-mono">{minMatchScore > 0 ? `>= ${minMatchScore}%` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Right Job Cards Feed */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Feed Toolbar */}
          <div className="flex items-center justify-between gap-4 glass-card p-3.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium pl-2">
              Showing <strong className="text-white">{sortedJobs.length}</strong> opportunities
            </span>

            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="match">Sort by: Highest AI Match</option>
                <option value="salary">Sort by: Highest Salary</option>
                <option value="recent">Sort by: Most Recent</option>
              </select>

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`p-1.5 rounded-lg text-xs ${viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  title="Split View"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Job Feed Content */}
          {sortedJobs.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center border border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">No Matching Jobs Found</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                We couldn't find any position matching your current query and filters. Try clearing some filters or searching for different tech keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={onSelectJob}
                  onApply={onApplyJob}
                />
              ))}
            </div>
          ) : (
            /* Split View Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column Job List */}
              <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                {sortedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={activeSelectedJob?.id === job.id}
                    onSelect={(j) => setActiveSelectedJob(j)}
                    onApply={onApplyJob}
                  />
                ))}
              </div>

              {/* Right Column Detail Preview Box */}
              {activeSelectedJob && (
                <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5 sticky top-24">
                  <div className="flex items-center gap-3">
                    <img src={activeSelectedJob.companyLogo} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-900 p-1 border border-slate-800" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{activeSelectedJob.title}</h3>
                      <p className="text-xs text-slate-400">{activeSelectedJob.company} • {activeSelectedJob.location}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                    💰 {activeSelectedJob.salaryRange} | ⚡ {activeSelectedJob.aiMatchScore}% Match
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-6 font-sans">
                    {activeSelectedJob.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onSelectJob(activeSelectedJob)}
                      className="text-xs text-indigo-400 font-bold hover:underline"
                    >
                      View Full Role Specs →
                    </button>
                    <button
                      onClick={() => onApplyJob(activeSelectedJob)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                    >
                      1-Click Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
