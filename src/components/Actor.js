import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Typography, Modal, Box, Button, Alert, AlertTitle } from '@mui/material'

export default function Actor() {


    const [list, setList] = useState([1])
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const getActor = async () => {


        const url = `https://api.themoviedb.org/3/search/person?api_key=ddc454eebe3dda31e69b444a5dd1a269&language=en-US&query=${search}&page=1&include_adult=false`
        const response = await fetch(url)
        const responseJson = await response.json()

        if (responseJson.results.length > 0) {
            setList(responseJson.results[0])
            console.log(responseJson.results[0])
        }

    }

    // useEffect(() => {
    //     getActor()
    // }, [])


    return (
        <>

            <div className="zzz container mt-4">
                <h1>Search for any actor</h1>
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
                        onClick={() => { getActor(search) }}
                    >Search</Button>
                </div>
            </div>



            {list.length != 1 && <>
                <div className='container m-10 mt-5'>
                    <Card sx={{ maxWidth: 270 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={'https://image.tmdb.org/t/p/w500' + list.profile_path}
                                alt="actor"
                                onClick={handleOpen}

                            />
                            <CardContent style={{ backgroundColor: '#1E1E1E', color: 'white' }}>
                                <Typography gutterBottom variant="h4" component="div" >
                                    {list.name}
                                </Typography>
                                <Typography variant="h5" color="">
                                    Work: {list.known_for_department}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            {/* ANY THING HERE */}
                            <Typography id="modal-modal-title" variant="h6" component="h2">

                            </Typography>
                            {list.known_for.map((test, index) => (
                                <>
                                    <div className='topm container d-flex' key={index}>
                                        {test.title}
                                        <div className='topmm'>
                                            <img src={'https://image.tmdb.org/t/p/w500' + test.poster_path}
                                                alt='mov1'
                                                width='80rem' />
                                        </div>
                                    </div>
                                </>

                            ))}
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                            </Typography>
                            {/* HERE TOO */}
                        </Box>
                    </Modal>

                </div>
            </>}

        </>
    )
}
