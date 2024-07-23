import React from "react";
import ImgThree from "../../../assets/images/img-3.png";
import Rupee from "../../../assets/images/rupee.png";
import Edit from "../../../assets/icons/edit.png";
import "./TransactionHistory.scss";

const TransactionHistory: React.FC = () => {
  return (
    <div className="transaction-wrapper">
      <div className="transaction-head">
        <h4>Transaction History</h4>
        <p>View All</p>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <span>Outlet</span>
              </th>
              <th>
                <span>Order Amount</span>
              </th>
              <th>
                <span>Date</span>
              </th>
              <th>
                <span>Status</span>
              </th>
              <th>
                <span>Executed By</span>
              </th>
              <th>
                <span>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i.toString()} style={{ cursor: "pointer" }}>
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
                <td className="date">
                  <span>Dec 23,2024</span>
                </td>
                <td>
                  <div className="status">
                    <div className="box"></div>
                    <h5>Success</h5>
                  </div>
                </td>
                <td className="date">
                  <span>Person 1</span>
                </td>
                <td className="edit-img">
                  <img src={Edit} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
