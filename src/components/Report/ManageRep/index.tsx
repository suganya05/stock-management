import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import useSalesRepStore from "../../../context/salesRepStore";
import LayoutModule from "../../LayoutModal";
import MilkImg from "../../../assets/images/milk-img.png";
import MilkImgOne from "../../../assets/images/milk-img-1.png";
import ImgOne from "../../../assets/images/img-1.jpg";
import "./ManageRep.scss";

const ManageRep: React.FC = () => {
  const { salesReps } = useSalesRepStore();
  const [showDenomination, setShowDenomination] = useState(false);
  const [showHandovers, setShowHandovers] = useState(false);
  const navigate = useNavigate();

  const handleShowDenominationOpen = () => {
    setShowDenomination(true);
  };
  const handleShowDenominationClose = () => {
    setShowDenomination(false);
  };

  const handleShowHandoversOpen = () => {
    setShowHandovers(true);
  };
  const handleShowHandoversClose = () => {
    setShowHandovers(false);
  };

  return (
    <div className="manage-rep-wrapper">
      <div className="manage-rep-head">
        <h4>Manage Rep(s)</h4>
        <p onClick={() => navigate("/report/manage-rep-details")}>View All</p>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <span className="left">Representative</span>
              </th>
              <th>
                <span>Attendance</span>
              </th>
              <th>
                <span>Denominations</span>
              </th>
              <th>
                <span>Handovers</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i.toString()} style={{ cursor: "pointer" }}>
                <td>
                  <span className="name">Ramesh</span>
                </td>
                <td>
                  <span className="attendance">Present</span>
                </td>
                <td>
                  <div
                    className="view-box"
                    onClick={handleShowDenominationOpen}
                  >
                    <span>Check</span>
                  </div>
                </td>
                <td>
                  <div className="check-box" onClick={handleShowHandoversOpen}>
                    <span>Check</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="more-details-btn">
        <Button varient="primary">More details</Button>
      </div>
      {showDenomination && (
        <LayoutModule
          handleToggle={handleShowDenominationClose}
          className="layout-module"
        >
          <div className="denomination-wrapper">
            <h2>Denominations</h2>
            <div className="denomination">
              <div>
                <h4>1 X 10</h4>
                <h4>1 X 20</h4>
                <h4>1 X 50</h4>
                <h4>1 X 100</h4>
                <h4>1 X 500</h4>
                <h4 className="top-gap">Total</h4>
              </div>
              <div>
                <h4>=</h4>
                <h4>=</h4>
                <h4>=</h4>
                <h4>=</h4>
                <h4>=</h4>
                <h4 className="top-gap">=</h4>
              </div>
              <div>
                <h4>10</h4>
                <h4>20</h4>
                <h4>50</h4>
                <h4>100</h4>
                <h4>500</h4>
                <h4 className="top-gap">600</h4>
              </div>
            </div>
            <div className="close-button" onClick={handleShowDenominationClose}>
              <Button varient="primary">Close</Button>
            </div>
          </div>
        </LayoutModule>
      )}
      {showHandovers && (
        <LayoutModule
          handleToggle={handleShowHandoversClose}
          className="layout-module-handovers"
        >
          <div className="handovers-wrapper">
            <h2>Handover Products</h2>
            <div className="handovers-container">
              <div className="milk-img">
                <img src={MilkImg} alt="" />
              </div>
              <div className="images">
                <img src={MilkImgOne} alt="" />
                <img src={MilkImgOne} alt="" />
              </div>
            </div>
            <div className="milk-container">
              {[...Array(10)].map((_, i) => (
                <div className="content">
                  <div className="name">
                    <img src={ImgOne} alt="" />
                    <p>Nandini Milk 1 Litre</p>
                  </div>
                  <div className="litre">
                    <h4>300</h4>
                    <p>Litre</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LayoutModule>
      )}
    </div>
  );
};

export default ManageRep;
