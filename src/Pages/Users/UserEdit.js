import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserById, editUser } from "../../Services/UsersService/UsersService"

const Edit = () => {
  const { userId: id } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("userId:", id) // Zkontrolujte hodnotu userId před voláním API

    const fetchUser = async () => {
      try {
        const data = await getUserById(id)
        console.log("Nactena data: ", data)
        if (data) {
          setName(data.name)
          setEmail(data.email)
        } else {
          console.error("Uživatel nebyl nalezen")
        }
      } catch (error) {
        console.error("Chyba při načítání uživatele:", error)
      } finally {
        setLoading(false) // Ukončení načítání
      }
    }
    if (id) {
      fetchUser() // Zavoláme API jen pokud je userId definováno
    } else {
      console.error("userId není definováno")
      setLoading(false) // Ukončení načítání, pokud není userId
    }
  }, [id])

  const handleSumbit = async (event) => {
    event.preventDefault()
    try {
      const updatedUser = { name, email }
      await editUser(id, updatedUser)
      console.log("User updated:", updatedUser)
      navigate.push("/users")
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
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
