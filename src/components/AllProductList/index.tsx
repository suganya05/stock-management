import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import ImgTwo from "../../assets/images/img-2.png";
import ImgOne from "../../assets/images/img-1.jpg";
import RupeeImg from "../../assets/icons/Rupee.png";
import "./AllProductList.scss";

const data = [
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
  },
  {
    img: ImgOne,
    name: "Doddla Gold 1 Litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Kova  1 Kg",
  },
  {
    img: ImgOne,
    name: "Doddla ButterMilk ",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
  },
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
  },
  {
    img: ImgTwo,
    name: "Nandini Curd 500 Litre",
  },
];

const AllProductList: React.FC = () => {
  return (
    <div className="product-list-content">
      <div className="head">
        <h4>All Product List</h4>
        <div className="search-input">
          <SearchIcon />
          <input type="search" placeholder="Search" />
        </div>
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
                  <h5>{f.name}</h5>
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
                <div className="edit-icon">
                  <img src={EditIcon} alt="" />
                </div>
                <div className="delete-icon">
                  <img src={DeleteIcon} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProductList;
