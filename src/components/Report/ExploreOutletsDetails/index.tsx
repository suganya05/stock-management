import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/icons/arrow-left.png";
import Layout from "../../Layout";
import "./ExploreOutletDetails.scss";
import Button from "../../Button";
import useOutletStore from "../../../context/outletStore";

const ExploreOutletsDetails: React.FC = () => {
  const { outlets } = useOutletStore();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout className="explore-outlets-details">
      <div className="explore-outlets-details-wrapper">
        <div className="heading" onClick={handleGoBack}>
          <img src={LeftArrow} alt="" />
          <h4>Explore Outlets</h4>
        </div>
        <div className="explore-outlets-details-container">
          {outlets.map((f, index) => {
            return (
              <Link key={index} to={`/report/explore-outlets/${f._id}`}>
                <div className="explore-outlets-details-content">
                  <div className="logo">
                    <img src={f.photoUrl} alt="" />
                  </div>
                  <div className="content">
                    <div className="texts">
                      <h3>{f.outletName}</h3>
                      <p>{f.address}</p>
                    </div>
                    <div className="explore-btn">
                      <Button varient="primary">Explore</Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ExploreOutletsDetails;
