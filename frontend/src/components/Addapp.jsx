import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Addapp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const oldApps = location.state?.applications || [];

  const [form, setForm] = useState({
    name: "",
    email: "",
    jobTitle: "",
    company: "",
  });

  const submit = (e) => {
    e.preventDefault();

    navigate("/", {
      state: {
        applications: [
          ...oldApps,
          {
            id: Date.now(),
            ...form,
            status: "Applied",
            interviewDateTime: null,
          },
        ],
      },
    });
  };

  return (
    <div style={page}>
      <form style={box} onSubmit={submit}>
        <h2>Add Applicant</h2>

        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Job Role" onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} required />
        <input placeholder="Company" onChange={(e) => setForm({ ...form, company: e.target.value })} required />

        <button>Add</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const page = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
};

const box = {
  border: "1px solid #1e293b",
  padding: 25,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: 320,
};

export default Addapp;
