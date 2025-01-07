import React, { useState } from "react"

const AddUserModal = ({ showModal, setShowModal, handleCreateUser }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNameType = (e) => setName(e.target.value)
  const handleEmailType = (e) => setEmail(e.target.value)
  const handlePasswordType = (e) => setPassword(e.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const userData = { name, email, password }
    handleCreateUser(userData) // Předání dat zpět do `Users.js`
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  if (!showModal) return null

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New User</h5>
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
                  onChange={handleNameType}
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
                  onChange={handleEmailType}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handlePasswordType}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Create User
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

export default AddUserModal
