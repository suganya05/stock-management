import React from "react";
import { INewStockItem, IProduct } from "../../../types/types";
import { getUnit } from "../../../utils/unit";
import "./ViewStockList.scss";

interface IViewStockList {
  title: string;
  products: INewStockItem[];
}

const ViewStockList: React.FC<IViewStockList> = ({ title, products }) => {
  return (
    <div className="basic-div">
      <h3>{title}</h3>
      {products &&
        products.map((product) => (
          <div className="model-box" key={product.product._id}>
            <div className="flex-box">
              <div className="img">
                <img
                  src={product.product?.photoUrl}
                  alt={product.product?.name}
                />
              </div>
              <div className="para">
                <h5>{product.product?.name}</h5>
              </div>
            </div>
            <div className="add-delete-content">
              <div className="litre">
                <p>
                  {product.quantity}
                  <span>{getUnit(product.product?.unit)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewStockList;
