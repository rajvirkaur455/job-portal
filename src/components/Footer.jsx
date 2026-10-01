import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Heart, Code, Share2 } from 'lucide-react';
import { useJob } from '../context/JobContext';


export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useJob();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Subscribed ${email} to HireFlow AI Weekly Career Insights!`, 'success');
    setEmail('');
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 mt-20 relative overflow-hidden">
      {/* Subtle Glow Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 p-0.5 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">HireFlow AI</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Find opportunities. Build your career. The modern AI career platform matching engineers, designers, and tech leaders with high-growth companies.
            </p>
            
            {/* Badges */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Tech Roles</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> AI Resume Engine</span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono text-[11px]">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Browse Tech Jobs</Link></li>
              <li><Link to="/ai-match" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">AI Resume Matcher <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-indigo-500/20 text-indigo-300">New</span></Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Kanban Application Tracker</Link></li>
              <li><Link to="/companies" className="hover:text-indigo-400 transition-colors">Top Tech Companies</Link></li>
              <li><Link to="/post-job" className="hover:text-indigo-400 transition-colors">Employer Portal</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono text-[11px]">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#salary-insights" className="hover:text-indigo-400 transition-colors">2026 Tech Salary Guide</a></li>
              <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">Career Profile Matrix</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('ATS Resume Scanner loaded', 'info'); }} className="hover:text-indigo-400 transition-colors">ATS Keyword Audit</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Developer Salary Calculator</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono text-[11px]">Job Digest</h4>
            <p className="text-xs text-slate-400">Get weekly AI-matched job alerts directly in your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 pr-10"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 HireFlow AI. All rights reserved. Built for modern tech talent.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
