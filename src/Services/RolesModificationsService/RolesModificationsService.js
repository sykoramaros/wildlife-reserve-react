import React from "react"
import axios from "axios"

const baseUrl = "https://wildlife-reserve.runasp.net/api"
// const baseUrl = "http://localhost:5272/api"
// const baseUrl = "https://localhost:7105/api"

export const modificationsEdit = async (modifications) => {
  try {
    const response = await axios.put(baseUrl + `/Roles/modifications`, {
      addIds: modifications.addIds,
      deleteIds: modifications.deleteIds,
      roleName: modifications.roleName,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    }
    throw error
  }
}

export const RolesModificationsService = {
  modificationsEdit,
}

export default RolesModificationsService
