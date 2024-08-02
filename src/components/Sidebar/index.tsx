import React, { useState, useEffect } from "react";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as AnalyticsIcon } from "../../assets/icons/analytics.svg";
import { ReactComponent as AddStockIcon } from "../../assets/icons/addStock.svg";
import { ReactComponent as AllocateIcon } from "../../assets/icons/allocate.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/log-out.svg";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState<string>("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActiveIcon("dashboard");
    else if (path === "/report") setActiveIcon("report");
    else if (path === "/inventory") setActiveIcon("inventory");
    else if (path === "/allocate") setActiveIcon("allocate");
    else setActiveIcon("");
  }, [location.pathname]);

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-content">
        <Link
          to="/"
          className={`icon ${activeIcon === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveIcon("dashboard")}
        >
          <HomeIcon />
          <h5>Dashboard</h5>
        </Link>
        <Link
          to="/report"
          className={`icon ${activeIcon === "report" ? "active" : ""}`}
          onClick={() => setActiveIcon("report")}
        >
          <AnalyticsIcon />
          <h5>Report</h5>
        </Link>
        <Link
          to="/inventory"
          className={`icon ${activeIcon === "inventory" ? "active" : ""}`}
          onClick={() => setActiveIcon("inventory")}
        >
          <AddStockIcon />
          <h5>Inventory</h5>
        </Link>
        <Link
          to="/allocate"
          className={`icon ${activeIcon === "allocate" ? "active" : ""}`}
          onClick={() => setActiveIcon("allocate")}
        >
          <AllocateIcon />
          <h5>Allocate</h5>
        </Link>
      </div>
      <div
        className={`logout ${activeIcon === "logout" ? "active" : ""}`}
        onClick={() => setActiveIcon("logout")}
      >
        <LogoutIcon />
        <h5>Log Out</h5>
      </div>
    </div>
  );
};

export default Sidebar;
