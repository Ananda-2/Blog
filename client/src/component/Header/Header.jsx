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

        
            <img className='headerImg' src = "https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>

        </div>
    )
};