import AskInput from "../../components/layout/Header/AskInput"
import Navbar from "../../components/layout/Navigation/Navbar"
import Loader from "../../components/Loader"
import PostListTemplate from "../../components/layout/Post/PostListTemplate"

import PostService from "../../services/PostService"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import UserService from "../../services/UserService"

function UserPosts() {
    const {username} = useParams()

    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(true)


    const [searchParams, setSearchParams] = useSearchParams();
    
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0

    const loadMorePosts = () => {
        UserService.getUserPosts(username, page, order).then(res => {
            const {content, ...pagin} = res.data
            setPosts(content)
            setPagination(pagin)
            setLoading(false)
            
        })
    }

    useEffect(()=>{
        loadMorePosts()
    }, [page, order, username])

    return (
        <>
        <Navbar/>
        <AskInput/>
        <section className="main-content920">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {isLoading === false  
                        ? 
                            <PostListTemplate posts={posts} pagination={pagination} order={order}/>
                        :
                            <Loader/>
                        }
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default UserPosts