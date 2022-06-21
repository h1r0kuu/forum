import { useState } from "react"
import DropdownItem from "./DropdownItem"
import {Link} from 'react-router-dom'

function Dropdown({links}) {
    const [open, setOpen] = useState(false)
    return (
        <li className={"dropdown " + (open === false ? "" : "open" )}>
            <Link to={"#"} className="dropdown-toggle" onClick={()=>setOpen((open === false ? true : false ))}>Question <span className="caret"></span></Link>
            <ul className="dropdown-menu animated zoomIn">
                {links.map(link => (
                    <DropdownItem text={link.text} url={link.url} key={link.text}/>
                ))}
            </ul>
        </li>
    )
}

export default Dropdown