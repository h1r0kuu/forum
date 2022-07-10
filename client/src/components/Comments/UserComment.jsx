import "../../assets/css/user-comments.css"

import { Link } from "react-router-dom"
import Moment from "react-moment"

function UserComment({comment}) {
    return (
        <div className="comment-main-level">
            <div className="comment-avatar">
                <img src={comment.user.imagePath} alt="" />
            </div>
            <div className="comment-box">
                <div className="comment-head">
                    <h6 className="comment-name">
                        <Link to={"/user/" + comment.user.username}>{comment.user.username}</Link>
                    </h6>
                    <span>
                        <i className="fa fa-clock-o"> <Moment fromNow>{comment.createdAt}</Moment></i>
                    </span>
                </div>
                <div className="comment-content"> {comment.text} </div>
                <div className="stats">
                    <span className="single-question-vote-result"></span>
                    <i className="fa fa-reply"> {comment.replies.length}</i>
                    <i className="fa fa-heart" aria-hidden="true"> {comment.likesCount - comment.dislikesCount}</i>
                </div>
            </div>
        </div>
    )
}

export default UserComment