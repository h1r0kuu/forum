import { useState } from "react"
import { useEffect } from "react"
import Moment from "react-moment"
import { Link, useLocation, useParams } from "react-router-dom"
import Comment from "../components/Comment/Comment"
import Header from "../components/Header"
import CommentService from "../services/CommentService"
import PostService from "../services/PostService"
import "../styles/single-post.css"
import "../styles/style.css"

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


    function showComment(e) {
        e.preventDefault()
        let commentArea = document.getElementById("comment-area");
        if(commentArea.classList.contains("hide")) {
            commentArea.classList.remove("hide");
        } else {
            commentArea.classList.add("hide");
        }
    }

    return (
        <>
            <Header store={store}/>
            <div className="container">
                <div className="navigate">
                    <span>
                    <Link to={"/"}>MyForum - Forums</Link> {">>"} <a href="">random subforum</a> {">>"} <a href="">random topic</a>
                    </span>
                </div>
                <div className="topic-container">
                    <div className="head">
                        <div className="authors"></div>
                        <div className="content">Topic: random topic (Read 1325 Times)</div>
                    </div>
                    <div className="body">
                        <div className="authors">
                            <div className="username">
                            {post.creator &&
                            <Link to={"/user/" + post.creator.username}></Link>
                                }
                            </div>
                            <div>Role</div>
                            <img src="https://cdn.pixabay.com/photo/2015/11/06/13/27/ninja-1027877_960_720.jpg" alt="" />
                            <div>
                                Posts: 45
                            </div>
                            <div>
                                Points: 4586
                            </div>
                            <hr/>
                            <div>
                                Post likes: {post.likesCount}
                            </div>
                            <div>
                                Post dislikes: {post.dislikesCount}
                            </div>
                            <div>
                                Created at: <Moment fromNow>{post.createdAt}</Moment> 
                            </div>
                            <hr/>
                            {store.isAuth &&
                            <>
                                <button onClick={like}>Like</button>
                                <button onClick={dislike}>Dislike</button>
                            </>
                            }
                        </div>
                        <div className="content">
                            <div className="text" dangerouslySetInnerHTML={{__html:post.text}} />
                            <br/>
                            <div className="comment">
                                <button onClick={showComment}>Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form className="comment-area hide" id="comment-area" onSubmit={onSubmit}>
                    <textarea name="text" id="" placeholder="comment here ... "></textarea>
                    <input type="submit" value="submit" />
                </form>
                {post.comments &&
                <>
                    {post.comments.map(comment => (
                        <Comment comment={comment} postId={post.id} store={store} key={comment.id} />
                    ))}
                </>
                }
            </div>
        </>
    )
}

export default SinglePost