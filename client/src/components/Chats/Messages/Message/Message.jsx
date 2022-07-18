import "./MessageStyles.css"

import dayjs from "../../../../utils/dayjsRelative"

function Message({message, username}) {
    return (
        <li className={"msg " + (message.author.username === username ? "replies" : "sent")}>
            <img src={message.author.imagePath} alt="" />
            <p>{message.text}</p>
            <span className="msg-date">{dayjs(message.createdAt).format("DD.MM.YYYY HH:mm")}</span>
        </li>
    )
}

export default Message