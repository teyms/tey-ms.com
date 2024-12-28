import { useState, useEffect, useRef } from 'react';
import './home.css'
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect,
    useParams,
    NavLink
} from 'react-router-dom';

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
            <hr/>
            <div id='third-section' className='third-section'>
                <h1 style={{color:'white'}}>Blog Post</h1>
                <div className='column blog-list'>           
                    <div className='row blog-row'>
                        <div className='blog-row-header'>
                            <h2>Manage Concurrent Requests in C# Middleware with SemaphoreSlim and Cache</h2>
                        </div>
                        <div className='blog-row-body'>
                            <p>Concurrency control is essential in systems. Without proper control, issues like race conditions and duplicate records can arise, leading to inconsistencies and unwanted behavior. Let's walk through an issue I encountered at work involving race conditions and duplicate records, and how I resolved it by a Concurrent Control Middleware implemented with <span className='code-display'>SemaphoreSlim</span> and <span className='code-display'>caching</span>...</p>
                            <NavLink to="blog/Manage-Concurrent-Requests-in-Csharp-Middleware-with-SemaphoreSlim-and-Cache"><button className="read-more-btn">Read More</button></NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default Home;