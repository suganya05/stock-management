import React, { useEffect, useState } from "react";
import "./CustomPricing.scss";
import { IOutlet } from "../../../types/types";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import RightArrow from "../../../assets/icons/right.svg";
import useAuthStore from "../../../context/userStore";
import useOutletStore from "../../../context/outletStore";
import CProducts from "../../CPproducts";

const CustomPricing: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const { outlets } = useOutletStore();

  const handleSelectOutlet = (id: string | undefined) => {
    if (id) {
      setSelectedOutletId(id);
      console.log("id", id);
    }
  };

  return (
    <div className="custom-pricing-wrapper">
      <div className="outlet-list-wrapper">
        <div className="outlet-list-head">
          <h4>Outlet List</h4>
          <div className="search-and-share">
            <div className="search-input">
              <SearchIcon />
              <input type="search" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="outlet-list-container">
          {outlets.length >= 1 ? (
            outlets.map((outlet) => (
              <div
                key={outlet._id}
                className={`outlet-list-content ${
                  selectedOutletId === outlet._id ? "selected" : ""
                }`}
                onClick={() => handleSelectOutlet(outlet._id)}
              >
                <div className="flex-item">
                  <img src={outlet.photoUrl} alt="" />
                  <h3>{outlet.outletName}</h3>
                </div>
                <div className="icons">
                  <div className="right-icon">
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="not-selected">Start adding outlets</div>
          )}
        </div>
      </div>
      <CProducts prodList={[]} />
    </div>
  );
};

export default CustomPricing;
