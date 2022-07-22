import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DIRECTION, ORDER } from "../../../enums/orderEnums";
import { UserService } from "../../../services/userService";
import PostList from "../../PostList/PostList"

function UserPostList({user}) {

    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(true)

    const [searchParams] = useSearchParams();
    
    const order = searchParams.get("order") || ORDER.CREATED_AT
    const page = searchParams.get("page") || 0
    const direction = searchParams.get("direction") || DIRECTION.DESC
    const forum = searchParams.get("forum") || null

    const loadMorePosts = useCallback(() => {
        UserService.getUserPosts(user.username,page,order).then(data => {
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
        <PostList
            page={page}
            order={order}
            direction={direction}
            forum={forum}
            isLoading={isLoading}
            posts={posts}
            pagination={pagination}
        />
    )
}

export default UserPostList