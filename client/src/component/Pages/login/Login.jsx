import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"
import { Context } from "../../../context/Context";
import { useRef } from 'react';
import axios from "axios"

export default function Login() {

  const userRef = useRef() ;
  const passwordRef = useRef() ;
  // console.log(userRef) ;

  const {dispatch,isFetching} = useContext(Context) ;


  const handleSubmit = async (e) =>{
    e.preventDefault() ;
    dispatch({type:"LOGIN_START"}) ;

    try{
      const res = await axios.post("/auth/login",{
        username : userRef.current.value,
        password : passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
      // console.log(user)

    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  }

  // console.log(user);


  return (
    <div className='login'>
        
        <form action="" className="loginForm" onSubmit={handleSubmit}>

            <span className="loginTitle">Login</span>

            <label>Username</label>
            <input type="text" placeholder='Enter Username'
            ref = {userRef} />
            {/* <label>Email Id</label>
            <input type="email" placeholder='Enter Your Email' /> */}
            <label>Password</label>
            <input type="password" placeholder='Enter Password' 
              ref = {passwordRef} />

            <button className="loginButton" type='submit' disabled = {isFetching}>Login</button>
            <button className="loginRegisterButton"><Link to="/register" style={{textDecoration:"none" , color:"inherit"}}>REGISTER</Link></button>

        </form>
    
    </div>
  )
}
