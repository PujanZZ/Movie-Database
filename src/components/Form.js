import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth"
import { auth } from "../firebase";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css'

export default function Form() {


    const [user, setUser] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [username, setUserName] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const forward = useNavigate()



    const register = async (e) => {
        e.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword, username)
                .then((cred) => {
                    setSuccessMsg('User Created', cred.user);
                    if (auth.currentUser) {
                       updateProfile(auth.currentUser, {
                        displayName:username,
                       })
                    }
                })
            setTimeout(() => {
                setSuccessMsg('');
                forward("/")
            }, 3000)
            console.log(user)
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
                    <h2 className='regh2'>Register Now</h2>
                    <div className="form2-control">

                        <input placeholder="Enter Username"
                            onChange={(e) => { setUserName(e.target.value) }}
                        />

                    </div>
                    <div className="form2-control">

                        <input placeholder="Enter email"
                            type='email'
                            onChange={(e) => { setRegisterEmail(e.target.value); }}
                        />

                    </div>
                    <div className="form2-control">

                        <input placeholder="Enter password"
                            onChange={(e) => { setRegisterPassword(e.target.value) }}
                        />

                    </div>

                    <Button variant='contained' onClick={register}>Create User</Button>

                    {errorMsg && <><Button
                        variant='contained'
                        color='error'
                        style={{ backgroundColor: 'red' }}
                    >{errorMsg}</Button></>}
                </form>
            </div>



        </>

    )
}