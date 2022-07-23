import "./FollowingStyles.css"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserService } from "../../../services/UserService"
import { MakeUrl } from "../../../utils/urls"

import dayjs from "../../../utils/dayjsRelative"

function Following({user}) {
    const [following, setFollowing] = useState([])

    const unfollow = (username) => {
        UserService.unfollow({
            followingUsername: username,
            followerUsername: user.username
        })
    }

    useEffect(() => {
        UserService.getUserFollowingList(user.username).then(data => {
            setFollowing(data)
        })
    }, [user])

    return (
        <>
            {following.map(followingUser => (
                <div className="about-user">
                    <div className="row">
                        <div className="col-md-1">
                            <div className="user-image">
                                <img src={followingUser.imagePath} alt={followingUser.username} />
                            </div>
                        </div>
                        <div className="col-md-11">
                            <Link to={MakeUrl.userUrl(followingUser.username)}>{followingUser.username}</Link>
                            <div className="icon-action">
                                <Link to={"#"}>
                                    <i className="fa fa-clock-o" aria-hidden="true">&nbsp;{dayjs(followingUser.createdAt).format("MMM DD YYYY")}</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <span className="unfollow-item">
                        <Link to={"#"} onClick={() => unfollow(followingUser.username)}>
                            Unfollow
                        </Link>
                    </span>
                </div>
            ))}
        </>
    )
}

export default Following