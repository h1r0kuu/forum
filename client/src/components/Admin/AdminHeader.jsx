import { Link } from "react-router-dom"
import "../styles/style.css"

function AdminHeader() {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/admin/forums">Forums</Link>
                    <Link to="/admin/posts">Posts</Link>
                    <Link to="/admin/users">Posts</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminHeader