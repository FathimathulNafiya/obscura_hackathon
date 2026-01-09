// =======================
// JOB DATA (ONLY 4 JOBS)
// =======================

export const getJobs = () => {
  return JSON.parse(localStorage.getItem("jobs")) || [
    { id: 1, title: "Software Engineer", company: "TCS" },
    { id: 2, title: "Web Developer", company: "Infosys" },
    { id: 3, title: "Data Analyst", company: "Wipro" },
    { id: 4, title: "UI/UX Designer", company: "Accenture" }
  ];
};

// =======================
// APPLICATION DATA
// =======================

export const getApplications = () => {
  return JSON.parse(localStorage.getItem("applications")) || [];
};

// Apply for a job
export const applyJob = (job) => {
  const apps = getApplications();

  const alreadyApplied = apps.some(a => a.job === job.title);
  if (alreadyApplied) return;

  apps.push({
    job: job.title,
    company: job.company,
    status: "Applied"
  });

  localStorage.setItem("applications", JSON.stringify(apps));
};

// Delete application
export const deleteApplication = (index) => {
  const apps = getApplications();
  apps.splice(index, 1);
  localStorage.setItem("applications", JSON.stringify(apps));
};
