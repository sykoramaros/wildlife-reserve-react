import React, { useState } from "react"
import { getObservationsByMultipleFilters } from "../../../Services/WildlifeReserveService/WildlifeReserveService" // Importování služby pro získání pozorování s vícero filtry
import SearchBody from "../../../Components/SearchBody/SearchBody" // Importování komponenty pro zobrazení výsledků vyhledávání

// Komponenta pro zadání vyhledávacího vstupu a zobrazení výsledků
const PlantsSearchInput = ({ onSearch }) => {
  // Stav pro pozorování, celkový počet výsledků a vstupní data
  const [observations, setObservations] = useState([]) // Stav pro uložení pozorování
  const [totalResults, setTotalResults] = useState(0) // Stav pro uložení celkového počtu výsledků
  const [inputData, setInputData] = useState({
    taxonName: "", // Filtr pro název taxonu
    year: null, // Filtr pro rok
    month: null, // Filtr pro měsíc
    day: null, // Filtr pro den
    placeGuess: "", // Filtr pro místo
  })

  // Funkce pro získání pozorování na základě filtrů
  const fetchObservations = async () => {
    // Pokud nejsou zadány žádné filtry, zobrazí se chybová hláška
    if (
      !inputData.taxonName &&
      !inputData.year &&
      !inputData.month &&
      !inputData.day
    ) {
      console.error("At least one filter is required.") // Chybová zpráva, že alespoň jeden filtr je požadován
      return
    }

    try {
      // Zavolání služby pro získání pozorování s aktuálně zadanými filtry
      const response = await getObservationsByMultipleFilters(inputData)
      const fetchedObservations = response.results // Uložení výsledků do proměnné
      setTotalResults(response.totalResults) // Nastavení celkového počtu výsledků
      // Uložení získaných pozorování do stavu, pokud jsou data platná
      setObservations(
        Array.isArray(fetchedObservations) ? fetchedObservations : [] // Zajištění, že data jsou ve formě pole
      )
    } catch (error) {
      // Chyba při získávání pozorování
      console.error("Error fetching observations:", error) // Chybová zpráva
      setTotalResults(0) // Resetování celkového počtu výsledků
      setObservations([]) // Resetování seznamu pozorování
    }
  }

  // Funkce pro vyhledávání na základě aktuálního vstupu
  const handleSearch = () => {
    fetchObservations() // Zavolání funkce pro získání pozorování
    onSearch(inputData) // Volání funkce předané jako prop pro informování rodiče (pokud je potřeba)
  }

  // Funkce pro změnu hodnoty vstupního pole
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputData({
      ...inputData,
      [name]: value,
    })
  }

  // Renderování komponenty
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col form-group d-flex flex-column gap-2">
          <div>
            <input
              className="form-control"
              type="text"
              name="taxonName"
              value={inputData.taxonName}
              onChange={handleInputChange}
              placeholder="Type common name (multiply filter)"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="year"
              value={inputData.year}
              onChange={handleInputChange}
              placeholder="Type at least year"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="month"
              value={inputData.month}
              onChange={handleInputChange}
              placeholder="Type month"
              disabled={!inputData.year}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="day"
              value={inputData.day}
              onChange={handleInputChange}
              placeholder="Type day"
              disabled={!inputData.year || !inputData.month}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="text"
              name="placeGuess"
              value={inputData.placeGuess}
              onChange={handleInputChange}
              placeholder="Type place guess (coming soon🙈)"
              disabled
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
        <p className="fs-4 mt-1">
          Number of observations: {totalResults || "..."}
        </p>
      </div>
      <SearchBody observations={observations} totalResults={totalResults} />
    </div>
  )
}

export default PlantsSearchInput
