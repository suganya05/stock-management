import React, { useEffect, useState } from "react";
import "./BalanceSheet.scss";
import useAuthStore from "../../../context/userStore";
import { getBalanceSheet, getTopSelling } from "./BalanceSheetUtils";

const BalanceSheet: React.FC = () => {
  const { user } = useAuthStore();
  const [balanceSheet, setBalanceSheet] = useState<any[]>([]);

  const fetchBalanceSheet = async () => {
    try {
      const balanceSheet = await getBalanceSheet(user);
      console.log("top selling prods", balanceSheet.data);
      setBalanceSheet(balanceSheet.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  return (
    <div className="topSales-wrapper">
      <div className="topSales-head">
        <h4>Balance Sheet</h4>
      </div>
      <div className="topSales-container-box"></div>
    </div>
  );
};

export default BalanceSheet;
