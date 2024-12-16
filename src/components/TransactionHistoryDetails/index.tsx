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
import * as Yup from "yup";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";

const validationSchema = Yup.object({
  startDate: Yup.date().required("Start date is required").nullable(),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("startDate"), "End date must be after start date"),
});

const initialValue = {
  startDate: new Date(),
  endDate: new Date(),
};

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const toggleModal = () => setModalState(!isModalOpen);

  const handleGoBack = () => {
    navigate(-1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set up title
    doc.setFontSize(18);
    doc.text("Transaction History", 14, 20);

    // Set up table header
    doc.setFontSize(12);
    doc.text("Date", 14, 30);
    doc.text("Status", 50, 30);
    doc.text("Executed By", 100, 30);
    doc.text("Order Amount", 150, 30);

    let yPosition = 40; // Starting Y position for table rows
    trasacs.forEach((t) => {
      doc.text(new Date(t.salesDate).toDateString(), 14, yPosition);
      doc.text(t.paymentStatus || "", 50, yPosition);
      doc.text(t.soldBy.name, 100, yPosition);
      doc.text(t.totalAmount.toString(), 150, yPosition);
      yPosition += 10; // Increment Y position for next row
    });

    doc.save("transaction-history.pdf");
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
        const res = await getTransactionHistory(
          user,
          companyId,
          page,
          limit,
          formik.values.startDate,
          formik.values.endDate
        );
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

  const handleCalendarClose = () => {
    // Blur the focused element when the calendar closes
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleFetch = (values: any) => {};

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: handleFetch,
  });

  const handleStartDateChange = (date: Date | null) => {
    formik.setFieldValue("startDate", date);
  };

  const handleEndDateChange = (date: Date | null) => {
    formik.setFieldValue("endDate", date);
  };

  useEffect(() => {
    fetchTransactions(transacPage);
  }, [transacPage]);

  useEffect(() => {
    setTransacs([]);
    fetchTransactions(transacPage);
  }, [formik.values]);

  return (
    <Layout className="transaction-history">
      <div className="transaction-history-details">
        <div className="head">
          <img src={LeftArrow} alt="" onClick={handleGoBack} />
          <div className="img">
            <img src={selectedOutlet?.photoUrl} alt="Oulet" />
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
              <DatePicker
                selected={formik.values.startDate}
                onChange={handleStartDateChange}
                placeholderText="Start Date"
                dateFormat="dd/MM/yyyy"
                className="custom-date-picker"
                onCalendarClose={handleCalendarClose}
                name="startDate"
              />
              <DatePicker
                selected={formik.values.endDate}
                onChange={handleEndDateChange}
                placeholderText="End Month"
                dateFormat="dd/MM/yyyy"
                className="custom-date-picker"
                name="endDate"
              />
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
