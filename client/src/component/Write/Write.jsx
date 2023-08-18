import React, { useContext, useState } from 'react'
import "./Write.css"
import axios from "axios"
import {Context} from "../../context/Context"

export default function Write() {

    const [title,setTitle] = useState("") ;
    const [description,setDesc] = useState("") ;
    const [file,setFile] = useState(null) ;
    const {user} = useContext(Context) ;

    // handleSubmit function on submit post

    const handleSubmit = async (e) =>{
        e.preventDefault() ;

        const newPost = {
            username:user.username,
            title,
            description,
        };

        // if file has been changed then change it to a unique name and upload
        if(file){
            const data = new FormData() ; 
            const fileName = Date.now() + file.name ;
            data.append("name",fileName)
            data.append("file",file)
            newPost.photo = fileName ;

            // upload image file 

            try{
                await axios.post("/upload",data) ;

            }catch(err){}
        }

            // post new post

        try{
            const res = await axios.post("/posts",newPost) ;
            window.location.replace("/post/" + res.data._id) ;
        }catch(err){}
    
    
    }
  return (
    <div className='write'>

        {
            file && ( <img className = "writeImage" 
            src= {URL.createObjectURL(file)}            // image url
            alt="" srcset=""
        />)}

   


        <form action="" className="writeForm" onSubmit={handleSubmit}>

            <div className="writeFormGroup">
                <label htmlFor="writeFormInput">
                    <i class="writeFormInputIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id='writeFormInput' style={{display:"none"}} onChange={(e)=> setFile(e.target.files[0])}/>
                <input type="text" className="writeFormTitle" placeholder='Title' onChange={(e)=> setTitle(e.target.value)}/>
                <button className='writeSubmit' type="submit">Publish</button>
                
            </div>
            <div className="writeFormGroup">
                
                <textarea type="text" className="writeFormDesc" placeholder='Write Blog Here..' onChange={(e)=> setDesc(e.target.value)} />
            </div>

           

        </form>
    </div>
  )
}
