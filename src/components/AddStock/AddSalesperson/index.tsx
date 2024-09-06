import React, { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import ProfileImg from "../../../assets/images/profile-img.jpg";
import RightArrow from "../../../assets/icons/right.svg";
import ProfilePhoto from "../../../assets/images/profile-photo.png";
import DeleteIcon from "../../../assets/images/delete.svg";
import EditIcon from "../../../assets/images/edit.png";
import "./AddSalesperson.scss";
import Button from "../../Button";
import LayoutModule from "../../LayoutModal";
import AddSalesRepresentative from "../../ModalComponents/AddSalesRepresentative";
import { ISalesPerson } from "../../../types/types";
import useAuthStore from "../../../context/userStore";
import {
  createSalesPersons,
  deleteSalesPerson,
  getSalesPersons,
  toggleSalesPerson,
  updateSalesPerson,
} from "./AddSalesPerson";
import SalesPersonEditor from "../../SalesPersonEdit";

const AddSalesperson: React.FC = () => {
  const [showAddRep, setShowRep] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [salesReps, setSalesReps] = useState<ISalesPerson[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [addRepErr, setAddRepErr] = useState<string>();
  const [selectedRep, setSelectedRep] = useState<ISalesPerson>();
  const [showEditor, setShowEditor] = useState(false);
  const [editorErr, setEditorErr] = useState<string>();
  const limit = 10;

  useEffect(() => {
    loadSalesReps(page, limit);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  const handleCloseAdd = () => {
    setShowRep(false);
  };
  const handleOpenAdd = () => {
    setShowRep(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };
  const handleOpenEditor = () => {
    setShowEditor(true);
  };

  const resetReps = async () => {
    setSalesReps([]);
    if (page !== 1) {
      setPage(1);
      return;
    }
    loadSalesReps(1, 10);
  };

  const handleCreateRep = async (data: ISalesPerson) => {
    try {
      await createSalesPersons(user, data);
      handleCloseAdd();
      resetReps();
      setAddRepErr(undefined);
    } catch (error) {
      setAddRepErr("Error occured. Please try again");
    }
  };

  const loadSalesReps = async (page: number, limit: number) => {
    try {
      const reps = await getSalesPersons(user, page, limit);
      setSalesReps((prev) => [...prev, ...reps["salesPerson"]]);
      if (parseInt(reps["total"]) > salesReps.length) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      console.log(reps);
    } catch (error) {
      // handle error
    }
  };

  const deleteSalesReps = async () => {
    try {
      if (selectedRep?._id) {
        await deleteSalesPerson(user, selectedRep._id);
        setSalesReps((prev) => prev.filter((f) => f._id !== selectedRep._id));
        setSelectedRep(undefined);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRep = async (updatedRepData: ISalesPerson) => {
    try {
      if (selectedRep?._id) {
        await updateSalesPerson(user, selectedRep?._id, updatedRepData);
        resetReps();
        setShowEditor(false);
      }
    } catch (error) {
      setEditorErr("Error occured");
    }
  };

  const handleSelectRep = (data: ISalesPerson | undefined) => {
    setSelectedRep(data);
  };

  const handleToggleActive = async () => {
    try {
      if (selectedRep && selectedRep._id) {
        const updateActiveState = !selectedRep.isActive;
        await toggleSalesPerson(user, selectedRep._id, updateActiveState);
        setSelectedRep((prev) =>
          prev ? { ...prev, isActive: updateActiveState } : prev
        );

        setSalesReps((prevReps) =>
          prevReps.map((rep) =>
            rep._id === selectedRep._id
              ? { ...rep, isActive: updateActiveState }
              : rep
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-sales-person-wrapper">
      <div className="add-sales-person-content">
        <div className="add-sales-person-head">
          <h4>Delivery Person</h4>
          <div className="search-input">
            <SearchIcon />
            <input type="search" placeholder="Search" />
          </div>
        </div>
        <div className="add-sales-person-container">
          {salesReps.map((f) => (
            <div
              key={f._id}
              className={`add-sales ${
                selectedRep?._id === f._id ? "selected" : ""
              }`}
              onClick={() => handleSelectRep(f)}
            >
              <div className="profile-img">
                <img src={f.photoUrl} alt="" />
                <p>{f.name}</p>
              </div>
              <img src={RightArrow} alt="" />
            </div>
          ))}
        </div>
        <div className="add-btn">
          <Button varient="primary" onClick={handleOpenAdd}>
            Add
          </Button>
        </div>
        {showAddRep && (
          <LayoutModule handleToggle={handleCloseAdd} className="layout-module">
            <AddSalesRepresentative
              onSubmit={handleCreateRep}
              error={addRepErr}
            />
          </LayoutModule>
        )}
        {showEditor && selectedRep && (
          <LayoutModule
            handleToggle={handleCloseEditor}
            className="layout-module"
          >
            <SalesPersonEditor
              onSubmit={handleUpdateRep}
              error={editorErr}
              selectedSalesPerson={selectedRep}
            />
          </LayoutModule>
        )}
      </div>
      {selectedRep ? (
        <div className="salesperson-details-wrapper">
          <div className="salesperson-details-head">
            <h4>Salesperson details</h4>
            <h3 onClick={handleOpenEditor}>Edit</h3>
          </div>
          <div className="profile-wrapper">
            <div className="profile-img">
              <div className="img">
                <img src={selectedRep.photoUrl} alt="" />
              </div>
              {/* <div className="edit-icon">
                <img src={EditIcon} alt="" />
              </div> */}
            </div>
            <div className="details-container">
              <div>
                <div className="text">
                  <p>Name</p>
                  <p>:</p>
                </div>
                <div className="text">
                  <p>Email</p>
                  <p>:</p>
                </div>
                <div className="text">
                  <p>Phone number</p>
                  <p>:</p>
                </div>
                {/* <div className="text">
              <p>Last login</p>
              <p>:</p>
            </div> */}
                <div className="text">
                  <p>Status</p>
                  <p>:</p>
                </div>
              </div>
              <div className="ans">
                <p>{selectedRep?.name}</p>
                <p>{selectedRep?.email}</p>
                <p>{selectedRep?.phoneNumber}</p>
                {/* <p>{selectedRep.}</p> */}
                <div className={selectedRep.isActive ? "active" : "inactive"}>
                  <h3>{selectedRep?.isActive ? "Active" : "Inactive"}</h3>
                </div>
              </div>
            </div>
            <div className="btns">
              <div className="delete" onClick={deleteSalesReps}>
                <img src={DeleteIcon} alt="" />
                <p>Delete</p>
              </div>
              <Button varient="primary" onClick={handleToggleActive}>
                Make inactive
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="not-selected">Please select one Sales person</div>
      )}
    </div>
  );
};

export default AddSalesperson;
