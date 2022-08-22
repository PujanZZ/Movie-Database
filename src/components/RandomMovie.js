import React, { useState, useEffect } from 'react'
import { Button, CircularProgress, LinearProgress } from '@mui/material/'

export default function RandomMovie() {

  const [quote, setQuote] = useState([])

  const [load, setLoad] = useState(false)

  const randomQuote = async () => {

    setLoad(true)
    const url = "https://movie-quote-api.herokuapp.com/v1/quote"
    const response = await fetch(url)

    const responseJson = await response.json()
    setQuote(responseJson)
    console.log(responseJson)

    setTimeout(()=>{

      setLoad(false)
},350)

  }

  useEffect(() => {
    randomQuote()
  }, [])






  return (
    <>
      <hr />

      <div className='rand'>



        <div className="kek22 container text-center">
          <h1>Movie/TV Quotes</h1>
          <p>{quote.quote}</p>
          <p>-{quote.role} from <i><b>{quote.show}</b></i></p>
       
          {load ? <><LinearProgress /></> : <><Button onClick={randomQuote} variant='contained'>Next Quote</Button></>}
 

          <br />
          <br />


          <hr />
        </div>

      </div>

    </>

  )
}
