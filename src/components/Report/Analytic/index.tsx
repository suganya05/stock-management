import React from "react";
import Briefcase from "../../../assets/icons/briefcase.png";
import Rupee from "../../../assets/icons/Rupee.png";
import "./Analytic.scss";

const data = [
  {
    img: Briefcase,
    title: "Total Income",
    rupeeImg: Rupee,
    amount: "13,80,000",
  },
  {
    img: Briefcase,
    title: "Total profit",
    rupeeImg: Rupee,
    amount: "13,80,000",
  },
  {
    img: Briefcase,
    title: "Total Expense",
    rupeeImg: Rupee,
    amount: "13,80,000",
  },
];

const Analytic: React.FC = () => {
  return (
    <div className="anaytic-wrapper">
      <div className="anaytic-container">
        {data.map((f, index) => {
          return (
            <div key={index} className="anaytic-box">
              <div className="img">
                <img src={f.img} alt="" />
              </div>
              <p>{f.title}</p>
              <div className="flex-item">
                <img src={f.rupeeImg} alt="" />
                <h4>{f.amount}</h4>
              </div>
            </div>
          );
        })}
      </div>
      <div className="anaytic-content">
        <h4>Analytic</h4>
      </div>
    </div>
  );
};

export default Analytic;
