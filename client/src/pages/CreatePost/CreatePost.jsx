import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import BreadcrumbElem from "../../components/Breadcrumb/BreadcrumbElem"
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm"
import Footer from "../../components/Footer/Footer"
import FooterSearch from "../../components/FooterSearch/FooterSearch"
import Header from "../../components/Header/Header"
import Sidebars from "../../components/Sidebars/Sidebars"
import { HOME } from "../../constants/routeConstants"

function CreatePost() {
    return (
        <>
            <Header/>
            <Breadcrumb title={"Create post"}>
                <BreadcrumbElem crumb={{name: "Home", url: HOME}}/>
                <BreadcrumbElem active={true} crumb={{name: "Create post"}}/>
            </Breadcrumb>
            <section className="home-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <CreatePostForm/>
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

export default CreatePost