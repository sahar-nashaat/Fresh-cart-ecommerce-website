import React, { useContext, useEffect, useState } from "react";
import logoImg from "../../assets/imgs/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext.js";
import { CartContext } from "../../Context/CartContext.js";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  let { getCart } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  async function getNumber() {
    let { data } = await getCart();
    console.log(data);
    setCart(data);
  }
  useEffect(() => {
    getNumber();
  }, []);
  return (
    <>
      <nav className="px-5 navbar navbar-expand-lg fw-semibold bg-body-tertiary">
        <div className="container-fluid">
          <img src={logoImg} alt="freshcart logo " />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-4 mb-2 mb-lg-0">
              {userToken != null ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex justify-content-center me-3"
                      to={"cart"}
                    >
                      Cart
                      <div className="cartIcon position-relative ">
                        <i class=" fa-solid fa-cart-shopping  "></i>
                        <div className="nums bg-main position-absolute p-1 px-2 top-0 rounded-1 start-100 text-light">
                          <span className="font-sm">{cart.numOfCartItems}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"wishlist"}>
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"products"}>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"categories"}>
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"brands"}>
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2  mb-lg-0">
              <li className="nav-item d-flex align-items-center ">
                <i className="fa-brands cursor-pointer me-2 fa-instagram "></i>
                <i className="fa-brands cursor-pointer me-2 fa-facebook"></i>
                <i className="fa-brands cursor-pointer me-2 fa-tiktok"></i>
                <i className="fa-brands cursor-pointer me-2 fa-twitter"></i>
                <i className="fa-brands cursor-pointer me-2 fa-linkedin"></i>
                <i className="fa-brands cursor-pointer me-2 fa-youtube"></i>
              </li>
              {userToken != null ? (
                <>
                  <li className="nav-item">
                    <span onClick={logOut} className="nav-link cursor-pointer">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"register"}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"login"}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
