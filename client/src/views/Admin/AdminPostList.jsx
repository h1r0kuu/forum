import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

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
                        <th><Link to={"?page=0&order=id"}>id</Link></th>
                        <th><Link to={"?page=0&order=title"}>title</Link></th>
                        <th><Link to={"?page=0&order=closed"}>closed</Link></th>
                        <th><Link to={"?page=0&order=forum.title"}>forum</Link></th>
                        <th><Link to={"?page=0&order=creator.username"}>creator</Link></th>
                        <th><Link to={"?page=0&order=comments.size"}>comments count</Link></th>
                        <th><Link to={"?page=0&order=likes.size"}>likes count</Link></th>
                        <th><Link to={"?page=0&order=dislikes.size"}>dislikes count</Link></th>
                        <th><Link to={"?page=0&order=createdAt"}>Created at</Link></th>
                        <th><Link to={"?page=0&order=updatedAt"}>Updated at</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr>
                            <td>{post.id}</td>
                            <td><Link to={"/posts/"+post.id}>{post.title}</Link></td>
                            <td>{post.closed.toString()}</td>
                            <td>{post.forum.title}</td>
                            <td>{post.creator.username}</td>
                            <td>{post.comments.length}</td>
                            <td>{post.likesCount}</td>
                            <td>{post.dislikesCount}</td>
                            <td><Moment format="DD MMM YYYY">{post.createdAt}</Moment></td>
                            <td><Moment format="DD MMM YYYY">{post.updatedAt}</Moment></td>
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