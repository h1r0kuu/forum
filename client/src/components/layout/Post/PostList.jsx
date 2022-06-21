import Post from "./Post"

import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import PostService from "../../../services/PostService"
import Navbar from "../Navigation/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Pagination from "../../Pagination";

function PostList({store}) {
    const {forumId} = useParams()
    
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0
    
    const loadMorePosts = () => {
        PostService.getPostsByForumId(forumId,page,order).then(res => {
            setPosts(res.data.content)
            const {content, ...pagin} = res.data
            setPagination(pagin)
        })
    }
    console.log(pagination)

    useEffect(()=>{
        loadMorePosts()
    }, [forumId, page, order])
    
    return (
        <>
        <Navbar store={store}/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div id="main">
                        <Link to={`?page=0&order=comments`} className="tab">Most Response</Link>
                        {/* <Link to={"?order=created_at"}>Recently Answered</Link> */}
                        <Link to={`?page=0&order=no_comments`} className="tab">No Answer</Link>
                        <Link to={`?page=0&order=createdAt`} className="tab">Recent Post</Link>
                        <section id="content">
                            {posts.map(post=>(
                                <Post post={post} key={post.id}/>
                            ))}
                            {pagination && pagination.pageable &&
                                <Pagination pagination={pagination} order={order} />
                            }
                        </section>
                    </div>
                </div>
                <Sidebar store={store} />
            </div>
        </div>
        </>
    )
}

export default PostList