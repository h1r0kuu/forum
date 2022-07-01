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
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="ques-type302">
                            <a href="#">
                            <button type="button" className="q-type238">
                                <i className="fa fa-comment" aria-hidden="true"> {forum.postsCount} posts</i>
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
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="ques-type302">
                                    <a href="#">
                                    <button type="button" className="q-type238">
                                        <i className="fa fa-comment" aria-hidden="true"> {subForum.postsCount} posts</i>
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