import React, { useState } from "react";
import OutletList from "../../OutletList";
import "./CustomPricing.scss";
import AllProductList from "../../AllProductList";
import { IOutlet } from "../../../types/types";

const CustomPricing: React.FC = () => {
  const [outlets, setOutlets] = useState<IOutlet[]>([]);

  return (
    <div>
      <OutletList />
      <AllProductList />
    </div>
  );
};

export default CustomPricing;
