import React from "react";
import "./ManageRep.scss";
import Button from "../../Button";
import useSalesRepStore from "../../../context/salesRepStore";

const ManageRep: React.FC = () => {
  const { salesReps } = useSalesRepStore();
  return (
    <div className="manage-rep-wrapper">
      <div className="manage-rep-head">
        <h4>Manage Rep(s)</h4>
        <p>View All</p>
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
                  <div className="view-box">
                    <span>Check</span>
                  </div>
                </td>
                <td>
                  <div className="check-box">
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
    </div>
  );
};

export default ManageRep;
