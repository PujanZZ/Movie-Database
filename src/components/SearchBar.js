import React from 'react'

export default function SearchBar(props) {

const handleValue = (e) => {
 props.setSearchValue(e.target.value)
}   


    return (
        <div className='col col-sm-4'>
            <div className="wrap">
                <div className="search">
                    <input 
                    type="text" 
                    className="searchTerm" 
                    placeholder="Search the movie..." 
                    value={props.value}  
                    onChange={handleValue}  
                    />
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}