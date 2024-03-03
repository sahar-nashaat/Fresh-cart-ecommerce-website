import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.js";
import toast from "react-hot-toast";
import { FavContext } from "../../Context/FavContext.js";

export default function Products() {
  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setLoading(false);
  }
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
    setLoading(true);
  }, []);

  let { addToCart } = useContext(CartContext);
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  let { addFav } = useContext(FavContext);
  async function addWish(id) {
    let { data } = await addFav(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }
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
        <div className="row gy-3">
          {products.map((product) => (
            <div key={product.id} className="  col-md-2">
              <div className="product p-2">
                <Link to={`/productdetails/${product._id}`}>
                  <img
                    src={product.imageCover}
                    className=" w-100"
                    alt={product.title}
                  />
                  <span className="fw-bold font-sm text-main">
                    {product.category.name}
                  </span>
                  <h6 className="fw-bolder ">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h6>
                  <div className="d-flex py-3 justify-content-between align-items-center">
                    <span className="fw-bolder">{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className=" d-flex justify-content-between ">
                  <button
                    onClick={() => postToCart(product.id)}
                    className="btn font-xs bg-main text-light "
                  >
                    <i className="fa-solid fa-plus "></i> Add to cart
                  </button>
                  <button onClick={() => addWish(product.id)} className="btn  ">
                    {localStorage.getItem("Favs") &&
                    JSON.parse(localStorage.getItem("Favs")).includes(
                      product.id
                    ) ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-1x  fa-heart"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
