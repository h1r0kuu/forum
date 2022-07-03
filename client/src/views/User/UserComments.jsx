import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../components/Comments/Comment"
import UserComment from "../../components/Comments/UserComment"
import Navbar from "../../components/layout/Navigation/Navbar"
import Sidebar from "../../components/layout/Sidebar/Sidebar"
import UserService from "../../services/UserService"

function UserComments() {
    const {username} = useParams()
    const [comments, setComments] = useState([])


    useEffect( () => {
        UserService.getUserComments(username).then( res => {
            setComments(res.data)
        })
    }, [username])

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    {comments.map( comment => (
                        <UserComment comment={comment} />
                    ))}
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default UserComments