import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="card">
        <h2>CampusConnect</h2>
        <button className="glass-btn" onClick={() => navigate("/fresher")}>
          Login as Fresher
        </button>
      </div>
    </div>
  );
}

export default Login;
