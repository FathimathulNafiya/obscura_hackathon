const API_URL = "http://localhost:5000";

// =======================
// AUTH
// =======================

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return { message: "Network error" };
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error signing up:", error);
    return { message: "Network error" };
  }
};

// =======================
// JOBS
// =======================

export const getJobs = async () => {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const getJob = async (id) => {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    if (!response.ok) throw new Error("Job not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
};

export const addJob = async (job) => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding job:", error);
  }
};

export const deleteJob = async (id) => {
  try {
    await fetch(`${API_URL}/jobs/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

// =======================
// APPLICATIONS
// =======================

export const getApplications = async (email = "") => {
  try {
    const url = email ? `${API_URL}/applications?email=${email}` : `${API_URL}/applications`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

export const applyJob = async (jobId, user) => {
  try {
    const response = await fetch(`${API_URL}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, ...user }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error applying for job:", error);
  }
};

export const deleteApplication = async (id) => {
  try {
    await fetch(`${API_URL}/applications/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/update-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating status:", error);
  }
};