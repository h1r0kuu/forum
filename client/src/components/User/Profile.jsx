import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link, useParams } from "react-router-dom"
import UserService from "../../services/UserService"
import Header from "../Header"
import Post from "../Post/Post"

function Profile({store}) {
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [posts, setUserPosts] = useState([])

    useEffect(()=> {
        UserService.getUser(username).then((res)=> {
            setUser(res.data)
        })
    }, [username])

    function follow(e) {
        e.preventDefault()
        UserService.follow({
            followingUsername: user.username,
            followerUsername: store.user.username
        })
    }

    function loadPosts(e) {
        e.preventDefault()
        UserService.getUserPosts(username).then( res => {
            setUserPosts(res.data)
        })
    }

    return (
        <>
        <Header store={store}/>
        <div className="profile">
            <div className="user-img">
                {user.imagePath &&
                    <img src={user.imagePath} alt="" />
                }
            </div>
            <div className="user-info">
                <div className="username">{user.username}</div>
                <div className="additional-info">
                    <div className="comments el">
                        <p>Comments: <span>{user.commentsCount}</span></p>
                        {user.username !== store.user.username &&
                            <button onClick={follow}>Follow</button>
                        }
                    </div>
                    <div className="followers el">
                        {user.followers &&
                            <>
                                <p>Followers: <span>{user.followers.length}</span></p>
                            </>
                        }
                    </div>
                    <div className="following el">
                        {user.following &&
                            <>
                                <p>Following: <span>{user.following.length}</span></p>
                            </>
                        }
                    </div>
                </div>
                <div className="activities">
                    <Link to={"#"} onClick={loadPosts}>Posts</Link>
                </div>
            </div>
            <br/>
        </div>
        {posts &&
            posts.map( post => (
                <Post post={post}/>
            ))
        }
        </>
    )
}

export default Profile