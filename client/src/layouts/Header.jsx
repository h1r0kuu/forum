import { Link } from "react-router-dom"
import ForumChoose from "./ForumChoose"
import "../styles/header.css"
import { useState } from "react"

function Header() {
    const [openModal, setModal] = useState(false)

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
                <input type="text" className="search-input"/>
                <button>Search</button> 
            </div>
        </header>
        {openModal && <ForumChoose openModal={openModal} setModal={setModal} />}
        </>
    )
}

export default Header