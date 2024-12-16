import React, { useEffect, useMemo, useState } from "react";
import "./CustomPricing.scss";
import { IOutlet, IProduct } from "../../../types/types";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import RightArrow from "../../../assets/icons/right.svg";
import useAuthStore from "../../../context/userStore";
import useOutletStore from "../../../context/outletStore";
import CProducts from "../../CPproducts";
import {
  deleteCP,
  getCustomPricingProduct,
} from "../../../helpers/customPricing";
import { auth } from "../../../utils/handleCalls";

const CustomPricing: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const { outlets } = useOutletStore();
  const [products, setProducts] = useState<IProduct[]>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectOutlet = async (id: string | undefined) => {
    if (id) {
      setSelectedOutletId(id);
      const response = await getCustomPricingProduct(user, id);
      if (response) {
        setProducts(response.data?.data);
      }
    }
  };

  useEffect(() => {
    if (selectedOutletId) {
    }
  }, [selectedOutletId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredOutlets = useMemo(() => {
    return outlets.filter((outlet) =>
      outlet?.outletName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, []);

  const handleDelete = async (id: string | undefined) => {
    const res = await deleteCP(user, id);
    if (res.type == "sucess") {
      //@ts-ignore
      setProducts(products?.products.filter((product) => product._id !== id));
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
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="outlet-list-container">
          {filteredOutlets && filteredOutlets.length >= 1 ? (
            filteredOutlets.map((outlet) => (
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
      <CProducts
        prodList={products}
        selectedId={selectedOutletId}
        onDelete={(id) => handleDelete(id)}
      />
    </div>
  );
};

export default CustomPricing;
