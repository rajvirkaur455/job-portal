import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  FileText, 
  DollarSign, 
  User, 
  CheckCircle2,
  Wand2,
  Building2,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useJob } from '../context/JobContext';

export default function ApplyModal({ job, onClose }) {
  const { userProfile, applyToJob } = useJob();
  const [coverLetter, setCoverLetter] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState(job?.salaryRange || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  // AI Cover Letter Generator Simulation
  const handleGenerateCoverLetter = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const letter = `Dear Hiring Team at ${job.company},

I am thrilled to submit my application for the ${job.title} position. With over 6 years of experience working with ${job.skills?.slice(0, 3).join(', ')}, I have built high-scale web platforms and delivered AI-powered developer experiences.

My background aligns closely with ${job.company}'s requirements:
- Expertise in ${job.skills?.[0] || 'React'} and modern client architecture.
- Proven track record of scaling user-facing applications and optimizing performance.
- Passion for crafting exceptional product user experiences.

I would welcome the opportunity to discuss how my skill set and enthusiasm can contribute to the mission at ${job.company}.

Best regards,
${userProfile.name}`;
      
      setCoverLetter(letter);
      setIsGenerating(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyToJob(job, coverLetter, salaryExpectation);
    
    // Trigger confetti victory effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-900/60">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700/80 p-1.5 flex items-center justify-center shrink-0">
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {job.company}
                </span>
                <span className="text-xs text-slate-400">• {job.location}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">{job.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Your profile and AI cover letter have been transmitted to {job.company}'s recruitment dashboard. Track progress in your Application Dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Candidate Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center">
                  AM
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{userProfile.name}</h4>
                  <p className="text-xs text-slate-400">{userProfile.title} • {userProfile.email}</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                Resume Attached
              </span>
            </div>

            {/* Salary Expectation Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Salary Expectation (Annual USD)
              </label>
              <input
                type="text"
                value={salaryExpectation}
                onChange={(e) => setSalaryExpectation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="$180,000 - $220,000"
              />
            </div>

            {/* Cover Letter Section + AI Assistant Button */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Cover Letter / Pitch
                </label>
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-semibold hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-md"
                >
                  <Wand2 className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Generating AI Pitch...' : 'AI One-Click Auto-Writer'}</span>
                </button>
              </div>

              <textarea
                rows={6}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Highlight your relevant experience, key achievements, or click 'AI Auto-Writer' to generate a customized pitch..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
              />
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
