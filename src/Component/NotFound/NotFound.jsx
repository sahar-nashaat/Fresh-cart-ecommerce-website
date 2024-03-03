import React from "react";
import error from "../../assets/imgs/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="d-flex justify-content-center notFound">
        <img className="w-50 " src={error} alt="" />
      </div>
    </>
  );
}
