import "./PostListStyles.css"

import Pagination from "../Pagination/Pagination"
import PostListItem from "./PostListItem/PostListItem"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import {PostService} from "../../services/postService"

function PostList({isLoading, posts, pagination,page, order, direction, forum, additionalParams}) {
    
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
                        <Pagination pagination={pagination} order={order} additionalParams={additionalParams}/>
                    }
                </>
            )}
        </section>
    )
}

export default PostList