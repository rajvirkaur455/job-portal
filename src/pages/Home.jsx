import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Zap, 
  Building2, 
  BrainCircuit, 
  Users, 
  DollarSign,
  Star,
  Award
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useJob } from '../context/JobContext';
import JobCard from '../components/JobCard';

const SALARY_DATA = [
  { role: 'Frontend Lead', min: 140, avg: 185, max: 240 },
  { role: 'AI/ML Specialist', min: 160, avg: 215, max: 280 },
  { role: 'Staff Full-Stack', min: 150, avg: 195, max: 260 },
  { role: 'Product Designer', min: 120, avg: 160, max: 210 },
  { role: 'DevOps Architect', min: 135, avg: 175, max: 230 },
];

export default function Home({ onSelectJob, onApplyJob }) {
  const navigate = useNavigate();
  const { jobs, companies } = useJob();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Engineering', 'Design', 'Data & AI', 'Product', 'DevOps / Infrastructure'];

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = searchQuery === '' || 
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationQuery === '' ||
      j.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
      j.remoteType.toLowerCase().includes(locationQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || j.category === selectedCategory;

    return matchesSearch && matchesLocation && matchesCat;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(locationQuery)}`);
  };

  const handleQuickPrompt = (promptText) => {
    setSearchQuery(promptText);
    navigate(`/jobs?q=${encodeURIComponent(promptText)}`);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        
        {/* Glow & Backdrop Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-sm animate-float">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen AI Career Match Intelligence 2.0</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-[10px] uppercase tracking-wider font-mono font-bold text-white">Live</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
            Find opportunities.{' '}
            <span className="gradient-text block mt-1">Build your career.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            HireFlow AI indexes top tech companies, matches your exact skill matrix, and streamlines your application tracking in one sleek dashboard.
          </p>

          {/* AI Search Prompt Shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="text-slate-400 font-mono">Popular AI Prompts:</span>
            {[
              "Remote React Jobs $180k+",
              "Senior AI Engineer in SF",
              "Staff Full-Stack at Linear",
              "DevOps Kubernetes Remote"
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-indigo-300 hover:border-indigo-500/40 transition-all hover:scale-105"
              >
                ✨ {prompt}
              </button>
            ))}
          </div>

          {/* Search Box Bar */}
          <div className="mt-10 max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="glass-panel p-2.5 sm:p-3 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-center gap-2">
              
              {/* Keywords Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-900/80 rounded-2xl border border-slate-800/60 w-full focus-within:border-indigo-500/60 transition-colors">
                <Search className="w-5 h-5 text-indigo-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skills (React, Python, LLMs)..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-900/80 rounded-2xl border border-slate-800/60 w-full focus-within:border-indigo-500/60 transition-colors">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City or 'Remote'..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Jobs</span>
              </button>
            </form>
          </div>

          {/* Stats Bar Ticker */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">12,400+</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Active Tech Roles</div>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-heading">850+</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Top Tech Startups</div>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading">94.8%</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">AI Match Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">$185,000</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Avg Senior Salary</div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED COMPANIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Industry Leaders Hiring on HireFlow</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {companies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/jobs?q=${encodeURIComponent(comp.name)}`)}
              className="glass-card p-4 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/60 p-1.5 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                <img src={comp.logo} alt={comp.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300">{comp.name}</h4>
              <span className="text-[11px] text-slate-400 mt-0.5">{comp.openJobsCount} Open Roles</span>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMMENDED JOBS FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Recommended For Tech Professionals
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Featured High-Impact Opportunities</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
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
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.slice(0, 6).map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={onSelectJob}
              onApply={onApplyJob}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white text-sm font-semibold transition-all hover:scale-105"
          >
            <span>Explore All {jobs.length} Active Positions</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </Link>
        </div>
      </section>

      {/* AI CAREER COPILOT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            
            <div className="space-y-5">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold inline-flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4" /> AI Resume Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Instantly score your resume against any tech job position.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our AI model parses your skill set, calculates keyword density gaps, and generates targeted resume bullet improvements to maximize ATS compliance and callback rates.
              </p>
              
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Real-time ATS Keyword Match Score %</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Automated Cover Letter & Pitch Generator</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Skill gap analysis with recommended learning keywords</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/ai-match"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 inline-flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test Your Resume Now</span>
                </Link>
              </div>
            </div>

            {/* Interactive Preview Visual Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-700/80 bg-slate-900/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">Match Score Preview</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">96% ATS Match</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">React / TypeScript Architecture</span>
                  <span className="text-xs font-bold text-emerald-400">100% Match</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">LLM API Streaming Integration</span>
                  <span className="text-xs font-bold text-indigo-400">92% Match</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">GraphQL & Microservices</span>
                  <span className="text-xs font-bold text-amber-400">+ Add Keyword</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SALARY INSIGHTS CHART SECTION */}
      <section id="salary-insights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" /> 2026 Developer Compensation Insights
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">Average Tech Salary Ranges (in $1,000s USD)</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500" /> Avg Compensation</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-cyan-400" /> Top Range</span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALARY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="avgColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="maxColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="role" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v}k`} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                  formatter={(value) => [`$${value},000 USD`, 'Salary']}
                />
                <Area type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#avgColor)" />
                <Area type="monotone" dataKey="max" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#maxColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

    </div>
  );
}
