// server.js
const express = require("express");
const cors = require("cors");
const { readData, writeData } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Signup
app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = readData();
  if (data.users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: data.users.length > 0 ? data.users[data.users.length - 1].id + 1 : 1,
    name,
    email,
    password, // In a real app, hash this!
    role
  };

  data.users.push(newUser);
  writeData(data);

  res.status(201).json({ message: "User registered", user: newUser });
});

// ✅ Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const data = readData();
  const user = data.users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

// ✅ Get all jobs
app.get("/jobs", (req, res) => {
  const data = readData();
  res.json(data.jobs);
});

// ✅ Add a new job
app.post("/jobs", (req, res) => {
  const { title, company, location } = req.body;
  if (!title || !company) {
    return res.status(400).json({ message: "Title and company are required" });
  }

  const data = readData();
  const newJob = {
    id: data.jobs.length > 0 ? data.jobs[data.jobs.length - 1].id + 1 : 1,
    title,
    company,
    location: location || "Remote",
  };
  
  data.jobs.push(newJob);
  writeData(data);
  
  res.status(201).json(newJob);
});

// ✅ Get a single job
app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const job = data.jobs.find(j => j.id === Number(id));
  
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  
  res.json(job);
});

// ✅ Delete a job
app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.jobs.findIndex(j => j.id === Number(id));
  
  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }
  
  data.jobs.splice(index, 1);
  writeData(data);
  
  res.json({ message: "Job deleted" });
});

// ✅ Update User Profile
app.post("/update-profile", (req, res) => {
  const { phone, education, experience, skills, projects, about, email } = req.body;
  console.log(`Updating profile for: ${email}`);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const data = readData();
  const userIndex = data.users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    console.log("User not found for update");
    return res.status(404).json({ message: "User not found" });
  }

  // Update fields
  const updatedUser = {
    ...data.users[userIndex],
    phone: phone || data.users[userIndex].phone,
    education: education || data.users[userIndex].education,
    experience: experience || data.users[userIndex].experience,
    skills: skills || data.users[userIndex].skills,
    projects: projects || data.users[userIndex].projects,
    about: about || data.users[userIndex].about,
  };

  data.users[userIndex] = updatedUser;
  writeData(data);
  console.log("Profile updated successfully");

  res.json({ message: "Profile updated", user: updatedUser });
});

// ✅ Apply for a job
app.post("/apply", (req, res) => {
  const { jobId, name, email, phone, education, experience, skills, projects, about } = req.body;

  if (!jobId || !name || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const data = readData();
  const job = data.jobs.find(j => j.id === Number(jobId));
  if (!job) return res.status(404).json({ message: "Job not found" });

  const newApp = {
    id: data.applications.length > 0 ? data.applications[data.applications.length - 1].id + 1 : 1,
    jobId: Number(jobId),
    name,
    email,
    phone,
    education,
    experience,
    skills,
    projects,
    about,
    status: "Applied",
  };
  
  data.applications.push(newApp);
  writeData(data);

  res.status(201).json({ message: "Application submitted", application: newApp });
});

// ✅ View all applications (Enriched with Job Details and Candidate Profile)
app.get("/applications", (req, res) => {
  const { email } = req.query;
  const data = readData();
  
  let applications = data.applications;
  if (email) {
    applications = applications.filter(app => app.email === email);
  }

  const enrichedApplications = applications.map(app => {
    const job = data.jobs.find(j => j.id === app.jobId);
    const candidate = data.users.find(u => u.email === app.email);

    return {
      ...app,
      // Merge candidate profile details (live data preference)
      phone: candidate?.phone || app.phone || "Not provided",
      education: candidate?.education || app.education || "Not specified",
      experience: candidate?.experience || app.experience || "Not specified",
      skills: candidate?.skills || app.skills || "Not specified",
      projects: candidate?.projects || app.projects || "Not specified",
      about: candidate?.about || app.about || "No summary available",
      
      jobTitle: job ? job.title : "Unknown Job",
      company: job ? job.company : "Unknown Company"
    };
  });
  res.json(enrichedApplications);
});

// ✅ Update application status
app.post("/update-status", (req, res) => {
  const { id, status } = req.body;

  const data = readData();
  const appIndex = data.applications.findIndex(a => a.id === id);
  if (appIndex === -1) {
    return res.status(404).json({ message: "Application not found" });
  }

  data.applications[appIndex].status = status;
  
  if (status === "Interview Scheduled") {
    data.applications[appIndex].interviewDateTime = new Date().toLocaleString();
  } else {
    data.applications[appIndex].interviewDateTime = null;
  }

  writeData(data);
  res.json({ message: "Status updated", application: data.applications[appIndex] });
});

// ✅ Delete an application
app.delete("/applications/:id", (req, res) => {
  const { id } = req.params;
  
  const data = readData();
  const index = data.applications.findIndex(a => a.id === Number(id));
  
  if (index === -1) {
    return res.status(404).json({ message: "Application not found" });
  }

  data.applications.splice(index, 1);
  writeData(data);
  
  res.json({ message: "Application deleted" });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
