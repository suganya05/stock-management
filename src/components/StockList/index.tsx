import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import "./StockList.scss";
import { Modal } from "../Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStockStore from "../../context/stockStore";
import { IGetStockItem, IProduct, IStock, IStockItem } from "../../types/types";
import useAuthStore from "../../context/userStore";
import EditStock from "../ModalComponents/EditStock";
import LayoutModule from "../LayoutModal";
import { getUnit } from "../../utils/unit";

interface StockListProps {
  onDelete: (productId: string) => void;
  onEdit: (updatedStock: IStockItem) => void;
}

const StockList: React.FC<StockListProps> = ({ onDelete, onEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const { stocks, clearAllStock } = useStockStore();
  const [editData, setEditData] = useState<{
    quantity: number;
    unit: string;
  }>();
  const [selectedId, setSelectedId] = useState<string>();
  const { user } = useAuthStore();

  const handleDelete = (id?: string) => {
    id && onDelete(id);
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  const handleEdit = (values: { quantity: number }) => {
    if (selectedId) {
      onEdit({
        productId: selectedId,
        quantity: values.quantity,
      });
      setShowEdit(false);
    }
  };

  const handleModelOpen = (data: IGetStockItem) => {
    setEditData({
      quantity: data.quantity,
      unit: getUnit(data?.product?.unit),
    });
    setSelectedId(data?.product?._id);
    setShowEdit(true);
  };

  const deleteAll = () => {
    clearAllStock(user);
  };

  console.log("stcoks changesd", stocks);

  return (
    <div className="stockList-wrapper">
      <div className="stock-list-content">
        <div className="stock-head">
          <h4>Stock List</h4>
        </div>
      </div>
      <div className="data-content">
        {stocks && stocks.length > 0 ? (
          stocks.map((item, i) => {
            return (
              <div className="box" key={i}>
                <div className="flex-box">
                  <div className="img">
                    <img
                      src={item?.product?.photoUrl}
                      alt={item?.product?.name}
                    />
                  </div>
                  <div className="para">
                    <h5>{item?.product?.name}</h5>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div className="litre">
                    <p>
                      {item?.quantity}
                      <span>{getUnit(item?.product?.unit)}</span>
                    </p>
                  </div>
                  <div
                    className="edit-icon"
                    onClick={() => handleModelOpen(item)}
                  >
                    <img src={EditIcon} alt="Edit" />
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => handleDelete(item?.product?._id)}
                  >
                    <img src={DeleteIcon} alt="Delete" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="center">No products found</div>
        )}
      </div>
      {stocks && stocks.length > 0 && (
        <div className="clear" onClick={deleteAll}>
          <p>Clear All</p>
        </div>
      )}
      {showEdit && (
        <LayoutModule handleToggle={handleEditClose}>
          <EditStock editableData={editData} onSubmit={handleEdit} />
        </LayoutModule>
      )}
    </div>
  );
};

export default StockList;
