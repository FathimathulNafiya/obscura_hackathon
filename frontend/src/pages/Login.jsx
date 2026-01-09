import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [role, setRole] = useState("fresher"); // 'fresher' or 'recruiter'
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser(formData);
    
    if (res.user) {
      if (res.user.role !== role) {
        setError(`Access denied. Please login as a ${res.user.role === "recruiter" ? "Recruiter" : "Candidate"}.`);
        return;
      }
      login(res.user);
    } else {
      setError(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <h2 className="auth-header">Job Orbit</h2>
        <p className="auth-subtitle">
          {role === "recruiter" ? "Recruiter Portal" : "Student Portal"}
        </p>
        
        {/* Role Toggle */}
        <div style={{ display: "flex", background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "4px", marginBottom: "20px" }}>
          <button 
            type="button"
            onClick={() => setRole("fresher")}
            style={{ 
              flex: 1, 
              padding: "8px", 
              border: "none", 
              borderRadius: "8px", 
              background: role === "fresher" ? "#38bdf8" : "transparent", 
              color: role === "fresher" ? "#0f172a" : "#94a3b8",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            Candidate
          </button>
          <button 
            type="button"
            onClick={() => setRole("recruiter")}
            style={{ 
              flex: 1, 
              padding: "8px", 
              border: "none", 
              borderRadius: "8px", 
              background: role === "recruiter" ? "#38bdf8" : "transparent", 
              color: role === "recruiter" ? "#0f172a" : "#94a3b8",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            Recruiter
          </button>
        </div>

        {error && <p style={{ color: "#ef4444", marginBottom: "15px", fontSize: "0.9rem" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange}
            required
            className="input-field"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange}
            required
            className="input-field"
          />
          
          <button className="glass-btn" type="submit" style={{ marginTop: "10px" }}>
            Login as {role === "recruiter" ? "Recruiter" : "Candidate"}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
