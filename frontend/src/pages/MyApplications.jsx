import { getApplications, deleteApplication } from "../services/api";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchApps();
    }
  }, [user]);

  const fetchApps = async () => {
    const data = await getApplications(user.email);
    setApps(data);
  };

  const remove = async (id) => {
    await deleteApplication(id);
    fetchApps();
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>Application Status</h1>

        <div className="job-grid">
          {apps.map((a) => (
            <div key={a.id} className="job-card">
              <h4>{a.jobTitle}</h4>
              <p>{a.company}</p>
              <span className="status">{a.status}</span>
              
              {a.interviewDateTime && (
                <div style={{ marginTop: "10px", padding: "10px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "8px", borderLeft: "3px solid #3b82f6" }}>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#93c5fd" }}>
                    <strong>Interview Scheduled:</strong><br />
                    {a.interviewDateTime}
                  </p>
                </div>
              )}

              <button className="delete-btn" onClick={() => remove(a.id)}>
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
