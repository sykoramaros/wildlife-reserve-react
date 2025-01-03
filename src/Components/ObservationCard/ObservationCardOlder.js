import React from "react"

const ObservationCardOlder = ({ observation }) => {
  return (
    <div className="col-md-4" key={observation.id}>
      <div className="card h-100">
        <div className="card-body">
          <p className="card-text">
            ID:
            <br />
            {observation.id}
          </p>
          <p className="card-text">
            Date:
            <br />
            {observation.createdAt}
          </p>
          <p className="card-text">
            Name:
            <br />
            {observation.taxon?.preferredCommonName}
          </p>
          <p className="card-text">
            Description:
            <br />
            {observation?.description}
          </p>
          <p className="card-text">
            Geolocation:
            <br />
            {observation.geojson?.coordinates}
          </p>
          <p className="card-text">
            Exact geolocation:
            <br />
            {observation.location}
          </p>
          <p className="card-text">
            User name:
            <br />
            {observation.apiUser.name}
          </p>
          <p className="card-text">
            Observation date:
            <br />
            {observation.observedOnDetails?.year || "N/A"}/
            {observation.observedOnDetails?.month || "N/A"}/
            {observation.observedOnDetails?.day || "N/A"}
          </p>
          <p className="card-text">
            Place:
            <br />
            {observation.placeGuess}
          </p>
          <p className="card-text">
            Quality grade:
            <br />
            {observation.qualityGrade}
          </p>
          <p className="card-text">
            Reviewed by:
            <br />
            {observation.reviewedBy}
          </p>
          <p className="card-text">
            Kind:
            <br />
            {observation.taxon.iconicTaxonName}
          </p>
          <p className="card-text">
            Latin name:
            <br />
            {observation.taxon.name}
          </p>
          <p className="card-text">
            Common name:
            <br />
            {observation.taxon.preferredCommonName}
          </p>
          <p className="card-text">
            Threatened?
            <br />
            {observation.threatened}
          </p>
          iNaturalist link:
          <br />
          <a href={observation.uri} target="_blank" rel="noreferrer">
            {observation.uri}
          </a>
          <p className="card-text text-warning">
            {observation.taxon?.threatened}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ObservationCardOlder
