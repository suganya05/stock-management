import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStock from "./pages/AddStock";
import Allocate from "./pages/Allocate";
import PersonPage from "./components/PersonPage";
import Report from "./pages/Report";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/addStock" element={<AddStock />} />
      <Route path="/allocate" element={<Allocate />} />
      <Route path="/person-page" element={<PersonPage />} />
    </Routes>
  );
};

export default App;
