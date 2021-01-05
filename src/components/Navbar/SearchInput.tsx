import React from 'react'

const SearchInput = () => {
    return (
        <form className="navbar__search">
            <input  className="navbar__search-input" type="text"/>
            <button className="navbar__search-btn" type="submit" aria-label="search">Search</button>
        </form>
    )
}

export default SearchInput
