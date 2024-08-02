import React, { useState, useRef } from "react";
import Slider from "react-slick";
import ProfileImg from "../../assets/images/profile-img.jpg";
import RightArrow from "../../assets/icons/arrow-right.png";
import LeftArrow from "../../assets/icons/arrow-left.png";
import Layout from "../Layout";
import "./Attendance.scss";
import { Modal } from "../Modal";

const Attendance: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setModalState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Layout className="attendance">
      <div className="attendance-wrapper">
        <div className="drop-down-list">
          <select value={selectedOption} onChange={handleChange}>
            <option value="">16, June Today</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {data.map((f, index) => {
            return (
              <div key={index} className="persons-wrapper">
                <div className="person-head">
                  <img src={f.img} alt="" />
                  <p>{f.heading}</p>
                </div>
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
                          <span>DENOMINATION</span>
                        </th>
                        <th>
                          <span>ATTENDANCE</span>
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
                            <div className="check-box" onClick={toggleModal}>
                              <span>CHECK</span>
                            </div>
                          </td>
                          <td>
                            <span className="attendance">Present</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="end">
          <p>Cancel</p>
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

export default Attendance;
