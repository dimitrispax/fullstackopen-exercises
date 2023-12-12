import Country from '../Country/Country.jsx'
import CountryItem from '../CountryItem/CountryItem.jsx'

const Countries = ({ CountriesData }) => {


    if (CountriesData.length > 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    }
    else if (CountriesData.length < 10 && CountriesData.length > 1) {
        return (
            <>
                {
                    CountriesData.map(countryData => {
                        return (
                            <CountryItem key={countryData.name.common} CountryData={countryData} />
                        )
                    })
                }
            </>
        )
    } else if (CountriesData.length === 1) {
        return (
            <Country CountryData={CountriesData[0]} />
        )
    } else {
        return (
            <p>No matches.</p>
        )
    }
}

export default Countries