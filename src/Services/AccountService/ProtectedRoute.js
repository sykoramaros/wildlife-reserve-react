import React from "react"
import { useState, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoutes = ({ children, roles = [] }) => {
  const [isLoading, setIsLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))
  const location = useLocation()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    // Přesměrování na login, pokud uživatel není přihlášen
    return <Navigate to="/login" state={{ from: location }} />
  }

  const hasAccess =
    roles.length === 0 ||
    (user.roles && roles.some((role) => user.roles.includes(role)))

  if (!hasAccess) {
    // Přesměrování na stránku "Přístup odepřen", pokud nemá uživatel požadovanou roli
    return <Navigate to="/access-denied" state={{ from: location }} />
  }

  // Pokud má uživatel přístup, vykreslí děti
  return children
}

export default ProtectedRoutes
