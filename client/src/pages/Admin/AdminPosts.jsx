import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import AdminHeader from "../../components/AdminHeader"
import PostService from "../../services/PostService"

function AdminPosts() {
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(true);

    let page = 0;
    
    const loadMorePosts = () => {
        PostService.getAll(page).then(res => {
        const newPosts = res.data.content
        setPosts((oldPosts) => [...oldPosts, ...newPosts])

        if(newPosts.length === 0 || newPosts.length < 10) {
            setHasMore(false)
        }
        })
        page += 1
    }
    useEffect(()=>{
        loadMorePosts()
    }, [])

    return (
        <>
            <AdminHeader/>
            <table>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>forum</th>
                    <th>creator</th>
                    <th>comment's count</th>
                    <th>like's count</th>
                    <th>dislike's count</th>
                    <th>created at</th>
                    <th>updated at</th>
                </tr>
                {posts.map( post => (
                    <tr>
                        <td><Link to={"/posts/"+post.id}>{post.id}</Link></td>
                        <td>{post.title}</td>
                        <td>{post.forum.title}</td>
                        <td> <Link to={"/users/"+post.creator.username}>{post.creator.username}</Link></td>
                        <td>{post.comments.length}</td>
                        <td>{post.likesCount}</td>
                        <td>{post.dislikesCount}</td>
                        <td><Moment format="MMM.DD.YYYY">{post.createdAt}</Moment></td>
                        <td><Moment format="MMM.DD.YYYY">{post.updatedAt}</Moment></td>
                    </tr>
                ))}

            </table> 
        </>
    )
}

export default AdminPosts