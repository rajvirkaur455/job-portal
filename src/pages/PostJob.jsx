import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Wand2, Sparkles, Building2, MapPin, DollarSign, Briefcase, CheckCircle2 } from 'lucide-react';
import { useJob } from '../context/JobContext';

export default function PostJob() {
  const navigate = useNavigate();
  const { addNewJob, showToast } = useJob();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    remoteType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$160,000 - $220,000',
    minSalary: 160000,
    maxSalary: 220000,
    category: 'Engineering',
    experienceLevel: 'Senior',
    companySize: '50-200',
    description: '',
    responsibilities: '',
    requirements: '',
    skillsStr: 'React, TypeScript, Node.js, Tailwind CSS'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIAutoFill = () => {
    if (!formData.title) {
      showToast('Please enter a Job Title first (e.g. Senior Frontend Engineer)', 'warning');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        description: `We are seeking a talented ${prev.title} to lead frontend innovation across our web applications. You will architect high-performance components, collaborate with product designers, and champion modern UI standards.`,
        responsibilities: `Architect component hierarchies using modern React and state management.\nOptimize client bundle performance and rendering metrics.\nCollaborate with backend engineers to integrate REST/GraphQL APIs.\nMentor junior software engineers and review PRs.`,
        requirements: `4+ years of professional engineering experience with React & TypeScript.\nDeep understanding of web standards, DOM APIs, and CSS/Tailwind.\nExperience with automated testing and continuous integration.\nStrong communication skills and product ownership mindset.`,
        skillsStr: 'React, TypeScript, Tailwind CSS, Next.js, Webpack, GraphQL'
      }));
      setIsGenerating(false);
      showToast('AI auto-filled job specifications!', 'success');
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) {
      showToast('Title and Company are required', 'warning');
      return;
    }

    const skills = formData.skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const responsibilities = formData.responsibilities.split('\n').filter(Boolean);
    const requirements = formData.requirements.split('\n').filter(Boolean);

    const created = addNewJob({
      ...formData,
      skills,
      responsibilities,
      requirements
    });

    navigate('/jobs');
  };

  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
          <PlusCircle className="w-4 h-4 text-indigo-400" />
          <span>Employer Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Post a New Tech Job Position
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Reach thousands of top-tier software developers, designers, and AI leaders.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white">1. Role & Company Info</h3>
            <button
              type="button"
              onClick={handleAIAutoFill}
              disabled={isGenerating}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              <Wand2 className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>AI Auto-Write Specs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Job Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Acme Tech AI"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Work Type</label>
              <select
                value={formData.remoteType}
                onChange={(e) => setFormData({ ...formData, remoteType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Product">Product</option>
                <option value="DevOps / Infrastructure">DevOps / Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Salary Range</label>
              <input
                type="text"
                value={formData.salaryRange}
                onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                placeholder="$160,000 - $220,000"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={formData.skillsStr}
                onChange={(e) => setFormData({ ...formData, skillsStr: e.target.value })}
                placeholder="React, TypeScript, Node.js, Python"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Text Areas */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Overview Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a high-level summary of the role..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Responsibilities (One per line)</label>
            <textarea
              rows={4}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Architect components...&#10;Optimize performance..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Requirements (One per line)</label>
            <textarea
              rows={4}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="4+ years experience with React...&#10;Strong TypeScript skills..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Position Live</span>
          </button>
        </div>

      </form>

    </div>
  );
}
