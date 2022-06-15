import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import PostService from "../../services/PostService";
import "../../styles/post-list.css"
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

function PostList() {
  const {forumId} = useParams()
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true);
  let page = 0;

  const loadMorePosts = () => {
    if(forumId === undefined || forumId === null) {
      PostService.getAll(page).then(res => {
        const newPosts = res.data.content
        setPosts((oldPosts) => [...oldPosts, ...newPosts])

        if(newPosts.length === 0 || newPosts.length < 10) {
          setHasMore(false)
        }
      })
    } else {
      PostService.getPostsByForumId(forumId).then(res => {
        setPosts(res.data)
      })  
    }
    page += 1
  }

  useEffect(()=>{
    loadMorePosts()
  }, [forumId])

  return (
      <div className="post-list">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading</h4>}
        >
        {posts.map( post => {
          return <Post post={post} key={post.id} />;
        })}
        </InfiniteScroll>
      </div>
  )
}

export default PostList