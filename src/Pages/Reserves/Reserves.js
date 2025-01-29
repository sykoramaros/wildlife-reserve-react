import React from "react"

const Reserves = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="position-relative d-flex justify-content-center align-items-center">
        <h1 className="text-center text-white display-4 m-auto position-absolute text-shadow h-50" style={{ transform: "rotate(-5deg)"}}>
          This page is under construction
        </h1>
        <img
          className="img-fluid"
          style={{ minHeight: "100%", minWidth: "100%" }}
          src={`${process.env.PUBLIC_URL}/Photos/Reserve.png`}
        />
      </div>
    </div>
  )
}

export default Reserves
