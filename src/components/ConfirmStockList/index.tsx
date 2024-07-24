import React, { useState, useRef } from "react";
import Slider from "react-slick";
import ProfileImg from "../../assets/images/profile-img.jpg";
import RightArrow from "../../assets/icons/arrow-right.png";
import LeftArrow from "../../assets/icons/arrow-left.png";
import ArrowRight from "../../assets/icons/arrow-right.png";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import ImgOne from "../../assets/images/img-1.jpg";
import ImgTwo from "../../assets/images/img-2.png";
import ImgThree from "../../assets/images/img-3.png";
import ImgFour from "../../assets/images/img-4.png";
import PlusIcon from "../../assets/icons/plus.png";
import Layout from "../Layout";
import "./ConfirmStockList.scss";
import Button from "../Button";
import { Modal } from "../Modal";

const ConfirmStockList: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setModalState] = useState(false);
  const sliderRef = useRef<Slider>(null);

  const toggleModal = () => setModalState(!isModalOpen);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const data = [
    {
      img: ProfileImg,
      heading: "Person 1",
    },
    {
      img: ProfileImg,
      heading: "Person 2",
    },
    {
      img: ProfileImg,
      heading: "Person 3",
    },
    {
      img: ProfileImg,
      heading: "Person 4",
    },
    {
      img: ProfileImg,
      heading: "Person 5",
    },
    {
      img: ProfileImg,
      heading: "Person 6",
    },
  ];

  const details = [
    {
      img: ImgOne,
      name: "Nandini Milk 1",
      kg: "Litre",
      count: 300,
      litre: "litre",
    },
    {
      img: ImgTwo,
      name: "Nandini Milk 1",
      kg: "Litre",
      count: 300,
      litre: "litre",
    },
    {
      img: ImgThree,
      name: "Nandini Milk 1",
      kg: "Litre",
      count: 300,
      litre: "litre",
    },
    {
      img: ImgFour,
      name: "Nandini Milk 1",
      kg: "Litre",
      count: 300,
      litre: "litre",
    },
    {
      img: ImgOne,
      name: "Nandini Milk 1",
      kg: "Litre",
      count: 300,
      litre: "litre",
    },
    {
      img: ImgTwo,
      name: "Nandini Milk 1",
      kg: "Litre",
      count: 300,
      litre: "litre",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Layout>
      <div className="confirm-stock-list">
        <div className="head">
          <Button
            varient="secondary"
            leftIcon={<img src={PlusIcon} alt="plus" />}
          >
            Add Person
          </Button>
          <div className="drop-down-list">
            <select value={selectedOption} onChange={handleChange}>
              <option value="">16, June Today</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {data.map((f, index) => {
            return (
              <div key={index} className="persons-wrapper">
                <div className="person-head">
                  <img src={f.img} alt="" />
                  <p>{f.heading}</p>
                </div>
                <div className="confirm-stock-list-wrapper">
                  {details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="confirm-stock-list-container"
                    >
                      <div className="confirm-stock-list-content">
                        <div className="first-flex-item">
                          <img src={detail.img} alt="" />
                          <div className="para">
                            <p>{detail.name}</p>
                            <p>{detail.kg}</p>
                          </div>
                        </div>
                        <div className="second-flex-item">
                          <div className="text">
                            <h4>{detail.count}</h4>
                            <p>{detail.litre}</p>
                          </div>
                          <div className="edit-icon" onClick={toggleModal}>
                            <img src={EditIcon} alt="" />
                          </div>
                          <div className="delete-icon" onClick={toggleModal}>
                            <img src={DeleteIcon} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="confirm-stock-end">
          <p>Cancel</p>
          <div className="confirm-stock-btn">
            <Button
              varient="primary"
              type="submit"
              rightIcon={<img src={ArrowRight} alt="plus" />}
            >
              Confirm Stock List
            </Button>
          </div>
          {currentIndex < data.length / 3 - 1 && (
            <div className="flex-item" onClick={handleNextClick}>
              <h4>Next</h4>
              <img src={RightArrow} alt="Next" />
            </div>
          )}
          {currentIndex > 0 && (
            <div className="flex-item" onClick={handlePrevClick}>
              <img src={LeftArrow} alt="Previous" />
              <h4>Previous</h4>
            </div>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModal}></Modal>
      </div>
    </Layout>
  );
};

export default ConfirmStockList;
