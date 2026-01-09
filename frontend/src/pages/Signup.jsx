import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "fresher"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const res = await signupUser(formData);
    
    if (res.user) {
      login(res.user);
    } else {
      setError(res.message || "Signup failed");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
          
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label>I am a:</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              style={{ padding: "5px" }}
            >
              <option value="fresher">Fresher (Candidate)</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button className="glass-btn" type="submit">Create Account</button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          Already have an account? <span style={{ color: "#38bdf8", cursor: "pointer" }} onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
