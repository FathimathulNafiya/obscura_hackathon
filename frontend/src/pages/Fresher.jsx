import { useEffect, useState } from "react";
import { getJobs, applyJob } from "../services/api";
import { useNavigate } from "react-router-dom";

function Fresher() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getJobs().then(data => setJobs(data));
  }, []);

  const handleApply = (job) => {
    applyJob({
      name: "Demo User",
      email: "demo@gmail.com",
      job: job.title
    }).then(() => {
      setAppliedJobs([...appliedJobs, job.title]);
    });
  };

  return (
    <div className="center-box">
      <div className="card" style={{ width: "600px" }}>

        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h2>Fresher Dashboard</h2>
          <button onClick={() => navigate("/")}>Logout</button>
        </div>

        <input
          placeholder="Search job..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{width:"100%", padding:"10px", margin:"10px 0"}}
        />

        {jobs
          .filter(j => j.title.toLowerCase().includes(search.toLowerCase()))
          .map((job, index) => (
          <div key={index} className="job-card">

            <h4>{job.title}</h4>
            <p>{job.company}</p>

            {appliedJobs.includes(job.title) ? (
              <span style={{color:"lightgreen"}}>Applied ✔</span>
            ) : (
              <button onClick={() => handleApply(job)}>Apply</button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Fresher;
