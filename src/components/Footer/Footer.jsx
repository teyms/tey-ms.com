import { useState, useEffect, useRef } from 'react';
import './footer.css'

function Footer(){
    const today = new Date();
    const year = today.getFullYear();

    return (
        <>
        <div id="footer-container" className="footer-container">
            <div id="contact" className="footer-box">
                <div className="">
                    <p>Ming Sheng Tey</p>
                    <p>mingshengtey@gmail.com</p>
                    <p>{year} © tey-ms</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;