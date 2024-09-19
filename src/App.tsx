import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Allocate from "./pages/Allocate";
import PersonPage from "./components/PersonPage";
import Report from "./pages/Report";
import Attendance from "./components/Attendance";
import ConfirmStockList from "./components/ConfirmStockList";
import DamageProductView from "./components/DamageProductView";
import CompanyDetails from "./components/CompanyDetails";
import TransactionHistoryDetails from "./components/TransactionHistoryDetails";
import Inventory from "./pages/Inventory";
import ExploreOutletsDetails from "./components/Report/ExploreOutletsDetails";
import LoginScreen from "./pages/login";
import useAuthStore from "./context/userStore";
import useProductStore from "./context/productStore";
import useOutletStore from "./context/outletStore";
import useSalesRepStore from "./context/salesRepStore";
import useStockStore from "./context/stockStore";
import useAllocationsStore from "./context/allocationStore";
import ManageRep from "./components/Report/ManageRep";
import ManageRepDetails from "./components/Report/ManageRepDetails";

const App: React.FC = () => {
  const { user, loading } = useAuthStore();
  const { fetchProduct } = useProductStore();
  const { fetchOutlets } = useOutletStore();
  const { fetchSalesReps } = useSalesRepStore();
  const { setDate } = useStockStore();
  const { fetchAllocations } = useAllocationsStore();

  useEffect(() => {
    if (user) {
      fetchProduct(user);
      fetchOutlets(user);
      fetchSalesReps(user);
      setDate(user, new Date());
      fetchAllocations(user, new Date());
    }
  }, [loading]);
  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/allocate" element={<Allocate />} />

          <Route path="/report" element={<Report />} />

          <Route path="/person-page" element={<PersonPage />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/confirm-stock-list" element={<ConfirmStockList />} />
          {/* <Route path="/company-details" element={<CompanyDetails />} /> */}
          <Route
            path="/report/explore-outlets"
            element={<ExploreOutletsDetails />}
          />
          <Route
            path="/report/manage-rep-details"
            element={<ManageRepDetails />}
          />
          <Route
            path="/report/explore-outlets/:companyId/damage-product-view"
            element={<DamageProductView />}
          />
          <Route
            path="/dashboard/damage-product-view"
            element={<DamageProductView />}
          />
          <Route
            path="/report/explore-outlets/:companyId" // add dynacmic url
            element={<CompanyDetails />}
          />

          <Route
            path="/report/explore-outlets/:companyId/transaction-history-details"
            element={<TransactionHistoryDetails />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
