import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import "./StockList.scss";
import { Modal } from "../Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStockStore from "../../context/stockStore";
import { IGetStock, IProduct, IStock, IStockItem } from "../../types/types";
import useAuthStore from "../../context/userStore";

interface StockListProps {
  date: Date;
  onChange: (newDate: Date) => void;
  onDelete: (productId: string) => void;
  onEdit: (id: string, updatedStock: IStockItem) => void;
}

const StockList: React.FC<StockListProps> = ({
  date,
  onChange,
  onDelete,
  onEdit,
}) => {
  const [isModalOpen, setModalState] = useState(false);
  const [todayStock, setStock] = useState<Partial<IGetStock>>();
  const { getStockForDay, stocks } = useStockStore();
  const { user } = useAuthStore();

  const fetchData = async () => {
    const data = await getStockForDay(user, date);
    setStock(data);
  };

  useEffect(() => {
    fetchData();
  }, [date, stocks]);

  const toggleModal = () => setModalState(!isModalOpen);

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
        {todayStock && todayStock.stocks ? (
          todayStock.stocks.map((item, i) => {
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
                  <div className="edit-icon" onClick={toggleModal}>
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
      <div className="clear">
        <p>Clear All</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal} title="Edit Stock">
        <div>
          <form>
            <input name="productId" />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StockList;
