import { Link } from "react-router-dom"
import ForumChoose from "./Forum/ForumChoose"
import { useState } from "react"
import Login from "./Auth/Login"
import {observer} from 'mobx-react-lite'
import Registration from "./Auth/Registration"
import ForumListForFC from "./Forum/ForumListForFC"
import "../styles/style.css"
import "../styles/forum-choose.css"

function Header({store}) {
    const [openModal, setModal] = useState(false)
    return (
        <>
            <header>
                <div className="navbar">
                    <nav className="navigation" id="navigation">
                        <span className="close-icon" id="close-icon" onclick="showIconBar()"><i className="fa fa-close"></i></span>
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to={"/"}>Home</Link>
                            </li>
                            {store.isAuth 
                            ?
                            <>
                                <li className="nav-item">
                                    <Link to={"/user/"+store.user.username}>Profile</Link>
                                </li>
                                <li className="nav-item" onClick={()=>setModal(true)}>
                                    <Link to={"#"}>Create post</Link>
                                </li>
                                <li className="nav-item" onClick={() => store.logout()}>
                                    <Link to={"#"}>Logout</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link to={"/login"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/registration"}>Registration</Link>
                                </li>
                            </>
                            }
                        </ul>
                    </nav>
                </div>
                <div className="search-box">
                    <div>
                        <select name="" id="">
                            <option value="Everything">Everything</option>
                            <option value="Titles">Titles</option>
                            <option value="Descriptions">Descriptions</option>
                        </select>
                        <input type="text" name="q" placeholder="search ..."/>
                        <button><i className="fa fa-search"></i></button>
                    </div>
                </div>
            </header>
            {openModal && 
                <ForumListForFC setModal={setModal}/>
            }
        </>
    )
}

export default observer(Header)