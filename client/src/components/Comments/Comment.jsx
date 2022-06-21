import { Link } from 'react-router-dom';

import CommentService from "../../services/CommentService"

function Comment({comment, store}) {

    function like(e) {
        e.preventDefault()
        CommentService.like(comment.id, {username:store.user.username})
    }

    function dislike(e) {
        e.preventDefault()
        CommentService.dislike(comment.id, {username:store.user.username})
    }

    return (
        <li>
            <div className="comment-main-level">
                <div className="comment-avatar">
                <img src="image/images.png" alt="" />
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
                        <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content"> {comment.text} </div>
                    <div className="l-rightside39">
                        <button type="button" className="tolltip-button thumbs-up2" data-toggle="tooltip" data-placement="bottom" title="Like" onClick={like}>
                            {comment.likesCount} <i className="fa fa-thumbs-o-up " aria-hidden="true"></i>
                        </button>
                        <button type="button" className="tolltip-button  thumbs-down2" data-toggle="tooltip" data-placement="bottom" title="Dislike" onClick={dislike}>
                            {comment.dislikesCount} <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                        </button>
                        <span className="single-question-vote-result">{comment.likesCount - comment.dislikesCount}</span>
                    </div>
                </div>
            </div>
            {/* Comment replyies */}
            {/* <ul className="comments-list reply-list">
                <li>
                <div className="comment-avatar">
                    <img src="image/images.png" alt="" />
                </div>
                <div className="comment-box">
                    <div className="comment-head">
                    <h6 className="comment-name">
                        <a href="#">Lorena Rojero</a>
                    </h6>
                    <span>
                        <i className="fa fa-clock-o" aria-hidden="true"> January 15 , 2014 at 10:00 pm</i>
                    </span>
                    <i className="fa fa-reply"></i>
                    <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo? </div>
                </div>
                </li>
            </ul> */}
        </li>
    )
}

export default Comment