import React from "react"
import DataFetcher from "../../Services/DataFetcher/DataFetcher"
import SearchInput from "../../Components/SearchInput/SearchInput"
import SearchBody from "../../Components/SearchBody/SearchBody"

const Insects = () => {
  const renderSearchInput = (
    observations,
    totalResults,
    inputData,
    handleSearch,
    handleInputChange
  ) => {
    return (
      <div>
        <div className="container">
          <SearchInput
            value={inputData.taxonName}
            onChange={handleInputChange}
            onSearch={handleSearch}
            totalResuts={totalResults}
          />
          <SearchBody observations={observations} />
        </div>
      </div>
    )
  }

  return <DataFetcher components={renderSearchInput} />
}

export default Insects
