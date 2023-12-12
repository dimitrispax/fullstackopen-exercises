const Country = ({ Country }) => {
    console.log(Country[0].flags.png);
    return (
        <div>
            <h2>{Country[0].name.common}</h2>
            <p>capital {Country[0].capital}</p>
            <p>area {Country[0].area}</p>
            <h4>languages: </h4>
            {
                Object.values(Country[0].languages).map(language => {
                    return (
                        <ul key={language}>
                            <li>{language}</li>
                        </ul>
                    )
                })
            }
            <img src={Country[0].flags.png} width={200} heigth={200} />
        </div>

    )

}

export default Country