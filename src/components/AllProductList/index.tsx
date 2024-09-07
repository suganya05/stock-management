import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import ImgTwo from "../../assets/images/img-2.png";
import ImgOne from "../../assets/images/img-1.jpg";
import RupeeImg from "../../assets/icons/Rupee.png";
import "./AllProductList.scss";
import Button from "../Button";
import { IAllProducts } from "../../types/types";

const AllProductList: React.FC<IAllProducts> = ({
  prodList,
  onDelete,
  onEdit,
}) => {
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
        {prodList ? (
          prodList.map((f, index) => {
            return (
              <div className="box" key={index}>
                <div className="flex-box">
                  <div className="img">
                    <img src={f.photoUrl} alt="" />
                  </div>
                  <div className="para">
                    <h5>{f.name}</h5>
                    <div className="flex-item">
                      <div className="flex">
                        <h3>Wholesale</h3>
                        <img src={RupeeImg} alt="" />
                        <p>{f.actualPrice}</p>
                      </div>
                      <div className="flex">
                        <h4>Retail</h4>
                        <img src={RupeeImg} alt="" />
                        <p>{f.retailPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div
                    className="edit-icon"
                    onClick={() => onEdit && onEdit(f._id)}
                  >
                    <img src={EditIcon} alt="" />
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => onDelete && onDelete(f._id)}
                  >
                    <img src={DeleteIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No products</div>
        )}
      </div>
    </div>
  );
};

export default AllProductList;
