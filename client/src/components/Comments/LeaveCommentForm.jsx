import CommentService from "../../services/CommentService"

function LeaveCommentForm({postId, store}) {
    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let text = form.get("text")

        CommentService.create(postId, {
            "text": text,
            "user": store.user
        })
    }
    return (
        <div className="comment289-box">
            <h3>Leave A Reply</h3>
            <hr/>
            <div className="row">
                {/* Ckeditor */}
                <div className="col-md-12">
                    <form onSubmit={onSubmit}>
                        <div className="post9320-box">
                            <input type="text" className="comment-input219882" placeholder="Enter Your Comment" name="text"/>
                        </div>
                        <button type="submit" className="pos393-submit">Post Your Answer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LeaveCommentForm