import "./ForumsStyles.css"

import ForumItem from "./ForumItem/ForumItem"
import { useEffect, useState } from "react"
import { ForumService } from "../../../services/ForumService"

function Forums() {
    const [forums, setForums] = useState([])

    useEffect(() => {
        ForumService.getAllForums(false).then(data => {
            setForums(data)
        })
    }, [])

    return (
        <div className="forums">
            <h4>Forums</h4>
            <ul className="forum-links">
                {forums.map(forum => (
                    <ForumItem forum={forum} key={forum.id} />
                ))}
            </ul>
        </div>
    )
}

export default Forums