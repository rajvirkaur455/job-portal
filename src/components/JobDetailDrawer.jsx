import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  ArrowUpRight, 
  Briefcase, 
  Users, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useJob } from '../context/JobContext';

export default function JobDetailDrawer({ job, onClose, onApply }) {
  const { userProfile, savedJobIds, toggleSaveJob, applications } = useJob();
  const [activeTab, setActiveTab] = useState('overview');

  if (!job) return null;

  const isSaved = savedJobIds.includes(job.id);
  const existingApp = applications.find(app => app.jobId === job.id);

  // Skill match matrix analysis
  const userSkills = userProfile.skills || [];
  const requiredSkills = job.skills || [];
  
  const matchedSkills = requiredSkills.filter(s => 
    userSkills.some(us => us.toLowerCase() === s.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(s => 
    !userSkills.some(us => us.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl glass-panel bg-slate-950 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header Bar */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/60 sticky top-0 z-10">
            <div className="flex items-start justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/80 p-2 flex items-center justify-center shrink-0 shadow-lg">
                  <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {job.company}
                    </span>
                    <span className="text-xs text-slate-400">• {job.companySize} employees</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">{job.title}</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSaved 
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300' 
                      : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-indigo-400' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Quick Metadata Pill Strip */}
            <div className="flex flex-wrap items-center gap-3 mt-5 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {job.location} ({job.remoteType})
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-bold text-slate-100">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {job.salaryRange}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> {job.employmentType}
              </span>
            </div>

            {/* Nav Tabs */}
            <div className="flex items-center gap-4 border-b border-slate-800/80 mt-6 pt-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-xs font-semibold uppercase tracking-wider font-mono border-b-2 transition-all ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Role Overview
              </button>
              <button
                onClick={() => setActiveTab('ai-match')}
                className={`pb-3 text-xs font-semibold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'ai-match'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Skill Match ({job.aiMatchScore || 85}%)</span>
              </button>
              <button
                onClick={() => setActiveTab('company')}
                className={`pb-3 text-xs font-semibold uppercase tracking-wider font-mono border-b-2 transition-all ${
                  activeTab === 'company'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Company Profile
              </button>
            </div>

          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {activeTab === 'overview' && (
              <>
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">About the Position</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{job.description}</p>
                </div>

                {/* Key Responsibilities */}
                {job.responsibilities && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Key Responsibilities</h3>
                    <ul className="space-y-2.5">
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Role Requirements</h3>
                    <ul className="space-y-2.5">
                      {job.requirements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Perks & Benefits */}
                {job.perks && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Perks & Compensation</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {job.perks.map((perk, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'ai-match' && (
              <div className="space-y-6">
                
                {/* Score Header Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 text-center relative overflow-hidden">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-600/20 border-2 border-indigo-500 text-3xl font-extrabold text-white mb-3 shadow-inner">
                    {job.aiMatchScore || 85}%
                  </div>
                  <h3 className="text-lg font-bold text-white">AI Candidate-Job Alignment Score</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                    Based on your skill matrix, experience level, and resume keyword density relative to {job.company}'s requirements.
                  </p>
                </div>

                {/* Matched Skills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Matched Skills ({matchedSkills.length})
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                    {matchedSkills.length === 0 && (
                      <p className="text-xs text-slate-400 italic">No direct matches found. Add more skills to your profile.</p>
                    )}
                  </div>
                </div>

                {/* Missing / Recommended Skills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Recommended Keywords to Add ({missingSkills.length})
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pro Tip */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                    <Sparkles className="w-4 h-4" /> AI Resume Optimization Tip
                  </div>
                  <p>
                    Adding missing keywords like <strong>{missingSkills[0] || 'TypeScript'}</strong> to your resume summary could boost your application match score by up to 12%.
                  </p>
                </div>

              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white">{job.company} Overview</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {job.company} is a leading tech organization pioneering modern software and AI product experiences.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400">Headquarters:</span>
                      <p className="font-semibold text-white mt-0.5">{job.location}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Company Size:</span>
                      <p className="font-semibold text-white mt-0.5">{job.companySize} Employees</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Drawer Footer CTA */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Salary Offer</span>
              <span className="text-base font-extrabold text-white">{job.salaryRange}</span>
            </div>

            <div className="flex items-center gap-3">
              {existingApp ? (
                <span className="px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
                  Applied ({existingApp.status})
                </span>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onApply(job);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>1-Click Apply Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
