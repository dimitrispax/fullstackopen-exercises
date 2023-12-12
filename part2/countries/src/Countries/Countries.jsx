import Country from '../Country/Country.jsx'

const Countries = ({ Countries }) => {
    if (Countries.length > 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    }
    else if (Countries.length < 10 && Countries.length > 1) {
        return (
            <div>
                {
                    Countries.map(country => {
                        return (
                            <p key={country.name.common}>{country.name.common}</p>
                        )
                    })
                }
            </div>
        )
    } else if (Countries.length === 1) {
        return (
            <Country Country={Countries} />
        )
    } else {
        return (
            <p>No matches.</p>
        )
    }
}

export default Countries