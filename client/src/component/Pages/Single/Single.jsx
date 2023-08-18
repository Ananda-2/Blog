import React, { useEffect, useState } from 'react'
import SinglePost from '../../SinglePost/SinglePost'
import Slidebar from "../../Slidebar/Slidebar"
import "./Single.css"
import { useLocation } from 'react-router-dom'


export default function Single() {

   
  return (
    <div className='single'>
        <SinglePost/>
        <Slidebar/>
    </div>
  )
}
