import React, { useEffect, useRef, useState } from "react";
import PlusIcon from "../assets/icons/plus.png";
import ProfileImg from "../assets/images/profile-img.jpg";
import RightArrow from "../assets/icons/right.svg";
import Layout from "../components/Layout";
import Button from "../components/Button";
import "../styles/Allocate.scss";
import AllocatedList from "../components/Allocatedlist";
import useAuthStore from "../context/userStore";
import useSalesRepStore from "../context/salesRepStore";
import useAllocationsStore from "../context/allocationStore";
import useStockStore from "../context/stockStore";
import SampleCsv from "../components/ModalComponents/SampleCSV";
import LayoutModule from "../components/LayoutModal";

const columns = ["Sales Person Id", "Product Id", "Quantity"];

const Allocate: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedRepId, setSeletedRepId] = useState<string>();
  // const [date, setDate] = useState<Date>(new Date());
  const { date, setDate, fetchStocks } = useStockStore();
  const { salesReps } = useSalesRepStore();
  const { uploadCSV, fetchAllocations } = useAllocationsStore();
  const [showCsv, setShowCsv] = useState(false);
  const showFileRef = useRef<HTMLInputElement | null>(null);
  const { makeExistingStock } = useAllocationsStore();

  const handleDateChange = (date: Date) => {
    // setDate(user, date);
    setDate(user, date);
    fetchAllocations(user, date);
  };

  const handleRepClick = (id: string | undefined) => {
    setSeletedRepId(id);
  };

  const handleShowCsv = () => {
    setShowCsv(true);
  };
  const handleCloseCsv = () => {
    setShowCsv(false);
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && date) {
      await uploadCSV(user, file, date);
      console.log("upolded csv");
      await fetchStocks(user);
      handleCloseCsv();
    }
  };

  const handleUseExisitng = () => {
    makeExistingStock(user);
  };

  return (
    <Layout className="allocate">
      <div className="allocate-head">
        <div className="heading">
          <h4>Delivery Person(s)</h4>
        </div>
        <div className="btn">
          <Button
            varient="secondary"
            leftIcon={<img src={PlusIcon} alt="plus" />}
            onClick={handleUseExisitng}
          >
            Use Previous allocation
          </Button>
          <Button varient="primary" onClick={handleShowCsv}>
            Upload CSV file
          </Button>
        </div>
      </div>
      <div className="allocate-container">
        <div className="allocate-wrapper">
          <div className="add-sales-person-container">
            {salesReps.map((d, i) => (
              <div
                key={i.toString()}
                className={
                  d._id === selectedRepId ? "add-sales selected" : "add-sales"
                }
                onClick={() => handleRepClick(d._id)}
              >
                <div className="profile-img">
                  <img src={d.photoUrl} alt="" />
                  <p>{d.name}</p>
                </div>
                <div className="text">
                  <p>
                    {d.isActive ? (
                      <div className="allocate">Allocated</div>
                    ) : (
                      <div className="deactivate">Deactive</div>
                    )}
                  </p>
                  <img src={RightArrow} alt="" />
                </div>
              </div>
            ))}
          </div>
          {/* <div className="confirm-stock-list-btn">
            <Button
              varient="primary"
              rightIcon={<img src={RightArrow} alt="plus" />}
            >
              Confirm Stock List
            </Button>
          </div> */}
        </div>
        <AllocatedList
          selectedRepId={selectedRepId}
          date={date}
          onDateChange={handleDateChange}
        />
        {showCsv && (
          <LayoutModule handleToggle={handleCloseCsv}>
            <SampleCsv
              columns={columns}
              onPickFile={() => {
                if (showFileRef.current) {
                  showFileRef.current.click();
                }
              }}
            />
            <input
              type="file"
              ref={showFileRef}
              style={{ display: "none" }}
              onChange={handleCSVUpload}
              accept=".csv"
            />
          </LayoutModule>
        )}
      </div>
    </Layout>
  );
};

export default Allocate;
