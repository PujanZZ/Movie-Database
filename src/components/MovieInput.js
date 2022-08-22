import React, { useEffect, useState } from 'react'

import './MovieInput.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Button } from '@mui/material'
import { Alert, AlertTitle, CircularProgress, Box, Modal } from '@mui/material';
import UserReview from './UserReview';


export default function MovieInput() {


    library.add(fab);
    const [search, setSearch] = useState('')
    const [list, setList] = useState([1])
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);










    const getRequest = async () => {

        setLoad(true)
        setError('')

        const url = `http://www.omdbapi.com/?apikey=28abe358&t=${search}&type=movie&plot=full`
        const response = await fetch(url)

        const responseJson = await response.json()    //http res to json to make it look like obj



        if (responseJson) {

            if (responseJson.Error) {
                setList([1])
                setLoad(false)
                setError(responseJson.Error)

            } else {

                setTimeout(() => {
                    setLoad(false)
                    setList(responseJson)
                }, 1000)



            }
            console.log(responseJson)
        }



    }




    return (
        <>

            <div className="zzz container mt-4">
                <h1>Get details about a movie</h1>
                <hr />

                <div className="input-group">
                    <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search for a movie..." aria-label="Search"
                        aria-describedby="search-addon"
                        onChange={(e) => setSearch(e.target.value)}
                        required

                    />
                    <Button variant='contained'
                        onClick={() => { getRequest(search) }}
                    >Search</Button>
                </div>
            </div>

            {load && <>
                <div className='d-flex justify-content-center mt-5'>
                    <CircularProgress />
                </div>
            </>
            }

            {error &&
                <>
                    <div className='container m-auto mt-5 w-100 justify-content-center'>
                        <Alert color='error' severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    </div>

                </>}

            {list.length !== 1 && <>
                <div className='cc container mt-5'>
                    <div className="movie" id="movie-card" >

                        <div className="movie__data" id="movie-data">
                            <div className="movie__poster">
                                <span className="movie__poster--fill">
                                    <img src={list.Poster} alt='mov' />
                                </span>
                                <span className="movie__poster--featured">
                                    <img src={list.Poster} alt='mov' />
                                </span>
                            </div>
                            <div className="movie__details">
                                <h2 className="movie__title mt-4">{list.Title}</h2>
                                <hr />
                                <ul className="movie__tags list--inline">
                                    <li className="movie__rated">{list.Rated}</li>
                                    <li className="movie__year">{list.Released}</li>
                                    <li className="movie__year">{list.Genre}</li>
                                </ul>
                                <p className="movie__plot mb-5">{list.Plot}</p>
                                <div className="movie__credits">
                                    <p><strong>Written by:</strong>    {list.Writer}</p>
                                    <p><strong>Directed by:</strong>   {list.Director}</p>
                                    <p><strong>Starring:</strong>      {list.Actors}</p>


                                    <ul className="movie__actors list--inline">
                                        {list.Source}

                                    </ul>
                                    <div className='d-flex mb-3 mt-2'>
                                        <div className='dollar mt-3'>
                                            Box Office Collection:
                                        </div>

                                        <span className='award mt-3'>{list.BoxOffice}</span>

                                    </div>
                                    <div className='d-flex'>
                                        <div className='icons'>
                                            <FontAwesomeIcon icon="fa-brands fa-imdb fa-10x" />

                                        </div>
                                        <span className='num mt-4'> {list.imdbRating}</span>
                                    </div>
                                    <div className='d-flex mb-3 mt-2'>
                                        <div>
                                            <EmojiEventsOutlinedIcon fontSize='large' />
                                        </div>
                                        <span className='award mt-1'>{list.Awards}</span>

                                    </div>
                                    <div>
                                        {list.Ratings.map((test, index) =>
                                            <>
                                                <div key={index}>
                                                    {test.Source}: {test.Value}
                                                </div>
                                            </>
                                        )}


                                    </div>


                                </div>

                            </div>

                        </div>
                        <div className='rbtn mt-4 mb-4'>
                            <Button variant='contained' onClick={handleOpen}>Add Review</Button>

                        </div>


                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        bg-color='background.paper'

                    >
                        <Box>
                            <div className='setbg'>
                                <UserReview handleClose={handleClose} list={list} />
                            </div>
                        </Box>
                    </Modal>


                </div>
            </>
            }









        </>

    )
}
