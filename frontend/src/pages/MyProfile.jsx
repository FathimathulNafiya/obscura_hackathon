import Sidebar from "../components/Sidebar";

function MyProfile() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>My Profile</h1>
        <p className="subtitle">Manage your personal information</p>

        <div className="profile-card">
          <div className="profile-row">
            <label>Name</label>
            <input defaultValue="Nafiya" />
          </div>

          <div className="profile-row">
            <label>Email</label>
            <input defaultValue="nafiya@gmail.com" />
          </div>

          <div className="profile-row">
            <label>Phone</label>
            <input defaultValue="9876543210" />
          </div>

          <div className="profile-row">
            <label>Skills</label>
            <input defaultValue="React, Java, SQL" />
          </div>

          <button className="glass-btn">Save Profile</button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
