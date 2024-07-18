import React from "react";
import ImgThree from "../../../assets/images/img-3.png";
import Rupee from "../../../assets/images/rupee.png";
import "./TopClients.scss";

const TopClient: React.FC = () => {
  return (
    <div className="topclient-wrapper">
      <div className="topclient-head">
        <h4>TOP CLIENTS</h4>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <span>CLIENT</span>
              </th>
              <th>
                <span>SALES</span>
              </th>
              <th>
                <span>STATUS</span>
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
                <td className="status">
                  <span>COMPLETED</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopClient;
