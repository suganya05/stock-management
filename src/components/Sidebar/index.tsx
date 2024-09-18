import React, { useState, useEffect } from "react";
import { ReactComponent as AnalyticsIcon } from "../../assets/icons/analytics.svg";
import { ReactComponent as AllocateIcon } from "../../assets/icons/allocate.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/log-out.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import auth from "../../firebase/config";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActiveIcon("dashboard");
    else if (path.startsWith("/report")) setActiveIcon("report");
    else if (path === "/inventory") setActiveIcon("inventory");
    else if (path === "/allocate") setActiveIcon("allocate");
    else setActiveIcon("");
  }, [location.pathname]);

  const signOut = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-content">
        <Link
          to="/"
          className={`icon ${activeIcon === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveIcon("dashboard")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M11.55 21H3v-8.55h8.55V21zM21 21h-8.55v-8.55H21V21zm-9.45-9.45H3V3h8.55v8.55zm9.45 0h-8.55V3H21v8.55z"></path>
          </svg>
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
        onClick={() => signOut()}
      >
        <LogoutIcon />
        <h5>Log Out</h5>
      </div>
    </div>
  );
};

export default Sidebar;
