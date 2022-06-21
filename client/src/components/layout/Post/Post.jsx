import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function Post({post}) {
    return (
        <div className="question-type2033">
            <div className="row">

                <div className="col-md-10">
                    <div className="right-description893">
                        <div id="que-hedder2983">
                        <h3>
                            <Link to={"/posts/" + post.id}>{post.title}</Link>
                        </h3>
                        </div>
                        <div className="ques-details10018">
                        <p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis.Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis.</p>
                        </div>
                        <hr/>
                        <div className="ques-icon-info3293">
                        <a href="#">
                            <i className="fa fa-star" aria-hidden="true"> 5 </i>
                        </a>
                        <a href="#">
                            <i className="fa fa-folder" aria-hidden="true"> wordpress</i>
                        </a>
                        <a href="#">
                            <i className="fa fa-clock-o" aria-hidden="true"> <Moment fromNow>{post.createdAt}</Moment></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-question-circle-o" aria-hidden="true"> Question</i>
                        </a>
                        <a href="#">
                            <i className="fa fa-bug" aria-hidden="true"> Report</i>
                        </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="ques-type302">
                        <a href="#">
                        <button type="button" className="q-type238">
                            <i className="fa fa-comment" aria-hidden="true"> {post.comments.length} comments</i>
                        </button>
                        </a>
                        <a href="#">
                        <button type="button" className="q-type23 button-ques2973">
                            <i className="fa fa-user-circle-o" aria-hidden="true"> 70 view</i>
                        </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post