import React from "react";
import EditIcon from "../../assets/icons/edit.svg";
import ImgOne from "../../assets/images/img-1.jpg";
import "./StockAssigned.scss";

const data = [
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    count: 300,
    litre: "Litre",
  },
];

const StockAssigned: React.FC = () => {
  return (
    <div className="stock-assigned-wrapper">
      <div className="stock-assigned-head">
        <h4>Stock Assigned</h4>
        <div>
          <img src={EditIcon} alt="" />
        </div>
      </div>
      <div className="stock-assigned-container">
        {data.map((f, index) => {
          return (
            <div key={index} className="stock-assigned-content">
              <div className="content">
                <img src={f.img} alt="" />
                <h3>{f.name}</h3>
              </div>
              <div className="text">
                <h4>{f.count}</h4>
                <p>{f.litre}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockAssigned;
