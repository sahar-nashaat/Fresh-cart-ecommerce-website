import React from "react";
import style from "./Footer.module.css";
import pay1 from "../../assets/imgs/Amazon_Pay-Logo.wine.png";
import pay2 from "../../assets/imgs/png-transparent-amex-card-credit-logo-logos-logos-and-brands-icon-thumbnail.png";
import pay3 from "../../assets/imgs/kisspng-mastercard-logo-credit-card-maestro-payment-card-mastercard-mastercard-logo-design-vector-free-down-5b7bd9c7c83ef0.9372206915348433358202.jpg";
import pay4 from "../../assets/imgs/new-PayPal-Logo-horizontal-full-color-png.png";
import app1 from "../../assets/imgs/2.png.jpg";
import app2 from "../../assets/imgs/3.png.jpg";
export default function Footer() {
  return (
    <>
      <footer className="px-5 mt-4">
        <div className="app pt-4">
          <h4>Get the Fresh cart App</h4>
          <p className="text-muted">
            Share your email and we will send you the App link
          </p>
          <div className="d-flex ">
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              className="form-control w-75"
              placeholder="Enter you email"
            />
            <button className=" ms-4 btn bg-main text-light">Share</button>
          </div>
        </div>
        <div className="d-flex ">
          <p className="me-3">Payment Partners</p>
          <div className="d-flex">
            <img height={25} src={pay1} alt="amazon pay" />
            <img height={25} src={pay2} alt="american express" />
            <img height={25} src={pay3} alt="mastercard" />
            <img height={25} src={pay4} alt="paypal" />
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center w-100">
          <p className="m-0 me-2">Delivery with Fresh cart</p>
          <img className="me-2" height={40} src={app1} alt="app store" />
          <img className="me-2" height={40} src={app2} alt="google play" />
        </div>
      </footer>
    </>
  );
}
