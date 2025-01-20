import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoutes = ({ children, roles = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const location = useLocation()

  if (!user) {
    // Přesměrování na login, pokud uživatel není přihlášen
    return <Navigate to="/home" state={{ from: location }} />
  }

  const hasAccess =
    roles.length === 0 || roles.some((role) => user.roles.includes(role))
  if (!hasAccess) {
    // Přesměrování na stránku "Přístup odepřen", pokud nemá uživatel požadovanou roli
    return <Navigate to="/AccessDenied" state={{ from: location }} />
  }

  // Pokud má uživatel přístup, vykreslí děti
  return children
}

export default ProtectedRoutes
