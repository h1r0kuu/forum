import { useEffect, useState } from "react"
import { ReactNotifications } from "react-notifications-component"
import { useParams } from "react-router-dom"

import Navbar from "../../components/layout/Navigation/Navbar"
import PostDetail from "../../components/layout/Post/PostDetail"
import Sidebar from "../../components/layout/Sidebar/Sidebar"

import PostService from "../../services/PostService"

function PostInfo() {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    useEffect(()=>{
        PostService.getOne(postId).then( res => {
            const post = res.data
            setPost(post)
            setComments(post.comments)
        })
    }, [postId])
    return (
        <>
        <ReactNotifications/>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <PostDetail post={post} comments={comments} setComments={setComments}/>
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default PostInfo