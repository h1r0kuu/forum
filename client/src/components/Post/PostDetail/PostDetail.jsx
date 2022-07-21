import "./PostDetailStyles.css"

import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { PostService } from "../../../services/postService"
import { GetUser } from "../../../utils/authUser"

function PostDetail({post}) {
    const postRating = post.likesCount - post.dislikesCount

    const user = GetUser()

    function like(e) {
        e.preventDefault()
        PostService.like(post.id, {username:user.username})
    }

    function dislike(e) {
        e.preventDefault()
        PostService.dislike(post.id, {username:user.username})
    }

    return (
        <div className="single-post">
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="post-title">
                            <h3>{post.title}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="post-right-icon">
                        <Link to={"#"}>
                            <i className="fa fa-question-circle" aria-hidden="true"></i> Question
                        </Link>
                        <Link to={"#"} className="report">Report</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-details-info">
                <div className="text" dangerouslySetInnerHTML={{__html: post.text}} />
                <hr/>
                <div className="post-footer">
                    <div className="post-icons">
                        <i className="fa fa-clock-o clock2" aria-hidden="true">&nbsp;{dayjs(post.createdAt).fromNow(true)} ago</i>
                        <Link to={"#"}>
                            <i className="fa fa-commenting commenting2" aria-hidden="true">&nbsp;{post.commentsCount} answer</i>
                        </Link>
                        <i className="fa fa-user user2" aria-hidden="true">&nbsp;{post.viewsCount} views</i>
                    </div>
                    <div className="post-likes">
                        <button type="button" className="tolltip-button thumbs-up2" data-toggle="tooltip" data-placement="bottom" title="Like" onClick={like}>
                            <i className="fa fa-thumbs-o-up " aria-hidden="true" style={{color: "green"}}>&nbsp;{post.likesCount}</i>
                        </button>
                        <button type="button" className="tolltip-button  thumbs-down2" data-toggle="tooltip" data-placement="bottom" title="Dislike" onClick={dislike}>
                            <i className="fa fa-thumbs-o-down" aria-hidden="true" style={{color: "red"}}>&nbsp;{post.dislikesCount}</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail