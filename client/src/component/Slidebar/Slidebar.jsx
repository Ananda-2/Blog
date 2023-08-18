import { useEffect, useState } from "react"
import "./Slidebar.css"
import axios from "axios"
import { Link } from "react-router-dom";

export default function Slidebar (){

    // fetch data using categories

    const [cats,setCats] = useState([]) ;

    useEffect(() =>{
        const getCats = async () => {
            const res = await axios.get("/categories") ;
            setCats(res.data)
        };
        getCats() ;
    },[]) ;
    return (
        <div className="slidebar">
            <div className="slidebarAllItems">
                <div className="slidebarItem">
                    <span className="slidebarTitle">ABOUT ME</span>
                    <img className = "slideImg" src="https://www.citypng.com/public/uploads/preview/profile-user-round-black-icon-symbol-hd-png-11639594326nxsyvfnkg9.png" alt="" srcset="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis commodi consequatur sit amet ea facere explicabo suscipit quo magni nemo totam, nisi tenetur laborum aut dolor quia fugit dolore.</p>
                </div>
                <div className="slidebarItem">
                    <span className="slidebarTitle">CATEGORIES</span>
                    <ul className="slidebarList">

                        {
                            cats.map((c)=>(

                                <Link to = {`?cat=${c.name}`} style={{textDecoration:"none" , color:"inherit"}}>
                                <li className="sildebarListItem">{c.name}</li>
                                </Link>

                                
                            ))
                        }
                    </ul>
                </div>
                <div className="slidebarItem">
                    <span className="slidebarTitle">FOLLOW ME</span>
                    <div className="slidebarSocial">
                        <i class=" slidebarIcon fa-brands fa-facebook-f"></i>
                        <i class="slidebarIcon fa-brands fa-linkedin-in"></i>
                        <i class=" slidebarIcon fa-brands fa-instagram"></i>
                        <i class="slidebarIcon fa-brands fa-twitter"></i>
                    </div>
                
                </div>

            </div>
           
        </div>
    )
}