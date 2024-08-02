import React, { useState } from "react";
import ImgOne from "../../assets/images/img-1.jpg";
import ImgTwo from "../../assets/images/img-2.png";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import "./StockList.scss";
import { Modal } from "../Modal";

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

const StockList: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setModalState] = useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="stockList-wrapper">
      <div className="stock-list-content">
        <div className="stock-head">
          <h4>Stock List</h4>
        </div>
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
      </div>
      <div className="clear">
        <p>Clear All</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
    </div>
  );
};

export default StockList;
