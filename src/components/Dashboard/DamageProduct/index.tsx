import React, { useEffect, useRef, useState } from "react";
import ImgThree from "../../../assets/images/img-3.png";
import ImgFour from "../../../assets/images/img-4.png";
import "./DamageProduct.scss";
import { Link } from "react-router-dom";
import { Modal } from "../../Modal";
import { IDamagedProduct } from "../../../types/types";
import useAuthStore from "../../../context/userStore";
import { getDamageProduct } from "./DamageUtils";
import DamageProductModel from "../../ModalComponents/DamageProduct";
import LayoutModule from "../../LayoutModal";

const DamageProduct: React.FC = () => {
  const [isModalOpen, setModalState] = useState(false);
  const toggleModal = () => setModalState(!isModalOpen);
  const { user } = useAuthStore();
  const limit = 10;

  const damagedContainer = useRef<HTMLDivElement>(null);
  const [damagedProduct, setDamagedProduct] = useState<IDamagedProduct>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [damaged, setDamaged] = useState<IDamagedProduct[]>([]);
  const [showDamageProrduct, setShowDamageProduct] = useState(false);

  const fetchDamagedProducts = async (page: number) => {
    setLoading(true);
    const res = await getDamageProduct(user, 2024, 11, page, limit);
    if (res.type === "sucess") {
      setDamaged((prevProducts: any) => [...prevProducts, ...res.data?.data]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDamagedProducts(page);
  }, [page]);

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

  const handleOpenDamageproduct = async (dam: IDamagedProduct) => {
    setDamagedProduct(dam);
    setShowDamageProduct(true);
  };

  const handleCloseDamageproduct = () => {
    setDamagedProduct(undefined);
    setShowDamageProduct(false);
  };

  return (
    <div className="damage-product-wrapper">
      <div className="damage-product-head">
        <h4>Damaged Product</h4>
        <Link to="/dashboard/damage-product-view">
          {damaged && damaged.length > 0 && <p>View All</p>}
        </Link>
      </div>
      <div className="table-wrapper" ref={damagedContainer}>
        {damaged && damaged.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>
                  <span>Outlet</span>
                </th>
                <th>
                  <span>Product</span>
                </th>
                <th>
                  <span>Image</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {damaged.map((d, i) => (
                <tr key={i.toString()}>
                  <td>
                    <div className="flex-item">
                      <div className="img-box">
                        <img src={d.outlet?.photoUrl} alt="" />
                      </div>
                      <span>{d.outlet?.outletName}</span>
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
                  <td className="img">
                    <img src={d.proofUrl} alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No damages recorded</div>
        )}
      </div>
      {showDamageProrduct && (
        <LayoutModule handleToggle={handleCloseDamageproduct}>
          <DamageProductModel damageproduct={damagedProduct} />
        </LayoutModule>
      )}
      <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
    </div>
  );
};

export default DamageProduct;
