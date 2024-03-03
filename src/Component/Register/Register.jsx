import axios from "axios";
// https://ecommerce.routemisr.com/
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
// import style from './Register.module.css'
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data.message == "success") {
      setLoading(false);
      navigate("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "min length is 3")
      .max(10, "max length is 10"),
    email: Yup.string().required("Email is required").email("email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "Invalid password. ex:Ahmed@123"),
    rePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Does not match password"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "We Need Egyptian phone number"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  return (
    <>
      <div className="w-75 mx-auto  py-3">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            name="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-danger">{formik.errors.name}</p>
          ) : null}
          <label htmlFor="email">Email : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : null}

          <label htmlFor="password">Password : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}

          <label htmlFor="rePassword">Re-Enter your Password : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-danger">{formik.errors.rePassword}</p>
          ) : null}

          <label htmlFor="phone">Phone Number : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-danger">{formik.errors.phone}</p>
          ) : null}
          {apiError ? (
            <p className="text-danger text-center fw-bolder">{apiError}</p>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-end">
            {loading ? (
              <button className="btn">
                <RotatingLines
                  visible={true}
                  height="30"
                  width="30"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />{" "}
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
