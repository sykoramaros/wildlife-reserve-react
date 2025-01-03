import React from "react"
import DataFetcher from "../../Services/DataFetcher/DataFetcher"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"

const Try = () => {
  const renderSearchInput = (
    observations,
    totalResults,
    inputData,
    handleSearch,
    handleInputChange
  ) => {
    const filteredObservations = observations.filter(
      (observation) => /^.*$/.test(observation.taxon?.iconicTaxonName) // pro cokoliv
    )
    return (
      <div>
        <div className="container">
          <SearchInput
            value={inputData}
            onChange={handleInputChange}
            onSearch={handleSearch}
            totalResuts={totalResults}
          />
          <SearchBody observations={filteredObservations} />
        </div>
      </div>
    )
  }

  return <DataFetcher components={renderSearchInput} />
}

export default Try
