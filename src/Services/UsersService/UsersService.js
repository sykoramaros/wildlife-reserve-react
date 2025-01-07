import axios from "axios"

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      "https://wildlife-reserve.runasp.net/api/Users"
    )
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    return null
  }
}

export const createUser = async (user) => {
  try {
    const response = await axios.post(
      "https://wildlife-reserve.runasp.net/api/Users",
      user
    )
    if (response.status === 201) {
      return { success: true, user: response.data }
    }
    return { success: false, error: "Failed to create user" }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error: error.message }
  }
}

export const editUser = async (userId, user) => {
  try {
    const response = await axios.put(
      `https://wildlife-reserve.runasp.net/api/Users/${userId}`,
      user
    )
    return response.data
  } catch (error) {
    console.error("Error editing user:", error)
    return null
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `https://wildlife-reserve.runasp.net/api/Users/${userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error deleting user:", error)
    return null
  }
}
