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
    let page = 0
    const field = searchParams.get("field") || "posts"

    const searchParam = `?query=${q}&page=${page}&order=${order}`

    function loadMoreData() {
        SearchService.search(q, page, order).then( res => {
            const newContent = res.data[field].content
            setSearchRes((oldContent) => [...oldContent, ...newContent])
            if(newContent.length === 0 || newContent.length < 10) {
                setHasMore(false)
            }
        })
        page += 1
    }

    useEffect(()=>{
        loadMoreData()
    }, [q, order, field])
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
                                              hasMore={hasMore} 
                                              loadMoreData={loadMoreData}/>
                        :
                            <UserListTemplate users={searchRes} 
                                              pagination={pagination} 
                                              order={order} 
                                              store={store} 
                                              hasMore={hasMore} 
                                              loadMoreData={loadMoreData}/>
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