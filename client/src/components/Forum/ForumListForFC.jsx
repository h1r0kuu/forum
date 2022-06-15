import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ForumService from '../../services/ForumService'
import "../../styles/forum-choose.css"

function ForumListForFC() {
  const [forums, setForums] = useState([])
  useEffect(()=>{
    ForumService.getAllForums().then( res => {
      setForums(res.data)
    })
  }, [])

  return (
      <div className="forum-list">
        {forums.map(forum=> ( 
          <p key={forum.id}><Link to={`/forums/${forum.id}/posts/create`}>{forum.title}</Link></p>
        ))}
      </div>
  )
}

export default ForumListForFC