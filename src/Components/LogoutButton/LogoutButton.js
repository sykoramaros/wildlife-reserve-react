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
    <button onClick={handleLogout} className="btn bg-danger text-white fs-5">
      Logout
    </button>
  )
}

export default LogoutButton
