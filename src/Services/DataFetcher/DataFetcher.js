import React, { useState, useEffect } from "react"
import { getObservationsByMultipleFilters } from "../../Services/WildlifeReserveService/WildlifeReserveService"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"

const DataFetcher = ({ components }) => {
  const [observations, setObservations] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [inputData, setInputData] = useState({
    taxonName: "",
    year: null,
    month: null,
    day: null,
  })

  const fetchObservations = async () => {
    if (
      !inputData.taxonName &&
      !inputData.year &&
      !inputData.month &&
      !inputData.day
    ) {
      console.error("At least one filter is required.")
      return
    }

    try {
      const response = await getObservationsByMultipleFilters(inputData)
      const fetchedObservations = response.results
      setTotalResults(response.totalResults)
      setObservations(
        Array.isArray(fetchedObservations) ? fetchedObservations : []
      )
    } catch (error) {
      console.error("Error fetching observations:", error)
      setTotalResults(0)
      setObservations([])
    }
  }

  const handleSearch = () => {
    fetchObservations()
  }

  useEffect(() => {
    if (
      inputData.taxonName ||
      inputData.year ||
      inputData.month ||
      inputData.day
    ) {
      fetchObservations()
    }
  }, [inputData])

  return (
    <div>
      <SearchInput
        value={inputData}
        setInputData={setInputData}
        onSearch={handleSearch}
        totalResults={totalResults}
      />
      <SearchBody observations={observations} />
    </div>
  )
}

export default DataFetcher
