import { Store } from "react-notifications-component"
import CommentService from "../../services/CommentService"
import NotificationServicre from "../../services/NotificationServicre"
import { GetUser } from "../../utils/UserUtil"

function LeaveCommentForm({post, comments, setComments}) {
    const user = GetUser()

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let text = form.get("text")
        
        CommentService.create(post.id, {
            "text": text,
            "user": user
        }).then(res => {
            const comment = res.data
            const updatedComments = [...comments]
            updatedComments.push(comment)
            setComments(updatedComments)
            window.location.href = `#${comment.id}`
            Store.addNotification({
                title: 'Info',
                message: "Comment successfully created",
                type: 'success',
                container: 'bottom-left',
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        })

        NotificationServicre.notify({
            text: "There is new comment in your post",
            isRead: false,
            user: post.creator
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