import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FresherDashboard from "./pages/FresherDashboard";
import MyApplications from "./pages/MyApplications";
import MyProfile from "./pages/MyProfile";
import ApplyJob from "./pages/ApplyJob";
import AddJob from "./pages/AddJob";
import Recruiter from "./components/Recruiter";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fresher" element={<FresherDashboard />} />
        <Route path="/myapps" element={<MyApplications />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/recruiter" element={<Recruiter />} />
      </Routes>
    </AuthProvider>
  );
}