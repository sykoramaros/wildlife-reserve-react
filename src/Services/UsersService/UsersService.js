import axios from "axios"

const baseUrl = "https://wildlife-reserve.runasp.net/api"
// const baseUrl = "http://localhost:5272/api"
// const baseUrl = "https://localhost:7105/api"

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl + "/Users/list")
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    return null
  }
}

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(baseUrl + `/Users/getByEmail/${email}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/Users/getBy/${id}`)
    console.log("response.data:", response.data)
    return response.data
  } catch (error) {
    console.log("userId:", id)
    console.error("Error fetching user:", error)
    return null
  }
}

export const createUser = async (user) => {
  try {
    const response = await axios.post(baseUrl + "/Users/add", user)
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
      baseUrl + `/Users/edit/${userId}`,
      {
        Name: user.name,
        Email: user.email,
        Password: user.password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Nastavuje typ dat jako JSON
        },
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(baseUrl + `/Users/delete/${userId}`)
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
