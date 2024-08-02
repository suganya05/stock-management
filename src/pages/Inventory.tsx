import React, { useState } from "react";
import Layout from "../components/Layout";
import AddProducts from "../components/AddStock";
import NewProducts from "../components/AddStock/NewProduct";
import AddOutletList from "../components/AddStock/AddOutletList";
import AddSalesperson from "../components/AddStock/AddSalesperson";
import "../styles/Inventory.scss";
import CustomPricing from "../components/AddStock/CustomPricing";

const Inventory: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Add-Products");

  const handleNavigationClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <Layout className="add-stock">
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
          <p>Add Product</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "Outlet-List" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("Outlet-List")}
        >
          <p>Add Outlet</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "add-sales-person" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("add-sales-person")}
        >
          <p>Add Salesperson</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "custom-pricing" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("custom-pricing")}
        >
          <p>Custom Pricing</p>
        </div>
      </div>
      <div>
        {activeComponent === "Add-Products" && <AddProducts />}
        {activeComponent === "New-Products" && <NewProducts />}
        {activeComponent === "Outlet-List" && <AddOutletList />}
        {activeComponent === "add-sales-person" && <AddSalesperson />}
        {activeComponent === "custom-pricing" && <CustomPricing />}
      </div>
    </Layout>
  );
};

export default Inventory;
