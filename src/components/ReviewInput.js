import React, { useState, useEffect } from 'react'
import './ReviewInput.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'

export default function ReviewInput() {


    const [users, setUsers] = useState([])
    const usersCollection = collection(db, "User Review")

    useEffect(() => {

        const getReview = async () => {
            const data = await getDocs(usersCollection)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        }
        getReview()
        
    }, [])

 

    return (
        <>
            <div className='container mt-3 d-flex justify-content-center'>
                <h1>REVIEW PAGE</h1>
               
            </div>
            <hr />
          
            {users.map((user) => (
                <>

                    <section className="section is-primary mt-5">
                        <div className="container">
                            <div className="blog-card">
                                <div className="image-wrapper m-3 mt-4">
                                    <img src={user.poster} alt='mov' width='150rem' />
                                </div>
                                <div className="description">


                                    <>
                                        <div className='uuuh2'>

                                            <h1>{user.title}</h1>
                                            <h2>review by - {user.username}</h2>
                                            <h2 className='h2type'><i>{user.type}</i></h2>
                                            <p>
                                                {user.review}
                                            </p>
                                        </div>


                                    </>


                                </div>
                            </div>
                        </div>
                    </section>

                </>

            ))}



        </>
    )
}
