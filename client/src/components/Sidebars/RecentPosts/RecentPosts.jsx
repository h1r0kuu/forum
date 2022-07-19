import "./RecentPostsStyles.css"

import { Link } from "react-router-dom"
import dayjs from "../../../utils/dayjsRelative"
import { useEffect, useState } from "react"
import { PostService } from "../../../services/postService"
import { MakeUrl } from "../../../utils/urls"
import { extractContent } from "../../../utils/textUtil"


function RecentPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        PostService.getRecentPosts().then(data => {
            setPosts(data)
            setLoading(false)
        })
    }, [])

    return (
        <div className="recent-posts">
            <h4>Recent Post</h4>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                posts.map(post => {
                    const postText = extractContent(post.text)
                    return (
                        <div className="post-details" key={post.id}>
                            <Link to={MakeUrl.postUrl(post.id)}>
                                <h5>{post.title.slice(0,30)}</h5>
                            </Link>
                            <p>
                                {
                                    postText.length > 60 ?
                                    postText.slice(0, 60) + "..." :
                                    postText.slice(0, 60)
                                }
                            </p> 
                            <small style={{color: "#848991"}}>{dayjs(post.createdAt).fromNow(true)}</small>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default RecentPosts