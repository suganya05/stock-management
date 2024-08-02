import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import ShareImg from "../../assets/icons/share-2.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import PlusIcon from "../../assets/icons/plus.png";
import EditIcon from "../../assets/icons/edit.svg";
import ImgOne from "../../assets/images/img-3.png";
import "./OutletList.scss";
import { Modal } from "../Modal";
import Button from "../Button";
import LayoutModule from "../LayoutModal";
import AddOutletModal from "../ModalComponents/AddOutlet";
import SharingQRCodeViaEmail from "../ModalComponents/SharingQRcodeViaEmail";
import PreviewChangesModal from "../ModalComponents/PreviewChangesModal";

const data = [
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    name: "Vasantha Bhavan",
  },
];

const OutletList: React.FC = () => {
  const [active, setIsActive] = useState(false);
  const [isModalOpen, setModalState] = useState(false);
  const [addOutlet, setAddOutlet] = useState(false);
  const [sharingActive, setSharingActive] = useState(false);

  const handleCloseToggle = () => {
    setIsActive(false);
  };
  const handleOpenToggle = () => {
    setIsActive(true);
  };

  const handleCloseOutlet = () => {
    setAddOutlet(false);
  };
  const handleOpenOutlet = () => {
    setAddOutlet(true);
  };

  const handleOpenSharing = () => {
    setSharingActive(true);
  };
  const handleCloseSharing = () => {
    setSharingActive(false);
  };

  const toggleModal = () => setModalState(!isModalOpen);

  return (
    <div className="outlet-list-wrapper">
      <div className="outlet-list-head">
        <h4>Outlet List</h4>
        <div className="search-and-share">
          <div className="search-input">
            <SearchIcon />
            <input type="search" placeholder="Search" />
          </div>
          <div className="share-box" onClick={handleOpenSharing}>
            <img src={ShareImg} alt="" />
          </div>
          {sharingActive && (
            <LayoutModule
              handleToggle={handleCloseSharing}
              className="layout-module"
            >
              <SharingQRCodeViaEmail />
            </LayoutModule>
          )}
        </div>
      </div>
      <div className="outlet-list-container">
        {data.map((f, index) => {
          return (
            <div key={index} className="outlet-list-content">
              <div className="flex-item">
                <img src={f.img} alt="" />
                <h3>{f.name}</h3>
              </div>
              <div className="icons">
                <div className="edit-icon" onClick={toggleModal}>
                  <img src={EditIcon} alt="" />
                </div>
                <div className="delete-icon" onClick={toggleModal}>
                  <img src={DeleteIcon} alt="" />
                </div>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
      <div className="btns">
        <Button
          varient="secondary"
          leftIcon={<img src={PlusIcon} alt="plus" />}
          onClick={handleOpenToggle}
        >
          Upload CSV
        </Button>
        {active && (
          <LayoutModule
            handleToggle={handleCloseToggle}
            className="layout-module"
          >
            <PreviewChangesModal />
          </LayoutModule>
        )}
        <Button varient="primary" onClick={handleOpenOutlet}>
          Add Outlet
        </Button>
        {addOutlet && (
          <LayoutModule
            handleToggle={handleCloseOutlet}
            className="layout-module"
          >
            <AddOutletModal />
          </LayoutModule>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
    </div>
  );
};

export default OutletList;
