import React, { useContext } from "react";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Home from "./Component/Home/Home.jsx";
import Brands from "./Component/Brands/Brands.jsx";
import Products from "./Component/Products/Products.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import ShippingAddress from "./Component/ShippingAddress/ShippingAddress.jsx";
import Categories from "./Component/Categories/Categories.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
import Login from "./Component/Login/Login.jsx";
import Register from "./Component/Register/Register.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { userContext } from "./Context/userContext.js";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";
import { Toaster } from "react-hot-toast";
import Wishlist from "./Component/Wishlist/Wishlist.jsx";
import AllOrders from "./Component/AllOrders/AllOrders.jsx";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingaddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  let { setUserToken } = useContext(userContext);
  if (localStorage.getItem("userToken")) {
    setUserToken(localStorage.getItem("userToken"));
  }

  //see another way
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </>
  );
}
