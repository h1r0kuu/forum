import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import BreadcrumbElem from "../../components/Breadcrumb/BreadcrumbElem"
import Footer from "../../components/Footer/Footer"
import FooterSearch from "../../components/FooterSearch/FooterSearch"
import Header from "../../components/Header/Header"
import Chats from "../../components/Chats/Chats"
import { HOME } from "../../utils/routeConstants"

function UserChats() {
    return (
        <>
            <Header/>
            <Breadcrumb title={"Chat list"}>
                <BreadcrumbElem crumb={{name: "Home", url: HOME}}/>
                <BreadcrumbElem active={true} crumb={{name: "Chats"}}/>
            </Breadcrumb>
            <section className="home-content">
                <div className="chat-container">
                    <Chats/>
                </div>
            </section>
            <FooterSearch/>
            <Footer/>
        </>
    )
}

export default UserChats