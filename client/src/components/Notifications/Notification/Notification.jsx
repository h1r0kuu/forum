import "./NotificationStyles.css"

import dayjs from "../../../utils/dayjsRelative"

function Notification({notification}) {
    return (
        <div className="notification">
            <div className="circle"></div>
            <span className="notification-time">{dayjs(notification.createdAt).format("HH:mm DD-MM")}</span>
            <p className="notification-msg">
                {notification.text}
            </p>
        </div>
    )
}

export default Notification