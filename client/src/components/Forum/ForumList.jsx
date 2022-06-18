import {useState, useEffect} from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import ForumService from '../../services/ForumService'
import "../../styles/style.css"

function ForumList() {
  const [forums, setForums] = useState([])
  useEffect(()=>{
    ForumService.getAllForums(false).then( res => {
      setForums(res.data)
    })
  }, [])

  return (
    <div className="container">
      {forums.map( forum => (
        <div className="subforum">
          <div className="subforum-row">
            <div className="subforum-icon subforum-column center">
              <i className="fa fa-car center"></i>
            </div>
            <div className="subforum-description subforum-column">
              <h4>
                <Link to={"/forums/" + forum.id}>{forum.title}</Link>
              </h4>
            </div>
            <div className="subforum-stats subforum-column center">
              <span>{forum.postsCount} Posts</span>
            </div>
            {forum.lastPost &&
              <div className="subforum-info subforum-column">
                <b>
                  <a href="">Last post</a>
                </b> by <Link to={`/user/${forum.lastPost.creator.username}`}>{forum.lastPost.creator.username}</Link>
                <br />on <small><Moment format='MMM DD YYYY'>{forum.lastPost.createdAt}</Moment></small>
              </div>
            }
          </div>
          {forum.subForums.map(subforum => (
            <div className="subforum-row" style={{
              width: "90%",
              marginLeft: "auto"
            }}>
              <div className="subforum-icon subforum-column center">
                <i className="fa fa-car center"></i>
              </div>
              <div className="subforum-description subforum-column">
                <h4>
                  <Link to={"/forums/" + forum.id}>{subforum.title}</Link>
                </h4>
              </div>
              <div className="subforum-stats subforum-column center">
                <span>{subforum.postsCount} Posts</span>
              </div>
              {subforum.lastPost &&
                <div className="subforum-info subforum-column">
                  <b>
                    <a href="">Last post</a>
                  </b> by <Link to={`/user/${subforum.lastPost.creator.username}`}>{subforum.lastPost.creator.username}</Link>
                  <br />on <small><Moment format='MMM DD YYYY'>{subforum.lastPost.createdAt}</Moment></small>
                </div>
              }
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ForumList