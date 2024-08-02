import React, { useState } from "react";
import ImgOne from "../../../assets/images/img-3.png";
import Send from "../../../assets/icons/send.svg";
import "./SharingQRCodeViaEmail.scss";
import Button from "../../Button";

const data = [
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
  {
    img: ImgOne,
    title: "Vasantha Bhavan",
  },
];

const SharingQRCodeViaEmail: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);
  };

  const selectedCount = selectedItems.filter(Boolean).length;

  return (
    <div className="sharing-qr-code-wrapper">
      <div className="sharing-qr-code-head">
        <h4>Sharing QR code via Email</h4>
      </div>
      <div className="head">
        <h3>Send to</h3>
        <p>Select all({selectedCount})</p>
      </div>
      <div className="sharing-qr-code-container">
        {data.map((f, index) => {
          return (
            <div key={index} className="sharing-qr-code-content">
              <div className="names">
                <img src={f.img} alt="" />
                <p>{f.title}</p>
              </div>
              <div className="check-input">
                <input
                  type="checkbox"
                  checked={selectedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="send-btn">
        <Button varient="primary" leftIcon={<img src={Send} alt="plus" />}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default SharingQRCodeViaEmail;
