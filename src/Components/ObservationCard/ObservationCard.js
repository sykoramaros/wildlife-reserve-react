import React from "react"
import { useEffect } from "react"
import { Carousel } from "bootstrap/dist/js/bootstrap.bundle.min"

const ObservationCard = ({ observation }) => {
  const carouselId = `carouselExampleIndicators${observation.id}`

  useEffect(() => {
    const carouselElement = document.getElementById(carouselId)
    if (carouselElement) {
      new Carousel(carouselElement) // Inicializujeme carousel
    }
  }, [carouselId])

  return (
    <div className="col" key={observation.id}>
      <div className="card h-100 d-flex flex-column rounded-3 shadow-sm">
        <div id={carouselId} className="carousel slide">
          <div className="carousel-indicators">
            {observation.photos?.map((photo, index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {observation.photos?.map((photo, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={
                    photo.url.replace("square", "medium") ||
                    "./Photos/ImageNotFound.jpg"
                  }
                  className="d-block w-100 rounded-top-3 object-fit-cover"
                  alt={`Image ${index + 1}`}
                  style={{ height: "250px" }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {observation.taxon?.name || "Unknown Taxon"}
          </h5>
          <p className="card-text">{observation.taxon?.preferredCommonName}</p>
          <p className="card-text fs-6">ID: {observation.id}</p>
          <p className="card-text">
            <span className="fs-2">🌍 </span>
            {observation.placeGuess || "Unknown Place"}
          </p>
          <p className="card-text mt-auto">
            <span className="fs-2">🗓️ </span>
            {observation.observedOnDetails?.year || "N/A"}/
            {observation.observedOnDetails?.month || "N/A"}/
            {observation.observedOnDetails?.day || "N/A"}
          </p>
          <div className="card-footer mt-auto">
            <h6 className="fs-2">📍</h6>
            <p className="card-text fs-6">{observation.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObservationCard
