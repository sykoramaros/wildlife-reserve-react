import React from "react"
import axios from "axios"

const LoginService = async (username, password) => {
  try {
    const response = await axios.post(
      "https://wildlife-reserve.runasp.net/api/Account/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    console.log(response.data.message)
    return { success: true, data: response.data }
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

export default LoginService
