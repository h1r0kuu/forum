import "./AboutUserStyles.css"

import { Link } from "react-router-dom"

import dayjs from "../../../utils/dayjsRelative"

function AboutUser({user}) {
    return (
        <div className="about-user">
            <div className="user-title">
                <h3>About <Link to={"#"}>{user.username}</Link>
                <span className="role">
                    <Link to={"#"}>user</Link>
                </span>
                </h3>
                <hr/>
            </div>
            <div className="user-image">
                <img src={user.imagePath} alt={user.username}/>
            </div>
            <div className="user-list">
                <div className="ul-list-user-left">
                <ul>
                    <li>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <strong>Registered:</strong> June 4, 2014 {dayjs(user.createdAt).format("MMM DD, YYYY")}
                    </li>
                    <li>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <strong>Country:</strong> Egypt
                    </li>
                    <li>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        <strong>Age:</strong> 27
                    </li>
                    <li>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <strong>Website:</strong>
                        <Link to={"#"}>view</Link>
                    </li>
                </ul>
                </div>
                <div className="ul-list-user-right">
                <ul>
                    <li>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <strong>Phone:</strong> 01111111110
                    </li>
                    <li>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <strong>City:</strong> Cairo
                    </li>
                    <li>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <strong>Sex: </strong>Male
                    </li>
                </ul>
                </div>
            </div>
            <div className="user-description">
                <p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vitae velit in neque dictum blandit.</p>
                <Link to={"#"}>Send message</Link>
                <Link to={"#"} style={{marginLeft: "5px"}}>Follow</Link>
            </div>
            <div className="user-social">
                <p>Follow : <span>
                    <Link to={"#"}>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                    </Link>
                    <Link to={"#"}>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </Link>
                    <Link to={"#"}>
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </Link>
                    <Link to={"#"}>
                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                    </Link>
                    <Link to={"#"}>
                        <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                    </Link>
                    <Link to={"#"}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </Link>
                    <Link to={"#"}>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </Link>
                </span>
                </p>
            </div>
        </div>
    )
}

export default AboutUser