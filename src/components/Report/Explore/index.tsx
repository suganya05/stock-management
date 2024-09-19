import React from "react";
import ImgOne from "../../../assets/images/img-3.png";
import RightArrow from "../../../assets/icons/right.svg";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./Explore.scss";
import useOutletStore from "../../../context/outletStore";

const ExploreOutlets: React.FC = () => {
  const { outlets } = useOutletStore();
  const navigate = useNavigate();
  return (
    <div className="explore-wrapper">
      <div className="explore-head">
        <h4>Explore Outlets</h4>
        <p onClick={() => navigate("/report/explore-outlets")}>View All</p>
      </div>
      <div className="explore-container">
        {outlets.map((f, index) => {
          return (
            <Link to={`/report/explore-outlets/${f._id}`} key={index}>
              <div className="explore-content">
                <div className="explore-box">
                  <div className="img">
                    <img src={f.photoUrl} alt="" />
                  </div>
                  <h4>{f.outletName}</h4>
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
