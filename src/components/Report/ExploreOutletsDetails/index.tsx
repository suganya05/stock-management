import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/icons/arrow-left.png";
import ImgOne from "../../../assets/images/img-3.png";
import Layout from "../../Layout";
import "./ExploreOutletDetails.scss";
import Button from "../../Button";

const data = [
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
  {
    logo: ImgOne,
    heading: "Vasantha Bhavan",
    address: "20,Main Road Area Vallioor, tirunelveli",
  },
];

const ExploreOutletsDetails: React.FC = () => {
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
          {data.map((f, index) => {
            return (
              <Link key={index} to="/company-details">
                <div className="explore-outlets-details-content">
                  <div className="logo">
                    <img src={f.logo} alt="" />
                  </div>
                  <div className="content">
                    <div className="texts">
                      <h3>{f.heading}</h3>
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
