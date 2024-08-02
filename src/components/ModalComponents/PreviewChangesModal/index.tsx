import React, { useState } from "react";
import ImgOne from "../../../assets/images/img-3.png";
import Bottom from "../../../assets/icons/bottom-drop.svg";
import "./PreviewChangesModal.scss";
import Button from "../../Button";

const PreviewChangesModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateOpen, setUpdate] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleUpdateDropdown = () => {
    setUpdate(!updateOpen);
  };

  return (
    <div className="preview-changes-modal-wrapper">
      <div className="preview-changes-modal-head">
        <h4>Preview Changes</h4>
      </div>
      <div className="new-outlet-wrapper">
        <h6>New Outlet</h6>
        <div className="new-outlet-container">
          <div className="drop-down" onClick={toggleDropdown}>
            <div className="image">
              <img src={ImgOne} alt="" />
              <h4>Vasantha Bhavan</h4>
            </div>
            <div className={`top-drop ${isOpen ? "open" : ""}`}>
              <img src={Bottom} alt="Dropdown Arrow" />
            </div>
          </div>
          <div className={`details-container ${isOpen ? "open" : ""}`}>
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
            </div>
            <div className="ans">
              <p>Vasantha Bhavan</p>
              <p>Yogeshwaran</p>
              <p>vasantha@gmail.com</p>
              <p>123456987</p>
              <p>20, Main Road Area Vallioor, Tirunelveli</p>
            </div>
          </div>
        </div>
      </div>
      <div className="new-outlet-wrapper update-content">
        <h6>Update for existing outlet</h6>
        <div className="new-outlet-container">
          <div className="drop-down" onClick={toggleUpdateDropdown}>
            <div className="image">
              <img src={ImgOne} alt="" />
              <h4>Vasantha Bhavan</h4>
            </div>
            <div className={`top-drop ${updateOpen ? "open" : ""}`}>
              <img src={Bottom} alt="Dropdown Arrow" />
            </div>
          </div>
          <div className={`details-container ${updateOpen ? "open" : ""}`}>
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
            </div>
            <div className="ans">
              <p>Vasantha Bhavan</p>
              <p>Yogeshwaran</p>
              <p>vasantha@gmail.com</p>
              <p>123456987</p>
              <p>20, Main Road Area Vallioor, Tirunelveli</p>
            </div>
          </div>
        </div>
      </div>
      <div className="commit-changes-btn">
        <Button varient="primary">Commit changes</Button>
      </div>
    </div>
  );
};

export default PreviewChangesModal;
