import { useEffect } from "react"
import { useState } from "react"
import UserService from "../../../../services/UserService"

function OnlineUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        UserService.getOnlineUsers().then( res => {
            setUsers(res.data)
        })
    }, [])

    return (
        <>
        {users.length > 0 &&
        <div className="highest-part302">
            <h4>Online users</h4>
            {users.map(user => (
                <div className="pints-wrapper" key={user.id}>
                    <div className="left-user3898">
                        <a href="#">
                            <img src={user.imagePath} alt="Image"/>
                        </a>
                        <div className="imag-overlay39">
                            <a href="#">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <span className="points-details938">
                        <a href="#">
                            <h5>{user.username}</h5>
                        </a>
                        <a href="#" className="designetion2">Online</a>
                    </span>
                </div>
            ))}
        </div>
        }
        </>
    )
}

export default OnlineUsers