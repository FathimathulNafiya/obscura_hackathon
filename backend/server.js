// server.js
const express = require("express");
const cors = require("cors");
const { jobs, applications } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Get all jobs
app.get("/jobs", (req, res) => {
  res.json(jobs);
});

// ✅ Apply for a job
app.post("/apply", (req, res) => {
  const { jobId, name, email } = req.body;

  if (!jobId || !name || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const job = jobs.find(j => j.id === jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const newApp = {
    id: applications.length + 1,
    jobId,
    name,
    email,
    status: "Applied",
  };
  applications.push(newApp);

  res.status(201).json({ message: "Application submitted", application: newApp });
});

// ✅ View all applications
app.get("/applications", (req, res) => {
  res.json(applications);
});

// ✅ Update application status
app.post("/update-status", (req, res) => {
  const { id, status } = req.body;

  const appIndex = applications.findIndex(a => a.id === id);
  if (appIndex === -1) {
    return res.status(404).json({ message: "Application not found" });
  }

  applications[appIndex].status = status;
  res.json({ message: "Status updated", application: applications[appIndex] });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
