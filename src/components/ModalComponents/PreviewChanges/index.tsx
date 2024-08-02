import React from "react";
import ChocolateMilk from "../../../assets/images/chocolate-milk.png";
import DeleteIcon from "../../../assets/icons/delete.png";
import RupeeImg from "../../../assets/icons/Rupee.png";
import "./PreviewChanges.scss";
import Button from "../../Button";

const data = [
  {
    img: ChocolateMilk,
    title: "Doddla ButterMilk",
  },
  {
    img: ChocolateMilk,
    title: "Doddla ButterMilk",
  },
  {
    img: ChocolateMilk,
    title: "Doddla ButterMilk",
  },
  {
    img: ChocolateMilk,
    title: "Doddla ButterMilk",
  },
];

const PreviewChanges: React.FC = () => {
  return (
    <div className="preview-changes-wrapper">
      <div className="preview-changes-heading">
        <h4>Preview Changes</h4>
      </div>
      <div className="new-product-container">
        <div className="new-product-head">
          <h4>New product</h4>
        </div>
        <div className="data-content">
          {data.map((f, index) => {
            return (
              <div className="box" key={index}>
                <div className="flex-box">
                  <div className="img">
                    <img src={f.img} alt="" />
                  </div>
                  <div className="para">
                    <h5>{f.title}</h5>
                    <div className="flex-item">
                      <div className="flex">
                        <h3>Wholesale</h3>
                        <img src={RupeeImg} alt="" />
                        <p>35</p>
                      </div>
                      <div className="flex">
                        <h4>Retail</h4>
                        <img src={RupeeImg} alt="" />
                        <p>35</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div className="delete-icon">
                    <img src={DeleteIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="price-changes-container">
        <div className="price-changes-head">
          <h4>Price changes</h4>
        </div>
        <div className="data-content">
          {data.map((f, index) => {
            return (
              <div className="box" key={index}>
                <div className="flex-box">
                  <div className="img">
                    <img src={f.img} alt="" />
                  </div>
                  <div className="para">
                    <h5>{f.title}</h5>
                    <div className="flex-item">
                      <div className="flex">
                        <h3>Wholesale</h3>
                        <img src={RupeeImg} alt="" />
                        <p>35</p>
                      </div>
                      <div className="flex">
                        <h4>Retail</h4>
                        <img src={RupeeImg} alt="" />
                        <p>35</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div className="delete-icon">
                    <img src={DeleteIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="commit-changes-btn">
        <Button varient="primary">Commit changes</Button>
      </div>
    </div>
  );
};

export default PreviewChanges;
