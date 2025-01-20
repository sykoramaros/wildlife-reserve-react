import axios from "axios"
import { jwtDecode } from "jwt-decode"

// Funkce pro získání tokenu
export const getAuthToken = () => {
  return localStorage.getItem("token") // Získání tokenu z localStorage
}

export const getDecodedToken = () => {
  const token = getAuthToken() // Získání tokenu
  if (!token) {
    console.error("Token is missing.") // Chybová zpráva
    return null
  }
  try {
    const decodedToken = jwtDecode(token) // Získání decodovaného tokenu
    return decodedToken
  } catch (error) {
    console.error("Error decoding token:", error) // Chybová zpráva
    return null
  }
}

// Generická funkce pro požadavky s autentifikací
export const authAxios = (method, url, data = null) => {
  const token = getAuthToken() // Získání tokenu
  if (!token) {
    console.error("Token is missing.") // Chybová zpráva
    return Promise.reject("Authentiation token not found")
  }
  const headers = {
    Authorization: `Bearer ${token}`, // Přidání tokenu do hlavičky
  }

  const config = {
    method,
    url,
    headers,
  }

  if (data) {
    config.data = data // Pokud je potřeba, přidáme data (pro POST, PUT, atd.)
  }

  return axios(config)
}

export const getUserRole = () => {
  const token = getAuthToken()
  if (!token) {
    console.error("Token is missing.")
    return null
  }
  try {
    const decodedToken = jwtDecode(token)
    console.log("Decoded Token:", decodedToken)
    // Použití správného klíče pro roli
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    if (!role) {
      console.error("Role not found in token.")
      return null
    }
    return role // Získání správné role
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}
