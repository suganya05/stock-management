import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./Layout.scss";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="layoutWrapper">
        <Sidebar />
        <div className="layout-children">{children}</div>
      </div>
    </>
  );
};

export default Layout;
