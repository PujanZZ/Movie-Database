import { ImageList, ImageListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import ReviewBox from './ReviewBox'


export default function MovieCategory() {

 

    const [random,setRandom] = useState()
    const [picture, setPicture] = useState([])
    const [open, setOpen] = useState(false)


    const getMovieRequest = async () => {

        const url = `https://api.themoviedb.org/3/movie/popular?api_key=ddc454eebe3dda31e69b444a5dd1a269&language=en-US&page=1`
        const response = await fetch(url)

        const responseJson = await response.json()    //http res to json to make it look like obj
        setPicture(responseJson.results)
        console.log(responseJson)
    }


    
    useEffect(() => {
        getMovieRequest()
   

    }, [])


    return (
        <>

            {picture.map((movie,tv, index) => (

                <>

                    <div className='moviep'>
                        <div className='moviec'>
                            <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt='mov' width='200rem'
                                onClick={() =>setOpen(movie.id)}
                            />
                            <p>{movie.original_title}</p>
                          
                        </div>

                    </div>
                    {open === movie.id && <ReviewBox key={movie.id} setOpen={setOpen} open={open} picture={picture} 
                    title={movie.original_title} poster={movie.poster_path} overview={movie.overview} 
                    date={movie.release_date} star={movie.vote_average} 
                    />}  

                 

                </>

            ))}




        </>
    )
}
