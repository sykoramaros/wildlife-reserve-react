import axios from "axios" // Import knihovny Axios pro HTTP požadavky
import { jwtDecode } from "jwt-decode" // Import funkce pro dekódování JWT tokenů

const baseUrl = "https://wildlife-reserve.runasp.net/api" // Základní URL API

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
