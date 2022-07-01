import Post from "./Post"

import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import PostService from "../../../services/PostService"
import Navbar from "../Navigation/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Pagination from "../../Pagination";
import PostListTemplate from "./PostListTemplate";
import Loader from "../../Loader";

function PostList() {
    const {forumId} = useParams()
    
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams();
    
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0
    
    const loadMorePosts = () => {
        PostService.getPostsByForumId(forumId,page,order).then(res => {
            const {content, ...pagin} = res.data
            setPosts(content)
            setPagination(pagin)
            setLoading(false)
        })
    }
    
    
    useEffect(()=>{
        loadMorePosts()
    }, [forumId, page, order])
    
    return (
        <>
        <Navbar/>
        {isLoading === false
        ?    
            <PostListTemplate posts={posts} pagination={pagination} order={order}/>
        :
            <Loader/>
        }
        </>
    )
}

export default PostList