import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import Pagination from "../../Pagination"
import Navbar from "../Navigation/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Post from "./Post"

function PostListTemplate({posts, pagination, order, store, hasMore, loadMoreData}) {
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
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={loadMoreData}
                                hasMore={hasMore}
                                loader={<h4>Loading</h4>}
                            >
                            {posts.map( post => {
                                return <Post post={post} key={post.id} />;
                                })}
                            </InfiniteScroll>
                        </section>
                    </div>
                </div>
                <Sidebar store={store} />
            </div>
        </div>
        </>
    )
}

export default PostListTemplate