import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlusIcon from "../../assets/icons/plus-icon.png";
import Profile from "../../assets/icons/profile.png";
import DateImg from "../../assets/icons/Date.png";
import "./Header.scss";
import useAuthStore from "../../context/userStore";
import { backend_url } from "../../constants/backend";
import axios from "axios";

interface IHeader {
  monthValue?: string;
}

const Header: React.FC<IHeader> = ({ monthValue }) => {
  const location = useLocation();
  const { user, loading } = useAuthStore();
  const [name, setName] = useState<string>();
  const [role, setRole] = useState<string>();
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();

  const getUserData = async () => {
    try {
      const url = `${backend_url}admin/super-users`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.get(url, { headers });
      if (res.status === 200) {
        setName(res.data.name ? res.data.name : "User");
        setRole(res.data.role ? res.data.role : "Employee");
      } else {
        console.log("error occured on getting data");
        setName("User");
        setRole("Employee");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDate = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];

    setDay(day);
    setMonth(month);
  };

  useEffect(() => {
    getUserData();
    getDate();
  }, []);

  return (
    <>
      <div className="header-wrapper">
        <div className="header-content">
          <div className="logo">
            <h2>SSM</h2>
          </div>
        </div>
        <div className="header-container">
          <div className="header-content-two">
            {/* <div className="plus-icon">
              <img src={PlusIcon} alt="" />
            </div> */}
            <div className="profile-content">
              <div className="profile">
                <img src={Profile} alt="" />
              </div>
              <div className="content">
                <h4>{name ? name : "user"}</h4>
                <h5>{role ? role : "user"}</h5>
              </div>
            </div>
          </div>

          <div className="month">
            <div className="date">
              <img src={DateImg} alt="" />
            </div>
            <div className="month-content">
              <h4>{day},</h4>
              <h5>{month}</h5>
            </div>
          </div>
        </div>
      </div>
      {location.pathname === "/dashboard" && (
        <div className="dashboard-container">
          <div className="heading">
            <h4>
              Welcome, <span>{name ? name : "user"}</span>
            </h4>
          </div>

          <div className="month-input">
            <form action="">
              <input type="month" value={monthValue} />
            </form>
          </div>
        </div>
      )}
      {/* {location.pathname === "/report" && (
        <div className="dashboard-container">
          <div className="heading">
            <h4>
              Welcome, <span>{name}</span>
            </h4>
          </div>
          <div className="month-input">
            <form action="">
              <input type="month" />
            </form>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Header;
