import React from "react"
import { useState, useEffect } from "react"
import { getObservationsByMultipleFilters } from "../../Services/WildlifeReserveService/WildlifeReserveService"

const DataFetcher = ({ components }) => {
  const [observations, setObservations] = useState([]) // veskera vstupni data z API
  const [totalResults, setTotalResults] = useState(0) // celkovy pocet vstupnich dat z API backendu
  const [inputData, setInputData] = useState({
    // uzivatelovy vstupni data z frontendu
    taxonName: "",
  })

  // Funkce pro nacitani dat z API
  const fetchObservations = async () => {
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
    if (inputData.taxonName) {
      fetchObservations()
    }
  }, [inputData])

  const handleInputChange = (element) => {
    const { name, value } = element.target
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div>
      {components(
        observations,
        totalResults,
        inputData,
        handleSearch,
        handleInputChange
      )}
    </div>
  )
}

export default DataFetcher
