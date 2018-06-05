import React from 'react';
import '../assets/styles/header.css'
import logo from '../assets/images/nashtech.jpg'
import decorator from '../assets/images/decorator.png'

const Header = props => {
    return (
        <div className="header">
            <div className="header__logo__container">

                <img className="header__logo__image" src={logo}  />

            </div>



            <div className="header__decorator__container">

                <img className="header__decorator__image" src={decorator} />

            </div>
        </div>
    );
}

export default Header;