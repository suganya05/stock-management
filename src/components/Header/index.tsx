import React from "react";
import PlusIcon from "../../assets/icons/plus-icon.png";
import Profile from "../../assets/icons/profile.png";
import Date from "../../assets/icons/Date.png";
import "./Header.scss";

const Header: React.FC = () => {
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
            <div className="plus-icon">
              <img src={PlusIcon} alt="" />
            </div>
            <div className="profile-content">
              <div className="profile">
                <img src={Profile} alt="" />
              </div>
              <div className="content">
                <h4>William Smith</h4>
                <h5>CEO Assistant</h5>
              </div>
            </div>
          </div>

          <div className="month">
            <div className="date">
              <img src={Date} alt="" />
            </div>
            <div className="month-content">
              <h4>Tue,</h4>
              <h5>December</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
