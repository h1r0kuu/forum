import { useEffect } from "react"
import { useState } from "react"
import Forum from "../../components/layout/Forums/Forum"
import Navbar from "../../components/layout/Navigation/Navbar"
import Sidebar from "../../components/layout/Sidebar/Sidebar"
import ForumService from "../../services/ForumService"



function ForumList() {
    const [forums, setForums] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( ()=> {
        if(isLoaded === false) {  
            ForumService.getAllForums(false).then(res => {
                setForums(res.data)
                setIsLoaded(true)
            })
        }
    }, [])

    return (        
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <ul className="forum-list">
                        {forums.map(forum=>(
                            <Forum forum={forum} key={forum.id}/>
                        ))}
                    </ul>
                </div>
                <Sidebar/>
            </div>
        </div>
        </>
    )
}

export default ForumList