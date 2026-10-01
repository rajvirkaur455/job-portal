import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Building2, 
  DollarSign, 
  PieChart as PieIcon, 
  BarChart3, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useJob } from '../context/JobContext';

const KANBAN_STAGES = [
  { id: 'Saved', name: 'Saved Roles', color: 'border-slate-700 bg-slate-900/40 text-slate-300' },
  { id: 'Applied', name: 'Submitted', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
  { id: 'Screening', name: 'Recruiter Screen', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
  { id: 'Interviewing', name: 'Interviewing', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
  { id: 'Offer Received', name: 'Offers 🎉', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
];

const COLORS = ['#64748b', '#6366f1', '#38bdf8', '#f59e0b', '#10b981'];

export default function Dashboard({ onSelectJob }) {
  const { applications, updateApplicationStatus, deleteApplication, jobs } = useJob();
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesText, setNotesText] = useState('');

  const getStageApps = (stageId) => applications.filter(app => app.status === stageId);

  // Analytics data calculation
  const statusCounts = KANBAN_STAGES.map(stage => ({
    name: stage.name,
    count: applications.filter(a => a.status === stage.id).length
  }));

  const velocityData = [
    { week: 'Week 1', applied: 2, interviews: 1 },
    { week: 'Week 2', applied: 4, interviews: 2 },
    { week: 'Week 3', applied: 3, interviews: 2 },
    { week: 'Week 4', applied: 5, interviews: 3 },
  ];

  const handleSaveNotes = (appId) => {
    // Save updated notes into app state
    const app = applications.find(a => a.id === appId);
    if (app) {
      app.notes = notesText;
    }
    setEditingNotesId(null);
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Kanban className="w-4 h-4" /> Career Tracker & Analytics
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Application Kanban Board</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl glass-card border border-slate-800 text-xs font-mono text-slate-300">
            Total Tracked: <strong className="text-white">{applications.length}</strong>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
            Offer Rate: {applications.length > 0 ? Math.round((getStageApps('Offer Received').length / applications.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Analytics Recharts Summary Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Status Distribution Pie Chart */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-indigo-400" /> Application Pipeline Funnel
            </h4>
          </div>
          
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
            {statusCounts.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                {item.name}: {item.count}
              </span>
            ))}
          </div>
        </div>

        {/* Velocity Bar Chart */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-cyan-400" /> Application Response Velocity
            </h4>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="applied" fill="#6366f1" radius={[4, 4, 0, 0]} name="Applications" />
                <Bar dataKey="interviews" fill="#10b981" radius={[4, 4, 0, 0]} name="Interviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* KANBAN BOARD COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {KANBAN_STAGES.map((stage) => {
          const stageApps = getStageApps(stage.id);
          return (
            <div key={stage.id} className="glass-card rounded-2xl p-4 border border-slate-800/80 space-y-3 min-h-[500px] flex flex-col">
              
              {/* Stage Header */}
              <div className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between ${stage.color}`}>
                <span>{stage.name}</span>
                <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white">
                  {stageApps.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageApps.map((app) => {
                  const linkedJob = jobs.find(j => j.id === app.jobId);
                  return (
                    <div
                      key={app.id}
                      className="glass-card p-3.5 rounded-xl border border-slate-800/90 hover:border-indigo-500/40 transition-all space-y-2.5 group relative"
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img src={app.logo} alt="" className="w-6 h-6 rounded-md object-cover bg-slate-900" />
                          <span className="text-xs font-bold text-white truncate">{app.company}</span>
                        </div>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Title */}
                      <h4 
                        onClick={() => linkedJob && onSelectJob(linkedJob)}
                        className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 cursor-pointer line-clamp-2"
                      >
                        {app.title}
                      </h4>

                      {/* Salary & Match Score */}
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>💰 {app.salary?.split('-')[0]}</span>
                        <span className="text-amber-400">✨ {app.matchScore}%</span>
                      </div>

                      {/* Status Move Dropdown Selector */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Stage:</span>
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-indigo-300 rounded px-1.5 py-0.5 font-semibold focus:outline-none"
                        >
                          {KANBAN_STAGES.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Application Notes */}
                      <div className="pt-1.5 text-[10px] text-slate-400 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/40">
                        {editingNotesId === app.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={3}
                              value={notesText}
                              onChange={(e) => setNotesText(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 text-white p-1 rounded text-[10px] focus:outline-none"
                            />
                            <button
                              onClick={() => handleSaveNotes(app.id)}
                              className="px-2 py-0.5 bg-indigo-600 text-white rounded font-bold text-[9px]"
                            >
                              Save Notes
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-1">
                            <span className="line-clamp-3">{app.notes || 'No notes added yet.'}</span>
                            <button
                              onClick={() => { setEditingNotesId(app.id); setNotesText(app.notes || ''); }}
                              className="text-slate-500 hover:text-indigo-400 shrink-0"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}

                {stageApps.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-800/80 rounded-xl font-mono">
                    No roles in {stage.name}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
