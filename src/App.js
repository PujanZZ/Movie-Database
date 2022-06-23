import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import './components/Search.css'

import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBar from './components/SearchBar';

function App() {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async () => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=28abe358`
    const response = await fetch(url)

    const responseJson = await response.json()    //http res to json to make it look like obj
    //console.log(responseJson)
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }



  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  return (
    <>
      <div className='container-fluid movie-app width'>

        <div className='row d-flex mt-4 mb-4'>

          <MovieListHeading heading='Movies' />
          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

        </div>

        <div className='row d-flex align-items-center mt-4 mb-4 width'>

          <MovieList movies={movies} />


        </div>

      </div>
    </>

  );
}

export default App;