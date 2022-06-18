import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import PostService from "../../services/PostService";
import "../../styles/post-list.css"
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../Header"

function PostList({store}) {
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
      <>
      <Header store={store} />
      <div className="post-list">
        <div className="container">
          <div className="navigate">
            <span>
              <Link to={"/"}>MyForum - Forums</Link> {'>>'} <a href="">random subforum</a>
            </span>
          </div>
          <div className="posts-table">
            <div className="table-head">
              <div className="status">Status</div>
              <div className="subjects">Subjects</div>
              <div className="replies">Replies/Views</div>
              <div className="last-reply">Last Reply</div>
            </div>
            {posts.length > 0 
            ? 
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
            :
                <p>There is no posts</p>
            }
          </div>
        </div>
      </div>
      </>
  )
}

export default PostList