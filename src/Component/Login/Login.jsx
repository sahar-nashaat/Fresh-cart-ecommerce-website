import axios from "axios";
// https://ecommerce.routemisr.com/
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
// import style from './Register.module.css'
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext.js";
export default function Login() {
  let navigate = useNavigate();
  let {setUserToken} = useContext(userContext)
  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data.message == "success") {
      setLoading(false);
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "Invalid password. ex:Ahmed@123"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  return (
    <>
      <div className="w-75 mx-auto  py-3">
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
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
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
