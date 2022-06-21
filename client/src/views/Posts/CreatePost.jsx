import Navbar from "../../components/layout/Navigation/Navbar"
import PostCreateForm from "../../components/layout/Post/PostCreateForm"
import Sidebar from "../../components/layout/Sidebar/Sidebar"

function CreatePost({store}) {
    return (
        <>
        <Navbar store={store}/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <PostCreateForm store={store}/>
                </div>
                <Sidebar store={store} />
            </div>
        </div>
        </>
    )
}

export default CreatePost