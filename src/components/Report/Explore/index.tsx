import React from "react";
import ImgOne from "../../../assets/images/img-3.png";
import "./Explore.scss";
import { Link } from "react-router-dom";

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
            <Link to="/company-details" key={index}>
              <div className="explore-content">
                <div className="explore-box">
                  <div className="img">
                    <img src={f.img} alt="" />
                  </div>
                </div>
                <div className="explore">
                  <div className="explore-list">
                    <h4>{f.title}</h4>
                    <h5>95%</h5>
                  </div>
                  <div className="progress-bar-dext-score">
                    <div></div>
                  </div>
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
