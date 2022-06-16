import { Link } from "react-router-dom"
import ForumChoose from "./Forum/ForumChoose"
import { useState } from "react"
import Login from "./Auth/Login"
import {observer} from 'mobx-react-lite'
import "../styles/header.css"
import Registration from "./Auth/Registration"

function Header({store}) {
    const [openModal, setModal] = useState(false)
    return (
        <>
        <header>
            <ul>
                <li>Logo</li>
                <li><Link to={'/'}>Home</Link></li>
                <li>Faq</li>
                {store.isAuth &&
                    <li><a href="#" onClick={()=>setModal(true)}>Create post</a></li>
                }
            </ul>
            <div className="search">
                <input type="text" className="search-input" />
                <button>Search</button> 
            </div>
            {store.isAuth ?
                <> 
                    <Link to={"/user/" + store.user.username}>Profile</Link>
                <div>
                    <a href="#" onClick={()=> store.logout()}>Logout</a>
                </div>
                </>
                :
                <>
                    <Link to={"/login"} element={<Login />}>Login</Link>
                    <Link to={"/registration"} element={<Registration />}>Reg</Link>
                </>
            }
        </header>
        {openModal && <ForumChoose openModal={openModal} setModal={setModal} />}
        </>
    )
}

export default observer(Header)