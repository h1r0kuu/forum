import { useEffect } from "react"
import { useState } from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"

import AdminHeader from "../../components/layout/Admin/AdminHeader"
import ReportService from "../../services/ReportService"
import ENTITY_TYPE from "../../utils/enums"

function AdminReports() {
    const [reports, setReports] = useState([])

    function ReportUrl(report) {
        let url = ''
        switch(report.entity){
            case ENTITY_TYPE.POST:
                url = "/posts/"
                break;
            case ENTITY_TYPE.USER: 
                url = "/users/"
                break;
            case ENTITY_TYPE.COMMENT:
                url = "/users/"
                break;
            default:
                break
        }
        return url + report.objectId
    }

    useEffect(() => {
        ReportService.getAll().then(res => {
            setReports(res.data)
        })
    }, [])

    return (
        <>
        <AdminHeader/>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>text</th>
                    <th>entity</th>
                    <th>Object id</th>
                    <th>User</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                </tr>
            </thead>
            <tbody>
                {reports.map(report => (
                    <tr>
                        <td>{report.id}</td>
                        <td>{report.text}</td>
                        <td>{report.entity}</td>
                        <td><Link to={ReportUrl(report)}>{report.objectId}</Link></td>
                        <td>{report.user ? report.user.username : "anon" }</td>
                        <td><Moment format="DD MMM YYYY">{report.createdAt}</Moment></td>
                        <td><Moment format="DD MMM YYYY">{report.updatedAt}</Moment></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default AdminReports