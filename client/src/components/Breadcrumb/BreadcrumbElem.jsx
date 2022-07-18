import { Link } from "react-router-dom"

function BreadcrumbElem(props) {
    return (
        <>
            {props.active
            ?
                <li className="active">{props.crumb.name}</li>
            :
                <li><Link to={props.crumb.url}>{props.crumb.name}</Link></li>
            }
        </>
    )
}

export default BreadcrumbElem