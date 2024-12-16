import React, { useEffect, useMemo, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import RupeeImg from "../../assets/icons/Rupee.png";
import "./CPproducts.scss";
import { ICustomProduct } from "../../types/types";
import Button from "../Button";
import LayoutModule from "../LayoutModal";
import AddCustomProduct from "../ModalComponents/AddCustomPricing";
import { getCustomPricingProduct } from "../../helpers/customPricing";
import useAuthStore from "../../context/userStore";

const CProducts: React.FC<ICustomProduct> = ({
  prodList,
  onDelete,
  onEdit,
  selectedId,
}) => {
  const [showAddModel, setShowAddModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const { user } = useAuthStore();
  const handleAddModelOpen = () => {
    setShowAddModel(true);
  };
  const handleAddModelClose = () => {
    setShowAddModel(false);
  };

  const getProducts = async () => {
    if (selectedId) {
      const response = await getCustomPricingProduct(user, selectedId);
      if (response) {
        // setProducts(prods.products);
        setProducts(response.data?.data?.products);
      } else {
        setProducts([]);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    console.log("cp prodcuts", products);
    return products?.filter((prod) =>
      prod?.productId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  useEffect(() => {
    getProducts();
  }, [selectedId, showAddModel]);
  return (
    <div className="custom-product-list-content">
      <div className="head">
        <h4>All Product Price List</h4>
        <div className="search-input">
          <SearchIcon />
          {/* <input type="search" placeholder="Search" /> */}
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="data-content">
        {filteredProducts && filteredProducts.length >= 1 ? (
          filteredProducts.map((f, index) => {
            return (
              <div className="box" key={index}>
                <div className="flex-box">
                  <div className="img">
                    <img src={f.productId.photoUrl} alt="" />
                  </div>
                  <div className="para">
                    <h5>{f.productId.name}</h5>
                    <div className="flex-item">
                      <div className="flex">
                        <h3>Wholesale</h3>
                        <img src={RupeeImg} alt="" />
                        <p>{f.productId.actualPrice}</p>
                      </div>
                      <div className="flex">
                        <h4>Retail</h4>
                        <img src={RupeeImg} alt="" />
                        <p>{f.productId.retailPrice}</p>
                      </div>
                      <div className="flex">
                        <h4>custom price</h4>
                        <img src={RupeeImg} alt="" />
                        <p>{f.retailPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div
                    className="edit-icon"
                    onClick={() => onEdit && onEdit(f._id)}
                  >
                    <img src={EditIcon} alt="" />
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => onDelete && onDelete(f._id)}
                  >
                    <img src={DeleteIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data">No products</div>
        )}
      </div>
      {selectedId && (
        <div className="btn-container">
          <Button varient="primary" onClick={() => handleAddModelOpen()}>
            Add Products
          </Button>
        </div>
      )}
      {selectedId && showAddModel && (
        <LayoutModule handleToggle={handleAddModelClose}>
          <AddCustomProduct
            onSubmit={handleAddModelClose}
            selectedId={selectedId}
          />
        </LayoutModule>
      )}
    </div>
  );
};

export default CProducts;
