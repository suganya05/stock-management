import React from "react";
import ImgOne from "../../../assets/images/img-3.png";
import RightArrow from "../../../assets/icons/right.svg";
import { Link } from "react-router-dom";
import "./Explore.scss";

const data = [
  {
    img: ImgOne,
    title: "Vasanth Bavan",
  },
  {
    img: ImgOne,
    title: "Vasanth Bavan",
  },
  {
    img: ImgOne,
    title: "Vasanth Bavan",
  },
  {
    img: ImgOne,
    title: "Vasanth Bavan",
  },
  {
    img: ImgOne,
    title: "Vasanth Bavan",
  },
  {
    img: ImgOne,
    title: "Vasanth Bavan",
  },
];

const ExploreOutlets: React.FC = () => {
  return (
    <div className="explore-wrapper">
      <div className="explore-head">
        <h4>Explore Outlets</h4>
        <p>View All</p>
      </div>
      <div className="explore-container">
        {data.map((f, index) => {
          return (
            <Link to="/explore-outlet-details" key={index}>
              <div className="explore-content">
                <div className="explore-box">
                  <div className="img">
                    <img src={f.img} alt="" />
                  </div>
                  <h4>{f.title}</h4>
                </div>
                <div className="arrow">
                  <img src={RightArrow} alt="" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreOutlets;
