import { useEffect, useState } from "react";
import { getJobs, getApplications, applyJob } from "../services/api";
import Sidebar from "../components/Sidebar";

function FresherDashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    setJobs(getJobs());
    setApps(getApplications());
  }, []);

  const handleApply = (job) => {
    applyJob(job);                 // save application
    setApps(getApplications());   // refresh applications
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>Welcome back, Nafiya!</h1>
        <p className="subtitle">Here’s a summary of your activity.</p>

        <div className="stats">
          <div className="stat-card">Jobs Applied: {apps.length}</div>
          <div className="stat-card">Active Applications: {apps.length}</div>
          <div className="stat-card">Interviews: 0</div>
          <div className="stat-card">Profile Completion: 85%</div>
        </div>

        <input
          className="search"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="job-grid">
          {jobs
            .filter(job =>
              job.title.toLowerCase().includes(search.toLowerCase())
            )
            .map(job => {
              const applied = apps.some(a => a.job === job.title);

              return (
                <div key={job.id} className="job-card">
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>

                  {applied ? (
                    <span className="status">Applied</span>
                  ) : (
                    <button
                      className="glass-btn"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FresherDashboard;
