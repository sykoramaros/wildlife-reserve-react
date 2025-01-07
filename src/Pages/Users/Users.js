import React from "react"
import { useState, useEffect } from "react"
import { getAllUsers } from "../../Services/UsersService/UsersService"
import AddUserModal from "../../Components/AddUserModal/AddUserModal"
import EditUserModal from "../../Components/EditUserModal/EditUserModal"
import DeleteUserModal from "../../Components/DeleteUserModal/DeleteUserModal"
import { createUser } from "../../Services/UsersService/UsersService"
import { editUser } from "../../Services/UsersService/UsersService"
import { deleteUser } from "../../Services/UsersService/UsersService"

const Users = () => {
  const [users, setUsers] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  const handleCreateModal = () => {
    setShowCreateModal(true)
  }

  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
  }

  const handleCreateUser = async (userData) => {
    const result = await createUser(userData)
    if (result.success) {
      setUsers([...users, result.user])
      handleCloseCreateModal()
    } else {
      alert(result.error)
    }
  }

  const handleEditUser = (user) => {
    setUserToEdit(user)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setUserToEdit(null)
  }

  const handleUpdateUser = async (updatedUser) => {
    // Aktualizuje pouze name a email, ID zůstane nezměněno
    const result = await editUser(updatedUser.id, updatedUser)
    console.log("API response:", result)
    if (result.success) {
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      )
      handleCloseEditModal()
    } else {
      alert(result.error)
    }
  }

  const handleOpenDeleteModal = (userId) => {
    setShowDeleteModal(true)
    setUserToDelete(userId)
  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId)

    if (result && result.success !== false) {
      console.log("User deleted successfully")
      setUsers(users.filter((user) => user.id !== userId))
      handleCloseDeleteModal()
    } else {
      console.error("Failed to delete user:", result?.error || "Unknown error")
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-success display-4 mt-4">Users</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreateModal}
        >
          ＋ Add User
        </button>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {users.map((user) => (
            <div key={user.id} className="col">
              <div className="card border-primary mb-3 shadow-sm w-100 h-100">
                <h5 className="card-header bg-transparent border-primary">
                  User
                </h5>
                <div className="card-body">
                  <h4 className="card-title text-success">{user.userName}</h4>
                  <p className="card-text fst-italic">
                    <span>ID: {user.id}</span>
                    <br />
                    Name: {user.userName}
                    <br />
                    Email: {user.email}
                    <br />
                  </p>
                </div>
                <div className="card-footer bg-transparent border-primary">
                  <div className="row">
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-warning w-100 rounded-1"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col">
                      <form method="post">
                        <button
                          className="btn btn-danger w-100 rounded-1"
                          onClick={() => handleOpenDeleteModal(user.id)}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddUserModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        handleCreateUser={handleCreateUser}
      />

      <EditUserModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        handleCloseModal={handleCloseEditModal}
        userData={userToEdit}
        handleUpdateUser={handleUpdateUser}
      />

      <DeleteUserModal
        showModal={showDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleDeleteUser={handleDeleteUser}
        userId={userToDelete}
      />
    </div>
  )
}

export default Users
