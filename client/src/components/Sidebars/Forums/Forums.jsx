import "./ForumsStyles.css"

import ForumItem from "./ForumItem/ForumItem"
import { useEffect, useState } from "react"
import { ForumService } from "../../../services/forumService"

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
            <ul class="forum-links">
                {forums.map(forum => (
                    <ForumItem forum={forum} />
                ))}
            </ul>
        </div>
    )
}

export default Forums