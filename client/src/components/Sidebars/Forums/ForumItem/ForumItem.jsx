import { useState } from "react"
import { Link } from "react-router-dom"
import "./ForumItemStyles.css"

function ForumItem({forum}) {

    const [show, setShow] = useState(false)

    const toggleSubForums = () => {
        if(show === false) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    return (
        <li className="forum-link">
            <div class="main-forum">
                <Link to={"?forum="+forum.id}>
                    <span class="forum_title">{forum.title}</span>
                    {forum.subForum.length > 0 &&
                        <div className="arrow" onClick={() => toggleSubForums()}></div>
                    }
                </Link>
            </div>
            {forum.subForum.length > 0 &&
                <ul class="forum__sub-forums">
                    <li><Link to={"#"}>Plugins</Link></li>
                    <li><Link to={"#"}>UI Face</Link></li>
                    <li><Link to={"#"}>Pigments</Link></li>
                    <li><Link to={"#"}>Box Icons</Link></li>
                </ul>
            }
        </li>
    )
}

export default ForumItem