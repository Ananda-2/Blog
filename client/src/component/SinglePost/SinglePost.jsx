// rfc
import { Link , useLocation } from 'react-router-dom'
import "./SinglePost.css"
import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'

export default function SinglePost() {

// select the SINGLE POST ID from the link
  const location = useLocation() ;
  const path = location.pathname.split("/")[2] ;

  const [post,setPost] = useState({}) ;
  const {user} = useContext(Context)

// to update post set title desc update

  const [title , setTitle] = useState("") ;
  const [description , setDescription] = useState("") ;
  const [Update , setUpdate] = useState(false) ;

  // fetch data from the id 

  useEffect(()=>{
    const getPost = async () => {
      const res = await axios.get("/posts/"+path) ;
      
      setPost(res.data) ;
      setTitle(res.data.title) ;
      setDescription(res.data.description) ;
    }
    getPost(); 
  },[path] );

  const PF = "http://localhost:8000/images/"      // public folder

  const handleDelete = async () => {
    try{
        await axios.delete (`/posts/${post._id}`,{
            data : {username : user.username}
        });
        window.location.replace("/") ;

    } catch(err){}
  }

  const handleUpdate = async () =>{
    try{

        await axios.put(`/posts/${post._id}`,{
            username : user.username,
            title,
            description
        })

        setUpdate(false) ;

    }catch(err){}
  }


  return (
    <div className ='SinglePost'>
        <div className="singlePostWrapper">
                
            {post.photo &&
                <img className = "singlePostImg" src= {PF + post.photo} alt="" srcset="" />
            }

            {
                Update ? <input type="text" className='singlePostTitleNameInput'autoFocus value= {title} onChange={(e)=>setTitle(e.target.value)} /> : (

                    <div className="singlePostTitle">
                        <h1 className='singlePostTitleName'>{title}</h1>

                        {(post.username === user?.username) && 
                            (<div className="singlePostEdit">
                                <i class=" singlePostEditIcon fa-regular fa-pen-to-square" onClick={()=> setUpdate(true)}></i>
                                <i class=" singlePostEditIcon fa-solid fa-trash" onClick = {handleDelete} ></i>   
                            </div>)
                        }
                        
                    </div>
                )
            }

            
              
            <div className="singlePostInfo">
                <Link to={ `/?user=${post.username}`} style={{textDecoration : "none" , color : "inherit"}}>
                    <span className="singlePostAuthor">
                        Author : <b>{post.username}</b>
                    </span>
                </Link>
                
                <span className="singlePostDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            
            

            { 
                Update ? (<textarea className='singlePostDetailsInput' value={description} onChange={(e)=>setDescription(e.target.value)}/> )
                 : <p className="singlePostDetails"> {description} </p>

            }

            {
                Update && <button type="submit" className='UpdatePost' onClick={handleUpdate}>Update</button>
            }


        </div>
    </div>
  )
}
