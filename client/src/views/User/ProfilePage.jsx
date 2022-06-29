import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Navbar from "../../components/layout/Navigation/Navbar"
import Sidebar from "../../components/layout/Sidebar/Sidebar"
import Profile from "../../components/layout/User/Profile"

import UserService from "../../services/UserService"

function ProfilePage() {
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [posts, setUserPosts] = useState([])

    useEffect(()=> {
        UserService.getUser(username).then((res)=> {
            setUser(res.data)
        })
    }, [username])

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <Profile user={user}/>                    
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default ProfilePage