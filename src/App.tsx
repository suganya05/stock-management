import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStock from "./pages/AddStock";
import Allocate from "./pages/Allocate";
import PersonPage from "./components/PersonPage";
import Report from "./pages/Report";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/addStock" element={<AddStock />} />
      <Route path="/allocate" element={<Allocate />} />
      <Route path="/person-page" element={<PersonPage />} />
    </Routes>
  );
};

export default App;
