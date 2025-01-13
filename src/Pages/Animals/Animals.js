import React, { useState, useEffect } from "react"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"
import { getObservationsByMultipleFilters } from "../../Services/WildlifeReserveService/WildlifeReserveService"

const Animals = () => {
  // Stavové proměnné pro sledování pozorování, vstupních dat a celkových výsledků
  const [observations, setObservations] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [inputData, setInputData] = useState({
    taxonName: "",
    year: null,
    month: null,
    day: null,
  })

  // Funkce pro získání dat (tato část bude odpovědná za načítání dat)
  // const fetchObservations = async () => {
  //   try {
  //     const response = await fetch("API_URL_HERE") // Nahraďte skutečnou URL
  //     const data = await response.json()
  //     setObservations(data.observations || [])
  //     setTotalResults(data.totalResults || 0)
  //   } catch (error) {
  //     console.error("Error fetching data:", error)
  //   }
  // }

  const fetchObservations = async (filters) => {
    try {
      const data = await getObservationsByMultipleFilters(filters)
      setObservations(data.observations || [])
      setTotalResults(data.totalResults || 0)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchObservations() // Načítání dat při načtení komponenty
  }, [])

  // Funkce pro změnu hodnot ve formuláři
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setInputData({
      ...inputData,
      [name]: value,
    })
  }

  // Funkce pro vyhledávání na základě zadaných hodnot
  const handleSearch = () => {
    // Filtrujeme pozorování podle zadaných hodnot (například podle taxonName, roku, měsíce, dne, a iconicTaxonName)
    const filteredObservations = observations.filter((observation) => {
      const matchesTaxon = inputData.taxonName
        ? observation.taxon.iconicTaxonName.includes(inputData.taxonName)
        : true

      const matchesIconicTaxonName =
        observation.taxon.iconicTaxonName === "Animalia" ||
        observation.taxon.iconicTaxonName === "Mammalia" ||
        observation.taxon.iconicTaxonName === "Actinopterygii" ||
        observation.taxon.iconicTaxonName === "Mollusca" ||
        observation.taxon.iconicTaxonName === "Aves"

      const matchesYear = inputData.year
        ? observation.date.startsWith(inputData.year)
        : true

      const matchesMonth = inputData.month
        ? observation.date.includes(`-${inputData.month}-`)
        : true

      const matchesDay = inputData.day
        ? observation.date.includes(`-${inputData.day}-`)
        : true

      return (
        matchesTaxon &&
        matchesIconicTaxonName &&
        matchesYear &&
        matchesMonth &&
        matchesDay
      )
    })

    setObservations(filteredObservations)
  }

  // Funkce pro renderování formuláře pro vyhledávání
  const renderSearchInput = () => (
    <div className="container">
      <h1 className="text-center text-success display-4 mt-4">Animals</h1>
      <SearchInput
        value={inputData}
        onChange={handleInputChange}
        onSearch={handleSearch}
        totalResults={totalResults}
      />
      <SearchBody observations={observations} />
    </div>
  )

  return renderSearchInput()
}

export default Animals
