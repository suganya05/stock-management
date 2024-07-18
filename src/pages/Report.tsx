import React from "react";
import Layout from "../components/Layout";
import "../styles/Report.scss";
import Analytic from "../components/Report/Analytic";
import ExploreOutlets from "../components/Report/Explore";
import TransactionHistory from "../components/Report/TransactionHistory";

const Report: React.FC = () => {
  return (
    <Layout>
      <div className="report-container">
        <div className="heading">
          <h4>
            Welcome, <span>Smith</span>
          </h4>
        </div>
        <div className="report-head">
          <div className="flex-item">
            <p>Today</p>
            <p>Week</p>
            <p>Month</p>
            <p>Year</p>
          </div>
          <div className="month-input">
            <form action="">
              <input type="month" />
            </form>
          </div>
        </div>
      </div>
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
