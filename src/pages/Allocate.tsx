import React, { useEffect, useState } from "react";
import PlusIcon from "../assets/icons/plus.png";
import ProfileImg from "../assets/images/profile-img.jpg";
import RightArrow from "../assets/icons/right.svg";
import Layout from "../components/Layout";
import Button from "../components/Button";
import "../styles/Allocate.scss";
import AllocatedList from "../components/Allocatedlist";
import useAuthStore from "../context/userStore";
import { ISalesPerson } from "../types/types";
import { getSalesPersons } from "../components/AddStock/AddSalesperson/AddSalesPerson";

const Allocate: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [salesReps, setSalesReps] = useState<ISalesPerson[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadSalesReps(page, limit);
  }, [page]);

  const loadSalesReps = async (page: number, limit: number) => {
    try {
      const reps = await getSalesPersons(user, page, limit);
      setSalesReps((prev) => [...prev, ...reps["salesPerson"]]);
      if (parseInt(reps["total"]) > salesReps.length) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      console.log(reps["salesPerson"]);
    } catch (error) {
      // handle error
    }
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
          >
            Use Previous allocation
          </Button>
          <Button varient="primary">Upload CSV file</Button>
        </div>
      </div>
      <div className="allocate-container">
        <div className="allocate-wrapper">
          <div className="add-sales-person-container">
            {salesReps.map((d, i) => (
              <div key={i.toString()} className="add-sales">
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
          <div className="confirm-stock-list-btn">
            <Button
              varient="primary"
              rightIcon={<img src={RightArrow} alt="plus" />}
            >
              Confirm Stock List
            </Button>
          </div>
        </div>
        <AllocatedList />
      </div>
    </Layout>
  );
};

export default Allocate;
