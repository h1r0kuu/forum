import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import FooterSearch from "../../components/FooterSearch/FooterSearch";
import Header from "../../components/Header/Header";
import PostList from "../../components/PostList/PostList";
import SearchInput from "../../components/Search/SearchInput";
import { DIRECTION } from "../../enums/orderEnums";

import { SearchService } from "../../services/searchService"

function SearchResult() {
    const [searchRes, setSearchRes] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams();

    const q = searchParams.get("query")
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0
    const field = searchParams.get("field") || "posts"
    const direction = searchParams.get("direction") || DIRECTION.DESC
    const searchParam = `?page=${page}&order=${order}&query=${q}`

    function loadMoreData() {
        SearchService.search(q, page, order).then( data => {
            const {content, ...pagin} = data[field]
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
        <Header/>
        <SearchInput/>
        <section className="search-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="search-field">
                            <Link to={searchParam + "&field=posts"} className="tab">Posts</Link>
                            <Link to={searchParam + "&field=users"} className="tab">Users</Link>
                        </div>
                        {field === "posts" &&
                                <PostList
                                    page={page}
                                    order={order}
                                    direction={direction}
                                    isLoading={isLoading}
                                    posts={SearchResult}
                                    pagination={pagination}
                                    additionalParams={"&query=" + q}
                                />
                            
                                
                        }
                    </div>
                </div>
            </div>
        </section>
        <FooterSearch/>
        <Footer/>
        </>
    )
}

export default SearchResult