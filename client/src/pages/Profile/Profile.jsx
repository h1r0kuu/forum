import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import BreadcrumbElem from "../../components/Breadcrumb/BreadcrumbElem"
import Footer from "../../components/Footer/Footer"
import FooterSearch from "../../components/FooterSearch/FooterSearch"
import Header from "../../components/Header/Header"
import Sidebars from "../../components/Sidebars/Sidebars"
import User from "../../components/User/User"
import { HOME } from "../../utils/routeConstants"

function Profile() {
    return (
        <>
            <Header/>
            <Breadcrumb title={"User details"}>
                <BreadcrumbElem crumb={{name: "Home", url: HOME}}/>
                <BreadcrumbElem active={true} crumb={{name: "Profile"}}/>
            </Breadcrumb>
            <section className="home-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <User/>
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

export default Profile