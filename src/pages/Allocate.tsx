import React from "react";
import PlusIcon from "../assets/icons/plus.png";
import ProfileImg from "../assets/images/profile-img.jpg";
import RightArrow from "../assets/icons/arrow-right.png";
import Layout from "../components/Layout";
import Button from "../components/Button";
import "../styles/Allocate.scss";
import { Link } from "react-router-dom";

const Allocate: React.FC = () => {
  return (
    <Layout>
      <div className="allocate-wrapper">
        <div className="allocate-head">
          <div className="heading">
            <h4>Delivery Person List </h4>
          </div>
          <div className="btn">
            <Button
              varient="secondary"
              leftIcon={<img src={PlusIcon} alt="plus" />}
            >
              Add Person
            </Button>
          </div>
        </div>
        <div className="flex-content">
          <div className="grid-container">
            {[...Array(3)].map((_, i) => (
              <Link to="/person-page">
                <div className="profile-box">
                  <div className="profile-img">
                    <img src={ProfileImg} alt="" />
                  </div>
                  <div className="profile-name">
                    <h5>Person {i + 1}</h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text">
            <p>Or</p>
          </div>
          <div className="distribute-stocks">
            <div className="csv-box">
              <img src={PlusIcon} alt="" />
              <p>
                Distribute <br /> Stocks <br /> csv
              </p>
            </div>
            <div className="stock-csv-btn">
              <Button
                varient="primary"
                rightIcon={<img src={RightArrow} alt="plus" />}
              >
                Stock csv
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Allocate;
