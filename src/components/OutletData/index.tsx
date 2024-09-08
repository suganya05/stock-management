import React, { useEffect, useRef, useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import { IOutlet } from "../../types/types";
import "./OutletData.scss";
import { printQr } from "./OutletData";

interface IOutletData {
  data: Partial<IOutlet>[];
  selelectedOutlet: Partial<IOutlet> | undefined;
  onDelete: () => void;
  onEdit: () => void;
}

const OutletData: React.FC<IOutletData> = ({
  data,
  selelectedOutlet,
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      {selelectedOutlet ? (
        <div className="add-outlet-list-content">
          <div className="head">
            <h4 onClick={() => printQr(selelectedOutlet)}>Print QR</h4>
            <h4 onClick={() => onEdit()}>Edit</h4>
          </div>
          <div className="logo">
            <img src={selelectedOutlet?.photoUrl} alt="" />
            {/* <div className="edit-icon" onClick={handleEditClick}>
              <img src={EditIcon} alt="" />
            </div> */}
            {/* <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            /> */}
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
              <p>{selelectedOutlet.outletName}</p>
              <p>{selelectedOutlet.ownerName}</p>
              <p>{selelectedOutlet.email}</p>
              <p>{selelectedOutlet.phoneNumber}</p>
              <p>{selelectedOutlet.address}</p>
              {selelectedOutlet.customPricingId ? (
                <div className="enabled">
                  <div>
                    <p>Enabled.</p>
                  </div>
                  <h3>View Pricing</h3>
                </div>
              ) : (
                <div className="enabled">
                  <div>
                    <p>Disabled.</p>
                  </div>
                  <h3>Create?</h3>
                </div>
              )}
            </div>
          </div>
          <div className="dev">
            <div className="delete" onClick={() => onDelete()}>
              <img src={DeleteIcon} alt="" />
              <p>Delete</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="not-selected">Please Select any Outlet</div>
      )}
    </div>
  );
};

export default OutletData;
