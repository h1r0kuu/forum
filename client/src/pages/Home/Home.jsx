import "./HomeStyles.css"

import Footer from "../../components/Footer/Footer";
import FooterSearch from "../../components/FooterSearch/FooterSearch";
import Header from "../../components/Header/Header";
import PostList from "../../components/PostList/PostList";
import SearchInput from "../../components/Search/SearchInput";
import Sidebars from "../../components/Sidebars/Sidebars";

import { Link, useSearchParams } from "react-router-dom";
import { DIRECTION, ORDER } from "../../constants/orderConstants";
import { MakeUrl } from "../../utils/urls";

function Home() {
    const [searchParams] = useSearchParams();
    
    const order = searchParams.get("order") || ORDER.CREATED_AT
    const page = searchParams.get("page") || 0
    const direction = searchParams.get("direction") || DIRECTION.DESC
    
    function isActive(value) {
        if(order === value) {
            return "active"
        }
    }

    return (
        <>
            <Header/>
            <SearchInput/>
            <section className="home-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div id="main">
                                <Link 
                                    to={MakeUrl.paginationUrl(page, ORDER.CREATED_AT, direction)}
                                    className={"order-param " + (isActive(ORDER.CREATED_AT))}>
                                    Recent posts
                                </Link>
                                <Link
                                    to={MakeUrl.paginationUrl(page, ORDER.MOST_COMMENTS, DIRECTION.ASC)}
                                    className={"order-param " + (isActive(ORDER.MOST_COMMENTS))}>
                                        Most comments
                                </Link>
                                {/* <Link
                                    to={MakeUrl.paginationUrl(page, ORDER.RECENT_COMMENTS, DIRECTION.ASC)}
                                    className={"order-param " + (isActive(ORDER.RECENT_COMMENTS))}>
                                    Recent commented
                                </Link>
                                <Link
                                    to={MakeUrl.paginationUrl(page, ORDER.WITHOUT_COMMENTS, direction)}
                                    className={"order-param " + (isActive(ORDER.WITHOUT_COMMENTS))}>
                                    Without comments
                                </Link> */}
                                <PostList page={page} order={order} direction={direction}/>
                            </div>
                        </div>
                        <Sidebars/>
                    </div>
                </div>
            </section>
            <FooterSearch/>
            <Footer/>
        </>
    );
}

export default Home