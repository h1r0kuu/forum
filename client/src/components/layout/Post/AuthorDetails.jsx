import { Link } from "react-router-dom"

function AuthorDetails({author}) {
    return (
        <div className="author-details8392">
            <div className="author-img202l">
                <img src="image/images.png" alt="image"/>
                <div className="au-image-overlay text-center">
                    <a href="#">
                        <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <span className="author-deatila04re">
                <h5>About the Author <Link to={"/user/"+author.username}>{author.username}</Link></h5>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra auctor neque. Nullam lobortis, sapien vitae lobortis tristique.</p>
            </span>
        </div>
    )
}

export default AuthorDetails