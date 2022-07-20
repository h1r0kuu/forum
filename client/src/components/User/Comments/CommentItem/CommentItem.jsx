import "./CommentItemStyles.css"

import { Link } from "react-router-dom"

import dayjs from "../../../../utils/dayjsRelative"

function CommentItem({comment}) {
    return (
        <div className="user-comment__comment-main-level">
            <div className="comment-avatar">
                <img src={comment.user.imagePath} alt={comment.user.username}/>
            </div>
            <div className="user-comment__comment-box col-md-6">
                <div className="comment-head">
                    <h6 className="comment-name">
                        <Link to={"#"}>{comment.user.username}</Link>
                    </h6>
                    <span>
                        <i className="fa fa-clock-o" aria-hidden="true">{dayjs(comment.createdAt).format("MMMM D, YYYY x HH:mm").replace("x", "at")}</i>
                    </span>
                    {/* onClick={() => like(comment.id)} */}
                    <i className="fa fa-heart">
                        &nbsp;
                        {comment.likesCount - comment.dislikesCount > 0 ? 
                            "+" + comment.likesCount - comment.dislikesCount
                            :
                            comment.likesCount - comment.dislikesCount
                        }
                    </i>
                </div>
                <div className="comment-content">{comment.text}</div>
            </div>
            <div className="user-comment__comment-post col-md-5">
            </div>
        </div>    
    )
}

export default CommentItem