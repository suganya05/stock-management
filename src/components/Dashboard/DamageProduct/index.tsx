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
        <h4>DAMAGE PRODUCT</h4>
        <Link to="/damage-product-view">
          <p>View All</p>
        </Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <span>CLIENT</span>
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
            {[...Array(10)].map((_, i) => (
              <tr key={i.toString()} style={{ cursor: "pointer" }}>
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
                <td>
                  <span>Dec 23,2024</span>
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
