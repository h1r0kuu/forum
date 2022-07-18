import "./RecentPostsStyles.css"

import { Link } from "react-router-dom"
import dayjs from "../../../utils/dayjsRelative"


function RecentPosts() {
    return (
        <div className="recent-posts">
            <h4>Recent Post</h4>
            <div className="post-details">
                <Link to={"#"}>
                    <h5>How much do web developers</h5>
                </Link>
                <p>I am thinking of pursuing web developing as a career & was ...</p> 
                <small style={{color: "#848991"}}>{dayjs("2022-07-15 17:49:39.982076").fromNow(true)}</small>
            </div>
        </div>
    )
}

export default RecentPosts