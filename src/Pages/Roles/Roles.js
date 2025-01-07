import React from "react"

const Roles = () => {
  return (
    <div>
      <div className="container">
        <h1 className="text-center text-success display-4 mt-4">Roles</h1>
        <div className="card border-primary mb-3 shadow-sm w-100">
          <div className="row px-2">
            <div className="col">
              <div className="card-body">
                <h4 className="card-title text-success">Role</h4>
                <p className="card-text fst-italic">
                  <span>ID:</span>
                  <br />
                  Name:
                  <br />
                </p>
              </div>
            </div>
            <div className="col-auto d-flex flex-column align-items-end p-3">
              <a
                href="#"
                className="btn btn-warning w-100 mb-2 rounded-1"
                type="button"
              >
                Edit
              </a>
              <form method="post" className="w-100">
                <input
                  className="btn btn-danger w-100 rounded-1"
                  type="button"
                  value="Delete"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <img
        className="img-fluid w-50 mx-auto d-block rounded-circle"
        src="./Photos/EmptyFridge.png"
        alt=""
      />
    </div>
  )
}

export default Roles
