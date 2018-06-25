import React from 'react';
import '../assets/styles/header.css'
import logo from '../assets/images/nashtech.jpg'
import decorator from '../assets/images/decorator.png'

const Header = props => {
    return (
        <div>
        
            <div className="header">

                <div className="header__logo__container">

                    <img className="header__logo__image" src={logo} alt="logo"/>

                </div>



                <div className="header__decorator__container">

                    <img className="header__decorator__image" src={decorator} alt="decorator" />

                </div>
            </div>
        </div>
    );
}

export default Header;