import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrow from "../../assets/icons/arrow-left.png";
import DownloadIcon from "../../assets/icons/download.svg";
import ShareImg from "../../assets/icons/share-2.svg";
import ImgOne from "../../assets/images/img-3.png";
import ImgThree from "../../assets/images/img-3.png";
import Rupee from "../../assets/icons/Rupee.png";
import Edit from "../../assets/icons/edit.svg";
import "./TransactionHistoryDetails.scss";
import Layout from "../Layout";
import { Modal } from "../Modal";
import { INewStockItem, IOutlet, ISales } from "../../types/types";
import { getTransactionHistory } from "../CompanyDetails/CompanyDetailsUtils";
import useAuthStore from "../../context/userStore";
import { isValidObjectId } from "../../helpers/objectIdTester";
import useOutletStore from "../../context/outletStore";

const TransactionHistoryDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalState] = useState(false);
  const { companyId } = useParams<{ companyId: string }>();
  const { user } = useAuthStore();
  const limit = 10;
  const { outlets } = useOutletStore();
  const [selectedOutlet, setSelectedOutlet] = useState<Partial<IOutlet>>();

  const transactionHist = useRef<HTMLDivElement>(null);
  const [transacPage, setTransacPage] = useState(1);
  const [trasacLoading, setTransacLoading] = useState(false);
  const [trasacs, setTransacs] = useState<ISales[]>([]);
  const [transacProds, setTransacProds] = useState<INewStockItem[]>([]);

  const toggleModal = () => setModalState(!isModalOpen);

  const handleGoBack = () => {
    navigate(-1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("sample.pdf");
  };

  useEffect(() => {
    if (companyId) {
      if (isValidObjectId(companyId)) {
        const selected = outlets.find((f) => {
          return f._id === companyId;
        });
        if (selected) {
          setSelectedOutlet(selected);
        }
      }
    }
  }, [companyId, outlets]);

  const fetchTransactions = async (page: number) => {
    try {
      if (companyId) {
        setTransacLoading(true);
        const res = await getTransactionHistory(user, companyId, page, limit);
        console.log("fetching transactions", res.data);
        setTransacs((prev) => [...prev, ...res.data.transactions]);
        setTransacLoading(false);
      }
    } catch (error) {
      console.log("Error occured transac", error);
    }
  };

  useEffect(() => {
    fetchTransactions(transacPage);
  }, [transacPage]);

  const handleTrasacScroll = () => {
    if (transactionHist.current) {
      const { scrollTop, clientHeight, scrollHeight } = transactionHist.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !trasacLoading) {
        setTransacPage((prevPage) => prevPage + 1);
        console.log("unpaid", scrollTop + clientHeight >= scrollHeight);
      }
    }
  };

  useEffect(() => {
    const container = transactionHist.current;
    if (container) {
      container.addEventListener("scroll", handleTrasacScroll);
      return () => container.removeEventListener("scroll", handleTrasacScroll);
    }
  }, []);

  return (
    <Layout className="transaction-history">
      <div className="transaction-history-details">
        <div className="head" onClick={handleGoBack}>
          <img src={LeftArrow} alt="" />
          <div className="img">
            <img src={selectedOutlet?.photoUrl} alt="" />
          </div>
          <div className="title">
            <h3>{selectedOutlet?.outletName}</h3>
            <p>{selectedOutlet?.address}</p>
          </div>
        </div>
        <div className="transaction">
          <div className="transaction-head">
            <h4>Transaction History</h4>
            <div className="icons">
              <div className="img" onClick={generatePDF}>
                <img src={DownloadIcon} alt="" />
              </div>
              <div className="img">
                <img src={ShareImg} alt="" />
              </div>
            </div>
          </div>
          <div className="table-wrapper" ref={transactionHist}>
            <table>
              <thead>
                <tr>
                  {/* <th>
                    <span>Product</span>
                  </th> */}
                  <th>
                    <span>Date</span>
                  </th>
                  <th>
                    <span>Status</span>
                  </th>
                  <th>
                    <span>Executed By</span>
                  </th>
                  <th>
                    <span>Order Amount</span>
                  </th>
                  {/* <th>
                    <span>Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {trasacs.map((t, i) => (
                  <tr key={i.toString()} style={{ cursor: "pointer" }}>
                    {/* <td>
                      <div className="flex-item">
                        <div className="img-box">
                          <img src={ImgThree} alt="" />
                        </div>
                        <span title="vasanth Bavan">{t.}</span>
                      </div>
                    </td> */}
                    <td className="date">
                      <span>{new Date(t.salesDate).toDateString()}</span>
                    </td>
                    <td>
                      <div className="status">
                        <div className="box"></div>
                        <h5>{t.paymentStatus}</h5>
                      </div>
                    </td>
                    <td className="date">
                      <span>{t.soldBy.name}</span>
                    </td>
                    <td>
                      <div className="rupee-img">
                        <img src={Rupee} alt="" />
                        <span>{t.totalAmount}</span>
                      </div>
                    </td>
                    {/* <td className="edit-img" onClick={toggleModal}>
                      <img src={Edit} alt="" />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
      </div>
    </Layout>
  );
};

export default TransactionHistoryDetails;
