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
      {
        Name: user.name,
        Email: user.email,
        Password: user.password,
      }
    )
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error editing user:", error.response.data)
    } else {
      console.error("Error editing user:", error)
    }
    return null 
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `https://wildlife-reserve.runasp.net/api/Users/${userId}`
    )
    console.log("User deleted successfully:", response.data)
    return response.data
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response ? error.response.data : error.message
    )
    return { success: false, error: error.message }
  }
}
