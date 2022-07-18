import "./PostListStyles.css"

import Pagination from "../Pagination/Pagination"
import PostListItem from "./PostListItem/PostListItem"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import {PostService} from "../../services/postService"

function PostList({page, order, direction}) {
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(true)

    const loadMorePosts = useCallback(() => {
        PostService.getAll(page,order, direction).then(data => {
            const {content, ...pagin} = data
            setPosts(content)
            setPagination(pagin)
            setLoading(false)
        })
    }, [page, order, direction])

    useEffect(()=>{
        loadMorePosts()
    }, [loadMorePosts])
    
    return (
        <section className="post-list">
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                    {posts.map(post => (
                        <PostListItem post={post} key={post.id}/>
                    ))}
                    {pagination.totalPages > 1 &&
                        <Pagination pagination={pagination} order={order}/>
                    }
                </>
            )}
        </section>
    )
}

export default PostList