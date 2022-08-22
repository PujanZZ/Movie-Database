import React, { useState, useEffect } from 'react'
import { Button, Card, CardMedia, Typography, CardActions, CardContent } from '@mui/material'




export default function ForPlot() {


    const [plot, setPlot] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)


    const getMovieRequest = async () => {


        const url = `https://api.themoviedb.org/3/search/multi?api_key=ddc454eebe3dda31e69b444a5dd1a269&language=en-US&query=${search}&page=${page}`
        const response = await fetch(url)

        const responseJson = await response.json()    //http res to json to make it look like obj
        //console.log(responseJson)
        if (responseJson.results) {
            setPlot(responseJson.results)
            console.log(responseJson.results)
        }
        //getMovieRequest(search)
    }

    // useEffect(() => {
    //     getMovieRequest(search)
    // }, [search, page])



    return (
        <>



            <div className="input-group">
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={(event) => setSearch(event.target.value)}
                />
                <Button variant='contained'
                    onClick={() => { getMovieRequest(search) }}
                >Search</Button>
            </div>

            {plot.map((plot, id) => (<>

                <div className='container mt-3 d-flex' key={id}>
                    {plot.poster_path != null &&
                        <>
                            <img src={'https://image.tmdb.org/t/p/w500' + plot.poster_path}
                                alt='mov1'
                                width='200rem' />


                            <div className='m-3'>
                                <h2>{plot.original_title}{plot.name}</h2>
                                <hr />

                                <p>{plot.overview}</p>
                            </div>
                        </>}
                </div>

            </>))}
            {plot.profile_path != null && <>
            {plot.filter(plot => plot.media_type === 'person').map((plot, id) => (
                <img src={'https://image.tmdb.org/t/p/w500' + plot.profile_path}
                    alt='mov'
                    width='200rem' />
            ))}
            </>}





        </>
    )
}
