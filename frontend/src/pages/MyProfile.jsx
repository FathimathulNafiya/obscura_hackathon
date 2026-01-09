import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/api";

function MyProfile() {
  const { user, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    education: "",
    experience: "",
    skills: "",
    projects: ""
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        about: user.about || "",
        education: user.education || "",
        experience: user.experience || "",
        skills: user.skills || "",
        projects: user.projects || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.email) {
      setMsg("Error: Email is missing. Cannot update profile.");
      return;
    }
    
    setMsg("Saving...");
    // Use formData.email to identify the user record to update
    const res = await updateProfile(formData.email, formData);
    if (res && res.user) {
      updateUser(res.user);
      setMsg("Profile Updated Successfully!");
    } else {
      setMsg(res.message || "Error updating profile.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>My Resume Profile</h1>
        <p className="subtitle">Build your resume for job applications</p>

        {msg && <div style={{ 
          marginBottom: "20px", 
          padding: "10px", 
          background: msg.includes("Error") ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)", 
          color: msg.includes("Error") ? "#fca5a5" : "#86efac",
          borderRadius: "8px" 
        }}>{msg}</div>}

        <div className="profile-container" style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
          
          {/* Section 1: Personal Info */}
          <div className="card" style={{ width: "100%", textAlign: "left" }}>
            <h3 style={{ color: "#38bdf8", marginBottom: "15px" }}>Personal Info</h3>
            
            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Full Name</label>
            <input className="input-field" name="name" value={formData.name} onChange={handleChange} />
            
            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Email</label>
            <input className="input-field" name="email" value={formData.email} disabled style={{ opacity: 0.6 }} />

            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Phone Number</label>
            <input className="input-field" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />

            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>About Me</label>
            <textarea 
              className="input-field" 
              name="about" 
              value={formData.about} 
              onChange={handleChange} 
              rows="3"
              placeholder="Brief summary about yourself..."
              style={{ fontFamily: "inherit" }}
            />
          </div>

          {/* Section 2: Skills & Education */}
          <div className="card" style={{ width: "100%", textAlign: "left" }}>
            <h3 style={{ color: "#38bdf8", marginBottom: "15px" }}>Skills & Education</h3>
            
            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Technical Skills</label>
            <textarea 
              className="input-field" 
              name="skills" 
              value={formData.skills} 
              onChange={handleChange} 
              placeholder="e.g. React, Node.js, Python, SQL"
              rows="2"
            />

            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Education</label>
            <textarea 
              className="input-field" 
              name="education" 
              value={formData.education} 
              onChange={handleChange} 
              placeholder="e.g. B.Tech Computer Science, XYZ University (2020-2024)"
              rows="3"
            />
          </div>

          {/* Section 3: Experience & Projects */}
          <div className="card" style={{ width: "100%", textAlign: "left", gridColumn: "span 2" }}>
            <h3 style={{ color: "#38bdf8", marginBottom: "15px" }}>Experience & Projects</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Work Experience</label>
                <textarea 
                  className="input-field" 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange} 
                  placeholder="e.g. Software Intern at ABC Corp (June 2023 - Aug 2023)..."
                  rows="5"
                />
              </div>

              <div>
                <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Projects</label>
                <textarea 
                  className="input-field" 
                  name="projects" 
                  value={formData.projects} 
                  onChange={handleChange} 
                  placeholder="e.g. E-commerce Website: Built using MERN stack..."
                  rows="5"
                />
              </div>
            </div>
          </div>

        </div>

        <button className="glass-btn" onClick={handleSave} style={{ marginTop: "20px", width: "200px" }}>
          Save Resume
        </button>

      </div>
    </div>
  );
}

export default MyProfile;
