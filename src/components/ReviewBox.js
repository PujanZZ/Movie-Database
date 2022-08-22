import { Button, Rating, Stack } from '@mui/material';
import { React, } from 'react';


export default function ReviewBox(props) {


    return (


        <>

            {/* {props.picture.map((movie) => ( */}

            <>
                <div className='container10'>
                    <div className="oxy-posts">
                        <div className='oxy-post'>
                            <img src={'https://image.tmdb.org/t/p/w500' + props.poster} alt='mov' width='80%' />

                        </div>
                        <div className='o-title'>
                            {props.title}

                        </div>
                  
                        <div className='date'>
                            RELEASE DATE : {props.date}
                        </div>
                        <div className='star'>
                            <Stack spacing={1}>
                            <Rating name="customized-10" defaultValue={props.star} max={10} readOnly/>
                            </Stack>
                            {props.star}/10
                        </div>
                        <div className='overview'>
                            
                        </div>






                        <Button variant='contained' size="small" onClick={() => props.setOpen(false)}>Close</Button>
                    </div>

                </div>

            </>

        </>
    );
}
