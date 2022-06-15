import { Link } from "react-router-dom"
import ForumChoose from "./ForumChoose"
import "../styles/header.css"
import { useContext, useState } from "react"
import { Context } from "../index"
import { useEffect } from "react"
import Login from "./Login"
import {observer} from 'mobx-react-lite'

function Header({store}) {
    const [openModal, setModal] = useState(false)
    // const {store} = useContext(Context);
    // useEffect(()=> {
    //     if(localStorage.getItem("token")) {
    //         store.checkAuth(localStorage.getItem("token"))
    //     }
    // }, [])
    // console.log(store.user)
    return (
        <>
        <header>
            <ul>
                <li>Logo</li>
                <li><Link to={'/'}>Home</Link></li>
                <li>Faq</li>
                <li><a href="#" onClick={()=>setModal(true)}>Create post</a></li>
                
            </ul>
            <div className="search">
                <input type="text" className="search-input" />
                <button>Search</button> 
            </div>
            {store.isAuth ? 
                <div>
                    <a href="#" onClick={()=> store.logout()}>Logout</a>
                </div>
                :
                <>
                    <Link to={"/login"} element={<Login />}>Login</Link>
                    <Link to={"/registration"}>Reg</Link>
                </>
            }
        </header>
        {openModal && <ForumChoose openModal={openModal} setModal={setModal} />}
        </>
    )
}

export default observer(Header)