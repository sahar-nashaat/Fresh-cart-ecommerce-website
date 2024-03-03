import axios from "axios";
import { createContext, useState } from "react";

export let FavContext = createContext();

export default function FavContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [wish, setWish] = useState([]);

  function getFav() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => response)
      .catch((err) => err);
  }
  function addFav(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("Favs", JSON.stringify(response.data.data));
          setWish(response.data.data);
        }
        return response;
      })
      .catch((err) => err);
  }

  function deleteFav(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })

      .then((response) => response)
      .catch((err) => err);
  }

  return (
    <FavContext.Provider value={{ addFav, deleteFav, getFav, wish }}>
      {props.children}
    </FavContext.Provider>
  );
}
