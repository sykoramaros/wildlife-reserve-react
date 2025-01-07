import axios from "axios"

const logout = async () => {
  try {
    await axios.post(
      "https://wildlife-reserve.runasp.net/api/Account/logout",
      {},
      { withCredentials: true }
    )
    return { success: true, message: "Logout successful" }
  } catch (error) {
    return {
      success: false,
      error: "Logout failed",
    }
  }
}

export default logout
