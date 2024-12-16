import React, { useDebugValue, useEffect, useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import ImgOne from "../../assets/images/img-1.jpg";
import ImgTwo from "../../assets/images/img-2.png";
import "./Allocatedlist.scss";
import Button from "../Button";
import LayoutModule from "../LayoutModal";
import AddProduct from "../ModalComponents/AddProduct";
import DatePicker from "react-datepicker";
import { IGetStockItem, IProduct, IStockItem } from "../../types/types";
import useAllocationsStore from "../../context/allocationStore";
import useAuthStore from "../../context/userStore";
import EditStock from "../ModalComponents/EditStock";
import useStockStore from "../../context/stockStore";
import "react-datepicker/dist/react-datepicker.css";
import { getUnit } from "../../utils/unit";

interface IAllocateList {
  selectedRepId: string | undefined;
}

interface IEditData {
  productId: string;
  quantity: number;
  unit: string;
}

const AllocatedList: React.FC<IAllocateList> = ({ selectedRepId }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const {
    createAllocations,
    allocations,
    removeAllocations,
    updateAllocation,
  } = useAllocationsStore();
  const { fetchStocks } = useStockStore();
  const [products, setProducts] = useState<IGetStockItem[]>();
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<IEditData>();
  const { user } = useAuthStore();

  const handleOpenAdd = () => {
    setShowAddProduct(true);
  };
  const handleCloseAdd = () => {
    setShowAddProduct(false);
  };

  const handleOpenEdit = () => {
    setShowEditProduct(true);
  };
  const handleCloseEdit = () => {
    setShowEditProduct(false);
  };

  const handleAddProduct = async (values: IStockItem) => {
    if (!selectedRepId) {
      return;
    }
    await createAllocations(user, selectedRepId, [values]);
    await fetchStocks(user);
    handleCloseAdd();
  };

  useEffect(() => {
    if (allocations) {
      const data = allocations.find((items) => {
        return items.salesPerson?._id === selectedRepId;
      });
      if (data) {
        setProducts(data.allocatedItems as IGetStockItem[]);
      } else {
        setProducts(undefined);
      }
    }
  }, [selectedRepId, allocations]);

  const handleDelete = async (productId: string) => {
    // if (allocations) {
    //   const data = allocations.allocations?.find(
    //     (f) => f.salesPersonId === selectedRepId
    //   );
    //   if (data?._id && selectedRepId) {
    //     removeAllocations(user, data?._id, productId, selectedRepId);
    //   }
    // }
    if (selectedRepId) {
      removeAllocations(user, productId, selectedRepId);
    }
  };

  const handleEditSubmit = async (updatedValue: { quantity: number }) => {
    // console.log(updatedValue);
    // if (!dataToEdit || !dataToEdit.productId) {
    //   return;
    // }
    // updateAllocation(user, {
    //   // allotedDate: date,
    //   allocations: [
    //     {
    //       salesPersonId: selectedRepId,
    //       allocatedItems: [
    //         {
    //           //@ts-ignore
    //           productId: dataToEdit?.productId,
    //           quantity: updatedValue.quantity,
    //         },
    //       ],
    //     },
    //   ],
    // });
    // handleCloseEdit();
  };

  const handleEditbtn = (dataToEdit: IEditData) => {
    setDataToEdit(dataToEdit);
    handleOpenEdit();
  };

  useEffect(() => {
    fetchStocks(user);
  }, []);

  return (
    <div className="allocated-list-wrapper">
      <div className="allocated-list-head">
        <h4>Allocated list</h4>
      </div>
      <div className="data-content">
        {!selectedRepId ? (
          <div className="centered">Please Select a representative</div>
        ) : products && products.length > 0 ? (
          products.map((f, index) => {
            return (
              <div className={"box"} key={index}>
                <div className="flex-box">
                  <div className="img">
                    <img src={f.product.photoUrl} alt="" />
                  </div>
                  <div className="para">
                    <h5>{f.product.name}</h5>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div className="litre">
                    <p>
                      {f.quantity} <span>{getUnit(f.product.unit)}</span>
                    </p>
                  </div>
                  <div
                    className="edit-icon"
                    onClick={() =>
                      handleEditbtn({
                        productId: f.product._id,
                        quantity: f.quantity,
                        unit: getUnit(f.product.unit),
                      })
                    }
                  >
                    <img src={EditIcon} alt="" />
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => handleDelete(f.product._id)}
                  >
                    <img src={DeleteIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        ) : products && products.length === 0 ? (
          <div className="centered">No data found</div>
        ) : (
          <div className="centered">Not yet allocated</div>
        )}
      </div>
      {selectedRepId && (
        <div className="add-product-btn">
          <Button varient="primary" onClick={handleOpenAdd}>
            Add Product
          </Button>
        </div>
      )}
      {showAddProduct && (
        <LayoutModule handleToggle={handleCloseAdd} className="layout-module">
          <AddProduct onSubmit={handleAddProduct} />
        </LayoutModule>
      )}
      {showEditProduct && (
        <LayoutModule handleToggle={handleCloseEdit} className="layout-module">
          <EditStock onSubmit={handleEditSubmit} editableData={dataToEdit} />
        </LayoutModule>
      )}
    </div>
  );
};

export default AllocatedList;
