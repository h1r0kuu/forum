import ForumList from "../components/Forum/ForumList";
import Header from "../components/Header";
import PostList from "../components/Post/PostList";
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