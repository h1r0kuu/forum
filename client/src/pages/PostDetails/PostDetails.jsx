import Footer from "../../components/Footer/Footer"
import FooterSearch from "../../components/FooterSearch/FooterSearch"
import Header from "../../components/Header/Header"
import Post from "../../components/Post/Post"
import Sidebars from "../../components/Sidebars/Sidebars"

function PostDetails() {
    return (
        <>
            <Header/>
            <section className="home-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <Post/>
                        </div>
                        <Sidebars/>
                    </div>
                </div>
            </section>
            <FooterSearch/>
            <Footer/>
        </>
    )
}

export default PostDetails