import React from 'react'


const MovieList = (props) => {

    const FavComp = props.favComp


    return (


        <>
        
                   {props.movies && props.movies.length != null && <>
                {props.movies.map((movie, id) => (<>
                    <div className='image-container' key={id}>

                        <img src={movie.Poster} alt='movie' onClick={() => props.handleFav(movie)} />
                        <div className='mtitle'>
                        <p>{movie.Title}</p>
                       
                        </div>

                    </div>
                    
                  


                </>))}</>}
           
        </>
     
    )
}

export default MovieList