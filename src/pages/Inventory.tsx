import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import AddProducts from "../components/AddStock";
import NewProducts from "../components/AddStock/NewProduct";
import AddOutletList from "../components/AddStock/AddOutletList";
import AddSalesperson from "../components/AddStock/AddSalesperson";
import "../styles/Inventory.scss";
import CustomPricing from "../components/AddStock/CustomPricing";

const Inventory: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Add-Products");

  // Update the active component based on the current hash in the URL
  const handleHashChange = () => {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
    switch (hash) {
      case "new-products":
        setActiveComponent("New-Products");
        break;
      case "outlet-list":
        setActiveComponent("Outlet-List");
        break;
      case "add-salesperson":
        setActiveComponent("add-sales-person");
        break;
      case "custom-pricing":
        setActiveComponent("custom-pricing");
        break;
      default:
        setActiveComponent("Add-Products");
        break;
    }
  };

  useEffect(() => {
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleNavigationClick = (componentName: string, hash: string) => {
    setActiveComponent(componentName);
    window.location.hash = hash; // Update the URL hash
  };

  return (
    <Layout className="add-stock">
      <div className="navigation">
        <div
          className={`stocks ${
            activeComponent === "Add-Products" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("Add-Products", "add-products")}
        >
          <p>Stock Management</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "New-Products" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("New-Products", "new-products")}
        >
          <p>Products</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "Outlet-List" ? "active" : ""
          }`}
          onClick={() => handleNavigationClick("Outlet-List", "outlet-list")}
        >
          <p>Outlets</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "add-sales-person" ? "active" : ""
          }`}
          onClick={() =>
            handleNavigationClick("add-sales-person", "add-salesperson")
          }
        >
          <p>Sales Representatives</p>
        </div>
        <div
          className={`stocks ${
            activeComponent === "custom-pricing" ? "active" : ""
          }`}
          onClick={() =>
            handleNavigationClick("custom-pricing", "custom-pricing")
          }
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
