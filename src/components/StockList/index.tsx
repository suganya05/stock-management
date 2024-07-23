import React, { useState } from "react";
import ImgOne from "../../assets/images/img-1.jpg";
import ImgTwo from "../../assets/images/img-2.png";
import Rupee from "../../assets/icons/Rupee.png";
import ArrowDown from "../../assets/icons/arrow-down.png";
import ArrowTop from "../../assets/icons/arrow-top.png";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import ArrowRight from "../../assets/icons/arrow-right.png";
import "./StockList.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

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
                  <div className="flex-rupee-content">
                    <div className="flex-rupee">
                      <div>
                        <img src={ArrowDown} alt="" />
                      </div>
                      <div className="flex">
                        <img src={Rupee} alt="" />
                        <p>{f.downCount}</p>
                      </div>
                    </div>
                    <div className="flex-rupee">
                      <div>
                        <img src={ArrowTop} alt="" />
                      </div>
                      <div className="flex">
                        <img src={Rupee} alt="" />
                        <p>{f.topCount}</p>
                      </div>
                    </div>
                  </div>
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
      <div className="confirm-stock-btn">
        <Link to="/confirm-stock-list">
          <Button
            varient="primary"
            type="submit"
            rightIcon={<img src={ArrowRight} alt="plus" />}
          >
            Confirm Stock List
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StockList;
