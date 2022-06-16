import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Comment from "../components/Comment/Comment"
import Header from "../components/Header"
import CommentService from "../services/CommentService"
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

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let text = form.get("text")

        CommentService.create(postId, {
            "text": text,
            "user": store.user
        })
    }

    function like(e) {
        e.preventDefault()
        PostService.like(postId, {username:store.user.username})
    }

    function dislike(e) {
        e.preventDefault()
        PostService.dislike(postId, {username:store.user.username})

    }

    return (
        <>
            <Header store={store}/>
            <div className="post">{post.title}</div>
            <div className="text" dangerouslySetInnerHTML={{__html:post.text}} />
            <div className="stats">
                {post.likesCount}
                &nbsp;
                {post.dislikesCount}
            </div>
            {post.comments &&
                <div className="comments">
                    {post.comments.map( comment => (
                        <Comment comment={comment} postId={postId} store={store} key={comment.id}/>
                    ))}
                </div>
            }
            {store.isAuth &&
                <div className="write-comment">
                    <form onSubmit={onSubmit}>
                        <input type="text" name="text" id="text" placeholder="text"/>
                        <button type="submit">send</button>
                    </form>
                </div>
            }
            <button onClick={like}>Like</button>
            <button onClick={dislike}>Dislike</button>
        </>
    )
}

export default SinglePost