import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserService from "../../services/UserService"
import Header from "../Header"

function Profile({store}) {
    const {username} = useParams()
    const [user, setUser] = useState({})

    useEffect(()=> {
        UserService.getUser(username).then((res)=> {
            setUser(res.data)
        })
    }, [username])
    return (
        <>
        <Header store={store}/>
        <div className="profile">
            <div className="username">{user.username}</div>
            {user.imagePath &&
                <img src={user.imagePath} alt="" />
            }
            Comments: {user.commentsCount}
        </div>
        </>
    )
}

export default Profile