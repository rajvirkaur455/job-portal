import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import JobDetailDrawer from './components/JobDetailDrawer';
import ApplyModal from './components/ApplyModal';

import Home from './pages/Home';
import JobsExplorer from './pages/JobsExplorer';
import AIMatcher from './pages/AIMatcher';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';

export default function App() {
  const [drawerJob, setDrawerJob] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);

  const handleOpenDrawer = (job) => {
    setDrawerJob(job);
  };

  const handleCloseDrawer = () => {
    setDrawerJob(null);
  };

  const handleOpenApplyModal = (job) => {
    setApplyModalJob(job);
  };

  const handleCloseApplyModal = () => {
    setApplyModalJob(null);
  };

  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home onSelectJob={handleOpenDrawer} onApplyJob={handleOpenApplyModal} />} />
              <Route path="/jobs" element={<JobsExplorer onSelectJob={handleOpenDrawer} onApplyJob={handleOpenApplyModal} />} />
              <Route path="/ai-match" element={<AIMatcher />} />
              <Route path="/dashboard" element={<Dashboard onSelectJob={handleOpenDrawer} />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Home onSelectJob={handleOpenDrawer} onApplyJob={handleOpenApplyModal} />} />
            </Routes>
          </main>

          <Footer />

          {/* Drawers and Modals */}
          {drawerJob && (
            <JobDetailDrawer
              job={drawerJob}
              onClose={handleCloseDrawer}
              onApply={(job) => {
                handleCloseDrawer();
                handleOpenApplyModal(job);
              }}
            />
          )}

          {applyModalJob && (
            <ApplyModal
              job={applyModalJob}
              onClose={handleCloseApplyModal}
            />
          )}
        </div>
      </Router>
    </JobProvider>
  );
}
