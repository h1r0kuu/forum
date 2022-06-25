import { useEffect, useState } from "react"
import StatsService from "../../../../services/StatsService"

function Stats() {
    const [stats, setStats] = useState({})

    useEffect(() => {
        StatsService.stats().then(res => {
            setStats(res.data)
        })
    }, [])


    return (
        <div className="status-part3821">
            <h4>stats</h4>
            <a href="#">
                <i className="fa fa-question-circle" aria-hidden="true"> Users({stats.users})</i>
            </a>
            <i className="fa fa-comment" aria-hidden="true"> Posts({stats.posts})</i>
        </div>
    )
}

export default Stats