import React from "react";
import EditIcon from "../../assets/icons/edit.svg";
import ImgOne from "../../assets/images/img-1.jpg";
import "./StockAssigned.scss";
import useStockStore from "../../context/stockStore";
import { useNavigate } from "react-router-dom";

const StockAssigned: React.FC = () => {
  const { stocks } = useStockStore();
  const navigate = useNavigate();
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

  const handleEditStockClick = () => {
    navigate("/inventory");
  };
  return (
    <div className="stock-assigned-wrapper">
      <div className="stock-assigned-head">
        <h4>Stock Assigned</h4>
        <div>
          <img src={EditIcon} alt="" onClick={handleEditStockClick} />
        </div>
      </div>
      <div className="stock-assigned-container">
        {stocks.stocks ? (
          stocks.stocks.map((f, index) => {
            return (
              <div key={index} className="stock-assigned-content">
                <div className="content">
                  <img src={f.productId.photoUrl} alt="" />
                  <h3>{f.productId.name}</h3>
                </div>
                <div className="text">
                  <h4>{f.quantity}</h4>
                  <p>{getUnit(f.productId.unit)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="center">Stocks not assigned yet</div>
        )}
      </div>
    </div>
  );
};

export default StockAssigned;
