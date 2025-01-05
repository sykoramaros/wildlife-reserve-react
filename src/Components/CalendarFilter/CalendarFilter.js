import React from "react"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useHistory } from "react-router-dom"

const CalendarFilter = ({ filters, setFilters }) => {
  const history = useHistory()

  // Funkce pro aktualizaci filtrů
  const handleDateChange = (date) => {
    if (date) {
      const day = date.getDate()
      const month = date.getMonth() + 1 // Měsíce jsou indexovány od 0
      const year = date.getFullYear()

      // Aktualizace stavu s novým datem
      setFilters({ day, month, year })

      // Aktualizace URL s parametry
      const queryParams = new URLSearchParams()
      if (day) queryParams.append("day", day)
      if (month) queryParams.append("month", month)
      if (year) queryParams.append("year", year)

      history.push({ search: queryParams.toString() }) // Přesměrování s parametry
    }
  }

  return (
    <div>
      <h5>Vyberte datum</h5>
      <DatePicker
        selected={
          filters
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
