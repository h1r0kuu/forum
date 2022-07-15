import Moment from "react-moment"

function IncomingMessage({message}) {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img"> <img src={message.author.imagePath} alt="sunil"/> </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{message.text}</p>
                    <span className="time_date">
                        <Moment format="HH:MM | ">{message.createdAt}</Moment>
                        <Moment fromNow >{message.createdAt}</Moment>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default IncomingMessage