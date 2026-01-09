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
  const [selectedCandidate, setSelectedCandidate] = useState(null); // For Resume Modal
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

                {/* View Resume Button */}
                <button 
                  onClick={() => setSelectedCandidate(app)}
                  style={{...btn.blue, marginTop: "10px", background: "transparent", border: "1px solid #38bdf8", color: "#38bdf8"}}
                >
                  View Resume
                </button>

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

      {/* RESUME MODAL */}
      {selectedCandidate && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setSelectedCandidate(null)}
              style={styles.closeBtn}
            >
              &times;
            </button>
            
            <div style={styles.resumeHeader}>
              <h2>{selectedCandidate.name}</h2>
              <p>{selectedCandidate.email} | {selectedCandidate.phone || "No Phone"}</p>
              <p style={{ marginTop: "5px", color: "#cbd5e1" }}>{selectedCandidate.about}</p>
            </div>

            <div style={styles.resumeSection}>
              <h4>Technical Skills</h4>
              <p>{selectedCandidate.skills || "Not specified"}</p>
            </div>

            <div style={styles.resumeSection}>
              <h4>Education</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{selectedCandidate.education || "Not specified"}</p>
            </div>

            <div style={styles.resumeSection}>
              <h4>Experience</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{selectedCandidate.experience || "Not specified"}</p>
            </div>

            <div style={styles.resumeSection}>
              <h4>Projects</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{selectedCandidate.projects || "Not specified"}</p>
            </div>

          </div>
        </div>
      )}
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
  
  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#0f172a",
    width: "600px",
    maxHeight: "85vh",
    overflowY: "auto",
    padding: "40px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "28px",
    cursor: "pointer",
  },
  resumeHeader: {
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  resumeSection: {
    marginBottom: "20px",
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