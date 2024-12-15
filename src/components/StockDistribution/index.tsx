import React, { useEffect, useRef, useState, useMemo } from "react";
import Slider from "react-slick";
import RightArrow from "../../assets/images/arrow-right.svg";
import LeftArrow from "../../assets/images/arrow-left.svg";
import ImgOne from "../../assets/images/img-3.png";
import "./StockDistribution.scss";
import useSalesRepStore from "../../context/salesRepStore";
import useSalesStore from "../../context/salesStore";
import useAuthStore from "../../context/userStore";

const StockDistribution: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const { salesReps } = useSalesRepStore();
  const { sales, fetchSales } = useSalesStore();
  const { user } = useAuthStore();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
    setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    if (sales?.length === 0) fetchSales(user);
  }, [fetchSales, user, sales?.length]);

  const salesBySalesRep = useMemo(
    () =>
      salesReps.map((rep) => ({
        ...rep,
        sales: sales.filter((sale) => sale.soldBy?._id === rep._id),
        totalAmount: sales
          ?.filter((sale) => sale.soldBy?._id === rep._id)
          .reduce((sum, sale) => sum + (sale.totalAmount || 0), 0),
      })),
    [salesReps, sales]
  );

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

      {salesBySalesRep && salesBySalesRep.length === -1 ? (
        <Slider ref={sliderRef} {...settings} className="slider-wrapper">
          {salesBySalesRep.map((rep, index) => (
            <div key={index} className="persons-wrapper">
              <div className="person-head">
                <img src={rep?.photoUrl || ""} alt={rep.name} />
                <div className="heading">
                  <p>{rep.name}</p>
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
                  {rep.sales.map((sale, i) => (
                    <div key={i} className="table-body">
                      <div className="company-img">
                        <img src={sale.soldTo?.photoUrl} alt="Outlet" />
                        <h4
                          className="vasanth-bavan"
                          title={sale.soldTo.outletName}
                        >
                          {sale.soldTo?.outletName}
                        </h4>
                      </div>
                      <div className="product">
                        <p>{sale.paymentStatus}</p>
                      </div>
                      <div className="price">
                        <h3>{sale.totalAmount}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="total">
                <p>
                  Total: <span>{rep.totalAmount}</span>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="no-data">Not yet allocated</div>
      )}
    </div>
  );
};

export default StockDistribution;
