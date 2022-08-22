import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button } from '@mui/material';
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


import './Navbar.css'


export default function Navbar() {

    const garbage = useNavigate()

    const handleOut = () => {
        signOut(auth).then(() => {
            console.log('Logout successful')
            alert('You are logged out')
            garbage('/')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });

    }


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
    console.log(user)


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Movie DB</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/movie">Movies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/tv">TV</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/actor">Actors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/archive">Archive</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/userinput">Review</a>
                            </li>



                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0 float-right">
                            <div className='d-flex logingg'>
                                <li className="nav-item">
                                    {!user &&
                                        <a className="nav-link active" aria-current="page" href="/login">Login</a>
                                    }
                                </li>
                                <li className="nav-item">
                                    {user &&
                                        <a onClick={handleOut} className="nav-link active" aria-current="page" >Logout</a>
                                    }
                                </li>

                            </div>
                        </ul>
                    </div>

                </div>
            </nav>


        </>
    )
}
