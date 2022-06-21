import {Link} from 'react-router-dom'

function DropdownItem({text, url}) {
    return (
        <li>
            <Link to={url}>{text}</Link>
        </li>
    )
}

export default DropdownItem