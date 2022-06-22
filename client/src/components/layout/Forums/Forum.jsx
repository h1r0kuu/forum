import { Link } from "react-router-dom"

function Forum({forum}) {
    return (
        <li>
            <div className={"forum" + (forum.subForums.length > 0 ? " has-subforum dot" : "")}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="right-description893">
                            <div id="que-hedder2983">
                            <h3>
                                <Link to={"/forums/" + forum.id}>{forum.title}</Link>
                            </h3>
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
                                <i className="fa fa-clock-o" aria-hidden="true"> 4 min ago</i>
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
                                <i className="fa fa-comment" aria-hidden="true"> {forum.postsCount} posts</i>
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
            {forum.subForums.length > 0 &&
            <ul className="sub-forum sub-forum-list">
                {forum.subForums.map(subForum => (
                    <li key={subForum.id}>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="right-description893">
                                    <div id="que-hedder2983">
                                    <h3>
                                        <Link to={"/forums/" + subForum.id}>{subForum.title}</Link>
                                    </h3>
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
                                        <i className="fa fa-clock-o" aria-hidden="true"> 4 min ago</i>
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
                                        <i className="fa fa-comment" aria-hidden="true"> {subForum.postsCount} posts</i>
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
                    </li>
                ))}
                <div className="dot"></div>
            </ul>
            }
        </li>
    )
}

export default Forum