import React, { useState, useEffect } from "react"
import { getAllUsers } from "../../Services/UsersService/UsersService"
import AddUserModal from "../../Components/AddUserModal/AddUserModal"
import { createUser } from "../../Services/UsersService/UsersService"

const Users = () => {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  const handleCreateModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCreateUser = async (userData) => {
    const result = await createUser(userData)
    if (result.success) {
      setUsers([...users, result.user]) // Přidání nového uživatele do seznamu
      handleCloseModal()
    } else {
      alert(result.error)
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
        <div className="row row-cols-1 row-cols-md-3 g-4">
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
                  </p>
                </div>
                <div className="card-footer bg-transparent border-primary">
                  <div className="row">
                    <div className="col">
                      <a
                        href="#"
                        className="btn btn-warning w-100 rounded-1"
                        type="button"
                      >
                        Edit
                      </a>
                    </div>
                    <div className="col">
                      <form method="post">
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
            </div>
          ))}
        </div>
      </div>

      <AddUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateUser={handleCreateUser}
      />
    </div>
  )
}

export default Users
