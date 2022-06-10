import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import PostService from "../../services/PostService";

function PostList() {
    const {forumId} = useParams()
    const [posts, setPosts] = useState([])

  useEffect(()=>{
    PostService.getPostsByForumId(7).then(res => {
        setPosts(res.data)
    })  
  }, [])

  return (
      <div className="post-list">

        {posts.map(post => (
            //TODO: add Post component
            <div className="post" key={post.id}>
                <p>{post.title} - {post.createdAt}</p>
            </div>
        ))}
      </div>
  )
}

export default PostList