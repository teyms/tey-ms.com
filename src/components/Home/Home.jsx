import { useState, useEffect, useRef } from 'react';
import './home.css'

function Home(){
    return (
        <>
        <div id='home-container' className='home-container'>
            <div id='first-section' className='first-section'>
                Software Developer
            </div>
            <div id='second-section' className='second-section'>
                <p>
                    I'm Ming Sheng <span className='surname'> Tey </span>
                    , a software developer. I have experienced on backend and frontend development. Ability to seamlessly integrate frontend aesthetics with backend functionality ensures the delivery of efficient applications.
                </p>
            </div>
        </div>
        </>
    )
}

export default Home;