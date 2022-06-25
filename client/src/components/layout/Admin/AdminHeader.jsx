import "../../../assets/css/navbar.css"
import Dropdown from "../../Dropdown/Dropdown"
import {Link} from 'react-router-dom'

function AdminHeader({store}) {
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
                  <Link to={"/admin/forums"}>Forums</Link>
                </li>
                <li>
                  <Link to={"/admin/posts"}>Posts</Link>
                </li>
                <li>
                  <Link to={"/admin/users"}>Users</Link>
                </li>
                <li>
                  <Link to={"/admin/reports"}>Reports</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}

export default AdminHeader