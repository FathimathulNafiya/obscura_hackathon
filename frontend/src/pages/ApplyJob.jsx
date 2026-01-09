import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJob, applyJob } from "../services/api";
import { useAuth } from "../context/AuthContext";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      const foundJob = await getJob(id);
      setJob(foundJob);
    };
    fetchJob();
  }, [id]);

  const submit = async () => {
    if (job && user) {
      await applyJob(job.id, user);
      navigate("/myapps");
    } else if (!user) {
        alert("Please login to apply");
        navigate("/");
    }
  };

  if (!job) return <p>Loading job...</p>;

  return (
    <div className="center-page">
      <div className="card">
        <h2>{job.title}</h2>
        <p>{job.company}</p>
        <button onClick={submit}>Confirm Apply</button>
      </div>
    </div>
  );
}

export default ApplyJob;
