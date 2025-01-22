// import axios from "axios"
// import { jwtDecode } from "jwt-decode"

// const baseUrl = "https://wildlife-reserve.runasp.net/api"

// export const login = async ({ username, password }) => {
//   try {
//     // Přímé volání API pomocí axios
//     const response = await axios.post(
//       `${baseUrl}/Account/chatgpt-jwt-login`,
//       {
//         username: username,
//         password: password,
//       },
//       {
//         withCredentials: true, // Zajistí přenos cookies (pokud je potřeba)
//       }
//     )

//     const { token } = response.data

//     if (!token) {
//       throw new Error("Token not received")
//     }

//     // Dekodovani tokenu a ulozeni informaci o uzivateli
//     const decodedToken = jwtDecode(token)
//     console.log("Decoded Token:", decodedToken)

//     // Uložení tokenu do localStorage ve frontend prohlizeci
//     localStorage.setItem("token", token)

//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         username:
//           decodedToken[
//             "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
//           ],
//         roles:
//           decodedToken[
//             "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//           ],
//       })
//     )

//     return {
//       success: true,
//       message: "Login successful",
//       // returnUrl: response.data.returnUrl || "/home",
//       returnUrl: "/home",
//       user: decodedToken,
//     } // Vrácení úspěchu
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
//   } catch (error) {
//     console.error("Error logging in:", error)
//     return {
//       success: false,
//       data:
//         error.response?.data?.message ||
//         "Login is not successful, check name or password",
//     }
//   }
// }

// export const logout = async () => {
//   try {
//     // Pridani autorizacniho tokenu do do hlavicky
//     const token = localStorage.getItem("token")

//     await axios.post(
//       baseUrl + "/Account/logout",
//       {},
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     delete axios.defaults.headers.common["Authorization"]

//     return {
//       success: true,
//       message: "Logout successful",
//     }
//   } catch (error) {
//     console.error("Logout error:", error)
//     return {
//       success: false,
//       error: "Logout failed, please try again",
//     }
//   }
// }

// // Pomocná funkce pro kontrolu platnosti tokenu
// export const isTokenValid = async () => {
//   try {
//     const token = localStorage.getItem("token")

//     if (!token) {
//       return false
//     }

//     const decodedToken = jwtDecode(token)
//     const currentTime = Date.now() / 1000

//     return decodedToken.exp > currentTime
//   } catch (error) {
//     return false
//   }
// }

// // Pomocná funkce pro získání současného uživatele
// export const getCurrentUser = () => {
//   try {
//     const userStr = localStorage.getItem("user")
//     return userStr ? JSON.parse(userStr) : null
//   } catch (error) {
//     return null
//   }
// }

// export const AccountService = {
//   login,
//   logout,
//   isTokenValid,
//   getCurrentUser,
// }

// export default AccountService

import axios from "axios" // Import knihovny Axios pro HTTP požadavky
import { jwtDecode } from "jwt-decode" // Import funkce pro dekódování JWT tokenů

const baseUrl = "https://wildlife-reserve.runasp.net/api" // Základní URL API

// Přidání interceptoru pro automatické přidávání tokenu do všech požadavků
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token") // Získání tokenu z localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}` // Přidání tokenu do hlavičky
//     }
//     return config // Vrácení upravené konfigurace požadavku
//   },
//   (error) => {
//     return Promise.reject(error) // Zpracování chyby při vytváření požadavku
//   }
// )

// Přidání interceptoru pro zpracování odpovědí a specificky 401 chyb
// axios.interceptors.response.use(
//   (response) => response, // Normální zpracování odpovědi
//   async (error) => {
//     if (error.response?.status === 401) {
//       // Kontrola, zda jde o chybu 401
//       localStorage.removeItem("token") // Odstranění tokenu z localStorage
//       localStorage.removeItem("user") // Odstranění informací o uživateli
//       window.location.href = "/login" // Přesměrování na stránku přihlášení
//     }
//     return Promise.reject(error) // Vrácení chyby
//   }
// )

// Funkce pro přihlášení uživatele
export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/Account/chatgpt-jwt-login`, // URL pro přihlášení
      {
        username: username, // Uživatelské jméno
        password: password, // Heslo
      },
      {
        withCredentials: true, // Zahrnutí cookies v požadavku
      }
    )

    const { token } = response.data // Získání tokenu z odpovědi

    if (!token) {
      throw new Error("Token not received") // Ošetření chybějícího tokenu
    }

    const decodedToken = jwtDecode(token) // Dekódování tokenu
    console.log("Decoded Token:", decodedToken)

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}` // Nastavení výchozího tokenu v Axiosu

    // Uložení tokenu a informací o uživateli do localStorage
    localStorage.setItem("token", token)
    localStorage.setItem(
      "user",
      JSON.stringify({
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ], // Jméno uživatele
        roles:
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ], // Role uživatele
      })
    )

    return {
      success: true, // Indikace úspěšného přihlášení
      message: "Login successful",
      returnUrl: "/home", // URL pro přesměrování
      user: decodedToken, // Dekódovaný token uživatele
    }
  } catch (error) {
    console.error("Error logging in:", error)
    const errorMessage =
      error.response?.data?.message || "An error occured during login."
    console.log("Error message:", errorMessage)
    return {
      success: false, // Indikace neúspěšného přihlášení
      message: errorMessage,
    }
  }
}

// Funkce pro odhlášení uživatele
export const logout = async () => {
  try {
    const token = localStorage.getItem("token") // Získání tokenu z localStorage

    await axios.post(
      `${baseUrl}/Account/logout`, // URL pro odhlášení
      {}, // Prázdné tělo požadavku
      {
        withCredentials: true, // Zahrnutí cookies
        headers: {
          Authorization: `Bearer ${token}`, // Token v hlavičce požadavku
        },
      }
    )

    localStorage.removeItem("token") // Odstranění tokenu z localStorage
    localStorage.removeItem("user") // Odstranění informací o uživateli
    delete axios.defaults.headers.common["Authorization"] // Odstranění výchozí hlavičky tokenu

    return {
      success: true, // Indikace úspěšného odhlášení
      message: "Logout successful",
    }
  } catch (error) {
    console.error("Logout error:", error)
    return {
      success: false, // Indikace chyby při odhlášení
      error: "Logout failed, please try again",
    }
  }
}

// Funkce pro kontrolu platnosti tokenu
export const isTokenValid = () => {
  try {
    const token = localStorage.getItem("token") // Získání tokenu z localStorage
    if (!token) {
      return false // Token neexistuje
    }

    const decodedToken = jwtDecode(token) // Dekódování tokenu
    const currentTime = Date.now() / 1000 // Aktuální čas v sekundách
    const isValid = decodedToken.exp > currentTime // Kontrola expirace tokenu

    if (!isValid) {
      localStorage.removeItem("token") // Odstranění neplatného tokenu
      localStorage.removeItem("user") // Odstranění informací o uživateli
      delete axios.defaults.headers.common["Authorization"] // Odstranění hlavičky tokenu
    }

    return isValid // Vrácení výsledku platnosti tokenu
  } catch (error) {
    console.error("Token validation error:", error)
    return false // Indikace chyby při kontrole platnosti
  }
}

// Funkce pro získání aktuálního uživatele
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user") // Získání uživatele z localStorage
    if (!userStr) return null // Uživatel neexistuje

    if (!isTokenValid()) {
      return null // Token není platný
    }

    return JSON.parse(userStr) // Vrácení parsovaného uživatele
  } catch (error) {
    console.error("Error getting current user:", error)
    return null // Indikace chyby
  }
}

// Funkce pro získání dekódovaného tokenu
export const getDecodedToken = () => {
  try {
    const token = localStorage.getItem("token") // Získání tokenu z localStorage
    return token ? jwtDecode(token) : null // Dekódování tokenu nebo vrácení null
  } catch (error) {
    console.error("Error decoding token:", error)
    return null // Indikace chyby při dekódování
  }
}

// Export objektu služeb AccountService
export const AccountService = {
  login,
  logout,
  isTokenValid,
  getCurrentUser,
  getDecodedToken,
}

export default AccountService // Výchozí export pro snadné importování
