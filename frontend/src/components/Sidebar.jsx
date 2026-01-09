import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">CampusConnect</h2>

      <button onClick={() => navigate("/fresher")}>Dashboard</button>
      <button onClick={() => navigate("/fresher")}>Find Jobs</button>
      <button onClick={() => navigate("/myapps")}>My Applications</button>
      <button onClick={() => navigate("/profile")}>My Profile</button>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}

export default Sidebar;
