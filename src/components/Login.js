import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css'


export default function Login() {


    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const forward = useNavigate()


    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const login = async (e) => {
        e.preventDefault()
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            setSuccessMsg('Login Successful')
            console.log(user)
            setTimeout(() => {
                setSuccessMsg('');
                forward("/")
            }, 3000)

        } catch (error) {
            setErrorMsg(error.message)
            console.log(error.message)

        }

    }




    return (
        <>
            <div className="containerlol">
                <form className="form2">
                    {successMsg && <><Button
                        variant='outlined'
                        color='success'
                        style={{ backgroundColor: 'green' }}
                    >{successMsg}</Button></>}

                    <br />
                    <h2 className='regh2'>Login Page</h2>
                    <div className="form2-control">

                        <input placeholder="Enter email"
                            onChange={(e) => { setLoginEmail(e.target.value) }}
                        />

                    </div>
                    <div className="form2-control">

                        <input placeholder="Enter password"
                            onChange={(e) => { setLoginPassword(e.target.value) }}
                        />

                    </div>

                    <Button variant='contained' onClick={login}>Login</Button>

                    <div style={{ textDecoration: 'none' }}>
                        <Link to="/register" style={{textDecoration: 'none'}}><Button variant='contained' size='large' color='primary'>Create new user</Button>
                        </Link>
                    </div>
                    {errorMsg && <><Typography color='error'>{errorMsg}</Typography></>}
                </form>
            </div>
        </>
    )
}