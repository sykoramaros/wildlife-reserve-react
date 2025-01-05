import React from "react"
import DataFetcher from "../../Services/DataFetcher/DataFetcher"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"

const Fungi = () => {
  const renderSearchInput = (
    observations,
    totalResults,
    inputData,
    handleSearch,
    handleInputChange
  ) => {
    const filteredObservations = observations.filter(
      (observation) => observation.taxon.iconicTaxonName === "Fungi"
    )
    return (
      <div>
        <div className="container">
        <h1 class="text-center text-primary display-4 mt-4">Fungi</h1>
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

export default Fungi
