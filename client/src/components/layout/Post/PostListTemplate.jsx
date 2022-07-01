import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import Pagination from "../../Pagination"
import Navbar from "../Navigation/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Post from "./Post"

function PostListTemplate({posts, pagination, order, additionalParams}) {

    function deletePost(postId) {
        document.getElementById("post-"+postId).remove()
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div id="main">
                        <Link to={`?page=0&order=comments`} className="tab">Most Response</Link>
                        <Link to={`?page=0&order=no_comments`} className="tab">No Answer</Link>
                        <Link to={`?page=0&order=createdAt`} className="tab">Recent Post</Link>
                        <section id="content">
                            {posts.map( post => (
                                <Post post={post} key={post.id} deletePost={deletePost}/>
                            ))}
                            {pagination && pagination.pageable && 
                                <Pagination pagination={pagination} order={order} additionalParams={additionalParams}/>
                            }
                        </section>
                    </div>
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default PostListTemplate