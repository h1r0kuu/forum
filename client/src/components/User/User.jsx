import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/userService";
import AboutUser from "./AboutUser/AboutUser";
import UserStats from "./UserStats/UserStats";

function User() {
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)

    useEffect(()=> {
        userService.getUser(username).then( data => {
            setUser(data)
            setLoading(false)
        })
    }, [username])

    return (
        <>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                    <AboutUser user={user}/>
                    <UserStats user={user}/>
                </>
            )}
        </>
    )
}

export default User