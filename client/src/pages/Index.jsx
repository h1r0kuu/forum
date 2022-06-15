import ForumList from "../layouts/ForumList";
import Header from "../layouts/Header";
import PostList from "../layouts/PostList";
import "../styles/index.css"
function Index({store}) {


    return (
        <>
            <Header store={store}/>
            <div className="main">
                <ForumList />
                <PostList />
            </div>
        </>
    )
}

export default Index