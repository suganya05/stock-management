import React, { useState } from "react";
import Layout from "../Layout";
import LeftArrow from "../../assets/icons/arrow-left.png";
import ImgThree from "../../assets/images/img-3.png";
import ImgFour from "../../assets/images/img-4.png";
import { useNavigate } from "react-router-dom";
import "./DamageProductView.scss";
import { Modal } from "../Modal";

const DamageProductView: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalState] = useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="damage-product-view-wrapper">
        <div className="heading" onClick={handleGoBack}>
          <img src={LeftArrow} alt="" />
          <p>DAMAGE PRODUCT</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>
                  <span className="client">CLIENT</span>
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
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
    </Layout>
  );
};

export default DamageProductView;
