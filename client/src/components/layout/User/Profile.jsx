import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import UserService from '../../../services/UserService';
import { GetUser } from '../../../utils/UserUtil';

function Profile({user}) {
    const authUser = GetUser()

    function follow(e) {
        e.preventDefault()
        UserService.follow({
            followingUsername: user.username,
            followerUsername: authUser.username
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
                {user.username !== authUser.username &&
                <>
                    <a href="#" onClick={follow}>Follow</a>
                    <a href="#">Ask Ahmed Hasan</a>
                </>
                }
            </div>
        </div>


        <div className="user-statas921">
            <div className="row">
                <div className="col-md-6">
                    <div className="ul_list_ul_list-icon-ok281">
                        <ul>
                            <li>
                                <Link to={`/user/${user.username}/comments`}>Comments ( {user.commentsCount} )</Link>
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
                            <li>
                                <Link to={`/user/${user.username}/posts`}>Posts ( {user.postsCount} )</Link>
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