import axios from "axios"

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
      `http://localhost:5272/api/Observation/byMultipleFilters?${queryParams.toString()}`
    )

    return response.data
  } catch (error) {
    console.error("Error fetching observations:", error)
    return null
  }
}
