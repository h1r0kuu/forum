import { useEffect } from "react"
import { useState } from "react"
import Forum from "../../components/layout/Forums/Forum"
import Navbar from "../../components/layout/Navigation/Navbar"
import Sidebar from "../../components/layout/Sidebar/Sidebar"
import ForumService from "../../services/ForumService"



function ForumList({store}) {
    const [forums, setForums] = useState([])
    
    useEffect( ()=> {
        ForumService.getAllForums(false).then(res => {
            setForums(res.data)
        })
    }, [])

    return (        
        <>
        <Navbar store={store}/>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <ul className="forum-list">
                        {forums.map(forum=>(
                            <Forum forum={forum} key={forum.id}/>
                        ))}
                    </ul>
                </div>
                <Sidebar store={store} />
            </div>
        </div>
        </>
    )
}

export default ForumList