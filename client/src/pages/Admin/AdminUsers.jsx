import { useState } from "react"
import { useEffect } from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import AdminHeader from "../../components/AdminHeader"
import UserService from "../../services/UserService"

import "../../styles/admin.css"

function AdminUsers() {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        UserService.getAll().then( res => {
            setUsers(res.data)
        })
    }, [])
    console.log(users)

    return (
        <>
            <AdminHeader />
            <table>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>role</th>
                    <th>img</th>
                    <th>comment's count</th>
                    <th>created at</th>
                    <th>updated at</th>
                </tr>
                {users.map( user => (
                    <tr>
                        <td>{user.id}</td>
                        <td><Link to={"/user/"+user.username}>{user.username}</Link></td>
                        <td>{user.role}</td>
                        <td><img src={user.imagePath} alt={user.username} width={"100px"}/></td>
                        <td>{user.commentsCount}</td>
                        <td><Moment format="MMM.DD.YYYY">{user.createdAt}</Moment></td>
                        <td><Moment format="MMM.DD.YYYY">{user.updatedAt}</Moment></td>
                    </tr>
                ))}
            </table> 
        </>
    )

}

export default AdminUsers