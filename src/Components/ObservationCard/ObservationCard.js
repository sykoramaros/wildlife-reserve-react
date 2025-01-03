import React from "react"

const ObservationCard = ({ observation }) => {
  return (
    <div className="col" key={observation.id}>
      <div className="card h-100">
        <img
          src={observation.photos?.[0]?.url}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {observation.taxon?.preferredCommonName}
          </h5>
          <p className="card-text">{observation.taxon.name}</p>
          <p className="card-text fs-6">ID: {observation.id}</p>
          <p className="card-text">
            <span className="fs-2">🌍 </span>
            {observation.placeGuess}
          </p>
          <p className="card-text">
            <span className="fs-2">🗓️ </span>
            {observation.observedOnDetails?.year || "N/A"}/
            {observation.observedOnDetails?.month || "N/A"}/
            {observation.observedOnDetails?.day || "N/A"}
          </p>
          <p className="card-text">
            <span className="fs-2">📍 </span>
            {observation.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ObservationCard
