import React from "react"
import { useState, useEffect } from "react"
import { data } from "react-router-dom"
import SearchInput from "../../Components/SearchInput/SearchInput"
import ObservationCard from "../../Components/ObservationCard/ObservationCard"
import { getObservationsByMultipleFilters } from "../../Services/WildlifeReserveService/WildlifeReserveService"

const Insects = () => {
  const [observations, setObservations] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [data, setData] = useState({
    taxonName: "Ant",
  })

  const fetchObservations = async () => {
    try {
      const response = await getObservationsByMultipleFilters(data)
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
    fetchObservations() // Volání API
  }

  useEffect(() => {
    if (data.taxonName) {
      fetchObservations()
    }
  }, [data])

  const handleInputChange = (element) => {
    const { name, value } = element.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div>
      <div className="container">
        <h1>Insects</h1>
        <SearchInput
          value={data.taxonName}
          onChange={handleInputChange}
          onSearch={handleSearch}
          totalResuts={totalResults}
        />
        <hr />
        <div className="row">
          {observations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Insects
