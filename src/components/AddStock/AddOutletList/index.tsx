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
import {
  createOutlet,
  deleteOutlet,
  getAllOulets,
  parseAndUploadCSV,
} from "./Addoutlet";
import useAuthStore from "../../../context/userStore";
import { User } from "firebase/auth";
import SampleCsv from "../../ModalComponents/SampleCSV";

const CSVColumns = [
  "Outlet Name",
  "Owner Name",
  "Phone number",
  "Address",
  "Email",
];

const AddOutletList: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [outlets, setOutlets] = useState<IOutlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const [addOutlet, setAddOutlet] = useState(false);
  const [sharingActive, setSharingActive] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [outletError, setOutletError] = useState<string>();
  const [showSampleCsv, setShowSampleCsv] = useState(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const showFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadOutlets(page, 10);
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

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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

  const resetOutlets = async () => {
    setOutlets([]);
    setPage(1);
    setHasMore(true);

    try {
      const data = await getAllOulets(user, 1, 10);
      if (data.length < 10) {
        setHasMore(false);
      }
      setOutlets(data);
      if (data.length > 0) {
        setSelectedOutletId(data[0].id); // Select the first outlet by default
      }
    } catch (error) {
      console.error("Error resetting outlet list:", error);
    }
  };

  const loadOutlets = async (page: number, limit: number) => {
    try {
      console.log("loading");
      const data = await getAllOulets(user, page, limit);
      setOutlets(data);
      if (data.length > 0 && !selectedOutletId) {
        setSelectedOutletId(data[0].id); // Select the first outlet if none is selected
      }
    } catch (error) {
      console.error("Error loading outlets:", error);
    }
  };

  const handleCreateOutlet = async (outletData: IOutlet) => {
    try {
      await createOutlet(user, outletData);
      resetOutlets();
      handleCloseOutlet();
      setOutletError(undefined);
    } catch (error) {
      setOutletError(`Error occurred`);
    }
  };

  const handleDeleteOutlet = async () => {
    try {
      if (!selectedOutletId) return;
      const indexDeleted = outlets.findIndex(
        (outlet) => outlet._id === selectedOutletId
      );
      await deleteOutlet(user, selectedOutletId);
      setOutlets((preValue) => {
        return preValue.filter((f) => f._id !== selectedOutletId);
      });
      if (indexDeleted != 0) {
        const id = outlets[indexDeleted - 1]._id;
        if (id) {
          setSelectedOutletId(id);
        }
      } else {
        setSelectedOutletId(null);
      }
    } catch (error) {
      // handle error
    }
  };

  const handleSelectOutlet = (id: string | undefined) => {
    if (id) {
      setSelectedOutletId(id);
    }
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await parseAndUploadCSV(user, file);
      handleCSVUploadClose();
      resetOutlets();
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
            {showEditor && (
              <LayoutModule
                handleToggle={handleCloseSharing}
                className="layout-module"
              >
                <SharingQRCodeViaEmail />
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
                  selectedOutletId === outlet._id ? "selected" : ""
                }`}
                onClick={() => handleSelectOutlet(outlet._id)}
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
        selelectedId={selectedOutletId}
        onDelete={() => {
          handleDeleteOutlet();
        }}
      />
    </div>
  );
};

export default AddOutletList;
