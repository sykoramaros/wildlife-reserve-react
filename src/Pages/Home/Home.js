import React from "react"

const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="row-cols-1 g-4">
          <div className="col">
            <h1 className="text-center text-success display-4 mt-4">
              Welcome to Wildlife Reserve!
            </h1>
          </div>
          <div className="col d-flex justify-content-center">
            <img src="./Photos/HomeImage.png" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
