// src/pages/AddJob.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { addJob } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company) {
      alert("Title and company are required");
      return;
    }
    addJob({ title, company, location });
    alert("Job added");
    navigate("/fresher");
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <h1>Add Job</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
          <div style={{ marginBottom: 12 }}>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Company</label>
            <input value={company} onChange={e => setCompany(e.target.value)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <button className="glass-btn" type="submit">Add Job</button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
