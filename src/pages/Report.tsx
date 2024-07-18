import React from "react";
import Layout from "../components/Layout";
import "../styles/Report.scss";
import Analytic from "../components/Report/Analytic";
import ExploreOutlets from "../components/Report/Explore";
import TransactionHistory from "../components/Report/TransactionHistory";

const Report: React.FC = () => {
  return (
    <Layout>
      <div className="component">
        <Analytic />
        <ExploreOutlets />
      </div>
      <div>
        <TransactionHistory />
      </div>
    </Layout>
  );
};

export default Report;
