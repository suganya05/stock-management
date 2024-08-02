import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import ProfileImg from "../../../assets/images/profile-img.jpg";
import RightArrow from "../../../assets/icons/right.svg";
import ProfilePhoto from "../../../assets/images/profile-photo.png";
import DeleteIcon from "../../../assets/images/delete.svg";
import EditIcon from "../../../assets/images/edit.png";
import "./AddSalesperson.scss";
import Button from "../../Button";
import LayoutModule from "../../LayoutModal";
import AddSalesRepresentative from "../../ModalComponents/AddSalesRepresentative";

const AddSalesperson: React.FC = () => {
  const [active, setIsActive] = useState(false);

  const handleCloseToggle = () => {
    setIsActive(false);
  };
  const handleOpenToggle = () => {
    setIsActive(true);
  };
  return (
    <div className="add-sales-person-wrapper">
      <div className="add-sales-person-content">
        <div className="add-sales-person-head">
          <h4>Delivery Person</h4>
          <div className="search-input">
            <SearchIcon />
            <input type="search" placeholder="Search" />
          </div>
        </div>
        <div className="add-sales-person-container">
          {[...Array(10)].map((_, i) => (
            <div key={i.toString()} className="add-sales">
              <div className="profile-img">
                <img src={ProfileImg} alt="" />
                <p>Person</p>
              </div>
              <img src={RightArrow} alt="" />
            </div>
          ))}
        </div>
        <div className="add-btn">
          <Button varient="primary" onClick={handleOpenToggle}>
            Add
          </Button>
        </div>
        {active && (
          <LayoutModule
            handleToggle={handleCloseToggle}
            className="layout-module"
          >
            <AddSalesRepresentative />
          </LayoutModule>
        )}
      </div>
      <div className="salesperson-details-wrapper">
        <div className="salesperson-details-head">
          <h4>Salesperson details</h4>
        </div>
        <div className="profile-wrapper">
          <div className="profile-img">
            <div className="img">
              <img src={ProfilePhoto} alt="" />
            </div>
            <div className="edit-icon">
              <img src={EditIcon} alt="" />
            </div>
          </div>
          <div className="details-container">
            <div>
              <div className="text">
                <p>Name</p>
                <p>:</p>
              </div>
              <div className="text">
                <p>Email</p>
                <p>:</p>
              </div>
              <div className="text">
                <p>Phone number</p>
                <p>:</p>
              </div>
              <div className="text">
                <p>Last login</p>
                <p>:</p>
              </div>
              <div className="text">
                <p>Status</p>
                <p>:</p>
              </div>
            </div>
            <div className="ans">
              <p>Person 1</p>
              <p>person@gmail.com</p>
              <p>123456987</p>
              <p>12 Mar 2024 at 5:30 PM</p>
              <div className="active">
                <h3>Active</h3>
              </div>
            </div>
          </div>
          <div className="btns">
            <div className="delete">
              <img src={DeleteIcon} alt="" />
              <p>Delete</p>
            </div>
            <Button varient="primary">Make inactive</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesperson;
