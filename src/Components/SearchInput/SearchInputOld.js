import React from "react"
import { useState } from "react"
// import CalendarFilter from "../CalendarFilter/CalendarFilter.js"

const SearchInputOld = ({ value, onChange, onSearch, totalResults }) => {
  const [filters, setFilters] = useState({
    day: null,
    month: null,
    year: null,
  })

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col-md-4">
          <input
            className="form-control"
            type="text"
            name="taxonName"
            value={value.taxonName || ""}
            onChange={onChange}
            placeholder="Type name"
          />
          <input
            className="form-control"
            type="text"
            name="year"
            value={value.year || ""}
            onChange={onChange}
            placeholder="Type year"
          />
        </div>

        {/* <div className="col-md-4">
          <CalendarFilter
            filters={filters}
            setFilters={setFilters}
            onChange={onChange}
            onSearch={onSearch}
          />
        </div> */}
        <br />
        <div className="col-auto">
          <button className="form-control" onClick={onSearch}>
            Search
          </button>
        </div>
        <hr className="mt-4" />
        <p className="fs-4 mt-1">Number of observations: {totalResults}</p>
      </div>
    </div>
  )
}

export default SearchInputOld
