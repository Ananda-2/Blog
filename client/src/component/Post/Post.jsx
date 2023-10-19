import "./Post.css"
import { Link } from "react-router-dom"
export default function Post({post}){

    const PF = "https://ananda-blog.onrender.com/images/"      // public folder 

    console.log(post)
    
    return (
        <div className="post">

            {post.photo &&
                (<img className = "blogTitleImg" src = {PF + post.photo}         // src = {PF + post.photo}
                alt="" srcset="" />)
            }

            

            <div className="postInfo">
                

                <div className="postCate">
                    {
                        post.categories.map((c)=>(
                            <span className="postCategories">{c.name}</span>
                        ))
                    }
                </div>
                
                <Link to = {`/post/${post._id}`} style={{textDecoration : "none" , color:"inherit", width: "85%", overflowX: "hidden"}}>
                    <span className="postTitle">{post.title}</span>
                </Link>

                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>

                <span className="postContent">{post.description}</span>
                
            </div>
           
        </div>
    )
}