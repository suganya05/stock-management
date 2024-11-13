import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import LeftArrow from "../../assets/icons/arrow-left.png";
import ImgThree from "../../assets/images/img-3.png";
import ImgFour from "../../assets/images/img-4.png";
import { useNavigate, useParams } from "react-router-dom";
import "./DamageProductView.scss";
import { Modal } from "../Modal";
import { IDamagedProduct } from "../../types/types";
import useAuthStore from "../../context/userStore";
import LayoutModule from "../LayoutModal";
import DamageProduct from "../ModalComponents/DamageProduct";
import { getDamageProduct } from "../Dashboard/DamageProduct/DamageUtils";

const DamageProductView: React.FC = () => {
  const navigate = useNavigate();
  const limit = 10;
  const { user } = useAuthStore();

  const damagedContainer = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [damaged, setDamaged] = useState<IDamagedProduct[]>([]);
  const [damagedProduct, setDamagedProduct] = useState<IDamagedProduct>();
  const [showProds, setShowProds] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchDamagedProducts = async (page: number) => {
    try {
      setLoading(true);
      const res = await getDamageProduct(user, 2024, 8, page, limit);
      setDamaged((prevProducts: any) => [...prevProducts, ...res.data.damaged]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDamgedScroll = () => {
    if (damagedContainer.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        damagedContainer.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        setPage((prevPage) => prevPage + 1);
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

  useEffect(() => {
    fetchDamagedProducts(page);
  }, [page]);

  const handleOpenDamageproduct = async (dam: IDamagedProduct) => {
    setDamagedProduct(dam);
    setShowProds(true);
  };

  const handleCloseDamageproduct = () => {
    setDamagedProduct(undefined);
    setShowProds(false);
  };

  return (
    <Layout className="damage-product-view">
      <div className="damage-product-view-wrapper">
        <div className="heading" onClick={handleGoBack}>
          <img src={LeftArrow} alt="" />
          <p>DAMAGE PRODUCT</p>
        </div>
        <div className="table-wrapper" ref={damagedContainer}>
          <table>
            <thead>
              <tr>
                <th>
                  <span className="client">DELIVERED PERSON</span>
                </th>
                <th>
                  <span>PRODUCT</span>
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
              {damaged.map((d, i) => (
                <tr key={i.toString()} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="flex-item">
                      <div className="img-box">
                        <img src={d.soldBy.photoUrl} alt="" />
                      </div>
                      <span>{d.soldBy.name}</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="view-text"
                      onClick={() => handleOpenDamageproduct(d)}
                    >
                      <p>VIEW</p>
                    </div>
                  </td>
                  <td className="date">
                    <span>{new Date(d.date).toDateString()}</span>
                  </td>
                  <td className="img">
                    <img src={d.proofUrl} alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showProds && (
        <LayoutModule handleToggle={handleCloseDamageproduct}>
          <DamageProduct damageproduct={damagedProduct} />
        </LayoutModule>
      )}
    </Layout>
  );
};

export default DamageProductView;
