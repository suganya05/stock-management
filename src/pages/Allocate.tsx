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
import useProductStore from "../context/productStore";

const columns = ["Sales Person Id", "Product Id", "Quantity"];

const Allocate: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedRepId, setSeletedRepId] = useState<string>();
  const { fetchStocks } = useStockStore();
  const { salesReps } = useSalesRepStore();
  const { uploadCSV, fetchAllocations, allocations } = useAllocationsStore();
  const [showCsv, setShowCsv] = useState(false);
  const showFileRef = useRef<HTMLInputElement | null>(null);
  const [sampleData, setSampleData] = useState<any[]>([]);
  const { products } = useProductStore();

  const handleRepClick = (id: string | undefined) => {
    setSeletedRepId(id);
  };

  const handleShowCsv = () => {
    handleFetchSampleData();
    setShowCsv(true);
  };
  const handleCloseCsv = () => {
    setSampleData([]);
    setShowCsv(false);
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadCSV(user, file);
      console.log("upolded csv");
      await fetchStocks(user);
      handleCloseCsv();
    }
  };

  const handleFetchSampleData = () => {
    for (const salesPerson of salesReps) {
      for (const product of products) {
        setSampleData((prev) => [
          ...prev,
          {
            "Sales Person Id": salesPerson._id,
            "Sales Person Name": salesPerson.name,
            "Product Id": product._id,
            "Product Name": product.name,
            Quantity: 0,
          },
        ]);
      }
    }
  };

  return (
    <Layout className="allocate">
      <div className="allocate-head">
        <div className="heading">
          <h4>Delivery Person(s)</h4>
        </div>
        <div className="btn">
          <Button varient="primary" onClick={handleShowCsv}>
            Upload CSV file
          </Button>
        </div>
      </div>
      <div className="allocate-container">
        <div className="allocate-wrapper">
          <div className="add-sales-person-container">
            {salesReps && salesReps.length > 0 ? (
              salesReps.map((d, i) => (
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
                        <div className="allocate">Active</div>
                      ) : (
                        <div className="deactivate">Deactive</div>
                      )}
                    </p>
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No Sales Rep yet added</div>
            )}
          </div>
        </div>
        <AllocatedList selectedRepId={selectedRepId} />
        {showCsv && (
          <LayoutModule handleToggle={handleCloseCsv}>
            <SampleCsv
              columns={columns}
              onPickFile={() => {
                if (showFileRef.current) {
                  showFileRef.current.click();
                }
              }}
              onSampleDownload={sampleData}
              sampleFileName="AllocationList"
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
