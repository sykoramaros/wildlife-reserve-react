import React, { useState, useEffect } from "react"

const EditUserModal = ({
  showModal,
  setShowModal,
  handleCloseModal,
  userData,
  handleUpdateUser,
}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (userData) {
      setName(userData.userName)
      setEmail(userData.email)
      setPassword("")
    }
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUser = {
      id: userData.id,
      name,
      email,
      password: password || "",
    }
    console.log(updatedUser)
    handleUpdateUser(updatedUser)
  }

  if (!showModal) return null

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Update User
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUserModal
