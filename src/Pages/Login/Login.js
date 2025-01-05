import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import HandleLogin from "../../Services/LoginSevice/HandleLogin"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate() // Hook useNavigate uvnitř komponenty

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await HandleLogin({ username, password }, navigate) // Předání navigate jako parametru
    if (result.success) {
      // Přesměrování po úspěšném přihlášení
      navigate("/")
    } else {
      // Zpracování chyby při přihlášení
      const errorElement = document.getElementById("error-message")
      if (errorElement) {
        errorElement.textContent = "Invalid username or password"
      }
    }
  }

  return (
    <div>
      <div className="container">
        <form className="w-75 mt-5 mx-auto" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p id="error-message" className="text-danger"></p>
        </form>
      </div>
    </div>
  )
}

export default Login
