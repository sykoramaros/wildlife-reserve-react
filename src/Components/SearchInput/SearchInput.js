import React from "react"
import { useState } from "react"

const SearchInput = ({ value, setInputData, onSearch, totalResults }) => {
  // Funkce pro změnu hodnoty
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
        ? name === "year" || name === "month" || name === "day"
          ? parseInt(value)
          : value
        : null, // Pokud hodnota není prázdná, nastav ji, jinak null
    }))
  }

  const handleSearch = () => {
    const filters = {
      taxonName: value.taxonName,
      year: value.year,
      month: value.month,
      day: value.day,
      placeGuess: value.placeGuess,
    }
    const hasFilter = Object.values(filters).some((filter) => filter)

    if (hasFilter) {
      onSearch(filters)
    } else {
      console.error("At least one filter is required.")
    }
  }

  // Funkce pro filtrování pozorování podle `placeGuess`
  const filterObservations = (observations, placeGuess) => {
    if (!placeGuess) return observations
    return observations.filter(
      (observation) =>
        observation.placeGuess && observation.placeGuess.includes(placeGuess)
    )
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col form-group d-flex flex-column gap-2">
          <div>
            <input
              className="form-control"
              type="text"
              name="taxonName"
              value={value.taxonName || ""}
              onChange={handleInputChange} // Používáme handleInputChange
              placeholder="Type name"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="year"
              value={value.year || ""}
              onChange={handleInputChange} // Používáme handleInputChange
              placeholder="Type at least year"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="month"
              value={value.month || ""}
              onChange={handleInputChange} // Používáme handleInputChange
              placeholder="Type month"
              disabled={!value.year}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="day"
              value={value.day || ""}
              onChange={handleInputChange} // Používáme handleInputChange
              placeholder="Type day"
              disabled={!value.year || !value.month}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="text"
              name="PlaceGuess"
              value={value.placeGuess || ""}
              onChange={handleInputChange}
              placeholder="Type place guess"
            />
          </div>
          <div>
            <button
              className="form-control btn btn-success"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <hr className="mt-4" />
        <p className="fs-4 mt-1">Number of observations: {totalResults}</p>
      </div>
    </div>
  )
}

export default SearchInput
