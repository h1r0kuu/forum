import "./NavbarStyles.css"

import { Link } from "react-router-dom"
import { CHATS, CREATE_POST, HOME, LOGIN, SIGNUP } from "../../../utils/routeConstants"
import { GetStore, GetUser, IsAuth } from "../../../utils/authUser"
import { MakeUrl } from "../../../utils/urls"
import { useEffect } from "react"

function Navbar() {

    const isAuth = IsAuth()
    const user = GetUser()
    const store = GetStore()

    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
                        <Link to={"#"} className="navbar-brand">
                            <img src="image/logo.png" alt="Logo"/>
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav"> </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to={HOME}>Home</Link></li>
                            <li><Link to={CREATE_POST}>Create post</Link></li>
                            {isAuth === true ? (
                                <>
                                    <li><Link to={MakeUrl.userUrl(user.username)}>Profile</Link></li>
                                    <li><Link to={CHATS}>Chats</Link></li>
                                    <li><Link to={"#"} onClick={() => store.logout()}>Logout</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={LOGIN}>Login</Link></li>
                                    <li><Link to={SIGNUP}>Sign up</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar