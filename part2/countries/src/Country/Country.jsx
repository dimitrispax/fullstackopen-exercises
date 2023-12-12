const Country = ({ CountryData }) => {
    return (
        <div>
            <h2>{CountryData.name.common}</h2>
            <p>capital {CountryData.capital}</p>
            <p>area {CountryData.area}</p>
            <h4>languages: </h4>
            {
                Object.values(CountryData.languages).map(language => {
                    return (
                        <ul key={language}>
                            <li>{language}</li>
                        </ul>
                    )
                })
            }
            <img src={CountryData.flags.png} width={200} heigth={200} />
        </div>

    )

}

export default Country