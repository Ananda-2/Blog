import Post from "../Post/Post";
import "../Posts/Posts.css"

export default function Posts({posts}){
    return (
        <div className="posts">

            {posts.map( p=>(
                    <Post post = {p}/>
            ))}

        </div>
    )
}