import "./UserHiddenPostsStyles.css"

import { useEffect, useState } from "react"
import { UserService } from "../../../services/UserService"
import { GetUser } from "../../../utils/authUser"
import PostListItem from "../../PostList/PostListItem/PostListItem"
import UserHiddenPostItem from "./UserHiddenPostItem/UserHiddenPostItem"

function UserHiddenPosts({user}) {
    const [hiddenPosts, setHiddenPosts] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        UserService.getUserHiddenPosts(user.username).then( data => {
            setHiddenPosts(data.content)
            setLoading(false)
        })
    }, [user.username])
    return (
        <>
        {isLoading ? (
            <p>Loading</p>
        ) : (
            hiddenPosts.map(post => (
                <div className="hidden-post" key={post.id}>
                    <UserHiddenPostItem post={post}/>
                    <span className="remove-item">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                </div>
            ))
        )}
        </>
    )
}

export default UserHiddenPosts