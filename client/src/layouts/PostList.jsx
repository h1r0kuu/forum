import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import PostService from "../services/PostService";
import "../styles/post-list.css"
import Post from "../components/Post/Post";

function PostList() {
    const {forumId} = useParams()
    const [posts, setPosts] = useState([])

  useEffect(()=>{
    if(forumId === undefined || forumId === null) {
      PostService.getAll().then(res => {
          setPosts(res.data)
      })
    } else {
      PostService.getPostsByForumId(forumId).then(res => {
        setPosts(res.data)
      })  
    }
  }, [forumId])

  return (
      <div className="post-list">
        {posts.map(post => (
            <Post post={post} key={post.id} />
        ))}
      </div>
  )
}

export default PostList