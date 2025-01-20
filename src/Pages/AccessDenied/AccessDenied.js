import React from "react"

const AccessDenied = () => {
  return (
    <div>
      <div className="container">
        <div className="row-cols-1 g-4 w-50 m-auto">
          <h1 className="text-center text-danger display-4 mt-4">
            Access denied
          </h1>
          <div className="d-flex justify-content-center">
            <img
              className="img-fluid mt-5 rounded-circle"
              src="./Photos/AccessDenied.jpg"
              alt="Forbidden"
            />
          </div>
          <a
            className="d-flex justify-content-center m-auto btn btn-lg btn-secondary"
            type="button"
            href="/home"
          >
            Go back to homepage
          </a>
        </div>
      </div>
    </div>
  )
}

export default AccessDenied
