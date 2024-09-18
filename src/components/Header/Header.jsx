import { useState, useEffect, useRef } from 'react';
import {
    NavLink
} from 'react-router-dom';
import './header.css'
import logoImg from '../../assets/logo/tms_logo_trans.png'

function Header(){
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

                </div>
            </div>
        </>
    );
}
export default Header;
