import 'react-notifications-component/dist/theme.css'
import {ReactNotifications} from "react-notifications-component"
import Navbar from "../../components/layout/Navigation/Navbar"
import PostCreateForm from "../../components/layout/Post/PostCreateForm"
import Sidebar from "../../components/layout/Sidebar/Sidebar"

function CreatePost() {
    return (
        <>
        <ReactNotifications/>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <PostCreateForm/>
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default CreatePost