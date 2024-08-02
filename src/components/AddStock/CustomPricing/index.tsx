import React from "react";
import OutletList from "../../OutletList";
import "./CustomPricing.scss";
import AllProductList from "../../AllProductList";

const CustomPricing: React.FC = () => {
  return (
    <div className="custom-pricing-wrapper">
      <OutletList />
      <AllProductList />
    </div>
  );
};

export default CustomPricing;
