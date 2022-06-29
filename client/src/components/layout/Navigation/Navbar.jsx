import "../../../assets/css/navbar.css"
import Dropdown from "../../Dropdown/Dropdown"
import {Link, NavLink} from 'react-router-dom'
import { GetStore, IsAuth } from "../../../utils/UserUtil"


const questionLinks = [
    {
        text: "das",
        url: "qw"
    }
]

function Navbar() {
    const store = GetStore()
    return (
    <div className="top-menu-bottom932">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <img src="" alt="Logo" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav"></ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink to={"/"} className={({isActive}) => (isActive ? "active" : 'none')}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/forums"} className={({isActive}) => (isActive ? "active" : 'none')}>Forums</NavLink>
                </li>
                <li>
                  <NavLink to={"/posts/create"} className={({isActive}) => (isActive ? "active" : 'none')}>Create post</NavLink>
                </li>
                <Dropdown links={questionLinks}/>
                {store.isAuth 
                ?
                <>
                  <li>
                    <NavLink to={"/user/"+store.user.username} className={({isActive}) => (isActive ? "active" : 'none')}>Profile</NavLink>
                  </li>
                  <li>
                    <Link to={"#"} className="notification">
                      <i className="fa fa-bell" aria-hidden="true"></i>
                      <span className="notification-count">{store.user.notifications.length}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} onClick={()=>store.logout()}>Logout</Link>
                  </li>
                </>
                :
                <>
                  <li>
                    <NavLink to={"/login"} className={({isActive}) => (isActive ? "active" : 'none')}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/registration"} className={({isActive}) => (isActive ? "active" : 'none')}>Sign up</NavLink>
                  </li>
                </>
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}

export default Navbar