import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import axios from "axios"

export default function Register() {
  const [username, setUsername] = useState("") ;
  const [email, setEmail] = useState("") ;
  const [password, setPassword] = useState() ;
  const [error , setError] = useState(false) ;

  const onchangeFunc = async (e) => {
    setPassword(e.target.value);
    
  }

  const handleSubmit = async (e) =>{
    e.preventDefault() ;
    setError(false) ;

    try{

      const res = await axios.post("/auth/register" , {
        username , 
        email,
        password
      }) ;
        
      res.data && window.location.replace("/login") ;

    }catch(err){
      setError(true) ;
      console.log(err);
    }


  

  }

  return (
    <div className='register'> 
        
        <form action="" className="registerForm" onSubmit={handleSubmit}>

            <span className="registerTitle">Register</span>

            <label>Username</label>
            <input type="text" placeholder='Enter Username' 
            onChange={e => (setUsername(e.target.value))} />
            <label>Email Id</label> 
            <input type="email" placeholder='Enter Your Email'
            onChange={e => (setEmail(e.target.value))} />
            <label>Password</label> 
            <input type="password" placeholder='Enter Password' 
            onChange = {onchangeFunc} />

            <button className="RegisterButton">Register</button>
            <button className="RegisterloginButton"><Link to="/login" style={{textDecoration:"none" , color:"inherit"}}>LOGIN</Link></button>

            { error && ( <span style={{color:"red" , marginTop:"10px"}}>Something Went Wrong</span>) }
        </form>
    
    </div>
  )
}
