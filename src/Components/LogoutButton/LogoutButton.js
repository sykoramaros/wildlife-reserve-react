import React from "react"
import { useNavigate } from "react-router-dom"
import LogoutService from "../../Services/LoginSevice/LogoutService"

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout successful")
    navigate("/login")
  }

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  )
}

export default LogoutButton
