import "./PostCommentItemStyles.css"

import { Link } from "react-router-dom"

import dayjs from "../../../../utils/dayjsRelative"
import { MakeUrl } from "../../../../utils/urls"
import { useState } from "react"

import { GetStore } from "../../../../utils/authUser"
import { CommentService } from "../../../../services/commentService"

function PostCommentItem({postId, comment, authorUsername}) {
    const store = GetStore()

    const [replyHidden, setReplyHidden] = useState(true)

    function toggleReplyInput() {
        if(replyHidden === true) {
            setReplyHidden(false)
        } else {
            setReplyHidden(true)
        }
    }

    function sendReply(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        let text = form.get("text")

        CommentService.create(postId, {
            "text": text,
            "user": store.user,
            "parentComment": comment
        }).then(res => {
            console.log(res)
        })
    }

    function like(id) {
        CommentService.like(id, {username:store.user.username})
    }

    function dislike(id) {
        CommentService.dislike(id, {username:store.user.username})
    }

    return (
        <li className="comment" id={comment.id}>
            <div className="comment-main-level">
                <div className="comment-avatar">
                    <img src={comment.user.imagePath} alt={comment.user.username}/>
                </div>
                <div className="comment-box">
                    <div className="comment-head">
                        <h6 className={"comment-name " + (comment.user.username === authorUsername ? "by-author" : "")}>
                            <Link to={MakeUrl.userUrl(comment.user.username)}>{comment.user.username}</Link>
                        </h6>
                        <span>
                            <i className="fa fa-clock-o" aria-hidden="true">{dayjs(comment.createdAt).format("MMMM D, YYYY x HH:mm").replace("x", "at")}</i>
                        </span>
                        <i className="fa fa-reply" onClick={() => toggleReplyInput()}></i>
                        <i className="fa fa-heart" onClick={() => like(comment.id)}>
                            &nbsp;
                            {comment.likesCount - comment.dislikesCount > 0 ? 
                                "+" + comment.likesCount - comment.dislikesCount
                                :
                                comment.likesCount - comment.dislikesCount
                            }
                        </i>
                    </div>
                    <div className="comment-content">{comment.text}</div>
                    <form className={"reply " + (replyHidden && "hidden")} onSubmit={sendReply}>
                        <input type="text" placeholder='Write your reply hear' name='text' style={{
                            marginBottom: "0"
                        }}/>
                        <button type='submit' className="leave-comment-submit" style={{
                            marginTop: "5px"
                        }}>Reply</button>
                    </form>
                </div>
            </div>
            {comment.replies &&
                <ul className="comments-list reply-list">
                    {comment.replies.map(reply => (
                        <li className="reply-comment">
                            <div className="comment-avatar">
                                <img src={reply.user.imagePath} alt={reply.user.username}/>
                            </div>
                            <div className="comment-box">
                                <div className="comment-head">
                                    <h6 className={"comment-name " + (reply.user.username === authorUsername ? "by-author" : "")}>
                                        <Link to={MakeUrl.userUrl(reply.user.username)}>{reply.user.username}</Link>
                                    </h6>
                                    <span>
                                    <i className="fa fa-clock-o" aria-hidden="true">{dayjs(reply.createdAt).format("MMMM D, YYYY x HH:mm").replace("x", "at")}</i>
                                    </span>
                                    {/* <i className="fa fa-reply"></i> */}
                                    <i className="fa fa-heart" onClick={() => like(reply.id)}>
                                        &nbsp;
                                        {reply.likesCount - reply.dislikesCount > 0 ? 
                                            "+" + reply.likesCount - reply.dislikesCount
                                            :
                                            reply.likesCount - reply.dislikesCount
                                        }
                                    </i>
                                </div>
                                <div className="comment-content">{reply.text}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </li>
    )
}

export default PostCommentItem