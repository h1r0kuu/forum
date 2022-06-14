import ForumList from "../layouts/ForumList";
import Header from "../layouts/Header";
import PostList from "../layouts/PostList";
import "../styles/index.css"

function Index() {

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

export default Index