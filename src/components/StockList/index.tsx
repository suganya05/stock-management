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
  const [isOpen, setIsOpen] = useState(false); // Toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState<string>(""); // For selected date display
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
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

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  // Handle day click to select a date
  const handleDayClick = (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selected.toLocaleDateString("en-US"));
    setIsOpen(false); // Close calendar on date selection
  };

  // Handle navigation to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Handle navigation to the next month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

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

  const renderDays = () => {
    const totalDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const days = [];
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div key={day} className="day" onClick={() => handleDayClick(day)}>
          {day}
        </div>
      );
    }
    return days;
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
        <div className="calendar-box">
          <input
            type="text"
            value={selectedDate ? selectedDate : "Select Date"}
            onClick={() => setIsOpen(!isOpen)}
            readOnly
          />
          {isOpen && (
            <div className="calendar">
              <div className="header">
                <button onClick={handlePrevMonth}>{"<"}</button>
                <h2>
                  {currentDate.toLocaleString("default", { month: "long" })}{" "}
                  {currentDate.getFullYear()}
                </h2>
                <button onClick={handleNextMonth}>{">"}</button>
              </div>
              <div className="days-grid">{renderDays()}</div>
            </div>
          )}
        </div>
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
