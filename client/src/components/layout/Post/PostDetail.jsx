import Moment from 'react-moment';

import CommentList from "../../Comments/CommentList"
import LeaveCommentForm from "../../Comments/LeaveCommentForm"
import CreatorDetails from "./CreatorDetails"

import PostService from "../../../services/PostService"
import { GetStore } from '../../../utils/UserUtil';
import { useEffect, useState } from 'react';
import { useReducer } from 'react';
import NotificationServicre from '../../../services/NotificationServicre';
import CommentService from '../../../services/CommentService';

function PostDetail({post, comments, setComments}) {
    const store = GetStore()
    
    function like(e) {
        e.preventDefault()
        PostService.like(post.id, {username:store.user.username})
    }

    function dislike(e) {
        e.preventDefault()
        PostService.dislike(post.id, {username:store.user.username})
    }

    return (
        <>
            <div className="post-details">
                <div className="details-header923">
                    <div className="row">
                    <div className="col-md-8">
                        <div className="post-title-left129">
                            <h3>{post.title}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="post-que-rep-rihght320">
                        <a href="#">
                            <i className="fa fa-question-circle" aria-hidden="true"></i> Question </a>
                        <a href="#" className="r-clor10">Report</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="post-details-info1982">
                    <div className="text" dangerouslySetInnerHTML={{__html:post.text}} />
                    <hr/>
                    <div className="post-footer29032">
                        <div className="l-side2023">
                            <i className="fa fa-clock-o clock2" aria-hidden="true"> <Moment fromNow>{post.createdAt}</Moment></i>
                            <a href="#">
                                <i className="fa fa-commenting commenting2" aria-hidden="true"> {post.comments ? post.comments.length : 0} answer</i>
                            </a>
                                <i className="fa fa-user user2" aria-hidden="true"> {post.viewsCount} views</i>
                        </div>
                        <div className="l-rightside39">
                            <button type="button" className="tolltip-button thumbs-up2" data-toggle="tooltip" data-placement="bottom" title="Like" onClick={like}>
                                {post.likesCount} <i className="fa fa-thumbs-o-up " aria-hidden="true"></i>
                            </button>
                            <button type="button" className="tolltip-button  thumbs-down2" data-toggle="tooltip" data-placement="bottom" title="Dislike" onClick={dislike}>
                                {post.dislikesCount} <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                            </button>
                            <span className="single-question-vote-result">{post.likesCount - post.dislikesCount}</span>
                        </div>
                    </div>
                </div>
            </div>
            {post.creator &&
                <CreatorDetails creator={post.creator}/>
            }
            {comments && comments.length > 0 &&
                <CommentList comments={comments} postId={post.id} creatorUsername={post.creator.username}/>
            }
            {!post.closed &&
                <LeaveCommentForm post={post} comments={comments} setComments={setComments}/>
            }
        </>
    )
}
export default PostDetail