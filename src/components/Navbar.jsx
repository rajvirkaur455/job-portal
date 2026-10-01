import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Bell, 
  Briefcase, 
  BrainCircuit, 
  Kanban, 
  Building2, 
  PlusCircle, 
  User, 
  Menu, 
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useJob } from '../context/JobContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { savedJobIds, notifications, markNotificationRead } = useJob();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { name: 'Explore Jobs', path: '/jobs', icon: Briefcase },
    { name: 'AI Career Matcher', path: '/ai-match', icon: BrainCircuit, badge: 'AI' },
    { name: 'Application Tracker', path: '/dashboard', icon: Kanban },
    { name: 'Companies', path: '/companies', icon: Building2 },
  ];

  const isActive = (path) => {
    if (path === '/jobs' && location.pathname === '/jobs') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    if (path === '/' && location.pathname === '/') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">HireFlow</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">AI</span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 -mt-1 hidden sm:inline">Find opportunities. Build your career.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 relative ${
                    active
                      ? 'bg-slate-800/90 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Saved Jobs Icon */}
            <Link 
              to="/jobs?saved=true" 
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors relative"
              title="Saved Jobs"
            >
              <Bookmark className="w-5 h-5" />
              {savedJobIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {savedJobIds.length}
                </span>
              )}
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>

              {/* Notification Popover Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-400" />
                      <h4 className="font-semibold text-sm text-white">Activity Notifications</h4>
                    </div>
                    {unreadCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          notif.read
                            ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                            : 'bg-indigo-950/30 border-indigo-500/30 text-slate-200 hover:border-indigo-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-semibold text-white text-xs">{notif.title}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 text-center border-t border-slate-800/60">
                    <button 
                      onClick={() => { setShowNotifications(false); navigate('/dashboard'); }}
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1 w-full"
                    >
                      View Application Tracker <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Post Job CTA Button */}
            <Link
              to="/post-job"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job</span>
            </Link>

            {/* User Profile Avatar */}
            <Link
              to="/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-sm">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-xs font-bold text-cyan-300">
                  AM
                </div>
              </div>
            </Link>

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 ${
                  active ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800">
            <Link
              to="/post-job"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              Post a Job Opening
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
