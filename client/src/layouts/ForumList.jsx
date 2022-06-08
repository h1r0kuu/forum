import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ForumService from '../services/ForumService'

function ForumList() {
    const [forums, setForums] = useState([])

  useEffect(()=>{
    ForumService.getAllForums().then( res => {
      setForums(res.data)
      console.log(res.data)
    })
    }, [])

    return (
        <div className="forums">
            {forums.map(forum=> (
                <p key={forum.id}><Link to={`/forums/${forum.id}`}>{forum.title}</Link></p>
            ))}
        </div>
    )
}

export default ForumList