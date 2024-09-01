import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./Layout.scss";

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
  monthValue?: string;
}

const Layout: React.FC<ILayoutProps> = ({
  children,
  className,
  monthValue,
}) => {
  return (
    <>
      <div>
        <Header monthValue={monthValue} />
      </div>
      <div className="layoutWrapper">
        <Sidebar />
        <div className={`layout-children ${className || ""}`}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
