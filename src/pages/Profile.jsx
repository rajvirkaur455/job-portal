import React, { useState } from 'react';
import { User, Mail, MapPin, DollarSign, Sparkles, Save, Plus, X, FileText, CheckCircle2, Shield } from 'lucide-react';
import { useJob } from '../context/JobContext';

export default function Profile() {
  const { userProfile, updateUserProfile, applications, savedJobIds } = useJob();
  const [formData, setFormData] = useState({ ...userProfile });
  const [newSkill, setNewSkill] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;
    
    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
          <User className="w-4 h-4 text-indigo-400" />
          <span>Candidate Profile Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Your Career Profile & Skill Matrix
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Manage your skills, resume copy, and salary preferences to optimize your AI match scores.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
        
        {/* Top Avatar Card */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-extrabold text-lg text-cyan-300">
                AM
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{formData.name}</h3>
              <p className="text-xs text-slate-400">{formData.title} • {formData.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">Applied</span>
              <strong className="text-indigo-400 text-sm">{applications.length}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Saved</span>
              <strong className="text-cyan-400 text-sm">{savedJobIds.length}</strong>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Target Role Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">Target Salary Preference</label>
            <input
              type="text"
              value={formData.salaryPreference}
              onChange={(e) => setFormData({ ...formData, salaryPreference: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Skills Tag Matrix Editor */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Skill Matrix Tags ({formData.skills?.length || 0})
          </label>
          
          <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[90px]">
            {formData.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-400 text-indigo-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input */}
          <div className="flex items-center gap-2 max-w-md">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. PyTorch, Docker)..."
              className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Bio & Resume Text */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-1">
              Plain Text Resume (Used by AI Matcher)
            </label>
            <textarea
              rows={8}
              value={formData.resumeText}
              onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Matrix</span>
          </button>
        </div>

      </form>

    </div>
  );
}
