import Moment from 'react-moment';
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

import PostService from "../../../../services/PostService"

function RecentPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        PostService.getAll(0, 'createdAt').then(res => {
            setPosts(res.data.content.slice(0,3))
        })
    }, [])

    return (
        <div className="recent-post3290">
            <h4>Recent Post</h4>
            {posts.map(post=>(
                <div className="post-details021" key={post.id}>
                    <Link to={"/posts/" + post.id}><h5>{post.title}</h5></Link>
                    <small style={{color: "#848991"}}><Moment fromNow>{post.createdAt}</Moment></small>
                    <hr/> 
                </div>
            ))}
        </div>
    )
}

export default RecentPosts