import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <h2 className="logo">Job Orbit</h2>
      {user && <p style={{ padding: "0 20px", color: "#94a3b8", fontSize: "0.9rem" }}>Welcome, {user.name}</p>}

      <button onClick={() => navigate("/fresher")}>Dashboard</button>
      <button onClick={() => navigate("/fresher")}>Find Jobs</button>
      <button onClick={() => navigate("/myapps")}>Application Status</button>
      <button onClick={() => navigate("/profile")}>My Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
