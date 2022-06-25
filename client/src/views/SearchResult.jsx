import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navigation/Navbar";
import PostListTemplate from "../components/layout/Post/PostListTemplate";
import UserListTemplate from "../components/layout/User/UserListTemplate";
import SearchService from "../services/SearchService";

function SearchResult({store}) {
    const [searchRes, setSearchRes] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams();

    const q = searchParams.get("query")
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0
    const field = searchParams.get("field") || "posts"

    const searchParam = `?page=${page}&order=${order}&query=${q}`

    function loadMoreData() {
        SearchService.search(q, page, order).then( res => {
            const {content, ...pagin} = res.data[field]
            setSearchRes(content)
            setPagination(pagin)
            if(content.length === 0 || content.length < 10) {
                setHasMore(false)
            }
        })
    }

    useEffect(()=>{
        loadMoreData()
    }, [q, order, field, page])
    return (
        <>
            <Navbar store={store}/>
            {searchRes.length > 0
            ?
            
            <>
                <div className="container">
                    <div className="search-field">
                        <Link to={searchParam + "&field=posts"} className="tab">Posts</Link>
                        <Link to={searchParam + "&field=users"} className="tab">Users</Link>
                    </div>
                    {field === "posts"
                        ?
                            <PostListTemplate posts={searchRes}
                                              pagination={pagination} 
                                              order={order} 
                                              store={store}
                                              additionalParams={"&query=" + q}/>
                        :
                            <UserListTemplate users={searchRes} 
                                              pagination={pagination} 
                                              order={order} 
                                              store={store}
                                              additionalParams={"&query=" + q}/>
                    }
                </div>
            </>
            :
                "Anything was found"
            }

        </>
    )
}

export default SearchResult