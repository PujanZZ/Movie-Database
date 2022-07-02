import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './components/Search.css'
import './components/Banner.css'

import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBar from './components/SearchBar';
import AddFav from './components/AddFav';
import Banner from './components/Banner';

function App() {

  const [movies, setMovies] = useState([])
  const [favourite, setFavourite] = useState([])
  const [searchValue, setSearchValue] = useState('')



  useEffect(() => {
    const getMovieRequest = async () => {

      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=28abe358`
      const response = await fetch(url)

      const responseJson = await response.json()    //http res to json to make it look like obj
      //console.log(responseJson)
      if (responseJson.Search) {
        setMovies(responseJson.Search)
        console.log(responseJson.Search)
      }
    }

    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFav = JSON.parse(
      localStorage.getItem('react-app-fav')
    )

    setFavourite(movieFav)

  }, [])



  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-app-fav', JSON.stringify(items))
  }


  const addFavourite = (movie) => {
    const newFavList = [...favourite, movie]          //add movie to fav state
    setFavourite(newFavList)
    //console.log(newFavList)
    saveToLocalStorage(newFavList)                    //update array
  }

  const removeFavourite = (movie) => {
    const newFavList = favourite.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    )
    setFavourite(newFavList)
    saveToLocalStorage(newFavList)
  }


  return (
    <>
      <div>
        <Banner />
      </div>
      <div className='container-fluid movie-app width'>
        <div className='row d-flex mt-4 mb-4'>
          <MovieListHeading heading='Movies/Series' />
          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4 width'>
          <MovieList
            movies={movies}
            handleFav={addFavourite}
            favComp={AddFav}

          />
        </div>
        <div className='row d-flex mt-4 mb-4'>
          <MovieListHeading heading='Favourites' />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4 width'>
          <MovieList
            movies={favourite}
            handleFav={removeFavourite}
            favComp={AddFav}

          />
        </div>

      </div>
    </>

  );
}

export default App;