import "./NotificationsStyles.css"

import Notification from "./Notification/Notification"

function Notifications({notifications}) {
    return (
        <div className="notification-list">
            {notifications.length === 0 ? (
                <p className="empty">
                    Empty
                </p>
            ) : (
                <>
                <div className="line"></div>
                    {notifications.map(notification => (
                        <Notification notification={notification} key={notification.id}/>
                    ))}
                </>
            )}
        </div>
    )
}

export default Notifications