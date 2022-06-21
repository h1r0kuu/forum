import "../../../assets/css/navbar.css"
import Dropdown from "../../Dropdown/Dropdown"
import {Link} from 'react-router-dom'


const questionLinks = [
    {
        text: "das",
        url: "qw"
    }
]

function Navbar({store}) {
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
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/forums"}>Forums</Link>
                </li>
                <li>
                  <Link to={"/posts/create"}>Create post</Link>
                </li>
                <Dropdown links={questionLinks}/>
                {store.isAuth 
                ?
                <>
                  <li>
                    <Link to={"/user/"+store.user.username}>Profile</Link>
                  </li>
                  <li>
                    <Link to={"/"} onClick={()=>store.logout()}>Logout</Link>
                  </li>
                </>
                :
                <>
                  <li>
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li>
                    <Link to={"/registration"}>Sign up</Link>
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