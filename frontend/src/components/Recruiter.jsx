import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/add-applicant")}>
        Go to Add Applicant
      </button>
    </div>
  );
}

function AddApplicant() {
  return <h1>Add Applicant Page</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-applicant" element={<AddApplicant />} />
      </Routes>
    </BrowserRouter>
  );
}
