import { GetUser } from "../../../utils/authUser"

import { CommentService } from "../../../services/CommentService"

import "./PostLeaveCommentFormStyles.css"

function PostLeaveCommentForm({postId, comments, setComments}) {
    const user = GetUser()

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let text = form.get("text")

        CommentService.create(postId, {
            "text": text,
            "user": user
        }).then(data => {
            const comment = data
            setComments(comments.concate(comment))
            window.location.href = `#${comment.id}`
        })
    }

    return (
        <div className="leave-comment-box">
            <h3>Leave A Reply</h3>
            <hr/>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={onSubmit}>
                        <div className="leave-comment">
                            <input type="text" className="leave-comment-input" placeholder="Enter Your Post" name="text"/>
                        </div>
                        <button type="submit" className="leave-comment-submit">Post Your Answer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostLeaveCommentForm