import React from 'react'
import MovieListHeading from './MovieListHeading'
import ForPlot from './ForPlot'

export default function Archive() {
    return (
        <>
            <div className='container m-6 mt-3'>
                <MovieListHeading heading='Search Archive' />
                <hr />

            </div>
            <div className='container mb-5'>
                <ForPlot />
            </div>
        </>
    )
}
