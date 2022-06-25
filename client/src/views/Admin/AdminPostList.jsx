import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PostService from "../../services/PostService"

import Pagination from "../../components/Pagination"
import AdminHeader from "../../components/layout/Admin/AdminHeader"

import Moment from 'react-moment';

function AdminPostList() {
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({})
    const [hasMore, setHasMore] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const order = searchParams.get("order") || "createdAt"
    const page = searchParams.get("page") || 0
    
    const loadMorePosts = () => {
        PostService.getAll(page,order).then(res => {
            setPosts(res.data.content)
            const {content, ...pagin} = res.data
            setPagination(pagin)
        })
    }
    console.log(posts)
    useEffect(()=>{
        loadMorePosts()
    }, [page, order])

    return (
        <>
            <AdminHeader/>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>closed</th>
                        <th>forum</th>
                        <th>creator</th>
                        <th>comments count</th>
                        <th>likes count</th>
                        <th>dislikes count</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.closed.toString()}</td>
                            <td>{post.forum.title}</td>
                            <td>{post.creator.username}</td>
                            <td>{post.comments.length}</td>
                            <td>{post.likesCount}</td>
                            <td>{post.dislikesCount}</td>
                            <td><Moment format="DD MMM YYYY">{post.createdAt}</Moment></td>
                            <td> <Moment format="DD MMM YYYY">{post.updatedAt}</Moment></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {pagination && pagination.pageable &&
            <Pagination pagination={pagination} order={order}/>
            }
        </>
    )
}

export default AdminPostList