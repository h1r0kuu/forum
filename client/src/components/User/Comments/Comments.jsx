import "./CommentsStyles.css"

import { useEffect, useState } from "react"
import { UserService } from "../../../services/userService"

import CommentItem from "./CommentItem/CommentItem"

function Comments({user}) {
    const [comments, setComments] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        UserService.getUserComments(user.username).then(data => {
            setComments(data)
            setLoading(false)
        })
    }, [])
    
    return (
        <div className="comments-container">
            <ul id="comments-list" className="user-comment__comments-list">
                {isLoading ? (
                    <p>Loading</p>
                ) : (
                    comments.map(comment => (
                      <CommentItem comment={comment} key={comment.id} />     
                    ))
                )}
            </ul>
        </div>
    )
}

export default Comments