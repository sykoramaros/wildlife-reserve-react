import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import RoleService from "../../Services/RolesService/RolesService" // Import služby RoleService
import "bootstrap/dist/css/bootstrap.min.css"

const Roles = () => {
  const [roles, setRoles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [roleName, setRoleName] = useState("")

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await RoleService.getRoles()
        setRoles(rolesData)
      } catch (error) {
        console.error("Error loading roles:", error)
      }
    }

    fetchRoles()
  }, [])

  const navigate = useNavigate()

  const handleCreate = async () => {
    if (!roleName.trim()) {
      console.error("Role name cannot be empty.")
      return
    }
    try {
      const response = await RoleService.createRole(roleName)
      // Předpokládáme, že server vrátí data o nové roli (např. s id)
      const newRole = response // Nebo zpracujte odpověď dle struktury dat
      setRoles([...roles, newRole]) // Přidání skutečného objektu nové role
      setRoleName("")
      setShowModal(false)
      console.log("Role created successfully.")
      // window.location.reload()
      navigate(0) // znovunacteni stranky
    } catch (error) {
      console.error("Error creating role:", error)
    }
  }
  const handleDelete = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await RoleService.deleteRole(roleId)
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId)) // dynamicke zobrazeni zmenenych dat bez znovunacteni stranky
        console.log("Role deleted successfully.")
      } catch (error) {
        console.error("Error deleting role:", error)
      }
    }
  }

  return (
    <div className="container">
      <h1>All Roles</h1>
      <button
        className="btn btn-success mb-3"
        onClick={() => setShowModal(true)}
      >
        Create a Role
      </button>
      <ul className="list-group">
        {roles.map((role, id) => (
          <li
            key={id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">ID: {role.id}</div>
              <div>
                <strong>Name:</strong> {role.name}
              </div>
            </div>
            <div className="d-flex flex-column">
              <Link
                className="btn btn-sm btn-warning text-white mb-2"
                to={`/roles/edit/${role.id}`}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(role.id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create a Role</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="roleName">Name:</label>
                  <input
                    type="text"
                    id="roleName"
                    className="form-control"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Roles
