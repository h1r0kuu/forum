import Comment from "./Comment"

function CommentList({comments, store, postId}) {
    return (    
        <div className="comment-list12993">
            <div className="container">
                <div className="row">
                <div className="comments-container">
                    <ul id="comments-list" className="comments-list">
                        {comments.map(comment => (
                            <Comment comment={comment} store={store} postId={postId}/>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CommentList