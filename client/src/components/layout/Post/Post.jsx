import { useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import ENTITY_TYPE from '../../../utils/enums';
import ReportModal from '../../ReportModal';

import PostService from "../../../services/PostService"
import { IsAuth } from '../../../utils/UserUtil';

function Post({post, deletePost}) {

    const isAuth = IsAuth()
    const [modal, setModal] = useState(false)

    function hidePost(e) {
        e.preventDefault()
        PostService.hidePost(post.id).then(res => {
            deletePost(post.id)
        })
    }

    return (
        <>
        <div className="question-type2033" id={"post-"+post.id}>
            <div className="row">

                <div className="col-md-10">
                    <div className="right-description893">
                        <div id="que-hedder2983">
                        <h3>
                            <Link to={"/posts/" + post.id}>{post.title}</Link>
                        </h3>
                        </div>
                        <hr/>
                        <div className="ques-icon-info3293">
                            <Link to={"/user/" + post.creator.username}>
                                <i className="fa fa-user" aria-hidden="true"> {post.creator.username}</i>
                            </Link>
                            <a href="#">
                                <i className="fa fa-clock-o" aria-hidden="true"> <Moment fromNow>{post.createdAt}</Moment></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-bug" aria-hidden="true" onClick={()=>setModal(true)}>Report</i>
                            </a>
                            {isAuth &&
                                <a href="#">
                                    <i className="fa fa-eye" aria-hidden="true" onClick={hidePost}>Hide</i>
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="ques-type302">
                        <a href="#">
                        <button type="button" className="q-type238">
                            <i className="fa fa-comment" aria-hidden="true"> {post.comments.length} comments</i>
                        </button>
                        </a>
                        <a href="#">
                        <button type="button" className="q-type23 button-ques2973">
                            <i className="fa fa-user-circle-o" aria-hidden="true"> {post.viewsCount} view</i>
                        </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {modal &&
            <ReportModal objId = {post.id} objType = {ENTITY_TYPE.POST} setModal={setModal}/>
        }
        </>
    )
}

export default Post