import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ForumService from '../../services/ForumService'
import "../../styles/forum-choose.css"

function ForumListForFC({setModal}) {
  const [forums, setForums] = useState([])
  useEffect(()=>{
    ForumService.getAllForums(true).then( res => {
      setForums(res.data)
    })
  }, [])

  return (
      <div className="forum-list">
        <div className="content">
          <div className="close" onClick={()=>{setModal(false)}}>X</div>

          {forums.map(forum=> ( 
            <p key={forum.id}><Link to={`/forums/${forum.id}/posts/create`}>{forum.title}</Link></p>
          ))}
        </div>
      </div>
  )
}

export default ForumListForFC