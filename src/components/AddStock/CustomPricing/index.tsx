import React, { useEffect, useState } from "react";
import "./CustomPricing.scss";
import AllProductList from "../../AllProductList";
import { IOutlet } from "../../../types/types";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { getAllOulets } from "../AddOutletList/Addoutlet";
import useAuthStore from "../../../context/userStore";

const CustomPricing: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [outlets, setOutlets] = useState<IOutlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 1;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadOutlets(page, limit);
  }, [page]);

  const handleSelectOutlet = (id: string | undefined) => {
    if (id) {
      setSelectedOutletId(id);
      console.log("id", id);
    }
  };

  const loadOutlets = async (page: number, limit: number) => {
    try {
      const data = await getAllOulets(user, page, limit);
      setOutlets((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const resetOulets = () => {
    setOutlets([]);
    setHasMore(true);
    if (page !== 1) {
      setPage(1);
      return;
    } else {
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
      <AllProductList prodList={[]} />
    </div>
  );
};

export default CustomPricing;
