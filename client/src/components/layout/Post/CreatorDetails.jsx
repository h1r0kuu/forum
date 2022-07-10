import { Link } from "react-router-dom"

function CreatorDetails({creator}) {
    return (
        <div className="author-details8392">
            <div className="author-img202l">
                <img src={creator.imagePath} alt="image"/>
                <div className="au-image-overlay text-center">
                    <a href="#">
                        <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <span className="author-deatila04re">
                <h5>About the Author <Link to={"/user/"+creator.username}>{creator.username}</Link></h5>
            </span>
        </div>
    )
}

export default CreatorDetails