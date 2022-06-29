import { useCallback } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import SearchInput from "../components/layout/Header/SearchInput"
import Navbar from "../components/layout/Navigation/Navbar"
import PostListTempalte from "../components/layout/Post/PostListTemplate"
import PostService from "../services/PostService"

function Index() {
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0
    
    const loadMorePosts = () => {
        PostService.getAll(page,order).then(res => {
            const {content, ...pagin} = res.data
            setPosts(content)
            setPagination(pagin)
        })
    }

    useEffect(()=>{
        loadMorePosts()
    }, [page, order])
    return (
        <>
            <Navbar/>
            <SearchInput/>
            <section className="main-content920">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <PostListTempalte posts={posts} pagination={pagination} order={order}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Index