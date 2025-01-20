import axios from "axios"

// Funkce pro získání tokenu
export const getAuthToken = () => {
  return localStorage.getItem("token") // Získání tokenu z localStorage
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
