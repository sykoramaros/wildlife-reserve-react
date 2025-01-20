import axios from "axios"

export const login = async ({ username, password }) => {
  try {
    // Přímé volání API pomocí axios
    const response = await axios.post(
      "https://wildlife-reserve.runasp.net/api/Account/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true, // Zajistí přenos cookies (pokud je potřeba)
      }
    )
    // Uložení tokenu do localStorage ve frontend prohlizeci (propojeni s ProtectedRoutes.js)
    localStorage.setItem("token", response.data.token)
    alert("Login successful")
    console.log("response.data:", response.data)
    return {
      success: true,
      message: response.data.message,
      returnUrl: response.data.returnUrl || "/",
    } // Vrácení úspěchu
  } catch (error) {
    console.error(
      "Error logging in:",
      error.response?.data?.message || "An unexpected error occurred."
    )
    return {
      success: false,
      data: error.response?.data?.message || "Login is not successful",
    }
  }
}

export const logout = async () => {
  try {
    await axios.post("https://wildlife-reserve.runasp.net/api/Account/logout", {
      withCredentials: true,
    })
    return { success: true, message: "Logout successful" }
  } catch (error) {
    return {
      success: false,
      error: "Logout failed",
    }
  }
}

export const AccountService = {
  login,
  logout,
}

export default AccountService
