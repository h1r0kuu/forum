import Stats from "./Bars/Stats"
import LoginBar from "./Bars/LoginBar"
import RecentPosts from "./Bars/RecentPosts"
import OnlineUsers from "./Bars/OnlineUsers"

function Sidebar({store}) {
    return (
        <aside className="col-md-3 sidebar97239">
            <Stats />
            {!store.isAuth &&
                <LoginBar />
            }
            <OnlineUsers />
            <RecentPosts />
        </aside>
    )
}

export default Sidebar