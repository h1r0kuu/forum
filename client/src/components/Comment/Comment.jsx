import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CommentService from '../../services/CommentService';

import "../../styles/style.css"

function Comment({comment, postId, store}) {

    function like(e) {
        e.preventDefault()
        CommentService.like(postId, comment.id, {username:store.user.username})
    }

    function dislike(e) {
        e.preventDefault()
        CommentService.dislike(postId, comment.id, {username:store.user.username})

    }

    
    function showReply(e) {
        e.preventDefault()
        const commentId = e.target.dataset.commentId
        const input = document.querySelector(`[data-input-id='${commentId}']`)

        if(input.classList.contains("hide")) {
            let replyAreas = document.getElementsByClassName("comment-area")
            for(let i = 0; i < replyAreas.length; i++) {
                replyAreas[i].classList.add("hide")
            }
            input.classList.remove("hide")
        } else {
            input.classList.add("hide")
        }
    }

    return (
        <>
            <div className="comments-container">
                <div className="body">
                    <div className="authors">
                        <div className="username">
                            <Link to={"/users/" + comment.user.username}>{comment.user.username}</Link>
                        </div>
                        <div>Role</div>
                            <img src="https://cdn.pixabay.com/photo/2015/11/06/13/27/ninja-1027877_960_720.jpg" alt="" />
                        <div>
                            Posts: 455
                        </div>
                        <div>
                            Points: 4586
                        </div>
                        <div>
                            Reg: <Moment format='MMM DD YYYY'>{comment.user.createdAt}</Moment>
                        </div>
                        <hr />
                        <div>
                            Commented at: <Moment fromNow>{comment.createdAt}</Moment>
                        </div>
                        <div>
                            Likes: {comment.likesCount}
                        </div>
                        <div>
                            Dislikes: {comment.dislikesCount}
                        </div>
                        <hr />
                        {store.isAuth &&
                        <>
                            <button onClick={like}>Like</button>
                            <button onClick={dislike}>Dislike</button>
                        </>
                        }
                    </div>
                    <div className="content">
                        {comment.text}
                        <br/>
                        <div className="comment">
                        <button onClick={showReply} data-comment-id={comment.id}>Reply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-area hide" id="reply-area" data-input-id={comment.id}>
                <textarea name="reply" id="" placeholder="reply here ... " />
                <input type="submit" value="submit" />
            </div>
        </>
    )
}

export default Comment