import React from "react";
import "../navbar/Navbar.css"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../../context/Context";
 

export default function Navbar(){
    
    const  {user,dispatch}  = useContext(Context) ;
    const PF = "https://ananda-blog.onrender.com/images/"

    const handleLogout = () =>{
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="top">
            <div className="topLeft">

                <i class=" topleftIcon fa-brands fa-facebook-f"></i>
                <i class="topleftIcon fa-brands fa-linkedin-in"></i>
                <i class=" topleftIcon fa-brands fa-instagram"></i> 
                <i class="topleftIcon fa-brands fa-twitter"></i>

            </div>

            <div className="topCenter">
                <ul className="topCenterList">
                    <li className="topCenterListItem" ><Link to="/" style={{textDecoration:"none" , color:"inherit"}}>HOME</Link></li>
                    <li className="topCenterListItem" ><Link to="/about" style={{textDecoration:"none" , color:"inherit"}}>ABOUT</Link></li>
                    <li className="topCenterListItem" ><Link to="/contact" style={{textDecoration:"none" , color:"inherit"}}>CONTACT</Link></li>
                    <li className="topCenterListItem" ><Link to="/write" style={{textDecoration:"none" , color:"inherit"}}>WRITE</Link></li>

                    <li className="topCenterListItem" onClick={handleLogout}><Link to="/login" style={{textDecoration:"none" , color:"inherit"} }>{user && "LOGOUT"}</Link></li> 
                    
                </ul>
                
            </div>

            <div className="topRight">
               { user ? <>

                <Link to= "/settings"> <img  className = "topRightImage" src ={PF + user.profilePic} alt = "" /> </Link>   
               </>:<>
                    <li className="topCenterListItem" ><Link to="/login" style={{textDecoration:"none" , color:"inherit"}}>LOGIN</Link></li>
                    <li className="topCenterListItem" ><Link to="/Register" style={{textDecoration:"none" , color:"inherit"}}>REGISTER</Link></li>
                </>

                }

               <i class ="topRightSearchIcon fa-solid -famagnifying-glass"></i>
            </div>

        </div>
    )
}