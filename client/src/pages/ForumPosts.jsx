import ForumList from "../layouts/ForumList";
import Header from "../layouts/Header";
import PostList from "../components/Post/PostList";
import "../styles/index.css"

function ForumPosts() {
    return (
        <>
            <Header />
            <div className="main">
                <ForumList />
                <PostList />
            </div>
        </>
    )
}

export default ForumPosts