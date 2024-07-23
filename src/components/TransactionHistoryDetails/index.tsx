import React from "react";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/icons/arrow-left.png";
import ImgOne from "../../assets/images/img-3.png";
import ImgThree from "../../assets/images/img-3.png";
import Rupee from "../../assets/icons/Rupee.png";
import Edit from "../../assets/icons/edit.png";
import "./TransactionHistoryDetails.scss";
import Layout from "../Layout";

const TransactionHistoryDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="transaction-history-details">
        <div className="head" onClick={handleGoBack}>
          <img src={LeftArrow} alt="" />
          <div className="img">
            <img src={ImgOne} alt="" />
          </div>
          <div className="title">
            <h3>Vasanth Bavan</h3>
            <p>
              20,Main Road Area <br /> Vallioor, tirunelveli
            </p>
          </div>
        </div>
        <div className="transaction">
          <div className="transaction-head">
            <h4>Transaction History</h4>
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
      </div>
    </Layout>
  );
};

export default TransactionHistoryDetails;
