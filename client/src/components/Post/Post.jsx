import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import "../../styles/post.css"

function Post({post}) {
    const lastComment = post.comments[post.comments.length - 1]

    return (
        <div className="table-row">
            <div className="status">
                <i className="fa fa-fire"></i>
            </div>
            <div className="subjects">
                <Link to={"/posts/" + post.id}>{post.title}</Link>
                <br />
                <span>Started by <b>
                    <Link to={"/"}>{post.creator && post.creator.username}</Link>
                </b> . </span>
            </div>
            <div className="replies"> {post.comments.length} replies <br /> 125 views </div>
            <div className="last-reply"> 
                {lastComment &&
                    <>
                        <Moment format='MMM DD YYYY'>{lastComment.createdAt}</Moment><br />
                        By <b>
                            <Link to={"/user/" + lastComment.user.username}>{lastComment.user.username}</Link>
                        </b>
                    </>
                }
            </div>
        </div>
    )
}

export default Post