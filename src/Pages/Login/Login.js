import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AccountService from "../../Services/AccountService/AccountService"
import { Tooltip } from "bootstrap"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // Hook useNavigate uvnitř komponenty

  useEffect(() => {
    // Inicializace tooltipů pro obě pole
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    if (usernameInput) new Tooltip(usernameInput)
    if (passwordInput) new Tooltip(passwordInput)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      console.log("Logging in...")
      const result = await AccountService.login({
        username: username.trim(),
        password: password,
      })
      console.log("Login result:", result)
      if (result.success) {
        console.log("Login successful, redirecting to:", result.returnUrl)
        // navigate(result.returnUrl || "/home")
        navigate("/home")
      } else {
        console.log("Login failed:", errorMessage)
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrorMessage("An error occured during login. Please try again.")
    } finally {
      setIsLoading(false) // Ukončení loading animace
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-danger display-4 mt-4">Login</h1>
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
              disabled={isLoading}
              data-bs-toggle="tooltip"
              data-bs-title="Username: '<strong class='text-warning'>sef</strong>' or '<strong class='text-warning'>guest</strong>'"
              data-bs-html="true"
              data-bs-placement="top"
              autoFocus
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
              disabled={isLoading}
              data-bs-toggle="tooltip"
              data-bs-title="Password: '<strong class='text-warning'>Abcd1234.</strong>' (same for sef and guest)"
              data-bs-html="true"
              data-bs-placement="top"
              required
            />
          </div>
          {errorMessage && (
            <div className="error-message my-3" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
          <p id="error-message" className="text-danger"></p>
        </form>
      </div>
    </div>
  )
}

export default Login
