import { Link } from "react-router-dom"
import { SETTINGS } from "../../../enums/profileEnums"

import dayjs from "../../../utils/dayjsRelative"

import "./AccountStyles.css"

function Account({selectedOption, setSelectedOption, user}) {

    const active = (prop) => {
        if(prop === selectedOption) {
            return "active"
        }
    }

    return (
        <>
        <div className="author-card pb-3">
            <div className="author-card-profile">
                <div className="author-card-avatar">
                    <img src={user.imagePath} alt={user.username}/>
                </div>
                <div className="author-card-details">
                    <h5 className="author-card-name text-lg">{user.username}</h5>
                    <span className="author-card-position">Joined {dayjs(user.createdAt).format("MMM DD, YYYY") }</span>
                </div>
            </div>
        </div>
        <div className="wizard">
            <nav className="list-group list-group-flush">
                <Link className={"list-group-item " + active(SETTINGS.PROFILE)} to={"#"} onClick={() => setSelectedOption(SETTINGS.PROFILE)}>
                    <div className="list-item-wrapper">
                        <div>
                            <div className="d-inline-block font-weight-medium text-uppercase">Profile settings</div>
                        </div>
                    </div>
                </Link>
            </nav>
        </div>
        </>
    )
}

export default Account