import React from 'react'

import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Archive from './components/Archive';
import Navbar from './components/Navbar';
import MovieInput from './components/MovieInput';
import TvInput from './components/TvInput'
import Actor from './components/Actor';
import UserReview from './components/UserReview';

import Home from './Home.js';
import Login from './components/Login';
import Form from "./components/Form";
import ReviewInput from './components/ReviewInput';
import { auth } from "./firebase";
import { useState, useEffect } from 'react';



export default function App() {






  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/movie" element={<MovieInput />} />
        <Route path="/tv" element={<TvInput />} />
        <Route path="/actor" element={<Actor />} />
        <Route path="/review" element={<UserReview  />} />
        <Route path="/userinput" element={<ReviewInput />} />
        <Route exact path='/login' element={<Login />} />
        <Route path='/register' element={<Form />} />

      </Routes>


    </>
  )
}
