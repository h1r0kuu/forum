import "./TopBarStyles.css"

import { Link } from "react-router-dom"
import { LOGIN } from "../../../utils/routeConstants"

function TopBar() {
    return (
        <div className="top-bar">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="navbar-menu-left">
                            <ul>
                                <li><Link to={"#"}><i className="fa fa-envelope-o" aria-hidden="true"></i>Contact</Link></li>
                                <li><Link to={"#"}><i className="fa fa-headphones" aria-hidden="true"></i>Support</Link></li>
                                <li><Link to={LOGIN}><i className="fa fa-user" aria-hidden="true"></i>Login Area</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="navbar-serch-right-side">
                            <form className="navbar-form" role="search">
                                <div className="input-group add-on">
                                    <input className="form-control form-control222" placeholder="Search" id="srch-term" type="text" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-default btn-default2913" type="button"><i className="glyphicon glyphicon-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar