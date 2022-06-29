import Stats from "./Bars/Stats"
import LoginBar from "./Bars/LoginBar"
import RecentPosts from "./Bars/RecentPosts"
import OnlineUsers from "./Bars/OnlineUsers"
import {IsAuth} from "../../../utils/UserUtil"

function Sidebar() {
    return (
        <aside className="col-md-3 sidebar97239">
            <Stats />
            {!IsAuth() &&
                <LoginBar />
            }
            <OnlineUsers />
            <RecentPosts />
        </aside>
    )
}

export default Sidebar