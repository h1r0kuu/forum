import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import PostService from "../services/PostService"
import "../styles/single-post.css"

function SinglePost({store}) {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        PostService.getOne(postId).then((res)=> {
            setPost(res.data)
        })
    }, [postId])

    return (
        <>
            <Header store={store}/>
            <div className="post">{post.title}</div>
            <div className="text" dangerouslySetInnerHTML={{__html:post.text}} />
            <div className="comments"></div>
            <div className="write-comment">
                <form>
                    <input type="text" name="text" id="text" placeholder="text"/>
                    <button type="submit">send</button>
                </form>
            </div>
        </>
    )
}

export default SinglePost