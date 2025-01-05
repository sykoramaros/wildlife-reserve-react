import React from "react"
import ObservationCard from "../../Components/ObservationCard/ObservationCard"

// Funkce pro resetování výsledků

const SearchBody = ({ observations }) => {
  return (
    <div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {observations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBody
