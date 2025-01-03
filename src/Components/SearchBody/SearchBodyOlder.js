import React from "react"
import ObservationCardOlder from "../../Components/ObservationCard/ObservationCardOlder"

const SearchBodyOlder = ({ observations }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          {observations.map((observation) => (
            <ObservationCardOlder
              key={observation.id}
              observation={observation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBodyOlder
