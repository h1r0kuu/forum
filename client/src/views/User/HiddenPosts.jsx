import Moment from 'react-moment';

import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../../components/layout/Navigation/Navbar"

import PostListTemplate from "../../components/layout/Post/PostListTemplate";
import PostService from '../../services/PostService';

function HiddenPosts({store}) {
    const {username} = useParams()
    const [hiddenPosts, setHiddenPosts] = useState([])

    function unHidePost(postId) {
        PostService.unHidePost(postId).then(res => {
            console.log(res)
        }).finally(() => {
            // remove post
        })
    }

    useEffect( () => {
        UserService.getUserHiddenPosts(username).then(res => {
            setHiddenPosts(res.data)
            console.log(hiddenPosts)
        })
    }, [username])

    return (
        <>
            <Navbar store={store}/>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>Created at</th>
                        <th>Unhide</th>
                    </tr>
                </thead>
                <tbody>
                    {hiddenPosts.map(post => (
                        <tr>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td><Moment fromNow>{post.createdAt}</Moment></td>
                            <td><Link to={"#"} onClick={()=>unHidePost(post.id)}>Unhide</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default HiddenPosts