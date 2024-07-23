import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStock from "./pages/AddStock";
import Allocate from "./pages/Allocate";
import PersonPage from "./components/PersonPage";
import Report from "./pages/Report";
import Attendance from "./components/Attendance";
import ConfirmStockList from "./components/ConfirmStockList";
import DamageProductView from "./components/DamageProductView";
import CompanyDetails from "./components/CompanyDetails";
import TransactionHistoryDetails from "./components/TransactionHistoryDetails";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/addStock" element={<AddStock />} />
      <Route path="/allocate" element={<Allocate />} />
      <Route path="/person-page" element={<PersonPage />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/confirm-stock-list" element={<ConfirmStockList />} />
      <Route path="/damage-product-view" element={<DamageProductView />} />
      <Route path="/company-details" element={<CompanyDetails />} />
      <Route
        path="/transaction-history-details"
        element={<TransactionHistoryDetails />}
      />
    </Routes>
  );
};

export default App;
