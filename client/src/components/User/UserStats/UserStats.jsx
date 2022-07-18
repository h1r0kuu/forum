import "./UserStatsStyles.css"

import { Link } from "react-router-dom"

function UserStats({user}) {
    return (
        <div className="user-stats">
            <div className="row">
                <div className="col-md-6">
                    <div className="ul_list_ul_list-icon-ok">
                        <ul>
                            <li><Link to={"#"}>Comments ( {user.commentsCount} )</Link></li>
                            <li><Link to={"#"}>Posts ( {user.postsCount} )</Link></li>
                            <li><Link to={"#"}>Hidden posts ( {user.hiddenPostsCount} )</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="ul_list_ul_list-icon-ok">
                        <ul>
                            <li><Link to={"#"}>Followers ( {user.followers.length} )</Link></li>
                            <li><Link to={"#"}>Followers ( {user.following.length} )</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStats