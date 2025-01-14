import React, { useState } from "react"
import { getObservationsByInsectTaxonName } from "../../Services/WildlifeReserveService/WildlifeReserveService"
import ObservationCard from "../../Components/ObservationCard/ObservationCard" // Importujte ObservationCard

const InsectsTry = () => {
  const [inputValue, setInputValue] = useState("")
  const [observations, setObservations] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = () => {
    if (!inputValue) {
      setError("Please enter a taxon name.")
      return
    }
    setError(null)
    getObservationsByInsectTaxonName(inputValue)
      .then((data) => {
        setObservations(data)
      })
      .catch(() => {
        setError("Error fetching observations.")
      })
  }

  return (
    <div>
      <h1 className="text-center text-success display-4 mt-4">Insects🐜</h1>
      <div className="container">
        <div className="row row-cols-1 justify-content-center align-items-center mt-3">
          <div className="w-75">
            <label className="form-label" htmlFor="taxonName">
              Enter Insect Taxon Name:
            </label>
            <input
              className="form-control"
              type="text"
              id="taxonName"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type name"
            />
            <div className="mt-3">
              <button
                className="form-control btn btn-success"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {observations
              ? observations.map((observation) => (
                  <ObservationCard
                    key={observation.id}
                    observation={observation}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsectsTry
