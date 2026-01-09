import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications, updateApplicationStatus } from "../services/api";
import { useAuth } from "../context/AuthContext";

const STATUSES = [
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
];

const Recruiter = () => {
  const [applications, setApplications] = useState([]);
  const [activeStatus, setActiveStatus] = useState("Applied");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  /* ---------------- UPDATE STATUS ---------------- */

  const updateStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    fetchApplications();
  };

  const countByStatus = (status) =>
    applications.filter((a) => a.status === status).length;

  const filteredApps = applications.filter(
    (app) => app.status === activeStatus
  );

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>ATS Dashboard</h2>

        <div style={styles.menu}>
          {STATUSES.map((status) => (
            <div
              key={status}
              onClick={() => setActiveStatus(status)}
              style={{
                ...styles.menuItem,
                background:
                  activeStatus === status ? "#1e293b" : "transparent",
              }}
            >
              <span>{status}</span>
              <span style={styles.count}>{countByStatus(status)}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "20px" }}>
          <button 
            onClick={() => navigate("/add-job")}
            style={btn.blue}
          >
            + Post a Job
          </button>
          <button 
            onClick={logout}
            style={{ ...btn.red, marginTop: "10px", width: "100%" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <h1>{activeStatus} Candidates</h1>

        {filteredApps.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No candidates</p>
        ) : (
          <div style={styles.grid}>
            {filteredApps.map((app) => (
              <div key={app.id} style={styles.card}>
                <h3>{app.name}</h3>
                <p style={styles.email}>{app.email}</p>
                <p><b>Role:</b> {app.jobTitle}</p>
                <p><b>Company:</b> {app.company}</p>

                {app.interviewDateTime && (
                  <p style={styles.interview}>
                    📅 {app.interviewDateTime}
                  </p>
                )}

                <div style={styles.actions}>
                  {app.status === "Applied" && (
                    <>
                      <button
                        style={btn.green}
                        onClick={() =>
                          updateStatus(app.id, "Shortlisted")
                        }
                      >
                        Shortlist
                      </button>
                      <button
                        style={btn.red}
                        onClick={() =>
                          updateStatus(app.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {app.status === "Shortlisted" && (
                    <>
                      <button
                        style={btn.blue}
                        onClick={() =>
                          updateStatus(app.id, "Interview Scheduled")
                        }
                      >
                        Schedule Interview
                      </button>
                      <button
                        style={btn.red}
                        onClick={() =>
                          updateStatus(app.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {app.status === "Rejected" && (
                    <b style={{ color: "#fca5a5" }}>
                      Candidate Rejected
                    </b>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#020617",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },

  /* SIDEBAR */
  sidebar: {
    width: 260,
    background: "#020617",
    borderRight: "1px solid #1e293b",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    marginBottom: 20,
    color: "#38bdf8",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    cursor: "pointer",
  },
  count: {
    background: "#334155",
    padding: "2px 8px",
    borderRadius: 12,
    fontSize: 12,
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: 30,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 14,
    padding: 20,
  },
  email: {
    color: "#94a3b8",
    fontSize: 14,
  },
  interview: {
    marginTop: 8,
    color: "#93c5fd",
    fontWeight: "bold",
  },
  actions: {
    marginTop: 15,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
};

const btn = {
  green: {
    background: "#22c55e",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  red: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  blue: {
    background: "#6366f1",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    width: "100%"
  },
};

export default Recruiter;