import Moment from 'react-moment';
import CommentService from '../../services/CommentService';

import "../../styles/comment.css"

function Comment({comment, postId, store}) {

    function like(e) {
        e.preventDefault()
        CommentService.like(postId, comment.id, {username:store.user.username})
    }

    function dislike(e) {
        e.preventDefault()
        CommentService.dislike(postId, comment.id, {username:store.user.username})

    }

    return (
        <div className="comment">
            <div className="comment__user">
                <div className="username">{comment.user.username}</div>
                <img src={comment.user.imagePath} alt="" className='image' />
                <div className="user__comments-count">{comment.user.commentsCount}</div>
                <div className="registration-date"><Moment date={comment.user.createdAt} format="DD MMM YYYY" /></div>
                <div className="comment__date"><Moment date={comment.createdAt} fromNow /></div>
            </div>
            <div className="comment__content">
                {comment.text}
            </div>
            <button onClick={like}>Like {comment.likesCount}</button>
            <button onClick={dislike}>Dislike {comment.dislikesCount}</button>
        </div>
    )
}

export default Comment