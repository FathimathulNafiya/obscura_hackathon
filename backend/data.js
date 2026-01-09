// data.js

// Sample job data — this acts like our mini database
const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote" },
  { id: 2, title: "Backend Developer", company: "CodeWorks", location: "Bangalore" },
];

// This will store all job applications in memory
const applications = [];

// Export these arrays so other files (like server.js) can use them
module.exports = { jobs, applications };
