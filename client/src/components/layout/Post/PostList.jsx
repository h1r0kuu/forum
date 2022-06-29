import Post from "./Post"

import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import PostService from "../../../services/PostService"
import Navbar from "../Navigation/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Pagination from "../../Pagination";
import PostListTemplate from "./PostListTemplate";

function PostList() {
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
        <Navbar/>
        <PostListTemplate posts={posts} pagination={pagination} order={order}/>
        </>
    )
}

export default PostList