import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import UserService from '../../../services/UserService';

function Profile({user, store}) {
    function follow(e) {
        e.preventDefault()
        UserService.follow({
            followingUsername: user.username,
            followerUsername: store.user.username
        })
    }
    return (
        <>
        <div className="about-user2039 mt-70">
            <div className="user-title3930">
                <h3>About <a href="#">{user.username}</a>
                    <span className="badge229">
                        <a href="#">punit</a>
                    </span>
                </h3>
                <hr/>
            </div>
            <div className="user-image293">
                <img src={user.imagePath} alt="Image"/>
            </div>
            <div className="user-list10039">
                <div className="ul-list-user-left29">
                <ul>
                    <li>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <strong>Registered:</strong> <Moment format='MMM DD, YYYY'>{user.createdAt}</Moment>
                    </li>
                </ul>
                </div>
            </div>
            <div className="user-description303">
                {user.username !== store.user.username &&
                <>
                    <a href="#">Follow</a>
                    <a href="#">Ask Ahmed Hasan</a>
                </>
                }
            </div>
            <div className="user-social3903">
                <p>Follow : <span>
                    <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </a>
                </span>
                </p>
            </div>
        </div>


        <div className="user-statas921">
            <div className="row">
                <div className="col-md-6">
                <div className="ul_list_ul_list-icon-ok281">
                    <ul>
                        <li>
                            <a href="#">Comments ( {user.commentsCount} )</a>
                        </li>
                        {user.followrs &&
                            <li>
                                <a href="#">Followers ( {user.followers.length} )</a>
                            </li>
                        }
                        {user.following &&
                            <li>
                                <a href="#">Following ( {user.following.length} )</a>
                            </li>
                        }
                        <li>
                            <Link to={`/user/${user.username}/hidden_posts`}>Hidden posts ( {user.hiddenPostsCount} )</Link>
                        </li>
                    </ul>
                </div>
                </div>
                <div className="col-md-6">
                <div className="ul_list_ul_list-icon-ok281">
                    <ul>
                    <li>
                        <a href="#">Questions ( 4 )</a>
                    </li>
                    <li>
                        <a href="#">Asked Questions ( 0 )</a>
                    </li>
                    <li>
                        <a href="#">Followed Questions ( 3 )</a>
                    </li>
                    <li>
                        <a href="#">Posts ( 10 )</a>
                    </li>
                    <li>
                        <a href="#">Points ( 208 )</a>
                    </li>
                    <li>
                        <a href="#">Followers ( 47 )</a>
                    </li>
                    <li>
                        <a href="#">Comments ( 1 )</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile