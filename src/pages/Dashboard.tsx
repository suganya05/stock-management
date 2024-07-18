import React from "react";
import Layout from "../components/Layout";
import TopSales from "../components/Dashboard/TopSales";
import Revenue from "../components/Dashboard/Revenue";
import Employees from "../components/Dashboard/Employees";
import TopClient from "../components/Dashboard/TopClients";
import DamageProduct from "../components/Dashboard/DamageProduct";
import "../styles/Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="component">
        <TopSales />
        <Revenue />
        <Employees />
      </div>
      <div className="second-components">
        <TopClient />
        <DamageProduct />
      </div>
    </Layout>
  );
};

export default Dashboard;
