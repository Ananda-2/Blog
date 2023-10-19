import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

export default function Header (){
    return (

        <div className='headerItems'>

            <div className='headerTitles'>
                <span className='headerTitlesSmall'>React & Node</span>
                <span className='headerTitlesLarge'>Blog</span>
            </div>

        
            <img className='headerImg' src = "https://hips.hearstapps.com/hmg-prod/images/nature-captions-index-1672888070.jpg?crop=1xw:0.84375xh;center,top"/>

        </div>
    )
};