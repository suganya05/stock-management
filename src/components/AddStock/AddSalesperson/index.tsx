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
import SalesPersonEditor from "../../SalesPersonEdit";
import useSalesRepStore from "../../../context/salesRepStore";

const AddSalesperson: React.FC = () => {
  const [showAddRep, setShowRep] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [addRepErr, setAddRepErr] = useState<string>();
  const [selectedRep, setSelectedRep] = useState<Partial<ISalesPerson>>();
  const [showEditor, setShowEditor] = useState(false);
  const [editorErr, setEditorErr] = useState<string>();
  const { salesReps, createSalesRep, updateSalesRep, removeSalesRep } =
    useSalesRepStore();

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

  const handleCreateRep = async (data: ISalesPerson) => {
    try {
      await createSalesRep(user, data);
      setShowRep(false);
      setAddRepErr(undefined);
    } catch (error) {
      setAddRepErr("Error occured while creating salesperson");
    }
  };

  const deleteSalesReps = async () => {
    try {
      if (selectedRep && selectedRep._id) {
        removeSalesRep(user, selectedRep?._id);
        setSelectedRep(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRep = async (updatedRepData: Partial<ISalesPerson>) => {
    try {
      if (selectedRep && selectedRep._id) {
        const newData = await updateSalesRep(
          user,
          selectedRep?._id,
          updatedRepData
        );
        console.log(newData.salesRep);
        setSelectedRep(newData.salesRep);
        setShowEditor(false);
      }
    } catch (error) {
      // handle error
    }
  };

  const handleSelectRep = (data: Partial<ISalesPerson> | undefined) => {
    setSelectedRep(data);
  };

  const handleToggleActive = async () => {
    // update
  };

  useEffect(() => {
    console.log("sales reps", salesReps);
  }, []);

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
