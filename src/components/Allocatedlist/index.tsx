import React, { useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import ImgOne from "../../assets/images/img-1.jpg";
import ImgTwo from "../../assets/images/img-2.png";
import "./Allocatedlist.scss";
import Button from "../Button";
import LayoutModule from "../LayoutModal";
import AddProduct from "../ModalComponents/AddProduct";

const data = [
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    downCount: 45,
    topCount: 53,
    count: 300,
    litre: "litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
    downCount: 35,
    topCount: 40,
    count: 50,
    litre: "litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    downCount: 45,
    topCount: 53,
    count: 300,
    litre: "litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
    downCount: 35,
    topCount: 40,
    count: 50,
    litre: "litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    downCount: 45,
    topCount: 53,
    count: 300,
    litre: "litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
    downCount: 35,
    topCount: 40,
    count: 50,
    litre: "litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    downCount: 45,
    topCount: 53,
    count: 300,
    litre: "litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
    downCount: 35,
    topCount: 40,
    count: 50,
    litre: "litre",
  },
];

const AllocatedList: React.FC = () => {
  const [active, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleOpenToggle = () => {
    setIsActive(true);
  };
  const handleCloseToggle = () => {
    setIsActive(false);
  };
  return (
    <div className="allocated-list-wrapper">
      <div className="allocated-list-head">
        <h4>Allocated list</h4>
        <div className="drop-down-list">
          <select value={selectedOption} onChange={handleChange}>
            <option value="">16,June Today</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>
      </div>
      <div className="data-content">
        {data.map((f, index) => {
          return (
            <div className="box" key={index}>
              <div className="flex-box">
                <div className="img">
                  <img src={f.img} alt="" />
                </div>
                <div className="para">
                  <h5>{f.name}</h5>
                </div>
              </div>
              <div className="add-delete-content">
                <div className="litre">
                  <p>
                    {f.count} <span>{f.litre}</span>
                  </p>
                </div>
                <div className="edit-icon">
                  <img src={EditIcon} alt="" />
                </div>
                <div className="delete-icon">
                  <img src={DeleteIcon} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="clear">
        <p>Clear all</p>
      </div>
      <div className="add-product-btn">
        <Button varient="primary" onClick={handleOpenToggle}>
          Add Product
        </Button>
      </div>
      {active && (
        <LayoutModule
          handleToggle={handleCloseToggle}
          className="layout-module"
        >
          <AddProduct />
        </LayoutModule>
      )}
    </div>
  );
};

export default AllocatedList;
