import axios from "axios"
import { authAxios } from "../AuthenticationService/AuthenticationService"
import { getAuthToken } from "../AuthenticationService/AuthenticationService"

const baseUrl = "https://wildlife-reserve.runasp.net/api"
// const baseUrl = "http://localhost:5272/api"
// const baseUrl = "https://localhost:7105/api"

// export const getObservationsByMultipleFilters = async (filters) => {
//   try {
//     const queryParams = new URLSearchParams()

//     if (filters.taxonName) queryParams.append("taxonName", filters.taxonName)
//     if (filters.nelat) queryParams.append("nelat", filters.nelat)
//     if (filters.nelng) queryParams.append("nelng", filters.nelng)
//     if (filters.swlat) queryParams.append("swlat", filters.swlat)
//     if (filters.swlng) queryParams.append("swlng", filters.swlng)
//     if (filters.lat) queryParams.append("lat", filters.lat)
//     if (filters.lng) queryParams.append("lng", filters.lng)
//     if (filters.radius) queryParams.append("radius", filters.radius)
//     if (filters.day) queryParams.append("day", filters.day)
//     if (filters.month) queryParams.append("month", filters.month)
//     if (filters.year) queryParams.append("year", filters.year)
//     // if (filters.year !== undefined) queryParams.append("year", filters.year)
//     if (filters.identificated !== undefined)
//       queryParams.append("identificated", filters.identificated)
//     if (filters.place) queryParams.append("place", filters.place)

//     // const response = await axios.get(
//     //   baseUrl + `/Observation/byMultipleFilters?${queryParams.toString()}`
//     // )
//     const response = await authAxios(
//       "get",
//       baseUrl + `/Observation/byMultipleFilters?${queryParams.toString()}`
//     )
//     return response.data
//   } catch (error) {
//     console.error("Error fetching observations:", {
//       error,
//       status: error.response?.status,
//       data: error.response?.data,
//     })
//     return null
//   }
// }

export const getObservationsByMultipleFilters = async (filters) => {
  try {
    // Vytvoření query parametrů z filtrů
    const queryParams = new URLSearchParams()

    if (filters.taxonName) queryParams.append("taxonName", filters.taxonName)
    if (filters.nelat) queryParams.append("nelat", filters.nelat)
    if (filters.nelng) queryParams.append("nelng", filters.nelng)
    if (filters.swlat) queryParams.append("swlat", filters.swlat)
    if (filters.swlng) queryParams.append("swlng", filters.swlng)
    if (filters.lat) queryParams.append("lat", filters.lat)
    if (filters.lng) queryParams.append("lng", filters.lng)
    if (filters.radius) queryParams.append("radius", filters.radius)
    if (filters.day !== null && filters.day !== undefined)
      queryParams.append("day", filters.day)
    if (filters.month !== null && filters.month !== undefined)
      queryParams.append("month", filters.month)
    if (filters.year !== null && filters.year !== undefined)
      queryParams.append("year", filters.year)
    if (filters.identificated !== undefined)
      queryParams.append("identificated", filters.identificated)
    if (filters.place) queryParams.append("place", filters.place)

    // Získání tokenu z localStorage
    const token = localStorage.getItem("token")

    if (!token) {
      console.error("Token not found in localStorage.")
      return null
    }

    // Logování pro kontrolu
    console.log(
      "Request URL:",
      baseUrl + `/Observation/byMultipleFilters?${queryParams.toString()}`
    )
    console.log("Filters:", filters)
    console.log("Token:", token)

    const url =
      baseUrl + `/Observation/byMultipleFilters?${queryParams.toString()}`
    // Odeslání požadavku s autentizací a query parametry
    const response = await axios.get(url, {
      // baseUrl + `/Observation/byMultipleFilters?${queryParams.toString()}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })

    console.log("Response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching observations:", {
      error,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      params: error.config?.params,
    })
    return null
  }
}

export const getObservationsByAnimalTaxonName = async (taxonName) => {
  try {
    if (!taxonName) {
      console.error("Animal taxon name is required.")
      return null
    }
    const queryParams = new URLSearchParams()
    queryParams.append("taxonName", taxonName)
    const response = await axios.get(
      baseUrl + `/Observation/byAnimalTaxonName?${queryParams.toString()}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching observations:", error)
    return null
  }
}

export const getObservationsByPlantTaxonName = async (taxonName) => {
  try {
    if (!taxonName) {
      console.error("Plant taxon name is required.")
      return null
    }

    const token = localStorage.getItem("token")

    if (!token) {
      console.error("Authentication token is missing")
      return null
    }

    const queryParams = new URLSearchParams()
    queryParams.append("taxonName", taxonName)

    // Vytvoření instance axios s konkrétní konfigurací
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
      withCredentials: true,
    })

    const url = `/Observation/byPlantTaxonName?${queryParams.toString()}`
    console.log("Request configuration:", {
      url: baseUrl + url,
      headers: axiosInstance.defaults.headers,
      method: "GET",
    })

    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    // Detailní logování chyby
    console.log("Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      config: error.config,
    })

    if (error.response?.status === 401) {
      console.error("Unauthorized - invalid or expired token")
    } else if (error.response?.status === 403) {
      console.error("Forbidden - insufficient permissions")
    } else if (error.response?.status === 404) {
      console.error("Endpoint not found")
    }

    return null
  }
}

export const getObservationsByInsectTaxonName = async (taxonName) => {
  try {
    if (!taxonName) {
      console.error("Insect taxon name is required.")
      return null
    }
    const queryParams = new URLSearchParams()
    queryParams.append("taxonName", taxonName)
    const response = await axios.get(
      baseUrl + `/Observation/byInsectTaxonName?${queryParams.toString()}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching observations:", error)
    return null
  }
}

export const getObservationsByFungiTaxonName = async (taxonName) => {
  try {
    if (!taxonName) {
      console.error("Fungus taxon name is required.")
      return null
    }
    const queryParams = new URLSearchParams()
    queryParams.append("taxonName", taxonName)
    const response = await axios.get(
      baseUrl + `/Observation/byFungiTaxonName?${queryParams.toString()}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching observations:", error)
    return null
  }
}
