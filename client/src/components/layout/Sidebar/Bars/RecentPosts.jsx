import Moment from 'react-moment';
import { useEffect, useState } from "react"
import PostService from "../../../../services/PostService"

function RecentPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        PostService.getAll(0, 'createdAt').then(res => {
            setPosts(res.data.content.slice(0,3))
        })
    }, [])
    console.log(posts)

    return (
        <div className="recent-post3290">
            <h4>Recent Post</h4>
            {posts.map(post=>(
                <>
                <div className="post-details021">
                <a href="#">
                    <h5>{post.title}</h5>
                </a>
                <small style={{color: "#848991"}}><Moment fromNow>{post.createdAt}</Moment></small>
            </div>
            <hr/> 
                </>
            ))}
        </div>
    )
}

export default RecentPosts