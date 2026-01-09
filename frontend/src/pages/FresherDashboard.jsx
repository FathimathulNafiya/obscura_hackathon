import { useEffect, useState } from "react";
import { getJobs, getApplications, applyJob } from "../services/api";
import Sidebar from "../components/Sidebar";

function FresherDashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const jobsData = await getJobs();
    const appsData = await getApplications();
    setJobs(jobsData);
    setApps(appsData);
  };

  const handleApply = async (job) => {
    await applyJob(job.id);        // save application using ID
    const appsData = await getApplications(); // refresh applications
    setApps(appsData);
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
              // Check if already applied by comparing jobId
              const applied = apps.some(a => a.jobId === job.id);

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
