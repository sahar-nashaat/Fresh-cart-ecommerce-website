import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Brands() {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  async function getBrands() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setBrands(data.data);
    setLoading(false);
    console.log(brands);
  }
  useEffect(() => {
    getBrands();
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
          {brands.map((brand) => (
            <div className="col-lg-2">
              <div className="product brand">
                <img src={brand.image} className="w-100" alt={brand.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
