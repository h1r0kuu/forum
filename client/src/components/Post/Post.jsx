import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import "../../styles/post.css"

function Post({post}) {
    return (
        <div className="post">
            <div className="post__info">
                <Link to={`/posts/${post.id}`} className="post-link">{post.title}</Link>
                <div className="post__details">
                    <span className="post-creator"></span>
                    <span className="post-created_at"><Moment date={post.createdAt} fromNow /></span>
                    <span className="post-comments_count">{post.comments.length}</span>
                </div>
            </div>
            <div className="post__last-comment">
                {/* <img src="" alt="" className="commentator-image" /> */}
                <div className="commentator__info">
                    <span className="commentator-username"></span>
                    <span className="comment-created_at"></span>
                </div>
            </div>
        </div>
    )
}

export default Post