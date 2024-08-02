import React, { useState } from "react";
import Rupee from "../../../assets/images/rupee.png";
import Briefcase from "../../../assets/icons/briefcase.png";
import Button from "../../Button";
import "./Revenue.scss";
import LayoutModule from "../../LayoutModal";
import AddExpenses from "../../ModalComponents/AddExpenses";

const data = [
  {
    title: "Total Revenue",
    amount: "13,00,000",
  },
  {
    title: "Total Expense",
    amount: "13,00,000",
  },
  {
    title: "Total Profit",
    amount: "10,00,000",
  },
];

const Data = [
  {
    img: Briefcase,
    title: "Total Sales",
    amount: "13,80,000",
  },
  {
    img: Briefcase,
    title: "Total Profit",
    amount: "13,80,000",
  },
  {
    img: Briefcase,
    title: "Total Expense",
    amount: "13,80,000",
  },
];

const Revenue: React.FC = () => {
  const [active, setIsActive] = useState(false);
  const handleOpenToggle = () => {
    setIsActive(true);
  };

  const handleCloseToggle = () => {
    setIsActive(false);
  };
  return (
    <div className="revenue-wrapper">
      <div className="flex-one">
        {Data.map((f, index) => {
          return (
            <div key={index} className="box">
              <div className="total-sales">
                <div className="briefcase-img">
                  <img src={f.img} alt="" />
                </div>
                <p>{f.title}</p>
              </div>
              <div className="rupee">
                <img src={Rupee} alt="" />
                <h3>{f.amount}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="revenue-container">
        <div className="revenue-head">
          <h4>Revenue</h4>
        </div>
        <div className="total-container">
          {data.map((f, index) => {
            return (
              <div key={index} className="total-wrapper">
                <div className="flex-item">
                  <div className="dot"></div>
                  <p>{f.title}</p>
                </div>
                <div className="flex-content">
                  <img src={Rupee} alt="" />
                  <h3>{f.amount}</h3>
                </div>
              </div>
            );
          })}

          <Button varient="primary" onClick={handleOpenToggle}>
            Add <br /> Expense
          </Button>
        </div>
        {active && (
          <LayoutModule
            handleToggle={handleCloseToggle}
            className="layout-module"
          >
            <AddExpenses />
          </LayoutModule>
        )}
      </div>
    </div>
  );
};

export default Revenue;
