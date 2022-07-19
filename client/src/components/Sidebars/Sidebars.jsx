import Forums from "./Forums/Forums"
import Login from "./Login/Login"
import OnlineUsers from "./OnlineUsers/OnlineUsers"
import RecentPosts from "./RecentPosts/RecentPosts"
import "./SidebarsStyles.css"

import Stats from "./Stats/Stats"

function Sidebars() {
    return (
        <aside className="col-md-3 sidebars">
            <Stats/>
            <Forums/>
            <OnlineUsers/>
            <Login/>
            <RecentPosts/>
        </aside>
    )
}

export default Sidebars