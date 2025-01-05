import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CalendarFilter = ({ filters, setFilters, onSearch }) => {
  const handleDateChange = (date) => {
    if (date) {
      const day = date.getDate()
      const month = date.getMonth() + 1 // Měsíce jsou indexovány od 0
      const year = date.getFullYear()

      // Aktualizace stavu s novým datem
      setFilters({ day, month, year })

      // Zavolání onSearch pro automatické hledání při změně data
      onSearch()
    }
  }

  return (
    <div>
      <h5>Choose date</h5>
      <DatePicker
        selected={
          filters.year && filters.month && filters.day
            ? new Date(filters.year, filters.month - 1, filters.day)
            : null
        }
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  )
}

export default CalendarFilter
