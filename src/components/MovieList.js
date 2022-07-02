import React from 'react'

const MovieList = (props) => {

    const FavComp = props.favComp

    
    return (
        <>


            {props.movies.length > 0 && <> {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-4' key={index}>
                    <img src={movie.Poster} alt='movie'  onClick={() => props.handleFav(movie)} />
                   
                    <div
                        //onClick={() => props.handleFav(movie)}

                        className='overlay d-flex align-items-center justify-content-center'>

                    </div>


                </div>

            ))}</>}
        </>
    )
}

export default MovieList