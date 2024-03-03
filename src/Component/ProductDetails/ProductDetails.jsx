import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
  async function getDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getDetails(id);
  });
  return (
    <>
      {loading ? (
        <RotatingLines
          visible={true}
          height="100"
          width="100"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <div className="row align-items-center">
          <div className="col-lg-4 ">
            {details.images && details.images.length > 0 ? (
              <Slider {...settings}>
                {details.images.map((image, index) => (
                  <img
                    src={image}
                    key={index}
                    className="w-100"
                    alt={`${details.title}  `}
                  />
                ))}
              </Slider>
            ) : (
              <RotatingLines
                visible={true}
                height="100"
                width="100"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </div>
          <div className="col-lg-8">
            <h3 className="fw-bold">{details.title}</h3>
            <p>{details.description}</p>
            {details.category && (
              <span className="font-sm text-main fw-bold">
                {details.category.name}
              </span>
            )}
            <div className="d-flex justify-content-between pb-3">
              <span className="">{details.price}EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                <span>{details.ratingsAverage}</span>
              </span>
            </div>
            <button className="btn bg-main text-light w-100 ">
              <i className="fa-solid fa-plus "></i> Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
