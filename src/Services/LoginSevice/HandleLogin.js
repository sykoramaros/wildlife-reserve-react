import LoginService from "./LoginService"

const HandleLogin = async ({ username, password }, navigate) => {
  try {
    // Předpokládám, že voláte nějakou službu pro autentizaci (např. LoginService)
    const result = await LoginService(username, password)
    if (result.success) {
      localStorage.setItem("token", result.data.token)
      alert("Login successful")
      navigate("/") // Používáme navigate pro přesměrování
      return { success: true }
    } else {
      return { success: false, data: result.data }
    }
  } catch (error) {
    return {
      success: false,
      error: "Login failed",
    }
  }
}

export default HandleLogin
