import "./PostAuthorStyles.css"

import { Link } from "react-router-dom"

function PostAuthor({author}) {
    return (
        <div className="author-details">
            <div className="author-img">
                <img src={author.imagePath} alt={author.username}/>
                <div className="au-image-overlay text-center">
                    <Link to={"#"}><i className="fa fa-plus-square-o" aria-hidden="true"></i></Link>
                </div>
            </div>
            <span className="author-deatila04re">
                <h5>About the Author</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra auctor neque. Nullam lobortis, sapien vitae lobortis tristique.</p>
            </span> 
        </div>
    )
}

export default PostAuthor