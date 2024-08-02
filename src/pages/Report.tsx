import React from "react";
import Layout from "../components/Layout";
import ExploreOutlets from "../components/Report/Explore";
import ManageRep from "../components/Report/ManageRep";
import "../styles/Report.scss";
import TopSales from "../components/Dashboard/TopSales";
import Revenue from "../components/Report/Revenue";

const Report: React.FC = () => {
  return (
    <Layout className="report">
      <div className="component">
        <ManageRep />
        <ExploreOutlets />
      </div>
      <div className="second-component">
        <TopSales />
        <Revenue />
      </div>
    </Layout>
  );
};

export default Report;
