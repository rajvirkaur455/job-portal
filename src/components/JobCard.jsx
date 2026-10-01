import React from 'react';
import { 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Building2, 
  Clock, 
  Zap, 
  ArrowUpRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useJob } from '../context/JobContext';

export default function JobCard({ job, onSelect, onApply, isSelected = false }) {
  const { savedJobIds, toggleSaveJob, applications } = useJob();
  const isSaved = savedJobIds.includes(job.id);
  const existingApp = applications.find(app => app.jobId === job.id);

  const getMatchScoreBadge = (score) => {
    if (score >= 90) {
      return {
        bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
        label: `${score}% Match`
      };
    } else if (score >= 80) {
      return {
        bg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
        label: `${score}% Match`
      };
    }
    return {
      bg: 'bg-slate-700/30 border-slate-600/30 text-slate-300',
      label: `${score}% Match`
    };
  };

  const scoreBadge = getMatchScoreBadge(job.aiMatchScore || 85);

  return (
    <div
      onClick={() => onSelect && onSelect(job)}
      className={`group relative glass-card rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-indigo-500 bg-slate-900/90 shadow-xl shadow-indigo-500/10'
          : 'hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-950/40'
      }`}
    >
      {/* Featured / Urgent Badges Bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {job.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-400" /> Featured
            </span>
          )}
          {job.urgent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold">
              <Zap className="w-3 h-3 text-rose-400" /> Hiring Fast
            </span>
          )}
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3" /> {job.postedDate}
          </span>
        </div>

        {/* AI Match Score Badge */}
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${scoreBadge.bg}`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{scoreBadge.label}</span>
        </div>
      </div>

      {/* Main Info Header */}
      <div className="flex items-start gap-4">
        
        {/* Company Avatar */}
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 shrink-0 p-1.5 flex items-center justify-center shadow-md">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80';
            }}
          />
        </div>

        {/* Title & Company */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
              {job.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveJob(job.id);
              }}
              className={`p-1.5 rounded-lg transition-all ${
                isSaved
                  ? 'text-indigo-400 bg-indigo-500/20 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isSaved ? "Saved" : "Save Job"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-400' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
            <span className="font-semibold text-slate-200 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700">
              {job.remoteType}
            </span>
          </div>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-xs sm:text-sm text-slate-400 mt-3.5 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Skills Badges Tag Bar */}
      <div className="flex flex-wrap items-center gap-1.5 mt-4">
        {job.skills?.slice(0, 5).map((skill, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-slate-300 hover:text-indigo-300 hover:border-indigo-500/40 transition-colors"
          >
            {skill}
          </span>
        ))}
        {job.skills?.length > 5 && (
          <span className="text-[11px] text-slate-400 px-1 font-mono">
            +{job.skills.length - 5} more
          </span>
        )}
      </div>

      {/* Card Footer: Salary & Apply Button */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Compensation</span>
          <span className="text-sm font-bold text-slate-100 flex items-center gap-0.5">
            {job.salaryRange}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {existingApp ? (
            <span className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {existingApp.status}
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApply && onApply(job);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 flex items-center gap-1.5 group-hover:translate-x-0.5"
            >
              <span>1-Click Apply</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
