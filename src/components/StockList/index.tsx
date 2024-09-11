import React, { useState } from "react";
import ImgOne from "../../assets/images/img-1.jpg";
import ImgTwo from "../../assets/images/img-2.png";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.png";
import "./StockList.scss";
import { Modal } from "../Modal";

const data = [
  // Your stock data remains the same
  {
    img: ImgOne,
    name: "Nandini Milk 1 Litre",
    downCount: 45,
    topCount: 53,
    count: 300,
    litre: "litre",
  },
  // More stock data...
];

const StockList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState<string>(""); // For selected date display
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [isModalOpen, setModalState] = useState(false);

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
      <div className="data-content">
        {data.map((f, index) => (
          <div className="box" key={index}>
            <div className="flex-box">
              <div className="img">
                <img src={f.img} alt={f.name} />
              </div>
              <div className="para">
                <h5>{f.name}</h5>
              </div>
            </div>
            <div className="add-delete-content">
              <div className="litre">
                <p>
                  {f.count} <span>{f.litre}</span>
                </p>
              </div>
              <div className="edit-icon" onClick={toggleModal}>
                <img src={EditIcon} alt="Edit" />
              </div>
              <div className="delete-icon" onClick={toggleModal}>
                <img src={DeleteIcon} alt="Delete" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="clear">
        <p>Clear All</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
    </div>
  );
};

export default StockList;
