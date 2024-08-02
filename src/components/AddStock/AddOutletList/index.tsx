import React from "react";
import OutletList from "../../OutletList";
import Img from "../../../assets/images/img-3.png";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/images/delete.svg";
import "./AddOutletList.scss";

const AddOutletList: React.FC = () => {
  return (
    <div className="add-outlet-list-wrapper">
      <OutletList />
      <div className="add-outlet-list-content">
        <div className="head">
          <h4>Print QR</h4>
        </div>
        <div className="logo">
          <img src={Img} alt="" />
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
              <p>Owner name</p>
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
              <p>Address</p>
              <p>:</p>
            </div>
            <div className="text">
              <p>Custom pricing</p>
              <p>:</p>
            </div>
          </div>
          <div className="ans">
            <p>Vasantha bhavan</p>
            <p>Yogeshwaran</p>
            <p>vasantha@gmail.com</p>
            <p>123456987</p>
            <p>20,Main Road Area Vallioor, tirunelveli</p>
            <div className="enabled">
              <div>
                <p>Enabled.</p>
              </div>
              <h3>View Pricing</h3>
            </div>
          </div>
        </div>
        <div className="dev">
          <div className="delete">
            <img src={DeleteIcon} alt="" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOutletList;
