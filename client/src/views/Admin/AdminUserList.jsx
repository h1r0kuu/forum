import { useState } from "react"
import { useEffect } from "react"
import Moment from "react-moment"
import AdminHeader from "../../components/layout/Admin/AdminHeader"
import UserService from "../../services/UserService"

function AdminUserList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        UserService.getAll().then( res => {
            setUsers(res.data)
        })
    }, [])

    return (
        <>
        <AdminHeader/>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>role</th>
                    <th>Comments count</th>
                    <th>followers</th>
                    <th>following</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.commentsCount}</td>
                        <td>{user.followers.length}</td>
                        <td>{user.following.length}</td>
                        <td><Moment format="DD MMM YYYY">{user.createdAt}</Moment></td>
                        <td><Moment format="DD MMM YYYY">{user.updatedAt}</Moment></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default AdminUserList