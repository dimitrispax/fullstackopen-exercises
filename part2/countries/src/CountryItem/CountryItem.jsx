import { useState } from 'react';
import Country from '../Country/Country.jsx'

const CountryItem = ({ CountryData }) => {

    const [showCountryDetails, setShowCountryDetails] = useState(false)
    const [buttonName, setButtonName] = useState('show')

    /* Function that handles the functionality of the show/hide button. */
    const handleShowButton = () => {
        if (showCountryDetails === true) {
            setShowCountryDetails(false)
            setButtonName('show')
        } else {
            setShowCountryDetails(true)
            setButtonName('hide')
        }
    }

    return (
        <>
            <div key={CountryData.name.common} style={{ display: 'flex' }}>
                <p>{CountryData.name.common}</p>
                <button onClick={handleShowButton}>{buttonName}</button>
            </div>
            {   /* When the show country details button is pressed,
                   show render the country details, else don't return anything. */
                showCountryDetails === true ?
                    <Country CountryData={CountryData} />
                    :
                    <></>
            }
        </>
    )
}

export default CountryItem