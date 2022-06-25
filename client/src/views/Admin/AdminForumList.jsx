import "../../assets/css/style.css"

import { useEffect, useState } from "react"
import ForumService from "../../services/ForumService"
import AdminHeader from "../../components/layout/Admin/AdminHeader"
import Moment from 'react-moment';

function AdminForumList() {
    const [forums, setForums] = useState([])
    
    useEffect( ()=> {
        ForumService.getAllForums(true).then(res => {
            setForums(res.data)
        })
    }, [])
    return (
        <>
        <AdminHeader/>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>posts count</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                </tr>
            </thead>
            <tbody>
                {forums.map(forum => (
                    <tr>
                        <td>{forum.id}</td>
                        <td>{forum.title}</td>
                        <td>{forum.postsCount}</td>
                        <td><Moment format="DD MMM YYYY">{forum.createdAt}</Moment></td>
                        <td> <Moment format="DD MMM YYYY">{forum.updatedAt}</Moment></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default AdminForumList