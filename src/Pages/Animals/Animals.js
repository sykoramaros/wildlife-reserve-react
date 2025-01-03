import React from "react"
import DataFetcher from "../../Services/DataFetcher/DataFetcher"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"

const Animals = () => {
  const renderSearchInput = (
    observations,
    totalResults,
    inputData,
    handleSearch,
    handleInputChange
  ) => {
    const filteredObservations = observations.filter(
      (observation) =>
        observation.taxon.iconicTaxonName === "Animalia" ||
        observation.taxon.iconicTaxonName === "Mammalia" ||
        observation.taxon.iconicTaxonName === "Actinopterygii" ||
        observation.taxon.iconicTaxonName === "Mollusca" ||
        observation.taxon.iconicTaxonName === "Aves"
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

export default Animals
