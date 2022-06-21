import Comment from "./Comment"

function CommentList({comments, store}) {
    return (    
        <div className="comment-list12993">
            <div className="container">
                <div className="row">
                <div className="comments-container">
                    <ul id="comments-list" className="comments-list">
                        {comments.map(comment => (
                            <Comment comment={comment} store={store}/>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CommentList