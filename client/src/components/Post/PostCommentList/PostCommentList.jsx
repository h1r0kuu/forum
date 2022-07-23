import PostCommentItem from "./PostCommentItem/PostCommentItem"
import "./PostCommentListStyles.css"

function PostCommentList({postId, comments, authorUsername}) {
    return (
        <div className="comments">
            <div className="container">
                <div className="row">
                <div className="comments-container">
                    {comments.length > 0 ? (
                        <ul id="comments-list" className="comments-list">
                            {comments.map(comment => (
                                <PostCommentItem
                                    postId={postId}
                                    comment={comment}
                                    authorUsername={authorUsername}
                                    key={comment.id}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>Comment list is empty</p>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default PostCommentList