import React from "react"

const SearchInput = ({ value, onChange, onSearch, totalResuts }) => {
  return (
    <div>
      <input
        type="text"
        name="taxonName"
        value={value}
        onChange={onChange}
        placeholder="Enter common name or latin name"
      />
      <button onClick={onSearch}>Search</button>
      <hr />
      <p className="fs-4 mt-3">Number of observations: {totalResuts}</p>
    </div>
  )
}

export default SearchInput
