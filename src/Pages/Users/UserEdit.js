import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { editUser } from "../../Services/UsersService/UsersService"

const Edit = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state?.user
  const [nameToEdit, setNameToEdit] = useState(user?.userName || "")
  const [emailToEdit, setEmailToEdit] = useState(user?.email || "")

  const handleSumbit = async (event) => {
    event.preventDefault()
    try {
      const updatedUser = { name: nameToEdit, email: emailToEdit }
      await editUser(user.id, updatedUser)
      console.log("User updated:", updatedUser)
      navigate("/users")
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-success display-4 mt-4">Edit User</h1>
        <Link to="/users" className="btn btn-secondary">
          Back
        </Link>
        <div className="modal-body">
          <form onSubmit={handleSumbit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={nameToEdit}
                onChange={(e) => setNameToEdit(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={emailToEdit}
                onChange={(e) => setEmailToEdit(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
