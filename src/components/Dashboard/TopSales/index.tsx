import React, { useEffect, useState } from "react";
import ImgOne from "../../../assets/images/img-1.jpg";
import ImgTwo from "../../../assets/images/img-2.png";
import "./TopSales.scss";
import Button from "../../Button";
import { Link } from "react-router-dom";
import useAuthStore from "../../../context/userStore";
import { getTopSelling } from "./TopSellingUtils";

const TopSales: React.FC = () => {
  const { user } = useAuthStore();
  const [topSellings, setTopSellings] = useState<any>();

  const getTopSellingProducts = async () => {
    try {
      const sellingProds = await getTopSelling(user);
      console.log("top selling prods", sellingProds.data);
      setTopSellings(sellingProds.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopSellingProducts();
  }, []);

  return (
    <div className="topSales-wrapper">
      <div className="topSales-head">
        <h4>Top Sales</h4>
      </div>
      <div className="topSales-container-box">
        {topSellings &&
        topSellings.topSellingProducts &&
        Array.isArray(topSellings.topSellingProducts) &&
        topSellings.topSellingProducts.length > 0 ? (
          topSellings.topSellingProducts.map((f: any, index: number) => {
            return (
              <div key={index} className="topSales-container">
                <div className="number">
                  <p>{index + 1}.</p>
                </div>
                <div className="img">
                  <img src={f.product?.photoUrl} alt="" />
                </div>
                <div className="para">
                  <h3>{f.product.name}</h3>
                  <p>{`${f.totalSales} ${f.product.unit}`}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data">Start selling products</div>
        )}
      </div>
      {/* <div className="add-btn">
        <Link to="/inventory">
          <Button varient="primary">Add Product</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default TopSales;
