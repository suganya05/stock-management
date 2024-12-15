import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import Layout from "../Layout";
import LeftArrow from "../../assets/icons/arrow-left.png";
import Briefcase from "../../assets/icons/briefcase.png";
import Rupee from "../../assets/icons/Rupee.png";
import DownloadIcon from "../../assets/icons/download.svg";
import ShareImg from "../../assets/icons/share-2.svg";
import "./CompanyDetails.scss";
import useOutletStore from "../../context/outletStore";
import {
  IDamagedProduct,
  IMetrics,
  INewStockItem,
  IOutlet,
  ISales,
} from "../../types/types";
import { isValidObjectId } from "../../helpers/objectIdTester";
import useAuthStore from "../../context/userStore";
import {
  getDamagedProduct,
  getSalesForOutlet,
  getTransactionHistory,
  getTransactionHistoryDetails,
  getUnPaid,
} from "./CompanyDetailsUtils";
import LayoutModule from "../LayoutModal";
import ViewStockList from "../ModalComponents/ViewStockList";
import DamageProduct from "../ModalComponents/DamageProduct";

const CompanyDetails: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const { outlets } = useOutletStore();
  const [selectedOutlet, setSelectedOutlet] = useState<Partial<IOutlet>>();
  const { user } = useAuthStore();
  const limit = 10;
  const navigate = useNavigate();
  const [showUnpaidModel, setShowUnpaidModel] = useState(false);
  const [showDamageProrduct, setShowDamageProduct] = useState(false);
  const [unpaidProducts, setunPaidProducts] = useState<INewStockItem[]>([]);
  const [damagedProduct, setDamagedProduct] = useState<IDamagedProduct>();
  const [showTrasac, setShowTrasac] = useState(false);
  const [transacProds, setTransacProds] = useState<INewStockItem[]>([]);

  const damagedContainer = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [damaged, setDamaged] = useState<IDamagedProduct[]>([]);

  const unPaidContainer = useRef<HTMLDivElement>(null);
  const [unpaidPage, setUnpaidPage] = useState(1);
  const [unpaidLoading, setUnPaidLoading] = useState(false);
  const [unpaidList, setUnpaidList] = useState<ISales[]>([]);

  const transactionHist = useRef<HTMLDivElement>(null);
  const [transacPage, setTransacPage] = useState(1);
  const [trasacLoading, setTransacLoading] = useState(false);
  const [trasacs, setTransacs] = useState<ISales[]>([]);

  const [sales, setSales] = useState<IMetrics>();

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

  const fetchDamagedProducts = async (page: number) => {
    try {
      if (companyId) {
        setLoading(true);
        const res = await getDamagedProduct(user, companyId, page, limit);
        console.log("company details", res.data);
        setDamaged((prevProducts: any) => [...prevProducts, ...res.data.data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUnpaidProducts = async (page: number) => {
    try {
      if (companyId) {
        setUnPaidLoading(true);
        const res = await getUnPaid(user, companyId, page, limit);
        setUnpaidList((prevProducts: any) => [
          ...prevProducts,
          ...res.data.data,
        ]);
        console.log("fetching unpaid", res.data);
        setUnPaidLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async (page: number) => {
    try {
      if (companyId) {
        setTransacLoading(true);
        // const res = await getTransactionHistory(user, companyId, page, limit);
        const res = await getTransactionHistoryDetails(
          user,
          companyId,
          page,
          limit
        );
        setTransacs((prev) => [...prev, ...res.data.data]);
        setTransacLoading(false);
      }
    } catch (error) {
      console.log("Error occured transac", error);
    }
  };

  const fetchSales = async () => {
    try {
      if (companyId) {
        const res = await getSalesForOutlet(user, companyId);
        setSales(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDamagedProducts(page);
  }, [page]);

  useEffect(() => {
    fetchUnpaidProducts(unpaidPage);
  }, [unpaidPage]);

  useEffect(() => {
    fetchTransactions(transacPage);
  }, [transacPage]);

  useEffect(() => {
    fetchSales();
  }, []);

  // damaged products
  const handleDamgedScroll = () => {
    if (damagedContainer.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        damagedContainer.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        setPage((prevPage) => prevPage + 1);
        console.log(scrollTop + clientHeight >= scrollHeight);
      }
    }
  };

  useEffect(() => {
    const container = damagedContainer.current;
    if (container) {
      container.addEventListener("scroll", handleDamgedScroll);
      return () => container.removeEventListener("scroll", handleDamgedScroll);
    }
  }, []);

  // unpaid products
  const handleunpaidScroll = () => {
    if (unPaidContainer.current) {
      const { scrollTop, clientHeight, scrollHeight } = unPaidContainer.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !unpaidLoading) {
        setUnpaidPage((prevPage) => prevPage + 1);
        console.log("unpaid", scrollTop + clientHeight >= scrollHeight);
      }
    }
  };

  useEffect(() => {
    const container = unPaidContainer.current;
    if (container) {
      container.addEventListener("scroll", handleunpaidScroll);
      return () => container.removeEventListener("scroll", handleunpaidScroll);
    }
  }, []);

  //transaction
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

  const data = [
    {
      img: Briefcase,
      title: "Total Sales",
      rupee: Rupee,
      amount: sales?.totalRevenue || 0,
    },
    {
      img: Briefcase,
      title: "Total Profit",
      rupee: Rupee,
      amount: sales?.totalProfit || 0,
    },
    {
      img: Briefcase,
      title: "Total Expense",
      rupee: Rupee,
      amount: sales?.totalExpense || 0,
    },
  ];

  const handleUnpaidToggle = () => {
    setShowUnpaidModel((prev) => !prev);
  };

  const handleOpenUnpaid = (products: INewStockItem[]) => {
    setShowUnpaidModel(true);
    setunPaidProducts(products);
  };

  const handleOpenDamageproduct = async (dam: IDamagedProduct) => {
    setDamagedProduct(dam);
    setShowDamageProduct(true);
  };

  const handleCloseDamageproduct = () => {
    setDamagedProduct(undefined);
    setShowDamageProduct(false);
  };

  const handleOpenTransac = (prods: INewStockItem[]) => {
    setShowTrasac(true);
    setTransacProds(prods);
  };

  const handleCloseTransac = () => {
    setShowTrasac(false);
    setTransacProds([]);
  };
  return (
    <Layout className="company-details">
      {selectedOutlet ? (
        <div className="company-details-wrapper">
          <div className="head" onClick={handleGoBack}>
            <img src={LeftArrow} alt="" />
            <div className="img">
              <img src={selectedOutlet.photoUrl} alt="" />
            </div>
            <div className="title">
              <h3>{selectedOutlet?.outletName}</h3>
              <p>{selectedOutlet?.address}</p>
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
                  <div className="table-wrapper" ref={unPaidContainer}>
                    {unpaidList && unpaidList.length > 0 ? (
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
                          {unpaidList.map((p, i) => (
                            <tr
                              key={i.toString()}
                              style={{ cursor: "pointer" }}
                            >
                              <td>
                                <span className="date">
                                  {new Date(p.salesDate).toDateString()}
                                </span>
                              </td>
                              <td>
                                <div
                                  className="view-box"
                                  onClick={() => {
                                    handleOpenUnpaid(p.products);
                                  }}
                                >
                                  <span>VIEW</span>
                                </div>
                              </td>
                              <td>
                                <div className="rupee-img">
                                  <img src={Rupee} alt="" />
                                  <span>{p.totalAmount - p.paidAmount}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="no-data">No uncleared payments found</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-three">
                <div className="flex-items">
                  <h4>DAMAGE PRODUCT</h4>
                  {damaged && damaged.length > 0 && (
                    <Link to="damage-product-view">
                      <p>View All</p>
                    </Link>
                  )}
                </div>
                <div className="table-wrapper" ref={damagedContainer}>
                  {damaged && damaged.length > 0 ? (
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
                        {damaged.map((dam, i) => (
                          <tr key={i.toString()} style={{ cursor: "pointer" }}>
                            <td>
                              <div
                                className="view-text"
                                onClick={() => handleOpenDamageproduct(dam)}
                              >
                                <p>VIEW</p>
                              </div>
                            </td>
                            <td>
                              <span className="date">
                                {new Date(dam.date).toDateString()}
                              </span>
                            </td>
                            <td className="img">
                              <img src={dam.proofUrl} alt="" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="no-data">
                      No damged product submitted yet
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="transaction">
              <div className="transaction-head">
                <h4>TRANSACTION HISTORY</h4>
                {trasacs && trasacs.length > 0 && (
                  <div className="download">
                    {/* <div onClick={generatePDF}>
                      <img src={DownloadIcon} alt="" />
                    </div>
                    <div className="share">
                      <img src={ShareImg} alt="" />
                    </div> */}
                    <Link to="transaction-history-details">
                      <p>View All</p>
                    </Link>
                  </div>
                )}
              </div>
              <div className="table-wrapper" ref={transactionHist}>
                {trasacs && trasacs.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <span>Date</span>
                        </th>
                        <th>
                          <span>Order Amount</span>
                        </th>
                        <th>
                          <span>Status</span>
                        </th>
                        <th>
                          <span>View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trasacs.map((t, i) => (
                        <tr key={i.toString()} style={{ cursor: "pointer" }}>
                          <td className="date">
                            <span>{new Date(t.salesDate).toDateString()}</span>
                          </td>
                          <td>
                            <div className="rupee-img">
                              <img src={Rupee} alt="" />
                              <span>{t.totalAmount}</span>
                            </div>
                          </td>
                          <td>
                            <div className="status">
                              <div className="box"></div>
                              <h5>{t.paymentStatus}</h5>
                            </div>
                          </td>
                          <td
                            className="click-here-btn"
                            onClick={() => handleOpenTransac(t.products)}
                          >
                            <span>View</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-data">No transactions made yet</div>
                )}
              </div>
            </div>
          </div>
          {showUnpaidModel && (
            <LayoutModule handleToggle={handleUnpaidToggle}>
              <ViewStockList
                products={unpaidProducts}
                title="Unpaid payments"
              />
            </LayoutModule>
          )}
          {showDamageProrduct && (
            <LayoutModule handleToggle={handleCloseDamageproduct}>
              <DamageProduct damageproduct={damagedProduct} />
            </LayoutModule>
          )}
          {showTrasac && (
            <LayoutModule handleToggle={handleCloseTransac}>
              <ViewStockList products={transacProds} title="View Products" />
            </LayoutModule>
          )}
        </div>
      ) : (
        <div>Outlet not found</div>
      )}
    </Layout>
  );
};

export default CompanyDetails;
