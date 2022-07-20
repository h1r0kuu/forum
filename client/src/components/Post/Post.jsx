import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PostService } from "../../services/postService"
import PostAuthor from "./PostAuthor/PostAuthor"
import PostCommentList from "./PostCommentList/PostCommentList"
import PostDetail from "./PostDetail/PostDetail"
import PostLeaveCommentForm from "./PostLeaveCommentForm/PostLeaveCommentForm"

function Post() {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [author, setAuthor] = useState({})
    const [isLoading, setLoading] = useState(true)


    useEffect(()=>{
        PostService.getOne(postId).then( data => {
            const {comments, creator, ...info} = data
            setAuthor(creator)
            setComments(comments)
            info.commentsCount = comments.length
            setPost(info)
            setLoading(false)
        })
    }, [postId])

    return (
        <>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                <PostDetail post={post}/>
                <PostAuthor author={author}/>
                <PostCommentList comments={comments} authorUsername={author.username} postId={post.id}/>
                <PostLeaveCommentForm postId={post.id} comments={comments} setComments={setComments}/>
                </>
            )}
        </>
    )
}

export default Post