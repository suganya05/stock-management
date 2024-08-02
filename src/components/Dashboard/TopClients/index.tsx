import React from "react";
import ImgThree from "../../../assets/images/img-3.png";
import Rupee from "../../../assets/images/rupee.png";
import Briefcase from "../../../assets/icons/briefcase.png";
import "./TopClients.scss";
import Button from "../../Button";

const data = [
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

const TopClient: React.FC = () => {
  return (
    <div className="topclient-wrapper">
      <div className="flex-one">
        {data.map((f, index) => {
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
              {f.title === "Total Expense" && (
                <div className="edit-btn">
                  <Button varient="primary">Edit</Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="topclient-container">
        <div className="topclient-head">
          <h4>Top Clients</h4>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>
                  <span>Client</span>
                </th>
                <th>
                  <span>Sales</span>
                </th>
                <th>
                  <span>Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i.toString()}>
                  <td>
                    <div className="flex-item">
                      <div className="img-box">
                        <img src={ImgThree} alt="" />
                      </div>
                      <span>Vasanth Bavan</span>
                    </div>
                  </td>
                  <td>
                    <div className="rupee-img">
                      <img src={Rupee} alt="" />
                      <span>80,000</span>
                    </div>
                  </td>
                  <td className="status">
                    <span>PAID</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopClient;
