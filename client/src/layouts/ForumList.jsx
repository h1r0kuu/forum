import {useState, useEffect} from 'react'
import {Link, Route, Routes, useLocation } from 'react-router-dom'
import ForumService from '../services/ForumService'
import "../styles/forum-list.css"

function ForumList() {
  const [forums, setForums] = useState([])
  useEffect(()=>{
    ForumService.getAllForums().then( res => {
      setForums(res.data)
    })
  }, [])

  return (
      <div className="forums">
        {forums.map(forum=> ( 
          <p className="forum-link" key={forum.id}><Link to={`/forums/${forum.id}`}>{forum.title}</Link></p>
        ))}
      </div>
  )
}

export default ForumList