import React, { useEffect, useRef, useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import { IOutlet } from "../../types/types";
import "./OutletData.scss";
import { printQr } from "./OutletData";
import { uploadImageToFirebase } from "../AddStock/NewProduct/NewProduct";

interface IOutletData {
  data: IOutlet[];
  selelectedId: string | null;
  onDelete: () => void;
}

const OutletData: React.FC<IOutletData> = ({
  data,
  selelectedId,
  onDelete,
}) => {
  const [selectedData, setSelectedData] = useState<IOutlet>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedData(data.find((f) => f._id === selelectedId));
  }, [selelectedId]);

  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   try {
  //     const file = event.target.files?.[0];
  //     if (!file || !selectedData) return;

  //     const url = await uploadImageToFirebase(file);
  //     setSelectedData((prevData) => {
  //       if (!prevData) return prevData;
  //       return { ...prevData, photoUrl: url };
  //     });

  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleEditClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  return (
    <div>
      {selectedData ? (
        <div className="add-outlet-list-content">
          <div className="head" onClick={() => printQr(selectedData)}>
            <h4>Print QR</h4>
            <h4>Edit</h4>
          </div>
          <div className="logo">
            <img src={selectedData?.photoUrl} alt="" />
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
              <p>{selectedData.outletName}</p>
              <p>{selectedData.ownerName}</p>
              <p>{selectedData.email}</p>
              <p>{selectedData.phoneNumber}</p>
              <p>{selectedData.address}</p>
              {selectedData.customPricingId ? (
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
