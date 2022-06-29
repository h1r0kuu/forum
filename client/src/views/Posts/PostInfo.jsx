import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Navbar from "../../components/layout/Navigation/Navbar"
import PostDetail from "../../components/layout/Post/PostDetail"
import Sidebar from "../../components/layout/Sidebar/Sidebar"

import PostService from "../../services/PostService"

function PostInfo() {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(()=>{
        PostService.getOne(postId).then( res => {
            setPost(res.data)
        })
    }, [postId])

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <PostDetail post={post}/>
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default PostInfo