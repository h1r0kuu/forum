import "./PostListItemStyles.css"

import { Link } from "react-router-dom"

import dayjs from "../../../utils/dayjsRelative"
import { MakeUrl } from "../../../utils/urls"
import { PostService } from "../../../services/PostService"
import { extractContent } from "../../../utils/textUtil"

function PostListItem({post}) {

    function hidePost(e) {
        e.preventDefault()
        PostService.hidePost(post.id).then(data => {
            document.getElementById("post-"+post.id).remove()
        })
    }

    return (
        <div className="post" id={"post-"+post.id}>
            <div className="row">
                <div className="col-md-1">
                    <div className="user-left user-left-repeat">
                        <Link to={MakeUrl.userUrl(post.creator.username)}>
                            <img src={post.creator.imagePath} alt={post.creator.username} />
                        </Link>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="right-description893">
                        <div id="post-title">
                            <h3>
                                <Link to={MakeUrl.postUrl(post.id)}>{post.title}</Link>
                            </h3>
                        </div>
                        <div className="post-item-details">
                            <p>{extractContent(post.text).slice(0,310)}</p>
                        </div>
                        <hr/>
                        <div className="icon-action">
                            <Link to={MakeUrl.userUrl(post.creator.username)}>
                                <i className="fa fa-user" aria-hidden="true">&nbsp;{post.creator.username}</i>
                            </Link>
                            <Link to={"#"}>
                                <i className="fa fa-clock-o" aria-hidden="true">&nbsp;{dayjs(post.createdAt).fromNow(true)} ago</i>
                            </Link>
                            <Link to={"#"}>
                                <i className="fa fa-bug" aria-hidden="true">&nbsp;Report</i>
                            </Link>
                            <Link to={"#"}>
                                <i className="fa fa-eye" aria-hidden="true" onClick={hidePost}>&nbsp;Hide</i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="ques-type302">
                        <Link to={"#"}>
                            <button type="button" className="post-info">
                                <i className="fa fa-comment" aria-hidden="true">&nbsp;{post.comments.length} comments</i>
                            </button>
                        </Link>
                        <Link to={"#"}>
                            <button type="button" className="post-info button-ques2973">
                                <i className="fa fa-user-circle-o" aria-hidden="true">&nbsp;{post.viewsCount} view</i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostListItem