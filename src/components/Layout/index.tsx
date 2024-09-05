import React, { useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./Layout.scss";
import useAuthStore from "../../context/userStore";
import { useNavigate } from "react-router-dom";

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
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
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
