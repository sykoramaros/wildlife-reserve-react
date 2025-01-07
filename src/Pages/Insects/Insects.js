import React, { useState, useEffect } from "react"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"

const Insects = () => {
  // Stavové proměnné pro pozorování, vstupní data a celkové výsledky
  const [observations, setObservations] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [inputData, setInputData] = useState({
    taxonName: "",
    year: null,
    month: null,
    day: null,
  })

  // Funkce pro načítání dat z API
  const fetchObservations = async () => {
    try {
      const response = await fetch("API_URL_HERE") // Nahraďte skutečnou URL API
      const data = await response.json()
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

  // Funkce pro vyhledávání podle zadaných hodnot
  const handleSearch = () => {
    const filteredObservations = observations.filter((observation) => {
      const matchesTaxon = observation.taxon.iconicTaxonName === "Insecta"
      const matchesTaxonName = inputData.taxonName
        ? observation.taxon.iconicTaxonName.includes(inputData.taxonName)
        : true
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
        matchesTaxonName &&
        matchesYear &&
        matchesMonth &&
        matchesDay
      )
    })

    setObservations(filteredObservations)
  }

  // Renderování formuláře pro vyhledávání
  const renderSearchInput = () => (
    <div className="container">
      <h1 className="text-center text-success display-4 mt-4">Insects</h1>
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

export default Insects
