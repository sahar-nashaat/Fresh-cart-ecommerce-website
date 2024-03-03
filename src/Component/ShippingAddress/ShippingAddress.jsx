import React, { useContext } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.js";
export default function ShippingAddress() {
  let { checkOutSession } = useContext(CartContext);
  let { cartId } = useParams();
  console.log(cartId);
  async function checkout(values) {
    let { data } = await checkOutSession(cartId, values);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkout,
  });
  return (
    <>
      <div className="w-75 py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <input
            onChange={formik.handleChange}
            type="text"
            id="details"
            name="details"
            className="form-control mb-3"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-3"
          />
          <label htmlFor="city">City:</label>
          <input
            onChange={formik.handleChange}
            type="text"
            id="city"
            name="city"
            className="form-control mb-3"
          />
          <button className="btn bg-main text-light  " type="submit">
            Check out
          </button>
        </form>
      </div>
    </>
  );
}
