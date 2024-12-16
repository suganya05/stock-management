import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import LeftArrow from "../../../assets/icons/arrow-left.png";
import "./ManageRepDetails.scss";
import useAuthStore from "../../../context/userStore";
import { getManageRepForRange } from "./Utils";

const ManageRepDetails: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [data, setData] = useState<any[]>([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchData = async () => {
    try {
      const data = await getManageRepForRange(user, new Date(), new Date());
      setData(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout className="manage-rep-details">
      <div className="manage-rep-details-wrapper">
        <div className="heading" onClick={handleGoBack}>
          <img src={LeftArrow} alt="" />
          <h4>Manage Rep</h4>
        </div>
        <div className="table-wrapper">
          {data && data.length > 0 ? (
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
                  <th>
                    <span>Balance</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((_, i) => (
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
                    <td>₹ 200</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">No records yet</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManageRepDetails;
