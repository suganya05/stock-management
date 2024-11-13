import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import useSalesRepStore from "../../../context/salesRepStore";
import LayoutModule from "../../LayoutModal";
import MilkImg from "../../../assets/images/milk-img.png";
import MilkImgOne from "../../../assets/images/milk-img-1.png";
import ImgOne from "../../../assets/images/img-1.jpg";
import "./ManageRep.scss";
import { getManageSalesPerson } from "./ManageRepUtils";
import useAuthStore from "../../../context/userStore";
import { IDenomination, IGetMangeRep, IHandOver } from "../../../types/types";

const ManageRep: React.FC = () => {
  const { salesReps } = useSalesRepStore();
  const [showDenomination, setShowDenomination] = useState(false);
  const [showHandovers, setShowHandovers] = useState(false);
  const { user } = useAuthStore();
  const [denomination, setDenomination] = useState<IDenomination>();
  const [handOvers, setHandOver] = useState<IHandOver>();
  const [results, setResults] = useState<IGetMangeRep[]>();

  const navigate = useNavigate();

  const handleShowDenominationOpen = (denoms: IDenomination) => {
    setShowDenomination(true);
    setDenomination(denoms);
  };
  const handleShowDenominationClose = () => {
    setShowDenomination(false);
    setDenomination(undefined);
  };

  const handleShowHandoversOpen = (handOver: IHandOver) => {
    setShowHandovers(true);
    setHandOver(handOver);
  };
  const handleShowHandoversClose = () => {
    setShowHandovers(false);
    setHandOver(undefined);
  };

  const fetchRepData = async (year: number, month: number, date: number) => {
    try {
      const res = await getManageSalesPerson(user, year, month, date);
      console.log("mage reps", res);
      setResults(res.data.manageRepData);
    } catch (error) {
      console.log("Error occured on manage rep", error);
    }
  };

  useEffect(() => {
    fetchRepData(2024, 11, 8);
  }, []);

  return (
    <div className="manage-rep-wrapper">
      <div className="manage-rep-head">
        <h4>Manage Rep(s)</h4>
        {results && results.length > 0 && (
          <p onClick={() => navigate("/report/manage-rep-details")}>View All</p>
        )}
      </div>
      <div className="table-wrapper">
        {results && results.length > 0 ? (
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
              {results.map((sr, i) => (
                <tr key={i.toString()} style={{ cursor: "pointer" }}>
                  <td>
                    <span className="name">{sr.salesPerson.name}</span>
                  </td>
                  <td>
                    <span className={`attendance ${sr.isAbsent && "absent"}`}>
                      {sr.isAbsent ? "Absent" : "Present"}
                    </span>
                  </td>
                  <td>
                    {sr.isAbsent ? (
                      <div className={`view-box absent`}>
                        <span>Not Applic.</span>
                      </div>
                    ) : (
                      <div
                        className="view-box"
                        onClick={() =>
                          handleShowDenominationOpen(sr.denomination)
                        }
                      >
                        <span>Check</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {sr.isAbsent ? (
                      <div className="check-box absent">
                        <span>Not Applic.</span>
                      </div>
                    ) : (
                      <div
                        className="check-box"
                        onClick={() => handleShowHandoversOpen(sr.handOver)}
                      >
                        <span>Check</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No Reps added yet</div>
        )}
      </div>
      <div className="more-details-btn">
        {results && results.length > 0 && (
          <Button
            varient="primary"
            onClick={() => navigate("/report/manage-rep-details")}
          >
            More details
          </Button>
        )}
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
                <h4>1 X 200</h4>
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
                <h4>{denomination?.noOfTen}</h4>
                <h4>{denomination?.noOfTwenty}</h4>
                <h4>{denomination?.noOfFifty}</h4>
                <h4>{denomination?.noOfHundred}</h4>
                <h4>{denomination?.noOfTwoHundred}</h4>
                <h4>{denomination?.noOfFiveHundred}</h4>
                <h4 className="top-gap">{denomination?.totalAmount}</h4>
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
                <img src={handOvers?.proofUrl} alt="" />
              </div>
              {/* <div className="images">
                <img src={MilkImgOne} alt="" />
                <img src={MilkImgOne} alt="" />
              </div> */}
            </div>
            <div className="milk-container">
              {handOvers &&
                handOvers.products.map((p, i) => (
                  <div className="content">
                    <div className="name">
                      <img src={p.product.photoUrl} alt="" />
                      <p>{p.product.name}</p>
                    </div>
                    <div className="litre">
                      <h4>{p.quantity}</h4>
                      <p>{p.product.unit}</p>
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
