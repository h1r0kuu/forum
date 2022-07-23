import "./StatsStyles.css"

import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { StatsService } from "../../../services/StatsService"

function Stats() {
    const [stats, setStats] = useState({})

    useEffect(() => {   
        StatsService.stats().then(data => {
            setStats(data)
        })
    }, [])

    return (
        <div className="stats">
            <h4>stats</h4>
            <Link to={"#"}>
                <i className="fa fa-user" aria-hidden="true">
                    Users({stats.users})
                </i>
            </Link>
            <i className="fa fa-comment" aria-hidden="true">
                Posts({stats.posts})
            </i>
        </div>
    )
}

export default Stats