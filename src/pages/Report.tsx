import React from "react";
import Layout from "../components/Layout";
import ExploreOutlets from "../components/Report/Explore";
import ManageRep from "../components/Report/ManageRep";
import "../styles/Report.scss";
import BalanceSheet from "../components/Dashboard/BalanceSheet";
import RevenueChart from "../components/Report/RevenueChart";

const Report: React.FC = () => {
  return (
    <Layout className="report">
      <div className="component">
        <ManageRep />
        <ExploreOutlets />
      </div>
      <div className="second-component">
        <BalanceSheet />
        <RevenueChart />
      </div>
    </Layout>
  );
};

export default Report;
