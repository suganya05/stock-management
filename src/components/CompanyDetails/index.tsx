import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import Layout from "../Layout";
import LeftArrow from "../../assets/icons/arrow-left.png";
import Briefcase from "../../assets/icons/briefcase.png";
import Rupee from "../../assets/icons/Rupee.png";
import ImgOne from "../../assets/images/img-3.png";
import ImgThree from "../../assets/images/img-3.png";
import ImgFour from "../../assets/images/img-4.png";
import DownloadIcon from "../../assets/icons/download.svg";
import ShareImg from "../../assets/icons/share-2.svg";
import { Modal } from "../Modal";
import "./CompanyDetails.scss";
import useOutletStore from "../../context/outletStore";
import { IOutlet } from "../../types/types";
import { isValidObjectId } from "../../helpers/objectIdTester";

const data = [
  {
    img: Briefcase,
    title: "Total Sales",
    rupee: Rupee,
    amount: "13,80,000",
  },
  {
    img: Briefcase,
    title: "Total Profit",
    rupee: Rupee,
    amount: "13,80,000",
  },
  {
    img: Briefcase,
    title: "Total Expense",
    rupee: Rupee,
    amount: "13,80,000",
  },
];

const CompanyDetails: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [isModalOpen, setModalState] = useState(false);
  const { outlets } = useOutletStore();
  const [selectedOutlet, setSelectedOutlet] = useState<Partial<IOutlet>>();
  const navigate = useNavigate();

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
  }, [companyId]);

  return (
    <Layout className="company-details">
      {selectedOutlet ? (
        <div className="company-details-wrapper">
          <div className="head" onClick={handleGoBack}>
            <img src={LeftArrow} alt="" />
            <div className="img">
              <img src={ImgOne} alt="" />
            </div>
            <div className="title">
              <h3>{selectedOutlet?.outletName}</h3>
              <p>
                {/* 20,Main Road Area <br /> Vallioor, tirunelveli */}
                {selectedOutlet?.address}
              </p>
            </div>
          </div>
          <div className="container">
            <div>
              <div className="company-details-container">
                <div className="flex-one">
                  {data.map((f, index) => {
                    return (
                      <div key={index} className="box">
                        <div className="total-sales">
                          <div className="briefcase-img">
                            <img src={f.img} alt="" />
                          </div>
                          <p>{f.title}</p>
                        </div>
                        <div className="rupee">
                          <img src={f.rupee} alt="" />
                          <h3>{f.amount}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-two">
                  <h4>UN-PAID</h4>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <span>DATE</span>
                          </th>
                          <th>
                            <span>STOCK</span>
                          </th>
                          <th>
                            <span>AMOUNT</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(10)].map((_, i) => (
                          <tr key={i.toString()} style={{ cursor: "pointer" }}>
                            <td>
                              <span className="date">Dec 23, 2024</span>
                            </td>
                            <td>
                              <div className="view-box" onClick={toggleModal}>
                                <span>VIEW</span>
                              </div>
                            </td>
                            <td>
                              <div className="rupee-img">
                                <img src={Rupee} alt="" />
                                <span>2000</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex-three">
                <div className="flex-items">
                  <h4>DAMAGE PRODUCT</h4>
                  <Link to="damage-product-view">
                    <p>View All</p>
                  </Link>
                </div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <span className="product">PRODUCT</span>
                        </th>
                        <th>
                          <span>DATE</span>
                        </th>
                        <th>
                          <span>IMAGE</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, i) => (
                        <tr key={i.toString()} style={{ cursor: "pointer" }}>
                          <td>
                            <div className="view-text" onClick={toggleModal}>
                              <p>VIEW</p>
                            </div>
                          </td>
                          <td>
                            <span className="date">Dec 23,2024</span>
                          </td>
                          <td className="img">
                            <img src={ImgFour} alt="" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="transaction">
              <div className="transaction-head">
                <h4>TRANSACTION HISTORY</h4>
                <div className="download">
                  <div onClick={generatePDF}>
                    <img src={DownloadIcon} alt="" />
                  </div>
                  <div className="share">
                    <img src={ShareImg} alt="" />
                  </div>
                  <Link to="transaction-history-details">
                    <p>View All</p>
                  </Link>
                </div>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <span className="product">Product</span>
                      </th>
                      <th>
                        <span>Order Amount</span>
                      </th>
                      <th>
                        <span>Date</span>
                      </th>
                      <th>
                        <span>Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(10)].map((_, i) => (
                      <tr key={i.toString()} style={{ cursor: "pointer" }}>
                        <td>
                          <div className="flex-item">
                            <div className="img-box">
                              <img src={ImgThree} alt="" />
                            </div>
                            <span title="vasanth Bavan">Nanthini Milk</span>
                          </div>
                        </td>
                        <td>
                          <div className="rupee-img">
                            <img src={Rupee} alt="" />
                            <span>80,000</span>
                          </div>
                        </td>
                        <td className="date">
                          <span>Dec 23,2024</span>
                        </td>
                        <td>
                          <div className="status">
                            <div className="box"></div>
                            <h5>Paid</h5>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
        </div>
      ) : (
        <div>Outlet not found</div>
      )}
    </Layout>
  );
};

export default CompanyDetails;
