import React from 'react';
import logo from '../assets/aqualix-logo.svg';

function Logo(){
    return (
        <div style={{textAlign: 'left', padding: '0px'}}>
            <img src={logo} alt="Logo" style={{width: '150px', height: '150px'}}/>
        </div>
    );
}

export default Logo;