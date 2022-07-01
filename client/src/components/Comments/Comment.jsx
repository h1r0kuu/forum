import Moment from 'react-moment';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import CommentService from "../../services/CommentService"
import { GetStore } from '../../utils/UserUtil';

function Comment({comment, postId}) {
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
        <li id={comment.id}>
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
                            <i className="fa fa-clock-o" aria-hidden="true"> January 15 , 2014 at 10:00 pm</i>
                        </span>
                        <i className="fa fa-reply"></i>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </div>
                    <div className="comment-content"> {comment.text} </div>
                    <div className="l-rightside39">
                        <button type="button" className="tolltip-button thumbs-up2" data-toggle="tooltip" data-placement="bottom" title="Like" onClick={()=>like(comment.id)}>
                            {comment.likesCount} <i className="fa fa-thumbs-o-up " aria-hidden="true"></i>
                        </button>
                        <button type="button" className="tolltip-button  thumbs-down2" data-toggle="tooltip" data-placement="bottom" title="Dislike" onClick={()=>dislike(comment.id)}>
                            {comment.dislikesCount} <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                        </button>
                        <span className="single-question-vote-result">{comment.likesCount - comment.dislikesCount}</span>
                        <Link to={"#"} onClick={() => {toggleReplyInput()}}> reply</Link>
                    </div>
                    <form className={"reply " + (replyHidden && "hidden")} onSubmit={sendReply}>
                        <input type="text" placeholder='Write your reply hear' name='text'/>
                        <button type='submit'>Reply</button>
                    </form>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 &&
            <ul className="comments-list reply-list">
                {comment.replies.map(reply => (
                    <li>
                        <div className="comment-avatar">
                            <img src={reply.user.imagePath} alt="" />
                        </div>
                        <div className="comment-box">
                            <div className="comment-head">
                                <h6 className="comment-name">
                                    <Link to={"/users/"+reply.user.username}>{reply.user.username}</Link>
                                </h6>
                                <span>
                                    <i className="fa fa-clock-o" aria-hidden="true"> January 15 , 2014 at 10:00 pm</i>
                                </span>
                                <i className="fa fa-reply"></i>
                                <i className="fa fa-heart"></i>
                            </div>
                            <div className="comment-content">{reply.text}</div>
                            <div className="l-rightside39">
                                <button type="button" className="tolltip-button thumbs-up2" data-toggle="tooltip" data-placement="bottom" title="Like" onClick={()=>like(reply.id)}>
                                    {reply.likesCount} <i className="fa fa-thumbs-o-up " aria-hidden="true"></i>
                                </button>
                                <button type="button" className="tolltip-button  thumbs-down2" data-toggle="tooltip" data-placement="bottom" title="Dislike" onClick={()=>dislike(reply.id)}>
                                    {reply.dislikesCount} <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                </button>
                                <span className="single-question-vote-result">{reply.likesCount - reply.dislikesCount}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            }
        </li>
    )
}

export default Comment