import React from "react"

const SearchInput = ({ value, onChange, onSearch, totalResuts }) => {
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
            placeholder="Enter name"
          />
        </div>
        <br />
        <div className="col-auto">
          <button className="form-control" onClick={onSearch}>
            Search
          </button>
        </div>
        <hr className="mt-4" />
        <p className="fs-4 mt-1">Number of observations: {totalResuts}</p>
      </div>
    </div>
  )
}

export default SearchInput
