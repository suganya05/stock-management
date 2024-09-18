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

interface IAllocateList {
  selectedRepId: string | undefined;
  date: Date | undefined;
  onDateChange: (date: Date) => void;
}

interface IEditData {
  productId: string;
  quantity: number;
  unit: string;
}

const AllocatedList: React.FC<IAllocateList> = ({
  selectedRepId,
  date,
  onDateChange,
}) => {
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

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) onDateChange(newDate);
  };

  const handleAddProduct = async (values: IStockItem) => {
    if (!selectedRepId) {
      return;
    }
    if (!date) {
      console.log("date not set");
      return;
    }
    await createAllocations(user, {
      allotedDate: date,
      allocations: [
        {
          salesPersonId: selectedRepId,
          //@ts-ignore
          allocatedItems: [values],
        },
      ],
    });
    await fetchStocks(user);
    handleCloseAdd();
  };

  useEffect(() => {
    if (allocations) {
      console.log("alocation found");
      const data = allocations.allocations?.find(
        (f) => f.salesPersonId === selectedRepId
      );
      if (data) {
        console.log("data found");
        setProducts(data.allocatedItems as IGetStockItem[]);
      } else {
        setProducts(undefined);
      }
    }
  }, [selectedRepId, allocations]);

  useEffect(() => {
    setProducts(undefined);
  }, [date]);

  const units = {
    lt: "Litre",
    ml: "Milli Litre",
    kgs: "Kilo",
    gms: "Gram",
    nos: "No(s)",
    dozens: "Dozens",
  };

  const getUnit = (unit: any) => {
    //@ts-ignore
    return units[unit] ? units[unit] : "Unit";
  };

  const handleDelete = async (productId: string) => {
    if (allocations) {
      const data = allocations.allocations?.find(
        (f) => f.salesPersonId === selectedRepId
      );
      if (data?._id && selectedRepId) {
        removeAllocations(user, data?._id, productId, selectedRepId);
      }
    }
  };

  const handleEditSubmit = async (updatedValue: { quantity: number }) => {
    console.log(updatedValue);
    if (!dataToEdit || !dataToEdit.productId || !date) {
      return;
    }
    updateAllocation(user, {
      allotedDate: date,
      allocations: [
        {
          salesPersonId: selectedRepId,
          allocatedItems: [
            {
              //@ts-ignore
              productId: dataToEdit?.productId,
              quantity: updatedValue.quantity,
            },
          ],
        },
      ],
    });
    handleCloseEdit();
  };

  const handleEditbtn = (dataToEdit: IEditData) => {
    setDataToEdit(dataToEdit);
    handleOpenEdit();
  };

  return (
    <div className="allocated-list-wrapper">
      <div className="allocated-list-head">
        <h4>Allocated list</h4>
        <div className="drop-down-list">
          <DatePicker
            selected={date}
            onChange={(date) => handleDateChange(date)}
            dateFormat="dd-MM-yyyy"
            className="month-picker"
            placeholderText="Select Month"
          />
        </div>
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
                    <img src={f.productId.photoUrl} alt="" />
                  </div>
                  <div className="para">
                    <h5>{f.productId.name}</h5>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div className="litre">
                    <p>
                      {f.quantity} <span>{getUnit(f.productId.unit)}</span>
                    </p>
                  </div>
                  <div
                    className="edit-icon"
                    onClick={() =>
                      handleEditbtn({
                        productId: f.productId._id,
                        quantity: f.quantity,
                        unit: getUnit(f.productId.unit),
                      })
                    }
                  >
                    <img src={EditIcon} alt="" />
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => handleDelete(f.productId._id)}
                  >
                    <img src={DeleteIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        ) : products && products.length === 0 ? (
          <div>No data found</div>
        ) : (
          <div className="centered">Not yet allocated</div>
        )}
      </div>
      {/* {selectedRepId && (
        <div className="clear">
          <p>Clear all</p>
        </div>
      )} */}
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
