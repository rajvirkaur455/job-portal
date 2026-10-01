import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_JOBS, MOCK_COMPANIES, DEFAULT_USER_PROFILE, DEFAULT_APPLICATIONS } from '../data/mockJobs';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // 1. Jobs State
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('hireflow_jobs');
    return saved ? JSON.parse(saved) : MOCK_JOBS;
  });

  // 2. Saved / Bookmarked Job IDs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem('hireflow_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-6'];
  });

  // 3. User Applications State
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('hireflow_applications');
    return saved ? JSON.parse(saved) : DEFAULT_APPLICATIONS;
  });

  // 4. User Profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('hireflow_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  // 5. Toast Notifications
  const [toast, setToast] = useState(null);

  // 6. Notifications Feed
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Offer Received! 🎉',
      message: 'Linear has extended a formal offer for Staff Frontend Architect.',
      time: '10m ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Interview Scheduled',
      message: 'OpenAI team invited you to a technical interview for Senior AI Engineer.',
      time: '2h ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'AI Resume Match Update',
      message: 'Your profile has a 98% match rate for Vercel Full-Stack Web Developer position!',
      time: '1d ago',
      read: true
    }
  ]);

  // Persist to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem('hireflow_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('hireflow_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('hireflow_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('hireflow_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Toggle Save Job
  const toggleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      showToast('Job removed from saved items', 'info');
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      showToast('Job saved to your bookmarks!', 'success');
    }
  };

  // Apply to Job
  const applyToJob = (job, coverLetter = '', customSalary = '') => {
    const existingIndex = applications.findIndex(app => app.jobId === job.id);
    const newApp = {
      id: existingIndex >= 0 ? applications[existingIndex].id : `app-${Date.now()}`,
      jobId: job.id,
      company: job.company,
      title: job.title,
      logo: job.companyLogo,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      salary: customSalary || job.salaryRange,
      notes: coverLetter ? `Cover Letter submitted: "${coverLetter.substring(0, 100)}..."` : 'Applied via HireFlow 1-Click Apply',
      matchScore: calculateDynamicMatch(job, userProfile.skills)
    };

    if (existingIndex >= 0) {
      const updated = [...applications];
      updated[existingIndex] = newApp;
      setApplications(updated);
    } else {
      setApplications([newApp, ...applications]);
    }

    // Increase job applicant count
    setJobs(jobs.map(j => j.id === job.id ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j));

    showToast(`Application successfully submitted to ${job.company}!`, 'success');
  };

  // Update Application Status in Tracker
  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    showToast(`Updated status to "${newStatus}"`, 'info');
  };

  // Delete Application
  const deleteApplication = (appId) => {
    setApplications(applications.filter(app => app.id !== appId));
    showToast('Application deleted', 'info');
  };

  // Post new job
  const addNewJob = (newJobData) => {
    const created = {
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0,
      aiMatchScore: calculateDynamicMatch(newJobData, userProfile.skills),
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80',
      ...newJobData
    };
    setJobs([created, ...jobs]);
    showToast('Job opening posted live on HireFlow AI!', 'success');
    return created;
  };

  // Update User Profile
  const updateUserProfile = (newProfileData) => {
    setUserProfile({ ...userProfile, ...newProfileData });
    showToast('Profile updated successfully!', 'success');
  };

  // Helper function to calculate dynamic match score based on skills overlap
  const calculateDynamicMatch = (job, userSkills = []) => {
    if (!job || !job.skills || job.skills.length === 0) return 85;
    const skillsList = userSkills.length > 0 ? userSkills : userProfile.skills;
    const matchCount = job.skills.filter(skill => 
      skillsList.some(s => s.toLowerCase() === skill.toLowerCase())
    ).length;
    
    const ratio = matchCount / job.skills.length;
    const baseScore = Math.min(99, Math.max(65, Math.round(60 + ratio * 38)));
    return baseScore;
  };

  const markNotificationRead = (notifId) => {
    setNotifications(notifications.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  return (
    <JobContext.Provider value={{
      jobs,
      savedJobIds,
      applications,
      userProfile,
      notifications,
      toast,
      showToast,
      toggleSaveJob,
      applyToJob,
      updateApplicationStatus,
      deleteApplication,
      addNewJob,
      updateUserProfile,
      calculateDynamicMatch,
      markNotificationRead,
      companies: MOCK_COMPANIES
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all">
          <div className={`px-5 py-3.5 rounded-xl shadow-2xl glass-panel border flex items-center gap-3 text-sm font-medium ${
            toast.type === 'success' ? 'border-emerald-500/40 text-emerald-300 bg-slate-900/90' :
            toast.type === 'info' ? 'border-indigo-500/40 text-indigo-300 bg-slate-900/90' :
            'border-amber-500/40 text-amber-300 bg-slate-900/90'
          }`}>
            <span className="text-lg">
              {toast.type === 'success' ? '✨' : toast.type === 'info' ? 'ℹ️' : '⚠️'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
