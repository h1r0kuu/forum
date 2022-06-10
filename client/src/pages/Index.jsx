import ForumList from "../layouts/ForumList";
import Header from "../layouts/Header";
import PostList from "../components/Post/PostList";

function Index() {
    return (
        <>
            <Header />
            <ForumList />
            <PostList />
        </>
    )
}

export default Index