
const SearchField = ({ Search, HandleSearchChange }) => {

    return (
        <div>
            find countries <input value={Search} onChange={HandleSearchChange} />
        </div>
    )

}

export default SearchField