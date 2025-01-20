import React from "react"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"

const RoleBasedComponent = ({ roles, children }) => {
  const { user } = useContext(AuthContext)

  if (!user || !user.roles) {
    return null // Uživatel není přihlášen nebo nemá role
  }

  const hasAccess = roles.some((role) => user.roles.includes(role))
  return hasAccess ? children : null // Zobrazit pouze pokud má uživatel příslušnou roli
}

export default RoleBasedComponent
