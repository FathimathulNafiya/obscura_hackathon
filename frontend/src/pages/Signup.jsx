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
        <h2 className="auth-header">Create Account</h2>
        <p className="auth-subtitle">Join Job Orbit today.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange}
            required
            className="input-field"
          />
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
          
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              className="select-field"
              style={{ marginBottom: 0 }}
            >
              <option value="fresher">Candidate (Fresher)</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button className="glass-btn" type="submit" style={{ marginTop: "10px" }}>Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account? <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
