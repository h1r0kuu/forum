import "../../assets/css/user-comments.css"

import { Link } from "react-router-dom"

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
                        <i className="fa fa-clock-o"> January 15 , 2014 at 10:00 pm</i>
                    </span>
                </div>
                <div className="comment-content"> {comment.text} </div>
                <div className="l-rightside39">
                    <button type="button" className="tolltip-button thumbs-up2" data-toggle="tooltip" data-placement="bottom" title="Like">
                        {comment.likesCount} <i className="fa fa-thumbs-o-up " aria-hidden="true"></i>
                    </button>
                    <button type="button" className="tolltip-button  thumbs-down2" data-toggle="tooltip" data-placement="bottom" title="Dislike">
                        {comment.dislikesCount} <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    </button>
                    <span className="single-question-vote-result">{comment.likesCount - comment.dislikesCount}</span>
                    <i className="fa fa-reply"> {comment.replies.length}</i>
                    <i className="fa fa-heart" aria-hidden="true"> {comment.likesCount}</i>
                </div>
            </div>
        </div>
    )
}

export default UserComment