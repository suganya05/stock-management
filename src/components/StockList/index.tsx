import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import "./StockList.scss";
import { Modal } from "../Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStockStore from "../../context/stockStore";
import {
  IGetStock,
  IGetStockItem,
  IProduct,
  IStock,
  IStockItem,
} from "../../types/types";
import useAuthStore from "../../context/userStore";
import EditStock from "../ModalComponents/EditStock";
import LayoutModule from "../LayoutModal";

interface StockListProps {
  date: Date | undefined;
  onChange: (newDate: Date) => void;
  onDelete: (productId: string) => void;
  onEdit: (updatedStock: IStockItem) => void;
}

const StockList: React.FC<StockListProps> = ({
  date,
  onChange,
  onDelete,
  onEdit,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const { stocks, clearAllStock } = useStockStore();
  const [editData, setEditData] = useState<{
    quantity: number;
    unit: string;
  }>();
  const [selectedId, setSelectedId] = useState<string>();
  const { user } = useAuthStore();

  const fetchData = async () => {
    // const data = await getStockForDay(user, date);
    // setStock(data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [date]);

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) onChange(newDate);
  };

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

  const handleDelete = (id: string) => {
    onDelete(id);
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
      unit: getUnit(data.productId.unit),
    });
    setSelectedId(data.productId._id);
    setShowEdit(true);
  };

  const deleteAll = () => {
    clearAllStock(user);
  };

  return (
    <div className="stockList-wrapper">
      <div className="stock-list-content">
        <div className="stock-head">
          <h4>Stock List</h4>
        </div>
        <DatePicker
          selected={date}
          onChange={(date) => handleDateChange(date)}
          dateFormat="dd-MM-yyyy"
          className="month-picker"
          placeholderText="Select Month"
        />
      </div>
      <div className="data-content">
        {stocks && stocks.stocks && stocks.stocks.length > 0 ? (
          stocks.stocks.map((item, i) => {
            // console.log("this is the item", item);
            return (
              <div className="box" key={i}>
                <div className="flex-box">
                  <div className="img">
                    <img
                      src={item.productId.photoUrl}
                      alt={item.productId.name}
                    />
                  </div>
                  <div className="para">
                    <h5>{item.productId.name}</h5>
                  </div>
                </div>
                <div className="add-delete-content">
                  <div className="litre">
                    <p>
                      {item.quantity}
                      <span>{getUnit(item.productId.unit)}</span>
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
                    onClick={() => handleDelete(item.productId._id)}
                  >
                    <img src={DeleteIcon} alt="Delete" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No products found</div>
        )}
      </div>
      <div className="clear" onClick={deleteAll}>
        <p>Clear All</p>
      </div>
      {showEdit && (
        <LayoutModule handleToggle={handleEditClose}>
          <EditStock editableData={editData} onSubmit={handleEdit} />
        </LayoutModule>
      )}
    </div>
  );
};

export default StockList;
