import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../layouts/Header"
import PostService from "../services/PostService"

function SinglePost() {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        PostService.getOne(postId).then((res)=> {
            setPost(res.data)
        })
    }, [postId])

    return (
        <>
            <Header />
            <div className="post">{post.title}</div>
            <div className="text">{post.text}</div>
        </>
    )
}

export default SinglePost