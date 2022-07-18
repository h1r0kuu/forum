import "./OnlineUsersStyles.css"

import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import userService from "../../../services/userService"
import { MakeUrl } from "../../../utils/urls"

function OnlineUsers() {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        userService.getOnlineUsers().then( data => {
            setUsers(data)
            setLoading(false)
        })
    }, [])


    return (
        <div className="online-users">
            <h4>Online users</h4>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                users.map(user => (
                    <div className="pints-wrapper" key={user.id}>
                        <div className="user">
                        <Link to={"#"}>
                            <img src={user.imagePath} alt={user.username}/>
                        </Link>
                        <div className="user-img">
                            <Link to={"#"}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Link>
                        </div>
                        </div>
                        <span className="online">
                            <Link to={MakeUrl.userUrl(user.username)}>
                                <h5>{user.username}</h5>
                            </Link>
                            <Link to={"#"} className="onlide-design">Online</Link>
                        </span>
                    </div>
                ))
            )}
            <hr/>
        </div>
    )
}

export default OnlineUsers