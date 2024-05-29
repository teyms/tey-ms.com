import { useState, useEffect, useRef } from 'react';
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
                        <a> Home</a>
                        <a> Contact</a>
                        <a> Email Template</a>
                        <a> Qr Generator</a>
                        <a> Video Player</a>

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
