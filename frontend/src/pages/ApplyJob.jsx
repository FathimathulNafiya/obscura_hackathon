import { useParams, useNavigate } from "react-router-dom";
import { getJobs, applyJob } from "../services/api";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = getJobs().find(j=>j.id==id);

  const submit = () => {
    applyJob({ job: job.title, status:"Applied" });
    navigate("/myapps");
  };

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
