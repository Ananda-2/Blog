import React, { useEffect, useState } from 'react'
import Header from '../../Header/Header'
import Slidebar from '../../Slidebar/Slidebar'
import Posts from "../../Posts/Ports"
import "./Home.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function Home(){

    const [posts,setPosts] = useState([]) ;  

    const {search} = useLocation() ;
    console.log(useLocation);

    // FUNCTION TO FETCH THE POSTS DATA

    useEffect(()=>{
        const fetchPost = async ()=>{
            const res = await axios.get("/posts" + search)
            setPosts(res.data) ; 
        }
        fetchPost() ;  
    },[search])

    
 
    return ( 
        <div>
            <Header/>

            <div className='homePage'>
                <Posts posts={posts} />
                {/* <Slidebar/> */}
            </div>
            
        </div>
    )
}