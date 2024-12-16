import React, { useEffect, useState } from "react";
import ImgThree from "../../../assets/images/img-3.png";
import Rupee from "../../../assets/images/rupee.png";
import Briefcase from "../../../assets/icons/briefcase.png";
import "./TopClients.scss";
import Button from "../../Button";
import { getMonetoryStat } from "../../Report/RevenueChart/RevenueUtils";
import useAuthStore from "../../../context/userStore";
import { getTopClients } from "./TopClients";
import { ISales } from "../../../types/types";

const TopClient: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>();
  const [totalProfit, setTotalProfit] = useState<number>();
  const [totalExpense, setTotalExpense] = useState<number>();
  const [topClients, setTopClients] = useState<any[]>([]);
  const { user } = useAuthStore();

  const Data = [
    {
      img: Briefcase,
      title: "Total Sales",
      amount: totalRevenue || 0,
    },
    {
      img: Briefcase,
      title: "Total Profit",
      amount: totalProfit || 0,
    },
    {
      img: Briefcase,
      title: "Total Expense",
      amount: totalExpense || 0,
    },
  ];

  const getMonetory = async () => {
    try {
      const metrics = await getMonetoryStat(user);
      setTotalRevenue(metrics.data.totalRevenue);
      setTotalProfit(metrics.data.totalProfit);
      setTotalExpense(metrics.data.totalExpense);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopClient = async () => {
    try {
      const data = await getTopClients(user);
      setTopClients(data.data.topClients);
      console.log(data.data.topClients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMonetory();
  }, []);

  useEffect(() => {
    getTopClient();
  }, []);

  return (
    <div className="topclient-wrapper">
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
      <div className="topclient-container">
        <div className="topclient-head">
          <h4>Top Clients</h4>
        </div>
        <div className="table-wrapper">
          {topClients && topClients.length > 0 ? (
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
                    <span>Count</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((c, i) => (
                  <tr key={i.toString()}>
                    <td>
                      <div className="flex-item">
                        <div className="img-box">
                          <img src={c.client.photoUrl} alt="" />
                        </div>
                        <span>{c.client.outletName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="rupee-img">
                        <img src={Rupee} alt="" />
                        <span>{c.totalAmount}</span>
                      </div>
                    </td>
                    <td className="status">
                      <span>{c.purchaseCount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">Start selling to see data here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopClient;
