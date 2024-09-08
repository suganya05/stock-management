import React, { useEffect, useRef, useState } from "react";
import OutletList from "../../OutletList";
import "./AddOutletList.scss";
import { IOutlet } from "../../../types/types";
import OutletData from "../../OutletData";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import ShareImg from "../../../assets/icons/share-2.svg";
import PlusIcon from "../../../assets/icons/plus.png";
import RightArrow from "../../../assets/icons/right.svg";
import ImgOne from "../../../assets/images/img-3.png";
import Button from "../../Button";
import LayoutModule from "../../LayoutModal";
import AddOutletModal from "../../ModalComponents/AddOutlet";
import SharingQRCodeViaEmail from "../../ModalComponents/SharingQRcodeViaEmail";
import PreviewChangesModal from "../../ModalComponents/PreviewChangesModal";
import useAuthStore from "../../../context/userStore";
import { User } from "firebase/auth";
import SampleCsv from "../../ModalComponents/SampleCSV";
import OutletEditor from "../../OutletEditor";
import useProductStore from "../../../context/productStore";
import useOutletStore from "../../../context/outletStore";

const CSVColumns = [
  "Outlet Name",
  "Owner Name",
  "Phone number",
  "Address",
  "Email",
];

const AddOutletList: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedOutlet, setSelectedOutlet] = useState<Partial<IOutlet>>();
  const [addOutlet, setAddOutlet] = useState(false);
  const [sharingActive, setSharingActive] = useState(false);
  const [outletError, setOutletError] = useState<string>();
  const [showSampleCsv, setShowSampleCsv] = useState(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const showFileRef = useRef<HTMLInputElement | null>(null);
  const { createOutlet, updateOutlet, removeOutlet, uploadCSV, outlets } =
    useOutletStore();

  useEffect(() => {
    console.log("outlets", outlets);
  }, [outlets]);

  const handleCloseOutlet = () => {
    setAddOutlet(false);
  };
  const handleOpenOutlet = () => {
    setAddOutlet(true);
  };

  const handleOpenSharing = () => {
    setSharingActive(true);
  };
  const handleCloseSharing = () => {
    setSharingActive(false);
  };

  const handleCSVUploadOpen = () => {
    setShowSampleCsv(true);
  };
  const handleCSVUploadClose = () => {
    setShowSampleCsv(false);
  };

  const handleEditorOpen = () => {
    setShowEditor(true);
  };
  const handleEditorClose = () => {
    setShowEditor(false);
  };

  const handleCreateOutlet = async (outletData: IOutlet) => {
    try {
      createOutlet(user, outletData);
      setAddOutlet(false);
    } catch (error) {
      // handle error
    }
  };

  const handleDeleteOutlet = async () => {
    try {
      if (selectedOutlet?._id) {
        removeOutlet(user, selectedOutlet?._id);
        setSelectedOutlet(undefined);
      }
    } catch (error) {
      // handle error
    }
  };

  const handleSelectOutlet = (outlet: Partial<IOutlet>) => {
    setSelectedOutlet(outlet);
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadCSV(user, file);
      setShowSampleCsv(false);
    }
  };

  const handleUpdateOutlet = async (data: Partial<IOutlet>) => {
    if (selectedOutlet?._id) {
      const upOutlet = await updateOutlet(user, selectedOutlet._id, data);
      setShowEditor(false);
      // const id = selectedOutlet._id;
      setSelectedOutlet(upOutlet);
    }
  };

  return (
    <div className="add-outlet-list-wrapper">
      <div className="outlet-list-wrapper">
        <div className="outlet-list-head">
          <h4>Outlet List</h4>
          <div className="search-and-share">
            <div className="search-input">
              <SearchIcon />
              <input type="search" placeholder="Search" />
            </div>
            <div className="share-box" onClick={handleOpenSharing}>
              <img src={ShareImg} alt="" />
            </div>
            {sharingActive && (
              <LayoutModule
                handleToggle={handleCloseSharing}
                className="layout-module"
              >
                <SharingQRCodeViaEmail />
              </LayoutModule>
            )}
            {showEditor && selectedOutlet && (
              <LayoutModule
                handleToggle={handleEditorClose}
                className="layout-module"
              >
                <OutletEditor
                  onSubmit={(values) => handleUpdateOutlet(values)}
                  selectedOutlet={selectedOutlet}
                />
              </LayoutModule>
            )}
            {showSampleCsv && (
              <LayoutModule
                handleToggle={handleCSVUploadClose}
                className="layout-module"
              >
                <SampleCsv
                  onPickFile={() => {
                    if (showFileRef.current) {
                      showFileRef.current.click();
                    }
                  }}
                  columns={CSVColumns}
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
        </div>
        <div className="outlet-list-container">
          {outlets.length >= 1 ? (
            outlets.map((outlet) => (
              <div
                key={outlet._id}
                className={`outlet-list-content ${
                  selectedOutlet?._id === outlet._id ? "selected" : ""
                }`}
                onClick={() => handleSelectOutlet(outlet)}
              >
                <div className="flex-item">
                  <img src={outlet.photoUrl} alt="" />
                  <h3>{outlet.outletName}</h3>
                </div>
                <div className="icons">
                  <div className="right-icon">
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="not-selected">Start adding outlets</div>
          )}
        </div>
        <div className="btns">
          <Button
            varient="secondary"
            leftIcon={<img src={PlusIcon} alt="plus" />}
            onClick={handleCSVUploadOpen}
          >
            Upload CSV
          </Button>
          <Button varient="primary" onClick={handleOpenOutlet}>
            Add Outlet
          </Button>
          {addOutlet && (
            <LayoutModule
              handleToggle={handleCloseOutlet}
              className="layout-module"
            >
              <AddOutletModal
                onSubmit={(data) => handleCreateOutlet(data)}
                onClose={handleCloseOutlet}
                error={outletError}
              />
            </LayoutModule>
          )}
        </div>
      </div>
      <OutletData
        data={outlets}
        selelectedOutlet={selectedOutlet}
        onDelete={() => {
          handleDeleteOutlet();
        }}
        onEdit={handleEditorOpen}
      />
    </div>
  );
};

export default AddOutletList;
