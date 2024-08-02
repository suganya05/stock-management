import React from "react";
import Layout from "../components/Layout";
import TopSales from "../components/Dashboard/TopSales";
import TopClient from "../components/Dashboard/TopClients";
import DamageProduct from "../components/Dashboard/DamageProduct";
import "../styles/Dashboard.scss";
import StockAssigned from "../components/StockAssigned";
import StockDistribution from "../components/StockDistribution";

const Dashboard: React.FC = () => {
  return (
    <Layout className="dashboard">
      <div className="component">
        <StockAssigned />
        <StockDistribution />
      </div>
      <div className="second-components">
        <TopSales />
        <DamageProduct />
        <TopClient />
      </div>
    </Layout>
  );
};

export default Dashboard;
