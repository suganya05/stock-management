import React from "react";
import PlusIcon from "../assets/icons/plus.png";
import ProfileImg from "../assets/images/profile-img.jpg";
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
        <Link to="/person-page">
          <div className="grid-container">
            {[...Array(20)].map((_, i) => (
              <div className="profile-box">
                <div className="profile-img">
                  <img src={ProfileImg} alt="" />
                </div>
                <div className="profile-name">
                  <h5>Person {i + 1}</h5>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Allocate;
