import React from "react"
import { useState } from "react"

const SearchInput = ({ value, setInputData, onSearch, totalResults }) => {
  // Funkce pro změnu hodnoty v poli formuláře
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Nastavení nové hodnoty pro vstupní pole
    setInputData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value // Pokud hodnota není prázdná, nastaví ji
          ? name === "year" || name === "month" || name === "day"
            ? parseInt(value) // Pokud je název pole 'year', 'month' nebo 'day', převede hodnotu na celé číslo
            : value
          : null, // Pokud je hodnota prázdná, nastaví hodnotu na null
      }
      return newData
    })
  }

  // Funkce pro spuštění vyhledávání s aplikováním filtrů
  const handleSearch = () => {
    const filters = {
      taxonName: value.taxonName,
      year: value.year,
      month: value.month,
      day: value.day,
      placeGuess: value.placeGuess,
    }

    // Zkontroluje, zda alespoň jeden filtr obsahuje hodnotu
    const hasFilter = Object.values(filters).some((filter) => filter)

    // Pokud je nějaký filtr nastaven, zavolá funkci onSearch s filtry
    if (hasFilter) {
      onSearch(filters)
    } else {
      // Pokud nejsou žádné filtry nastaveny, zavolá funkci pro resetování výsledků
      console.error("At least one filter is required.")
    }
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
              onChange={handleInputChange} // zachováme onChange pro aktualizaci hodnoty
              placeholder="Type common name (multiply filter)"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="year"
              value={value.year || ""}
              onChange={handleInputChange} // zachováme onChange pro aktualizaci hodnoty
              placeholder="Type at least year"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="month"
              value={value.month || ""}
              onChange={handleInputChange} // zachováme onChange pro aktualizaci hodnoty
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
              onChange={handleInputChange} // zachováme onChange pro aktualizaci hodnoty
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
              placeholder="Type place guess (coming soon🙈)"
              disabled
            />
          </div>
          <div>
            <button
              className="form-control btn btn-success"
              onClick={handleSearch} // Vyhledávání se spustí pouze po kliknutí na tlačítko
            >
              Search
            </button>
          </div>
        </div>
        <hr className="mt-4" />
        <p className="fs-4 mt-1">
          Number of observations: {totalResults || "..."}
        </p>
      </div>
    </div>
  )
}

export default SearchInput
