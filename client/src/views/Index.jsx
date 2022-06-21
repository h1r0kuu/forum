import AskInput from "../components/layout/Header/AskInput"
import Navbar from "../components/layout/Navigation/Navbar"
import PostList from "../components/layout/Post/PostList"
import Sidebar from "../components/layout/Sidebar/Sidebar"

function Index({store}) {
    return (
        <>
            <Navbar store={store}/>
            <AskInput/>
            <section className="main-content920">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            {/* <PostList/> */}
                        </div>
                        <Sidebar store={store} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Index