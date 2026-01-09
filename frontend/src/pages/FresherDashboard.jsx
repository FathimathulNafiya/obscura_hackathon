import { useEffect, useState } from "react";
import { getJobs, getApplications, applyJob } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function FresherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const jobsData = await getJobs();
    const appsData = await getApplications(user.email);
    setJobs(jobsData);
    setApps(appsData);
  };

  const handleApply = async (job) => {
    if (!user) return;

    // Validation: Check if mandatory profile fields are filled
    if (!user.phone || !user.skills || !user.education) {
      if (confirm("Incomplete Profile: You must complete your resume (Phone, Skills, Education) before applying for jobs. Go to Profile now?")) {
        navigate("/profile");
      }
      return;
    }

    await applyJob(job.id, user);        // pass user object
    const appsData = await getApplications(user.email); // refresh applications
    setApps(appsData);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>Welcome back, {user?.name || "User"}!</h1>
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
