import React, { useEffect, useState } from "react";
import ImgOne from "../../../assets/images/img-3.png";
import Send from "../../../assets/icons/send.svg";
import "./SharingQRCodeViaEmail.scss";
import Button from "../../Button";
import { IOutlet } from "../../../types/types";
import useAuthStore from "../../../context/userStore";
import useOutletStore from "../../../context/outletStore";

const SharingQRCodeViaEmail: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const user = useAuthStore((state) => state.user);
  const { outlets } = useOutletStore();

  const handleCheckboxChange = (outletId: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(outletId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== outletId);
      } else {
        // If not selected, add it
        return [...prevSelected, outletId];
      }
    });
  };

  const handleSendPress = async () => {
    console.log("Selected Items:", selectedItems);
    // Add logic to handle sending selected QR codes via email
  };

  return (
    <div className="sharing-qr-code-wrapper">
      <div className="sharing-qr-code-head">
        <h4>Sharing QR code via Email</h4>
      </div>
      <div className="head">
        <h3>Send to</h3>
        <p>Select all({selectedItems.length})</p>
      </div>
      <div className="sharing-qr-code-container">
        {outlets.map((outlet) => {
          return (
            <div key={outlet._id} className="sharing-qr-code-content">
              <div className="names">
                <img src={outlet.photoUrl} alt={outlet.outletName} />
                <p>{outlet.outletName}</p>
              </div>
              <div className="check-input">
                <input
                  type="checkbox"
                  //@ts-ignore
                  checked={selectedItems.includes(outlet._id)}
                  //@ts-ignore
                  onChange={() => handleCheckboxChange(outlet._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="send-btn">
        <Button
          varient="primary"
          leftIcon={<img src={Send} alt="plus" />}
          onClick={handleSendPress}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SharingQRCodeViaEmail;
