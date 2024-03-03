import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
    setLoading(true);
  }, []);
  return (
    <>
      {loading ? (
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
        />
      ) : (
        <div className="row">
          {categories.map((category) => (
            <div className="col-lg-3 product">
              <img
                src={category.image}
                className="w-100 h-75"
                alt={category.name}
              />
              <h3 className="text-center h5">{category.name}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
