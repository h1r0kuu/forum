import "./UserStatsStyles.css"

import { Link } from "react-router-dom"
import { PROFILE } from "../../../enums/profileEnums"

function UserStats({user,selectedOption, setSelectedOption}) {
    return (
        <div className="user-stats">
            <div className="row">
                <div className="col-md-6">
                    <div className="ul_list_ul_list-icon-ok">
                        <ul>
                            <li><Link to={"#"} onClick={() => setSelectedOption(PROFILE.COMMENTS)}>Comments ( {user.commentsCount} )</Link></li>
                            <li><Link to={"#"} onClick={() => setSelectedOption(PROFILE.POSTS)}>Posts ( {user.postsCount} )</Link></li>
                            <li><Link to={"#"} onClick={() => setSelectedOption(PROFILE.HIDDEN_POSTS)}>Hidden posts ( {user.hiddenPostsCount} )</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="ul_list_ul_list-icon-ok">
                        <ul>
                            <li><Link to={"#"} onClick={() => setSelectedOption(PROFILE.FOLLOWERS)}>Followers ( {user.followers.length} )</Link></li>
                            <li><Link to={"#"} onClick={() => setSelectedOption(PROFILE.FOLLOWING)}>Following ( {user.following.length} )</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStats