import React from "react";
import { IDamagedProduct } from "../../../types/types";
import "./DamageProduct.scss";
import { useNavigate } from "react-router-dom";

interface IDamageProductModel {
  damageproduct: IDamagedProduct | undefined;
}
const DamageProduct: React.FC<IDamageProductModel> = ({ damageproduct }) => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation("/inventory#add-salesperson");
  };
  return (
    <div className="Damage-product">
      {damageproduct && (
        <div className="containerr">
          <img src={damageproduct.proofUrl} />
          <div className="right-container">
            <div>
              <div>Date</div>
              <div>Sold by</div>
              <div>Product Name</div>
              <div>Quantity</div>
            </div>
            <div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
              <div>:</div>
            </div>
            <div>
              <div>{new Date(damageproduct.date).toDateString()}</div>
              <div className="salesperson">
                <span>{damageproduct.soldBy.name}</span>
                <span className="view" onClick={handleClick}>
                  View
                </span>
              </div>
              <div>{damageproduct.product.product.name}</div>
              <div>{damageproduct.product.quantity}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamageProduct;
