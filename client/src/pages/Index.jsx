import ForumList from "../components/Forum/ForumList";
import Header from "../components/Header";
import PostList from "../components/Post/PostList";
import "../styles/index.css"
import "../styles/style.css"

function Index({store}) {
    return (
        <>
            <Header store={store}/>
            <ForumList />
        </>
    )
}

export default Index