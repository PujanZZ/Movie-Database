import React from 'react'
import { useState, useEffect } from 'react';
import './UserReview.css'
import { db } from '../firebase'
import { addDoc, collection } from "firebase/firestore";
import { Button, Alert, AlertTitle } from '@mui/material';
import { useReducer } from 'react';
import { auth } from "../firebase";
import { useNavigate } from 'react-router';



export default function UserReview(props) {

  const tpain = useNavigate()
  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const [title, setTitle] = useState("")


  const [list, setList] = useState(props);

  const [disabled, setDisabled] = useState(false)
  const [alerts, setAlerts] = useState(false)



  useEffect(() => {
    setList(props.list);
  }, [props]);

  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user.uid)
        }
        else {
          setUser(null);
        }
      })
    }, [user])
    return user;
  }
  const user = GetCurrentUser();





  const userReviewRef = collection(db, "User Review")

  const createReview = async () => {
    if (user) {


      setDisabled(true)
      setAlerts(true)
      await addDoc(userReviewRef, { title: list.Title, username: name, review: review, poster: list.Poster, type: list.Type })
      console.log('review added')

      setTimeout(() => {
        setAlerts(false)
      }, 2000)

    } else {
      alert("Login First")
      setTimeout(() => {

       //tpain('/login')
      }, 3000)

    }
  }





  return (
    <>
      <div className='container bigbig'>
        <div className="row input-container" >
          <div className="col-xs-12">
            <div className="styled-input wide">

            </div>
          </div>
          <div className="col-xs-12">
            <div className="styled-input wide">
              {/* <input type="text"

                value={list.Title ?? ""}
                readOnly
                
               
              /> */}
              <div className='rh2 d-flex justify-content-center'>
                <h2>{list.Title}</h2>
                <img src={list.Poster} alt='mov' width='50rem' />
              </div>


            </div>
          </div>

          <div className="col-xs-12">
            <div className="styled-input wide">
              <input type="text"
                onChange={(e) => { setName(e.target.value) }}

                value={name}
                required />
              <label>Username</label>
            </div>
          </div>
          <div className="col-xs-12">
            <div className="styled-input wide">
              <textarea
                onChange={(e) => { setReview(e.target.value) }}
                value={review}
                required>

              </textarea>
              <label>Review</label>
            </div>
          </div>
          {alerts &&
            <Alert severity="success">This is a success - Check out the review page</Alert>
          }
          <div className="d-flex col-xs-12 mb-3 ">
            <Button className='urbtn' variant='contained' onClick={createReview} disabled={name ? disabled : !name}>Post Review</Button>
            <div className="btn-lrg submit-btn" onClick={props.handleClose}>Close</div>

          </div>

        </div>


      </div>


    </>
  )
}
