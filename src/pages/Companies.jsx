import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Search, MapPin, Users, Star, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { useJob } from '../context/JobContext';

export default function Companies() {
  const navigate = useNavigate();
  const { companies } = useJob();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span>Top Tech Employers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Hiring Companies & Tech Stacks
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Discover high-growth startups and tech giants building next-generation AI and developer tools.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-2xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name or tech stack (React, Postgres)..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/80 p-2 flex items-center justify-center shrink-0 shadow-md">
                    <img src={comp.logo} alt={comp.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{comp.name}</h3>
                    <p className="text-xs text-slate-400">{comp.industry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {comp.rating}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-sans">
                {comp.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {comp.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cyan-400" /> {comp.employees}</span>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {comp.techStack?.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-indigo-400 font-bold font-mono">{comp.openJobsCount} Open Roles</span>
              <button
                onClick={() => navigate(`/jobs?q=${encodeURIComponent(comp.name)}`)}
                className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>View Jobs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
