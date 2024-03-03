import React, { useContext, useEffect, useState } from "react";
import { FavContext } from "../../Context/FavContext.js";
import { RotatingLines } from "react-loader-spinner";
export default function Wishlist() {
  let { getFav, deleteFav } = useContext(FavContext);
  const [Favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);
  async function displayFav(headers) {
    let { data } = await getFav(headers);
    console.log(data);
    setFavs(data.data);
    setLoading(false);
  }
  async function deleteWish(id) {
    setLoading(true);

    // Remove the corresponding product's key from local storage
    const localFavs = JSON.parse(localStorage.getItem("Favs") || "[]");
    const updatedLocalFavs = localFavs.filter((favId) => favId !== id);
    localStorage.setItem("Favs", JSON.stringify(updatedLocalFavs));

    // Now, call the deleteFav function to update the state
    let { data } = await deleteFav(id);
    console.log(data);

    // Finally, refresh the displayed wishlist
    displayFav(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    displayFav();
  }, []);

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
        ) : (
          <>
            <h2 className="pt-3 px-4">Wishlist</h2>
            {Favs.map((Fav) => (
              <div
                key={Fav._id}
                className="row py-3 border-bottom border-1 m-0"
              >
                <div className="col-md-1">
                  <img className="w-100" src={Fav.imageCover} alt={Fav.title} />
                </div>
                <div className="col-md-10">
                  <h6 className=" fw-bold">{Fav.title}</h6>
                  <p className="text-main font-sm fw-semibold">
                    Price : {Fav.price} EGP
                  </p>
                  <button
                    onClick={() => deleteWish(Fav._id)}
                    className=" p-0 btn"
                  >
                    <i className="text-main fas fa-trash-can me-2 "></i>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
