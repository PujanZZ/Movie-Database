import { ImageList, ImageListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReviewBox from './ReviewBox'


export default function TvCategory() {


    const [picture, setPicture] = useState([])
    const [open, setOpen] = useState(false)

    const getTvRequest = async () => {

        const url = 'https://api.themoviedb.org/3/tv/popular?api_key=ddc454eebe3dda31e69b444a5dd1a269&language=en-US&page=1'
        const response = await fetch(url)

        const responseJson = await response.json()    //http res to json to make it look like obj
        setPicture(responseJson.results)
        console.log(responseJson)
    }


    useEffect(() => {

        getTvRequest()

    }, [])



    return (
        <>

            {picture.map((movie, index) => (

                <>

                    <div className='moviep'>
                        <div className='moviec'>
                            <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt='mov' width='200rem'
                                onClick={() => setOpen(movie.id)}
                            />
                            <p>{movie.original_name}</p>
                        </div>

                    </div>
                    {open === movie.id && <ReviewBox key={movie.id} setOpen={setOpen} open={open} picture={picture}
                        title={movie.name} poster={movie.poster_path} overview={movie.overview}
                        date={movie.first_air_date} star={movie.vote_average}
                    />}



                </>

            ))}




        </>
    )
}
