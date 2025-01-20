import axios from "axios"
import { authAxios } from "../AuthenticationService/AuthenticationService"

const baseUrl = "https://wildlife-reserve.runasp.net/api"
// const baseUrl = "http://localhost:5272/api"
// const baseUrl = "https://localhost:7105/api"

// Získání seznamu všech rolí
export const getRoles = async () => {
  try {
    const response = await authAxios("get", baseUrl + "/Roles/list")
    return response.data
  } catch (error) {
    console.error("Error fetching roles:", error)
    throw error
  }
}

// Vytvoření nové role
export const createRole = async (roleName) => {
  try {
    const response = await axios.post(
      baseUrl + `/Roles/add?roleName=${encodeURIComponent(roleName)}`
    )
    return response.data
  } catch (error) {
    console.error("Error creating role:", error)
    throw error
  }
}

// Získání členů a nečlenů role
export const editRole = async (roleId) => {
  try {
    const response = await axios.put(baseUrl + `/Roles/edit/${roleId}`)
    return response.data
  } catch (error) {
    console.error("Error editing role:", error)
    throw error
  }
}

// Získání role podle ID
export const getRoleById = async (id) => {
  try {
    const response = await axios.get(
      `https://wildlife-reserve.runasp.net/api/Roles/getBy/${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error loading role data:", error)
    throw error
  }
}

// Aktualizace role
export const updateRole = async (id, data) => {
  try {
    const response = await axios.put(baseUrl + `/Roles/modifications`, data)
    return response.data
  } catch (error) {
    console.error("Error updating role:", error)
    throw error
  }
}

// Smazání role
export const deleteRole = async (roleId) => {
  try {
    const response = await axios.delete(baseUrl + `/Roles/delete/${roleId}`)
    return response.data
  } catch (error) {
    console.error("Error deleting role:", error)
    throw error
  }
}

export const RoleService = {
  getRoles,
  createRole,
  editRole,
  deleteRole,
  getRoleById,
  updateRole,
}

export default RoleService
