import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Navbar from "../../components/layout/Navigation/Navbar"
import PostDetail from "../../components/layout/Post/PostDetail"
import Sidebar from "../../components/layout/Sidebar/Sidebar"

import PostService from "../../services/PostService"

function PostInfo({store}) {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(()=>{
        PostService.getOne(postId).then( res => {
            setPost(res.data)
        })
    }, [postId])

    return (
        <>
        <Navbar store={store}/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <PostDetail post={post} store={store} />
                </div>
                <Sidebar store={store} />
            </div>
        </div>
        </>
    )
}

export default PostInfo