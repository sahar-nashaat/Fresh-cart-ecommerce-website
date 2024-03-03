import React, { useEffect, useState } from "react";
import "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/imgs/slider-2.jpeg";
import slide2 from "../../assets/imgs/slider-image-2.jpeg";
import slide3 from "../../assets/imgs/slider-image-3.jpeg";
import img1 from "../../assets/imgs/grocery-banner.png";
import img2 from "../../assets/imgs/grocery-banner-2.jpeg";
import axios from "axios";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const catSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

// Your component code...

function CustomPrevArrow(props) {
  return (
    <div
      className="custom-prev-arrow"
      onClick={props.onClick}
      style={{
        color: "#0aad0a",
        fontSize: "24px",
        position: "absolute",
        top: "36%", // Adjust top position as needed
        left: "-30px", // Adjust left position as needed
        transform: "translateY(-50%)", // Center vertically
      }}
    >
      <i className="cursor-pointer fa-solid fa-circle-arrow-left"></i>{" "}
    </div>
  );
}

function CustomNextArrow(props) {
  return (
    <div
      className="custom-next-arrow"
      onClick={props.onClick}
      style={{
        color: "#0aad0a",
        fontSize: "24px",
        position: "absolute",
        top: "36%", // Adjust top position as needed
        right: "-30px", // Adjust right position as needed
        transform: "translateY(-50%)", // Center vertically
      }}
    >
      <i className="cursor-pointer fa-solid fa-circle-arrow-right"></i>{" "}
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  });
  return (
    <>
      <div className="row g-0 pb-5">
        <div className="col-md-9 h-100">
          <Slider {...settings}>
            <img className="" height={360} src={slide1} alt="grocery" />
            <img className="" height={360} src={img1} alt="grocery" />
            <img className="" height={360} src={img2} alt="grocery" />
          </Slider>
        </div>
        <div className="col-md-3">
          <img className="w-100" height={180} src={slide2} alt="wafer rolls" />
          <img className="w-100" height={180} src={slide3} alt="cookies" />
        </div>
      </div>

      <div className="row pb-5">
        <h4 className="py-3 fw-bold">Shop by categories</h4>
        <Slider {...catSettings}>
          {categories.map((category) => (
            <div key={category._id} className="col-md-2 pb-5">
              <img
                height={200}
                src={category.image}
                className="w-100"
                alt={category.name}
              />
              <h6 className="text-center py-2 fw-bold text-main">
                {category.name}
              </h6>
            </div>
          ))}
        </Slider>
      </div>

      <FeaturedProducts />
    </>
  );
}
