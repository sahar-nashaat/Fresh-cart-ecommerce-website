import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext.js";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import empty from "../../assets/imgs/shopping.png";
export default function Cart() {
  let { getCart, deleteItem, updateItem } = useContext(CartContext);
  async function displayCart() {
    let { data } = await getCart();
    console.log(data);
    setCart(data);
    setLoading(false);
  }
  async function deleteFromCart(id) {
    setLoading(true);
    let { data } = await deleteItem(id);
    console.log(data);
    setCart(data);
    setLoading(false);
  }
  async function updateCart(id, count) {
    setLoading(true);
    let { data } = await updateItem(id, count);
    console.log(data);
    setCart(data);
    setLoading(false);
  }

  useEffect(() => {
    displayCart();
  }, []);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="bg-main-light mt-5">
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
        ) : cart ? (
          <>
            <h2 className="pt-3 px-4">
              Cart{" "}
              <span className="text-muted font-sm">
                ({cart.numOfCartItems}{" "}
                {cart.numOfCartItems === 1 ? "item" : "items"})
              </span>
            </h2>
            <h4 className="text-main fw-semibold px-3">
              Total Price : {cart.data.totalCartPrice} EGP
            </h4>
            {cart.data.products.map((product) => (
              <div
                key={product.product.id}
                className="row py-3 border-bottom border-1 m-0"
              >
                <div className="col-md-1">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt={product.product.id}
                  />
                </div>
                <div className="col-md-10">
                  <h6 className=" fw-bold">{product.product.title}</h6>
                  <p className="text-main font-sm fw-semibold">
                    Price : {product.price} EGP
                  </p>
                  <button
                    onClick={() => deleteFromCart(product.product.id)}
                    className=" p-0 btn"
                  >
                    <i className="text-main fas fa-trash-can me-2 "></i>
                    Remove
                  </button>
                </div>
                <div className="col-md-1 d-flex align-items-center">
                  <button
                    onClick={() =>
                      updateCart(product.product.id, product.count + 1)
                    }
                    className="btn px-1 me-2 brdr py-0 border-1 border "
                  >
                    +
                  </button>
                  <p className="m-0">{product.count}</p>
                  <button
                    onClick={() =>
                      updateCart(product.product.id, product.count - 1)
                    }
                    className="btn px-1 ms-2 brdr py-0 border-1 border "
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <Link
              className="btn bg-main text-light m-3"
              to={`/shippingaddress/${cart.data._id}`}
            >
              Place order
            </Link>
          </>
        ) : (
          <div className="w-75 mx-auto d-flex justify-content-center">
            <img src={empty} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
