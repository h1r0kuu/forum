import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import PostService from "../services/PostService";

function PostList() {
    const {forumId} = useParams()
    const [posts, setPosts] = useState([])

  useEffect(()=>{
    PostService.getPostsByForumId(forumId).then(res => {
        setPosts(res.data)
    })  
  }, [])

  return (
      <>
        {posts.map(post => (
            //TODO: add Post component
            <div className="post" key={post.id}>
                <p>{post.title} - {post.createdAt}</p>
            </div>
        ))}
      </>
  )
}

export default PostList