import { useState, useEffect, useRef } from 'react';
import {
    NavLink,
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/googleAuth-action';

import './header.css'
import logoImg from '../../assets/logo/tms_logo_trans.png'

function Header(){
    const { isAuthenticated, user, token } = useSelector((state) => state.googleAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout(user, token));
    };
    const redirectLoginPage = () => {
        return navigate('/login')
    };

    // useEffect(() => {
    //     console.log('user printout', user);
    // }, [user])

    return (
        <>
            <div className="topbar-container">
                <div className="topbar-box">

                    <div className="logo-container">
                        <a className="logo"> <img src={logoImg} alt="logo"/></a>
                        {/* <a className="logo" routerLink="/"> <img src="assets/logo/tms_logo_trans.png" alt="logo"/></a> */}
                    </div>

                    <div className="nav-list">
                        <NavLink> Home </NavLink>
                        <NavLink to="/shorturl"> Short URL </NavLink>
                        <NavLink to="/emailtemplate"> Email Template </NavLink>
                        {/* <NavLink to="/tng">TNG Convert </NavLink> */}
                        <NavLink to="/blog"> Blog</NavLink>

                        {/* <a routerLink="/">  Home</a>
                        <a href="#contact">  Contact</a>
                        <a href="#email"> Email Template</a>
                        <a routerLink="/qrcode"> Qr Generator</a>
                        <a routerLink="/video">      Video Player</a> */}

                    </div>

                    {isAuthenticated ? (
                        <div style={userStyles}>
                            <img 
                                src={user?.google_avatar} 
                                alt="Profile" 
                                style={profilePicStyles} 
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    console.error('Detailed Avatar Error', {
                                        errorEvent: e,
                                        imageUrl: e.target.src,
                                        userObject: user
                                    });
                                    e.target.style.display = 'none'; // Hide if load fails
                                }}
                            />
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        // <button onClick={() => alert('Login required!')}>Login</button>
                        <button onClick={redirectLoginPage}>Login</button>
                    )}

                </div>
            </div>
        </>
    );
}

const profilePicStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
};

const userStyles = {
    alignItems: 'center',
    gap: '10px',
};

export default Header;
