import React from "react"
import ObservationCard from "../../Components/ObservationCard/ObservationCard"

const SearchBody = ({ observations }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          {observations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBody
