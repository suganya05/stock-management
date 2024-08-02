import React, { useState } from "react";
import ImgThree from "../../../assets/images/img-3.png";
import ImgFour from "../../../assets/images/img-4.png";
import "./DamageProduct.scss";
import { Link } from "react-router-dom";
import { Modal } from "../../Modal";

const DamageProduct: React.FC = () => {
  const [isModalOpen, setModalState] = useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
  return (
    <div className="damage-product-wrapper">
      <div className="damage-product-head">
        <h4>Damaged Product</h4>
        <Link to="/damage-product-view">
          <p>View All</p>
        </Link>
      </div>
      <div className="table-wrapper">
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
            {[...Array(10)].map((_, i) => (
              <tr key={i.toString()}>
                <td>
                  <div className="flex-item">
                    <div className="img-box">
                      <img src={ImgThree} alt="" />
                    </div>
                    <span>Vasanth Bavan</span>
                  </div>
                </td>
                <td>
                  <div className="view-text" onClick={toggleModal}>
                    <p>VIEW</p>
                  </div>
                </td>
                <td className="img">
                  <img src={ImgFour} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
    </div>
  );
};

export default DamageProduct;
