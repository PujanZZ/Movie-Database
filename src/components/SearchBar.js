import React from 'react'
import { Typography, TextField } from '@mui/material'

export default function SearchBar(props) {

    const handleValue = (e) => {
        props.setSearchValue(e.target.value)
    }


    return (
        
            <div className="search">
                <TextField
                    variant='standard'
                    style={{ backgroundColor: 'white' }}
                    type="text"
                    className="searchTerm"
                    label="Search the movie..."
                    value={props.value}
                    onChange={handleValue}
                />

            </div>

        
    )
}