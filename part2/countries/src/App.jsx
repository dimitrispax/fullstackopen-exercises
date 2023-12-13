import { useState, useEffect } from 'react'
import SearchField from './SearchField/SearchField.jsx'
import Countries from './Countries/Countries.jsx'

import countriesService from './Services/coutries.js'

const App = () => {
  const [search, setSearch] = useState('')
  const [countriesData, setCountriesData] = useState([])

  const countriesToShow = countriesData.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(response => {
        setCountriesData(response)
      })
  }, []);


  return (
    <div>
      <SearchField Search={search} HandleSearchChange={handleSearchChange} />
      <Countries CountriesData={countriesToShow} />
    </div>
  )
}

export default App