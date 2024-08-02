import React from "react";
import PlusIcon from "../assets/icons/plus.png";
import ProfileImg from "../assets/images/profile-img.jpg";
import RightArrow from "../assets/icons/right.svg";
import Layout from "../components/Layout";
import Button from "../components/Button";
import "../styles/Allocate.scss";
import AllocatedList from "../components/Allocatedlist";

const Allocate: React.FC = () => {
  return (
    <Layout className="allocate">
      <div className="allocate-head">
        <div className="heading">
          <h4>Delivery Person(s)</h4>
        </div>
        <div className="btn">
          <Button
            varient="secondary"
            leftIcon={<img src={PlusIcon} alt="plus" />}
          >
            Use Previous allocation
          </Button>
          <Button varient="primary">Upload CSV file</Button>
        </div>
      </div>
      <div className="allocate-container">
        <div className="allocate-wrapper">
          <div className="add-sales-person-container">
            {[...Array(10)].map((_, i) => (
              <div key={i.toString()} className="add-sales">
                <div className="profile-img">
                  <img src={ProfileImg} alt="" />
                  <p>Person</p>
                </div>
                <div className="text">
                  <p>Allocated</p>
                  <img src={RightArrow} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="confirm-stock-list-btn">
            <Button
              varient="primary"
              rightIcon={<img src={RightArrow} alt="plus" />}
            >
              Confirm Stock List
            </Button>
          </div>
        </div>
        <AllocatedList />
      </div>
    </Layout>
  );
};

export default Allocate;
