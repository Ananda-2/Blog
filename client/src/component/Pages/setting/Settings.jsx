import { useContext , useState } from 'react'
import "./Settings.css"
import Slidebar from "../../Slidebar/Slidebar"
import { Context } from "../../../context/Context"
import axios from "axios"

export default function Settings() {
    const {user, dispatch} = useContext(Context) ;
    const [username , setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [file , setFile] = useState("");
    const [isUpdated , setIsUpdated] = useState(false);
    const PF = "https://ananda-blog.onrender.com/images/"

const handleUpdate = async (e) => {
    e.preventDefault() ;
    dispatch({type:"UPDATE_START"}) ;

    const UpdatedUser = {
        userId : user._id ,
        username , email , password 
    }

    if(file){
        const data = new FormData() ; 
        const fileName = Date.now() + file.name ;
        data.append("name",fileName)
        data.append("file",file)
        UpdatedUser.profilePic = fileName ;

        // upload image file 

        try{
            await axios.post("/upload",data) ;

        }catch(err){}
    }

        // post new post

    try{
        const res = await axios.put("/user/"+user._id,UpdatedUser) ;
        setIsUpdated(true) ;
        dispatch({type:"UPDATE_SUCCESS" , payload : res.data}) ;
    }catch(err){
        dispatch({type:"UPDATE_FAILURE"}) ;
    }

}

  return (
    <div className='setting'>
        
        <div className="settingWrapper">
            <div className="settingTitle">
                <span className="settingUpdateTitle">Update Your Profile</span>
                <span className="settingDeleteAccount">Delete Account</span>
            </div>

            <form action="" className="settingForm"  onSubmit={handleUpdate}>

                <div className="settingPP">
                    <label className='ProfileTitle'>Profile Picture</label>

                    <img src= {file ? URL.createObjectURL(file) : PF + user.profilePic } alt="" srcset="" />
                    

                    <label htmlFor="profileImage" className='UpdateProfilePhoto'>
                        Update Photo
                    </label>

                    <input type="file" id = "profileImage" style={{display:"none"}} onChange={(e)=> {setFile(e.target.files[0])}} />

                </div>

                <div className="profileInfo">

                    <label>UserName</label>
                    <input type="text" className='UserName'  placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <label>Email</label>
                    <input type="email" className='email' placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <label>Password</label>
                    <input type="password" className='Password' placeholder='********' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div className='UpdateButton'><button type="submit">Update</button></div>

                    {isUpdated && <span className='UpdatedMassege'>User Info Updated </span>}

                </div>
                
                

            </form>
        </div>
        <Slidebar/>

    </div>
  )
}
