import { getApplications, deleteApplication } from "../services/api";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function MyApplications() {
  const [apps, setApps] = useState(getApplications());

  const remove = (i) => {
    deleteApplication(i);
    setApps(getApplications());
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>My Applications</h1>

        <div className="job-grid">
          {apps.map((a, i) => (
            <div key={i} className="job-card">
              <h4>{a.job}</h4>
              <span className="status">{a.status}</span>
              <button className="delete-btn" onClick={() => remove(i)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
