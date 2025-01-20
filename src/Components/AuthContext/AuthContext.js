import React from "react"
import { createContext, useEffect, useState } from "react"
import { getAuthToken, authAxios } from "./AuthenticationService"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getAuthToken()
      if (!token) return

      try {
        const response = await authAxios(
          "get",
          "https://wildlife-reserve.runasp.net/api/Account/userinfo"
        )
        setUser({
          username: response.data.userName,
          roles: response.data.roles,
        })
      } catch (error) {
        console.error("Failed to fetch user info", error)
        setUser(null)
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
