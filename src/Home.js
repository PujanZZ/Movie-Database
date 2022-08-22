import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Navbar.css'
import './App.css'
import './components/Search.css'

import './components/Banner.css'


import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBar from './components/SearchBar';
import AddFav from './components/AddFav';
import Banner from './components/Banner';
import { db } from './firebase'
import RandomMovie from './components/RandomMovie';

import { Button, FormControl, InputLabel, Select, MenuItem, Rating } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import MovieCategory from './components/MovieCategory';
import TvCategory from './components/TvCategory';
import ReviewBox from './components/ReviewBox';
import ForPlot from './components/ForPlot';
import MovieInput from './components/MovieInput';

function Home() {

  const [movies, setMovies] = useState([])
  const [favourite, setFavourite] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [items, setItems] = useState([])
  const [pageNum, setPageNum] = useState(1)

  const [category, setCategory] = useState('')



  useEffect(() => {
    const getMovieRequest = async () => {


      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=28abe358&page=${pageNum}&`
      const response = await fetch(url)

      const responseJson = await response.json()    //http res to json to make it look like obj
      //console.log(responseJson)
      if (responseJson.Search) {
        setMovies(responseJson.Search)
        console.log(responseJson.Search)
      }
    }

    getMovieRequest(searchValue)

  }, [searchValue, pageNum])



  //   useEffect(() => {
  //     const movieFav = JSON.parse(

  //       localStorage.getItem('react-app-fav')

  //     )

  //     setFavourite(movieFav)

  //   }, [])



  //  const saveToLocalStorage = (items) => {
  //     localStorage.setItem('react-app-fav', JSON.stringify(items))
  //   }

  useEffect(() => {
    db.collection("Favourite Movies").onSnapshot((snapshot) => {
      const newCartProduct = snapshot.docs.map((doc) => ({
        ID: doc.id,
        ...doc.data(),
      }));
      setFavourite(newCartProduct);
    });
  }, [])


  const addFavourite = (movie) => {
    const newFavList = [...favourite, movie]          //add movie to fav state
    setFavourite(newFavList)

    db.collection("Favourite Movies")
      .doc(movie.ID)
      .set(movie)
      .then(() => {
        console.log("successfully added to fav");
      });
    //console.log(newFavList)
    //saveToLocalStorage(newFavList)                    //update array

  }

  const removeFavourite = (movie) => {
    db.collection("Favourite Movies")
      .doc(movie.ID)
      .delete()
      .then(() => {
        console.log("deleted");
      });
    // const newFavList = favourite.filter(
    //   (favourite) => favourite.imdbID !== movie.imdbID
    // )
    // setFavourite(newFavList)
    // //saveToLocalStorage(newFavList)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }





  return (
    <>
      <div>
        <Banner />
      </div>
      <div className='kek m-3 mb-5'>
        <div className='m-3'>
          <MovieListHeading heading='Top Trending' />
        </div>
        <hr />
        <br />
        <div className='fullS mb-3'>
          <FormControl fullWidth variant='filled' style={{ backgroundColor: 'white',borderRadius:'15px' }}>
            <InputLabel id="demo-simple-select-label" style={{ color: 'black' }}>Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={handleCategory}
              style={{ color: 'black',borderRadius:'15px' }}

            >
              <MenuItem value='movie'>Movies</MenuItem>
              <MenuItem value='series'>Series</MenuItem>

            </Select>
          </FormControl>
        </div>


        <div className='test d-flex'>
          {category === 'movie' && <><MovieCategory /></>}
          {category === 'series' && <><TvCategory /></>}

        </div>
      </div>

      <div className='container-fluid movie-app width'>

        <div className='movies'>
          <div className='movielist'>
            <MovieListHeading heading='Movies/Series' />
          </div>
          <hr />


          <div className='search2'>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4 width'>
          <MovieList
            movies={movies}
            handleFav={addFavourite}
            favComp={AddFav}

          />

        </div>

        <div className='pageitem'>
          <Button variant='text'
            startIcon={<ArrowCircleLeftOutlinedIcon onClick={() => { setPageNum(pageNum - 1) }} style={{ fontSize: '3.5rem' }} />}
            endIcon={<ArrowCircleRightOutlinedIcon onClick={() => { setPageNum(pageNum + 1) }} style={{ fontSize: '3.5rem' }} />}
            style={{ backgroundColor: '#002c50;', fontSize: '1.5rem' }}
          ></Button>
        </div>



        <div className='row d-flex mt-4 mb-4'>
          <MovieListHeading heading='Favourites' />
        </div>
        <hr/>
        <div className='row d-flex align-items-center mt-4 mb-4 width'>
          <MovieList
            movies={favourite}
            handleFav={removeFavourite}
            favComp={AddFav}
            pageNum={pageNum}
          />

        </div>


        {/* <div className='random'>
          <RandomMovie />
        </div> */}

        <hr />





        {/* <div className='test d-flex'>
          <MovieCategory />
        </div>
        <div className='test d-flex'>
          <TvCategory />
        </div> */}


      </div>

      {/* 
      <div className='m-3 mt-5'>
        <MovieListHeading heading='Search Archive' />
        <hr />

      </div>
      <div className='container mb-5'>
        <ForPlot />
      </div> */}









    </>

  );
}

export default Home;