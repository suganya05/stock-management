import React, { useRef, useState } from "react";
import Slider from "react-slick";
import RightArrow from "../../assets/images/arrow-right.svg";
import ProfileImg from "../../assets/images/profile-img.jpg";
import LeftArrow from "../../assets/images/arrow-left.svg";
import ImgOne from "../../assets/images/img-3.png";
import "./StockDistribution.scss";
import useSalesRepStore from "../../context/salesRepStore";
import useAllocationsStore from "../../context/allocationStore";

const data = [
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
  {
    img: ProfileImg,
    heading: "Ramesh",
  },
];

const StockDistribution: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const { salesReps } = useSalesRepStore();
  const { allocations } = useAllocationsStore();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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
  return (
    <div className="stock-distribution-wrapper">
      <div className="stock-distribution-head">
        <h4>Stock Distribution</h4>
        <div className="right-arrow-img">
          {currentIndex > 0 && (
            <div className="flex-item" onClick={handlePrevClick}>
              <img src={LeftArrow} alt="Previous" />
            </div>
          )}
          {currentIndex < salesReps.length && (
            <div className="flex-item" onClick={handleNextClick}>
              <img src={RightArrow} alt="Next" />
            </div>
          )}
        </div>
      </div>

      <Slider ref={sliderRef} {...settings} className="slider-wrapper">
        {salesReps.map((f, index) => {
          return (
            <div key={index} className="persons-wrapper">
              <div className="person-head">
                <img src={f.photoUrl} alt="" />
                <div className="heading">
                  <p>{f.name}</p>
                  <div className="dot"></div>
                </div>
              </div>
              <div className="table-wrapper">
                <div className="table-head">
                  <p>Outlet</p>
                  <p>Product</p>
                  <p>Price</p>
                </div>
                <div className="table-content">
                  {allocations && allocations.allocations ? (
                    allocations.allocations
                      .filter((allocate) => allocate.salesPersonId === f._id)
                      .map((allocate, i) => (
                        <div key={i.toString()} className="table-body">
                          <div className="company-img">
                            <img src={ImgOne} alt="" />
                            <h4 className="vasanth-bavan" title="vasanth Bavan">
                              Vasanth Bavan
                            </h4>
                          </div>
                          <div className="product">
                            <p>{allocate.allocatedItems?.length}</p>
                          </div>
                          <div className="price">
                            <h3>1500</h3>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="total">
                <p>
                  Total: <span>1500</span> /10500
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default StockDistribution;
