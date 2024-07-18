import React from "react";
import Rupee from "../../../assets/images/rupee.png";
import Button from "../../Button";
import "./Revenue.scss";

const Revenue: React.FC = () => {
  return (
    <div className="revenue-wrapper">
      <div className="revenue-head">
        <h4>REVENUE</h4>
      </div>
      <div className="total-container">
        <div className="total-wrapper">
          <div className="flex-item">
            <div className="dot"></div>
            <p>Total Revenue</p>
          </div>
          <div className="flex-content">
            <img src={Rupee} alt="" />
            <h3>13,00,000</h3>
          </div>
        </div>
        <div className="total-wrapper">
          <div className="flex-item">
            <div className="dot"></div>
            <p>Total Revenue</p>
          </div>
          <div className="flex-content">
            <img src={Rupee} alt="" />
            <h3>13,00,000</h3>
          </div>
        </div>
        <div className="total-wrapper">
          <div className="flex-item">
            <div className="dot"></div>
            <p>Total Revenue</p>
          </div>
          <div className="flex-content">
            <img src={Rupee} alt="" />
            <h3>13,00,000</h3>
          </div>
        </div>
        <Button varient="primary">
          Add <br /> Expense
        </Button>
      </div>
    </div>
  );
};

export default Revenue;
