import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getAllUsers, // Import funkce pro získání všech uživatelů
  createUser, // Import funkce pro vytvoření nového uživatele
  getUserByEmail, // Import funkce pro získání uživatele podle e-mailu
  deleteUser, // Import funkce pro smazání uživatele
} from "../../Services/UsersService/UsersService"
import AddModal from "../../Components/UsersModals/AddModal/AddModal" // Import komponenty pro modal pro přidání uživatele
// import EditModal from "../../Components/UsersModals/EditModal/EditModal" // Import komponenty pro modal pro úpravu uživatele
import DeleteModal from "../../Components/UsersModals/DeleteModal/DeleteModal" // Import komponenty pro modal pro smazání uživatele

const Users = () => {
  const [users, setUsers] = useState([]) // Stav pro seznam uživatelů
  const [showCreateModal, setShowCreateModal] = useState(false) // Stav pro zobrazení modal pro přidání uživatele
  const [showDeleteModal, setShowDeleteModal] = useState(false) // Stav pro zobrazení modal pro smazání uživatele
  const [userToDelete, setUserToDelete] = useState(null) // Stav pro uživatele k smazání
  const [userToEdit, setUserToEdit] = useState(null) // Stav pro uživatele k editaci

  // useEffect hook, který se spustí při načtení komponenty a získá všechny uživatele
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers() // Načte všechny uživatele
      setUsers(fetchedUsers) // Nastaví seznam uživatelů do stavu
    }
    fetchUsers() // Zavolá funkci pro načtení uživatelů při načtení komponenty
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserByEmail(userToEdit.email) // Načte uživatele podle e-mailu
      setUserToEdit(fetchedUser) // Nastaví uživatele do stavu
    }
    if (userToEdit) {
      fetchUser() // Zavolá funkci pro načtení uživatele podle e-mailu
    }
  }, [userToEdit])

  const navigate = useNavigate()

  // Funkce pro otevření modalu pro přidání uživatele
  const handleOpenCreateModal = () => setShowCreateModal(true)
  // Funkce pro zavření modalu pro přidání uživatele
  const handleCloseCreateModal = () => setShowCreateModal(false)
  const handleCreateUser = async (userData) => {
    const result = await createUser(userData) // Zavolá API pro vytvoření uživatele
    if (result.success) {
      setUsers([...users, result.user]) // Přidá nového uživatele do seznamu
      handleCloseCreateModal() // Zavře modal pro přidání uživatele
    } else {
      console.error("Chyba při vytvaření uživatele:", result)
    }
  }

  // Funkce pro otevření modalu pro smazání uživatele
  const handleOpenDeleteModal = (userId) => {
    setShowDeleteModal(true) // Otevře modal pro smazání
    setUserToDelete(userId) // Nastaví ID uživatele k smazání
  }
  // Funkce pro zavření modalu pro smazání uživatele
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }
  // Funkce pro smazání uživatele
  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId) // Zavolá API pro smazání uživatele
    if (result.success) {
      setUsers(users.filter((user) => user.id !== userId)) // dynamicke zobrazeni zmenenych dat bez znovunacteni stranky
      handleCloseDeleteModal() // Zavře modal pro smazání uživatele
      // window.location.reload()
      // navigate(0) // Obnoví stranu
    } else {
      console.error("Chyba při mazání uživatele:", result)
      // window.location.reload()
      navigate(0) // Obnoví stranu
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-success display-4 mt-4">Users</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleOpenCreateModal} // Otevře modal pro přidání uživatele
        >
          ＋ Add User
        </button>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {users.map((user, index) => (
            <div key={index} className="col">
              <div className="card border-primary mb-3 shadow-sm w-100 h-100">
                <h5 className="card-header bg-transparent border-primary">
                  Info
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
                      <Link
                        to={`/users/edit/${user.id}`}
                        state={{ user: user }}
                        type="button"
                        className="btn btn-warning w-100 rounded-1"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-danger w-100 rounded-1"
                        onClick={() => handleOpenDeleteModal(user.id)} // Otevře modal pro smazání tohoto uživatele
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pro přidání uživatele */}
      <AddModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        handleCreateUser={handleCreateUser}
      />

      {/* Modal pro smazání uživatele */}
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleDeleteUser={handleDeleteUser}
        userId={userToDelete}
      />
    </div>
  )
}

export default Users
