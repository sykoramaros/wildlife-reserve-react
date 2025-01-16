import React from "react"
import { useState } from "react"
import { data, useNavigate } from "react-router-dom"
import { login } from "../../Services/AccountService/AccountService"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate() // Hook useNavigate uvnitř komponenty

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const result = await login({ username, password }) // Předání navigate jako parametru
      if (result.success) {
        // Přesměrování po úspěšném přihlášení
        navigate(result.returnUrl || "/")
        // window.location.href = "www.google.com"
        // console.log(username + "\n" + password + "\n" + result.returnUrl)
      } else {
        // Zpracování chyby při přihlášení
        setErrorMessage("Invalid username or password")
      }
    } catch (error) {
      console.error("Login failed:", error)
      setErrorMessage("An error occured during login. Please try again.")
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="error-message my-3" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
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
