import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/AddStock.scss";
import AddProducts from "../components/AddStock";
import NewProducts from "../components/AddStock/NewProduct";
import ProductList from "../components/AddStock/ProductList";

const AddStock: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Add-Products");

  const handleNavigationClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <Layout>
      <div className="navigation">
        <div
          className={`stocks ${
            activeComponent === "Add-Products" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("Add-Products")}
        >
          <p>Add Stock</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "New-Products" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("New-Products")}
        >
          <p>New Product</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "Product-List" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("Product-List")}
        >
          <p>Product List</p>
        </div>
      </div>
      <div>
        {activeComponent === "Add-Products" && <AddProducts />}
        {activeComponent === "New-Products" && <NewProducts />}
        {activeComponent === "Product-List" && <ProductList />}
      </div>
    </Layout>
  );
};

export default AddStock;
