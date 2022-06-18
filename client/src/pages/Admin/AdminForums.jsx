import { useEffect, useState } from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import AdminHeader from "../../components/AdminHeader"
import ForumService from "../../services/ForumService"

function AdminForums() {
    const [forums, setForums] = useState([])
    useEffect(()=>{
        ForumService.getAllForums(true).then( res => {
        setForums(res.data)
        })
    }, [])
    return (
        <>
            <AdminHeader />
            <Link to={"/admin/forums/create"}>Create new forum</Link>
            <table>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    {/* <th>sub forum</th> */}
                    <th>post's count</th>
                    <th>created at</th>
                    <th>updated at</th>
                </tr>
                {forums.map( forum => (
                    <tr>
                        <td><Link to={"/forums/"+forum.id}>{forum.id}</Link></td>
                        <td>{forum.title}</td>
                        <td>{forum.postsCount}</td>
                        <td><Moment format="MMM.DD.YYYY">{forum.createdAt}</Moment></td>
                        <td><Moment format="MMM.DD.YYYY">{forum.updatedAt}</Moment></td>
                    </tr>
                ))}

            </table> 
        </>
    )
}

export default AdminForums