import React from "react";
import ImgOne from "../../../assets/images/img-1.jpg";
import ImgTwo from "../../../assets/images/img-2.png";
import "./TopSales.scss";
import Button from "../../Button";

const data = [
  {
    img: ImgOne,
    title: "Nandini Milk 1 Litre",
    kg: "300 liter",
  },
  {
    img: ImgTwo,
    title: "Palkova 1 kg",
    kg: "200 Kg",
  },
  {
    img: ImgOne,
    title: "Nandini Milk 1 Litre",
    kg: "300 liter",
  },
  {
    img: ImgTwo,
    title: "Palkova 1 kg",
    kg: "200 Kg",
  },
];

const TopSales: React.FC = () => {
  return (
    <div className="topSales-wrapper">
      <div className="topSales-head">
        <h4>TOP SALES</h4>
        <p>View All</p>
      </div>
      <div className="topSales-container-box">
        {data.map((f, index) => {
          return (
            <div key={index} className="topSales-container">
              <div className="number">
                <p>{index + 1}.</p>
              </div>
              <div className="img">
                <img src={f.img} alt="" />
              </div>
              <div className="para">
                <h3>{f.title}</h3>
                <p>{f.kg}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-btn">
        <Button varient="primary">Add Product</Button>
      </div>
    </div>
  );
};

export default TopSales;
