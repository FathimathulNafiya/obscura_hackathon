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
        <h1>My Applications</h1>

        <div className="job-grid">
          {apps.map((a) => (
            <div key={a.id} className="job-card">
              <h4>{a.jobTitle}</h4>
              <p>{a.company}</p>
              <span className="status">{a.status}</span>
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
