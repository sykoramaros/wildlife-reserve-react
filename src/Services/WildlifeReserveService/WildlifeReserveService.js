import axios from "axios"

const baseUrl = "https://wildlife-reserve.runasp.net/api"
// const baseUrl = "http://localhost:5272/api"
// const baseUrl = "https://localhost:7105/api"

export const getObservationsByMultipleFilters = async (filters) => {
  try {
    const queryParams = new URLSearchParams()

    if (filters.taxonName) queryParams.append("taxonName", filters.taxonName)
    if (filters.nelat) queryParams.append("nelat", filters.nelat)
    if (filters.nelng) queryParams.append("nelng", filters.nelng)
    if (filters.swlat) queryParams.append("swlat", filters.swlat)
    if (filters.swlng) queryParams.append("swlng", filters.swlng)
    if (filters.lat) queryParams.append("lat", filters.lat)
    if (filters.lng) queryParams.append("lng", filters.lng)
    if (filters.radius) queryParams.append("radius", filters.radius)
    if (filters.day) queryParams.append("day", filters.day)
    if (filters.month) queryParams.append("month", filters.month)
    if (filters.year) queryParams.append("year", filters.year)
    // if (filters.year !== undefined) queryParams.append("year", filters.year)
    if (filters.identificated !== undefined)
      queryParams.append("identificated", filters.identificated)
    if (filters.place) queryParams.append("place", filters.place)

    const response = await axios.get(
      baseUrl + `/Observation/byMultipleFilters?${queryParams.toString()}`
    )

    return response.data
  } catch (error) {
    console.error("Error fetching observations:", error)
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
    const queryParams = new URLSearchParams()
    queryParams.append("taxonName", taxonName)
    const response = await axios.get(
      baseUrl + `/Observation/byPlantTaxonName?${queryParams.toString()}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching observations:", error)
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
